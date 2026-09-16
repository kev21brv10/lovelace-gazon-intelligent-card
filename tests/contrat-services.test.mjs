// Contrat des services : ce que la carte ENVOIE, confronté à ce que l'intégration ACCEPTE.
//
// Défaut constaté le 16/09/2026 : « 💧 Déclarer un arrosage » envoyait `quantite_mm`. Le schéma
// voluptuous de `gazon_intelligent.declare_watering` ne connaît que `date_action` et
// `objectif_mm`, et un `vol.Schema` refuse toute clé qu'il ne connaît pas (« extra keys not
// allowed ») : l'appel échouait à CHAQUE fois depuis la 0.21.2, et la carte ignorait le rejet.
//
// ⚠️ Ces tests ne lisent pas le texte de la carte pour juger ce qu'elle envoie : ils la rendent,
// cliquent chaque action comme le ferait Kévin et capturent ce qui part réellement vers
// `hass.callService`, sérialisé en JSON comme sur le websocket.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";

const here     = dirname(fileURLToPath(import.meta.url));
const BUNDLE   = readFileSync(join(here, "..", "gazon-intelligent-card.js"), "utf-8");
const CARD_TAG = "gazon-intelligent-card";

// ── LE CONTRAT ────────────────────────────────────────────────────────────────
// Recopié du schéma voluptuous (`_async_register_services`, custom_components/gazon_intelligent/
// __init__.py) et de services.yaml, intégration 0.91.0 — celle qui tourne. Recopier à la main,
// c'est exactement ainsi que `quantite_mm` s'est glissé : le dernier test confronte donc ce
// contrat aux fichiers de l'intégration dès que son dépôt est présent à côté de celui-ci.
//
// Types : `date` = chaîne lisible par `parse_optional_date` (le schéma dit `str`) ; `nombre` =
// `vol.Coerce(float)` borné ; `booleen` = `cv.boolean` ; `choix` = `vol.In(...)` ; `texte` = chaîne.
const CIBLES = ["entity_id", "device_id", "area_id"];   // `_SERVICE_TARGET_FIELD`
const INTERVENTIONS = [                                  // `INTERVENTIONS_ACTIONS`, const.py
  "Semis", "Sursemis", "Traitement", "Fertilisation",
  "Biostimulant", "Agent Mouillant", "Scarification", "Hivernage",
];

const CONTRAT = {
  declare_mowing: {
    date_action:      { type: "date" },
    hauteur_coupe_mm: { type: "nombre", min: 10, max: 120 },
  },
  declare_watering: {
    date_action: { type: "date" },
    objectif_mm: { type: "nombre", min: 0, max: 30 },
  },
  recalibrate_reserve: {
    reserve_mm:       { type: "nombre", min: 0, max: 100, requis: true },
    figer_la_journee: { type: "booleen" },
  },
  reset_mode: {},
  remove_last_application: {},
  declare_intervention: {
    intervention: { type: "choix", valeurs: INTERVENTIONS, requis: true },
    date_action:  { type: "date" },
    produit_id:   { type: "texte" },
    produit:      { type: "texte" },
    zone:         { type: "texte" },
    note:         { type: "texte" },
  },
  start_manual_irrigation: {
    objectif_mm: { type: "nombre", min: 0, max: 30, requis: true },
  },
  stop_irrigation: {
    raison: { type: "texte" },
  },
};

// Les actions ouvertes en popup (`_servicesCarte`). Liste tenue ici EXPRÈS : si la table ou les
// boutons changent, le test le dit au lieu de rétrécir en silence.
const EN_FENETRE = [
  "declare_mowing", "declare_watering", "recalibrate_reserve", "reset_mode", "remove_last_application",
];

// Un jour inférieur à 13 et différent du mois : une date envoyée à l'envers (MM/JJ) se voit.
const DATE_SAISIE   = "2026-09-05";
const DATE_ATTENDUE = "05/09/2026";

function dateLisible(v) {
  if (typeof v !== "string") return false;
  let r, j, m, a;
  if ((r = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v))) [, j, m, a] = r;
  else if ((r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v))) [, a, m, j] = r;
  else return false;
  const d = new Date(Date.UTC(+a, +m - 1, +j));
  return d.getUTCFullYear() === +a && d.getUTCMonth() === +m - 1 && d.getUTCDate() === +j;
}

function probleme(regle, v) {
  switch (regle.type) {
    case "nombre":
      if (typeof v !== "number" || !Number.isFinite(v)) return `expected float, got ${JSON.stringify(v)}`;
      if (v < regle.min) return `value must be at least ${regle.min}`;
      if (v > regle.max) return `value must be at most ${regle.max}`;
      return null;
    case "booleen": return typeof v === "boolean" ? null : `expected boolean, got ${JSON.stringify(v)}`;
    case "texte":   return typeof v === "string" ? null : `expected str, got ${JSON.stringify(v)}`;
    case "choix":   return regle.valeurs.includes(v) ? null : `value must be one of ${JSON.stringify(regle.valeurs)}`;
    case "date":    return dateLisible(v) ? null : `date illisible par parse_optional_date : ${JSON.stringify(v)}`;
    default:        return `type de règle inconnu : ${regle.type}`;
  }
}

// Ce que le schéma de l'intégration reprocherait à `data`, dans ses propres termes. Vide = accepté.
function ecarts(service, data) {
  const champs = CONTRAT[service];
  if (!champs) return [`gazon_intelligent.${service} absent du contrat`];
  const out = [];
  for (const [cle, valeur] of Object.entries(data || {})) {
    if (CIBLES.includes(cle)) {
      // `_target_selector_value` : une chaîne (la carte n'envoie jamais de liste).
      if (typeof valeur !== "string") out.push(`cible illisible @ data['${cle}'] : ${JSON.stringify(valeur)}`);
      continue;
    }
    const regle = champs[cle];
    if (!regle) { out.push(`extra keys not allowed @ data['${cle}']`); continue; }
    const pb = probleme(regle, valeur);
    if (pb) out.push(`${pb} @ data['${cle}']`);
  }
  for (const [cle, regle] of Object.entries(champs)) {
    if (regle.requis && !(data && cle in data)) out.push(`required key not provided @ data['${cle}']`);
  }
  return out;
}

// ── LE HARNAIS ────────────────────────────────────────────────────────────────
// Une SECONDE instance (Kévin en a deux) : la cible de chaque appel doit être une entité de
// CE gazon, sinon l'intégration refuse (« Plusieurs gazons existent… ») ou agit sur l'autre.
const P = "gazon_intelligent_potager";
const E = {
  assistant:    `sensor.${P}_assistant`,
  session:      `sensor.${P}_arrosage_en_cours`,
  tonte:        `binary_sensor.${P}_tonte_autorisee`,
  phase:        `sensor.${P}_phase_dominante`,
  reserve:      `sensor.${P}_reserve_actuelle`,
  objectif:     `sensor.${P}_objectif_d_arrosage`,
  intervention: `sensor.${P}_prochaine_intervention`,
  catalogue:    `sensor.${P}_catalogue_produits`,      // déduite de `intervention` par la carte
  derniere:     `sensor.${P}_derniere_application`,    // idem
  auto:         `switch.${P}_arrosage_automatique_autorise`,
  zone:         "switch.gi_z1",
};

const CONFIG = {
  type: `custom:${CARD_TAG}`,
  zones: [{ name: "Zone A", switch: E.zone, debit: 14 }],   // sans zone, pas d'« Outils »
  entity_assistant:              E.assistant,
  entity_arrosage_en_cours:      E.session,
  entity_tonte_autorisee:        E.tonte,
  entity_phase:                  E.phase,
  entity_reserve:                E.reserve,
  entity_objectif_arrosage:      E.objectif,
  entity_prochaine_intervention: E.intervention,
  entity_switch_arrosage_auto:   E.auto,
};

// Un état où TOUS les boutons d'action sont proposés : pas de tonte aujourd'hui, une application
// à annuler, un produit à déclarer, une zone à l'arrêt — et, sur demande, un arrosage en cours.
function etats({ sessionActive = false } = {}) {
  const s = (entity_id, state, attributes = {}) => ({ entity_id, state, attributes });
  return {
    [E.assistant]:    s(E.assistant, "aucune_action", { action: "aucune_action", status: "ok" }),
    [E.session]:      s(E.session, sessionActive ? "on" : "off", sessionActive
      ? { active: true, progress_percent: 40, remaining_session_seconds: 600 }
      : { active: false }),
    [E.tonte]:        s(E.tonte, "on", { derniere_tonte_date: "2000-01-01" }),
    [E.phase]:        s(E.phase, "Normal"),
    [E.reserve]:      s(E.reserve, "8.2", { reserve_actuelle_mm: 8.2, reserve_utile_mm: 12 }),
    [E.objectif]:     s(E.objectif, "4.5"),
    [E.intervention]: s(E.intervention, "non_requis"),
    [E.catalogue]:    s(E.catalogue, "1", {
      products_summary: [{ id: "kick_pro", nom: "Kick Pro", type: "Traitement" }],
    }),
    [E.derniere]:     s(E.derniere, "Kick Pro", {
      application_history: [{ date: "2026-09-10", produit: "Kick Pro", type: "Traitement" }],
    }),
    [E.auto]:         s(E.auto, "on", { friendly_name: "Arrosage automatique" }),
    [E.zone]:         s(E.zone, "off", { friendly_name: "Zone A" }),
  };
}

// `repondre` joue le rôle du serveur : promesse résolue par défaut, comme Home Assistant.
function hassAvec(appels, { repondre = () => Promise.resolve({ context: { id: "x" } }),
                            langue = "fr", sessionActive = false } = {}) {
  return {
    states: etats({ sessionActive }),
    locale: { language: langue },
    callApi: async () => [],
    // Copie JSON, comme le websocket : les clés `undefined` ne partent pas.
    callService: (...args) => { appels.push(JSON.parse(JSON.stringify(args))); return repondre(...args); },
  };
}

function carte(hass) {
  const consoleVirtuelle = new VirtualConsole();   // rien d'imprimé : on garde tout pour les tests
  const journal = [];
  consoleVirtuelle.on("error", (...args) => journal.push(args));
  consoleVirtuelle.on("jsdomError", (err) => journal.push([err]));
  const dom = new JSDOM("<!DOCTYPE html><body></body>", {
    runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: consoleVirtuelle,
  });
  const { window } = dom;
  window.requestAnimationFrame ??= (cb) => window.setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame  ??= (id) => window.clearTimeout(id);
  window.matchMedia            ??= () => ({
    matches: false, media: "",
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
  });
  window.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
  window.eval(BUNDLE);
  // Comme dans Home Assistant : la carte vit sous plusieurs shadow roots, et c'est la racine
  // `<home-assistant>` qui affiche les toasts. Un événement qui ne traverse pas les shadow
  // roots (`composed`) n'y arrive jamais.
  const racine = window.document.createElement("home-assistant");
  window.document.body.appendChild(racine);
  const vue = window.document.createElement("hui-view");
  racine.attachShadow({ mode: "open" }).appendChild(vue);
  const el = window.document.createElement(CARD_TAG);
  vue.attachShadow({ mode: "open" }).appendChild(el);
  el.setConfig({ ...CONFIG });
  el.hass = hass;
  const toasts = [];
  racine.addEventListener("hass-notification", (e) => toasts.push({ ...e.detail }));
  const vibrations = [];   // le frontend écoute `haptic` sur window
  window.addEventListener("haptic", (e) => vibrations.push(e.detail));
  return { window, el, racine, journal, toasts, vibrations };
}

// Parcourt les onglets par leurs vrais boutons jusqu'à trouver l'élément voulu.
function trouver(el, selecteur) {
  const onglets = [...el.shadowRoot.querySelectorAll(".tab[data-tab]")].map((b) => b.dataset.tab);
  assert.ok(onglets.length, "aucun onglet rendu");
  for (const onglet of onglets) {
    el.shadowRoot.querySelector(`.tab[data-tab="${onglet}"]`).click();
    const cible = el.shadowRoot.querySelector(selecteur);
    if (cible) return cible;
  }
  return null;
}

function actionsProposees(el) {
  const ids = new Set();
  for (const b of el.shadowRoot.querySelectorAll(".tab[data-tab]")) {
    b.click();
    el.shadowRoot.querySelectorAll('[data-action="svc-open"]').forEach((x) => ids.add(x.dataset.svc));
  }
  return [...ids].sort();
}

// Ouvre la popup de l'action `id` par son bouton, la laisse remplir, puis clique « Enregistrer ».
function lancerEnFenetre(el, id, remplir = () => {}) {
  const bouton = trouver(el, `[data-action="svc-open"][data-svc="${id}"]`);
  assert.ok(bouton, `aucun bouton ne propose ${id}`);
  bouton.click();
  const run = el.shadowRoot.querySelector('[data-action="svc-run"]');
  assert.ok(run, `le bouton ${id} n'ouvre aucune fenêtre`);
  const fenetre = run.closest(".modal");
  remplir(fenetre);
  run.click();
  return fenetre;
}

// Les actions qui ne passent pas par `_servicesCarte` : le chemin réel de chacune, et ce qu'elle
// doit envoyer pour ce qui a été saisi.
const HORS_FENETRE = {
  declare_intervention: {
    options: {},
    jouer(el) {
      const ouvrir = trouver(el, '[data-action="declare-open"]');
      assert.ok(ouvrir, "bouton « Déclarer un produit » introuvable");
      ouvrir.click();
      el.shadowRoot.querySelector("#gi-decl-date").value = "2026-09-03";
      el.shadowRoot.querySelector("#gi-decl-note").value = "moitié de la surface";
      el.shadowRoot.querySelector('[data-action="declare-run"]').click();
    },
    attendu: { intervention: "Traitement", produit_id: "kick_pro",
               date_action: "03/09/2026", note: "moitié de la surface" },
  },
  start_manual_irrigation: {
    options: {},
    jouer(el) {
      const ouvrir = trouver(el, '[data-action="manual-open"]');
      assert.ok(ouvrir, "bouton d'arrosage manuel introuvable");
      ouvrir.click();
      el.shadowRoot.querySelector("#gi-manual-mm").value = "6";
      el.shadowRoot.querySelector('[data-action="manual-run"]').click();
    },
    attendu: { objectif_mm: 6 },
  },
  stop_irrigation: {
    options: { sessionActive: true },
    jouer(el) {
      const stop = trouver(el, '[data-action="stop-irrigation"]');
      assert.ok(stop, "pas de bouton d'arrêt pendant un arrosage en cours");
      stop.click();
    },
    attendu: { raison: "Arrêt depuis la carte." },
  },
};

function verifierAppel(appel, service) {
  assert.ok(appel, `aucun appel émis pour ${service}`);
  const [domaine, nom, data] = appel;
  assert.equal(`${domaine}.${nom}`, `gazon_intelligent.${service}`);
  assert.deepEqual(ecarts(nom, data), [],
    `gazon_intelligent.${nom} serait REFUSÉ par l'intégration — envoyé : ${JSON.stringify(data)}`);
  assert.equal(typeof data.entity_id, "string", `${nom} part sans cible explicite`);
  assert.ok(data.entity_id.includes(`.${P}_`),
    `${nom} vise ${data.entity_id}, qui n'est pas une entité de CE gazon`);
}

const laisserPasser = () => new Promise((r) => setTimeout(r, 30));

// ── LES ACTIONS EN FENÊTRE ────────────────────────────────────────────────────

test("chaque action en fenêtre a son contrat, et la table comme les boutons les couvrent toutes", () => {
  const { el } = carte(hassAvec([]));
  // La table d'abord : une action qu'aucun bouton ne montre dans CET état resterait sinon invisible.
  const table = Object.keys(el._servicesCarte()).sort();
  assert.deepEqual(table, [...EN_FENETRE].sort(), "la table des actions en fenêtre a changé");
  const proposees = actionsProposees(el);
  const sansContrat = [...new Set([...table, ...proposees])].filter((id) => !CONTRAT[id]);
  assert.deepEqual(sansContrat, [], `actions sans contrat : ${sansContrat.join(", ")}`);
  assert.deepEqual(proposees, [...EN_FENETRE].sort(),
    "les boutons proposés ne sont plus ceux attendus : le scénario ne couvre plus toutes les actions");
});

for (const id of EN_FENETRE) {
  test(`« ${id} » : la fenêtre envoie ce que l'intégration accepte`, () => {
    const appels = [];
    const { el } = carte(hassAvec(appels));
    lancerEnFenetre(el, id, (f) => {
      for (const d of f.querySelectorAll('input[type="date"]')) d.value = DATE_SAISIE;
      // Les bornes proposées à la saisie doivent tenir dans celles du service.
      for (const inp of f.querySelectorAll('input[type="number"]')) {
        const regle = CONTRAT[id][inp.id.replace("gi-svc-", "")];
        if (!regle) continue;   // clé inconnue : l'envoi le signalera
        assert.ok(inp.hasAttribute("min") && inp.hasAttribute("max"),
          `${inp.id} : aucune borne alors que le service n'accepte que ${regle.min} à ${regle.max}`);
        assert.ok(+inp.min >= regle.min && +inp.max <= regle.max,
          `${inp.id} : ${inp.min}–${inp.max} déborde du service (${regle.min}–${regle.max})`);
      }
    });
    assert.equal(appels.length, 1, `${appels.length} appels pour un clic`);
    verifierAppel(appels[0], id);
    const [, , data] = appels[0];
    for (const [cle, regle] of Object.entries(CONTRAT[id])) {
      if (regle.type === "date" && cle in data) {
        assert.equal(data[cle], DATE_ATTENDUE, `${cle} : ${DATE_SAISIE} saisi, ${data[cle]} envoyé`);
      }
    }
    assert.equal(el.shadowRoot.querySelector('[data-action="svc-run"]'), null, "la fenêtre reste ouverte");
  });
}

test("« J'ai arrosé à la main » : la dose saisie part dans `objectif_mm`", () => {
  const appels = [];
  const { el } = carte(hassAvec(appels));
  lancerEnFenetre(el, "declare_watering", (f) => {
    f.querySelector('input[type="number"]').value = "7.5";
    f.querySelector('input[type="date"]').value = DATE_SAISIE;
  });
  const [, , data] = appels[0];
  assert.equal(data.objectif_mm, 7.5, `envoyé : ${JSON.stringify(data)}`);
  assert.ok(!("quantite_mm" in data), "`quantite_mm` n'existe pas côté intégration");
  assert.equal(data.date_action, DATE_ATTENDUE);
});

test("« Recaler la réserve » sans figer la journée envoie un vrai booléen faux", () => {
  const appels = [];
  const { el } = carte(hassAvec(appels));
  lancerEnFenetre(el, "recalibrate_reserve", (f) => {
    f.querySelector('input[type="number"]').value = "6.4";
    f.querySelector('input[type="checkbox"]').checked = false;
  });
  const [, , data] = appels[0];
  assert.equal(data.reserve_mm, 6.4);
  assert.equal(data.figer_la_journee, false);
});

// ── LES AUTRES APPELS À L'INTÉGRATION ─────────────────────────────────────────

for (const [service, scenario] of Object.entries(HORS_FENETRE)) {
  test(`« ${service} » : l'appel direct respecte le contrat`, () => {
    const appels = [];
    const { el } = carte(hassAvec(appels, scenario.options));
    scenario.jouer(el);
    assert.equal(appels.length, 1, `${appels.length} appels pour un clic`);
    verifierAppel(appels[0], service);
    const [, , data] = appels[0];
    for (const [cle, valeur] of Object.entries(scenario.attendu)) {
      assert.equal(data[cle], valeur, `${cle} : envoyé ${JSON.stringify(data[cle])}`);
    }
  });
}

test("chaque appel de service écrit dans la carte est connu du contrat et joué", () => {
  // Garde de COUVERTURE, pas preuve de comportement : les preuves sont les tests ci-dessus. Tout
  // `this._call(` doit être reconnu — domaine littéral, service de l'intégration joué ci-dessus,
  // ou l'envoi générique des fenêtres — sinon ce test ne saurait pas le vérifier.
  const appels = [...BUNDLE.matchAll(/this\._call\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*,/g)]
    .map((m) => [m[1], m[2]]);
  assert.ok(appels.length >= 8, `${appels.length} appels trouvés : le motif ne mord plus`);
  const litteral = (s) => (/^(['"`])([a-z_]+)\1$/.exec(s) || [])[2];
  const inconnus = [];
  const directs = new Set();
  let generiques = 0;
  for (const [d, s] of appels) {
    const domaine = litteral(d);
    if (domaine === "gazon_intelligent") {
      if (s === "id") { generiques += 1; continue; }        // `svc-run`, couvert par EN_FENETRE
      const service = litteral(s);
      if (service && HORS_FENETRE[service]) directs.add(service);
      else inconnus.push(`${d}, ${s}`);
    } else if (!["switch", "number"].includes(domaine)) {
      inconnus.push(`${d}, ${s}`);
    }
  }
  assert.deepEqual(inconnus, [], "appels que ce test ne sait pas vérifier");
  assert.equal(generiques, 1, "un seul envoi générique attendu (`svc-run`)");
  assert.deepEqual([...directs].sort(), Object.keys(HORS_FENETRE).sort(), "scénario sans appel");
  for (const s of directs) assert.ok(CONTRAT[s], `${s} appelé mais absent du contrat`);
});

// ── UN ÉCHEC DOIT SE VOIR ─────────────────────────────────────────────────────

test("un refus de l'intégration s'affiche en clair, sans rejet ignoré", async () => {
  const appels = [];
  const refus = { code: "invalid_format", message: "extra keys not allowed @ data['quantite_mm']" };
  const { el, toasts, vibrations, journal } = carte(hassAvec(appels, { repondre: () => Promise.reject(refus) }));
  const rejets = [];
  const surRejet = (raison) => rejets.push(raison);
  process.on("unhandledRejection", surRejet);
  try {
    lancerEnFenetre(el, "declare_watering");
    await laisserPasser();
  } finally {
    process.off("unhandledRejection", surRejet);
  }
  assert.equal(appels.length, 1);
  assert.deepEqual(rejets, [], "le rejet de callService n'est toujours pas traité");
  assert.equal(toasts.length, 1, `${toasts.length} toast(s) : l'échec doit arriver à <home-assistant>, une fois`);
  assert.match(toasts[0].message, /Déclarer un arrosage/, "le toast doit nommer l'action cliquée");
  assert.match(toasts[0].message, /extra keys not allowed @ data\['quantite_mm'\]/,
    "le toast doit dire POURQUOI");
  assert.ok(toasts[0].duration >= 4000, "un toast d'erreur doit rester lisible");
  assert.deepEqual(vibrations, ["failure"], "la vibration d'échec du toast natif doit rester");
  // Le frontend (20260826.7) publierait son propre toast : coupé par `notifyOnError`.
  assert.equal(appels[0][4], false, "le toast générique de HA n'est pas coupé : deux toasts se chasseraient");
  assert.ok(journal.some((l) => String(l[0]).includes("gazon_intelligent.declare_watering")),
    "l'échec doit rester lisible dans la console, avec le service en clair");
});

test("l'arrêt différé du bouton « 5 min » se signale même si la carte a quitté la page", async () => {
  // Kévin lance « 5 min » puis ouvre une autre page : le routeur de HA détache la carte. Si
  // l'arrêt échoue, la vanne reste ouverte — le toast ne doit pas se perdre avec la carte.
  const appels = [];
  const { window, el, toasts } = carte(hassAvec(appels, {
    repondre: (domaine, service) => service === "turn_off"
      ? Promise.reject({ code: "home_assistant_error", message: "Vanne injoignable" })
      : Promise.resolve({ context: { id: "x" } }),
  }));
  const bouton = trouver(el, '[data-action="zone-pulse"]');
  assert.ok(bouton, "bouton « 5 min » introuvable");
  const differes = [];
  const vraiMinuteur = window.setTimeout;
  window.setTimeout = (fn, ms) => { differes.push({ fn, ms }); return 0; };
  try { bouton.click(); } finally { window.setTimeout = vraiMinuteur; }
  const arret = differes.find((d) => d.ms === 5 * 60 * 1000);
  assert.ok(arret, "aucun arrêt programmé à 5 min");
  el.remove();
  assert.equal(el.isConnected, false);
  arret.fn();
  await laisserPasser();
  assert.deepEqual(appels.map((a) => `${a[0]}.${a[1]}`), ["switch.turn_on", "switch.turn_off"]);
  assert.equal(toasts.length, 1, "le toast s'est perdu avec la carte détachée");
  assert.match(toasts[0].message, /Zone A/);
  assert.match(toasts[0].message, /Vanne injoignable/);
});

test("une erreur traduite par Home Assistant s'affiche dans la langue de l'interface", async () => {
  const refus = {
    code: "not_found", message: "Action gazon_intelligent.reset_mode not found.",
    translation_domain: "homeassistant", translation_key: "service_not_found",
    translation_placeholders: { domain: "gazon_intelligent", service: "reset_mode" },
  };
  const hass = hassAvec([], { repondre: () => Promise.reject(refus) });
  const demandes = [];
  hass.loadBackendTranslation = async (categorie, domaine) => {
    demandes.push(`${categorie}/${domaine}`);
    return (cle, v) => (cle === "component.homeassistant.exceptions.service_not_found.message"
      ? `L'action ${v.domain}.${v.service} est introuvable.` : "");
  };
  const { el, toasts } = carte(hass);
  lancerEnFenetre(el, "reset_mode");
  await laisserPasser();
  assert.deepEqual(demandes, ["exceptions/homeassistant"]);
  assert.equal(toasts.length, 1);
  assert.match(toasts[0].message, /L'action gazon_intelligent\.reset_mode est introuvable\./);
  assert.doesNotMatch(toasts[0].message, /not found/);
});

test("une socket déjà fermée au clic (rejet avec le nombre 3) se dit « connexion perdue »", async () => {
  const { el, toasts } = carte(hassAvec([], { repondre: () => Promise.reject(3) }));
  const ok = await el._call("gazon_intelligent", "stop_irrigation", { entity_id: E.objectif }, "Arrêter");
  assert.equal(ok, false);
  assert.equal(toasts.length, 1);
  assert.match(toasts[0].message, /connexion perdue/);
});

test("une socket fermée pendant l'appel (erreur imbriquée) donne son message", async () => {
  const { el, toasts } = carte(hassAvec([], {
    repondre: () => Promise.reject({ type: "result", success: false, error: { code: 3, message: "Connection lost" } }),
  }));
  const ok = await el._call("gazon_intelligent", "stop_irrigation", { entity_id: E.objectif }, "Arrêter");
  assert.equal(ok, false);
  assert.equal(toasts.length, 1);
  assert.match(toasts[0].message, /Connection lost/);
});

test("défensif : une exception immédiate de callService s'affiche aussi", async () => {
  // Le `callService` de HA est asynchrone et ne lance pas ; un `hass` de remplacement le pourrait.
  const appels = [];
  const { el, toasts } = carte(hassAvec(appels, {
    repondre: () => { throw new Error("hass incomplet"); },
  }));
  lancerEnFenetre(el, "reset_mode");
  await laisserPasser();
  assert.equal(toasts.length, 1, "l'exception a été avalée");
  assert.match(toasts[0].message, /Revenir au mode Normal/);
  assert.match(toasts[0].message, /hass incomplet/);
  assert.equal(el.shadowRoot.querySelector('[data-action="svc-run"]'), null,
    "l'exception a interrompu le clic : la fenêtre est restée ouverte");
});

test("sans libellé, le toast nomme l'entité — et son cadre suit une interface anglaise", async () => {
  const appels = [];
  const { el, toasts } = carte(hassAvec(appels, {
    langue: "en",
    repondre: () => Promise.reject({ code: "home_assistant_error", message: "Switch unavailable" }),
  }));
  const bascule = trouver(el, `[data-action="toggle"][data-entity="${E.auto}"]`);
  assert.ok(bascule, "bascule d'arrosage automatique introuvable");
  bascule.click();
  await laisserPasser();
  assert.deepEqual(appels.map((a) => `${a[0]}.${a[1]}`), ["switch.toggle"]);
  assert.equal(toasts.length, 1);
  assert.match(toasts[0].message, /Arrosage automatique/);
  assert.match(toasts[0].message, /failed/);
  assert.match(toasts[0].message, /Switch unavailable/);
});

test("un appel réussi ne produit ni toast ni vibration, et rend vrai", async () => {
  const appels = [];
  const { el, toasts, vibrations } = carte(hassAvec(appels));
  const ok = await el._call("gazon_intelligent", "reset_mode", { entity_id: E.phase });
  assert.equal(ok, true);
  assert.equal(appels.length, 1);
  await laisserPasser();
  assert.equal(toasts.length, 0);
  assert.equal(vibrations.length, 0);
});

// ── LE CONTRAT RECOPIÉ EST-IL LE BON ? ────────────────────────────────────────
// Seulement quand le dépôt de l'intégration est présent à côté (poste de Kévin) : la CI n'a que
// la carte, et le test y est SAUTÉ — visiblement, pas vert en silence. Le contrat suit
// l'intégration installée (0.91.0) : confronté à une version plus ancienne, il doit échouer.
const DOSSIER_INTEGRATION = process.env.GAZON_INTEGRATION_DIR
  || resolve(here, "..", "..", "Gazon Intelligent", "custom_components", "gazon_intelligent");

const sansCommentaires = (py) => py.replace(/#.*$/gm, "");

// Lecture volontairement étroite, calée sur la forme de `_async_register_services`. Tout ce qui
// n'est pas reconnu remonte et fait échouer le test : validateur inconnu (type « inconnu »),
// clé qui n'est pas une chaîne littérale, validateur de cible qui n'accepte plus une chaîne.
function lireSchemas(initPy, constPy) {
  const source = sansCommentaires(initPy);
  const constantes = Object.fromEntries(
    [...source.matchAll(/^(SERVICE_[A-Z0-9_]+)\s*=\s*"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
  const enums = Object.fromEntries(
    [...sansCommentaires(constPy).matchAll(/^([A-Z0-9_]+)\s*=\s*\(([^)]*)\)/gm)]
      .map((m) => [m[1], [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1])]));
  // Le corps d'une fonction de module : ses lignes indentées, jusqu'à la première qui ne l'est pas.
  const corpsDe = (nom) => {
    const debut = source.indexOf(`\ndef ${nom}(`);
    assert.ok(debut >= 0, `\`${nom}\` introuvable dans __init__.py`);
    const [, ...suite] = source.slice(debut + 1).split("\n");
    const fin = suite.findIndex((l) => l.trim() && !/^\s/.test(l));
    return suite.slice(0, fin < 0 ? undefined : fin).join("\n");
  };
  // La cible : chaque clé passe par `_target_selector_value`, dont une variante HORS liste doit
  // accepter une chaîne — c'est ce que la carte envoie.
  const blocCibles = /_SERVICE_TARGET_FIELD\s*=\s*\{([\s\S]*?)\n\}/.exec(source);
  const entreesCibles = blocCibles
    ? [...blocCibles[1].matchAll(/vol\.\w+\(\s*"([^"]+)"\s*\)\s*:\s*([^,\n]+)/g)] : [];
  const selecteur = corpsDe("_target_selector_value").replace(/\[[^\]]*\]/g, "[]");
  const schemas = {};
  for (const bloc of corpsDe("_async_register_services").split("_register_service_if_missing(").slice(1)) {
    const service = constantes[(/^\s*hass,\s*(SERVICE_[A-Z0-9_]+)\s*,/.exec(bloc) || [])[1]];
    if (!service) continue;
    const cles = [...bloc.matchAll(/vol\.(Required|Optional)\(\s*([^,)]+?)\s*[,)]/g)];
    const champs = {};
    const nonLitterales = [];
    cles.forEach((m, i) => {
      const litterale = /^"([^"]+)"$/.exec(m[2]);
      if (!litterale) { nonLitterales.push(m[2]); return; }
      const v = bloc.slice(m.index + m[0].length, i + 1 < cles.length ? cles[i + 1].index : bloc.length);
      const enumeration = /vol\.In\((\w+)\)/.exec(v);
      const bornes = /vol\.Range\(\s*min=(-?[\d.]+)\s*,\s*max=(-?[\d.]+)\s*\)/.exec(v);
      const regle = { requis: m[1] === "Required" };
      if (enumeration) Object.assign(regle, { type: "choix", valeurs: enums[enumeration[1]] });
      else if (/vol\.Coerce\(float\)/.test(v)) regle.type = "nombre";
      else if (/_BOOLEAN_VALIDATOR|cv\.boolean/.test(v)) regle.type = "booleen";
      else if (/^[^:]*:\s*(?:str|vol\.Coerce\(str\))\s*,/.test(v)) regle.type = "texte";
      else regle.type = "inconnu";
      if (regle.type === "nombre" && bornes) Object.assign(regle, { min: +bornes[1], max: +bornes[2] });
      champs[litterale[1]] = regle;
    });
    schemas[service] = {
      cible: /\*\*_SERVICE_TARGET_FIELD|dict\(_SERVICE_TARGET_FIELD\)/.test(bloc), champs, nonLitterales,
    };
  }
  return {
    schemas,
    cibles: entreesCibles.map((m) => m[1]),
    ciblesParSelecteur: entreesCibles.length > 0
      && entreesCibles.every((m) => m[2].trim() === "_target_selector_value()"),
    cibleAccepteTexte: /vol\.Coerce\(str\)|cv\.string|\bstr\b/.test(selecteur),
  };
}

// Lecture ligne à ligne, limitée aux formes présentes dans services.yaml (pas de dépendance YAML).
function lireServicesYaml(texte) {
  const out = {};
  let service = null, dansChamps = false, champ = null, dansNombre = false, dansOptions = false;
  for (const ligne of texte.split("\n")) {
    let m;
    if ((m = /^([a-z0-9_]+):\s*$/.exec(ligne))) {
      service = m[1]; out[service] = { cible: false, champs: {} };
      dansChamps = false; champ = null; continue;
    }
    if (!service) continue;
    if (/^ {2}target:\s*$/.test(ligne)) { out[service].cible = true; dansChamps = false; continue; }
    if (/^ {2}fields:\s*$/.test(ligne)) { dansChamps = true; continue; }
    if (/^ {2}\S/.test(ligne)) { dansChamps = false; continue; }
    if (!dansChamps) continue;
    if ((m = /^ {4}(\S+):\s*$/.exec(ligne))) {
      champ = out[service].champs[m[1]] = { requis: false, type: "inconnu" };
      dansNombre = false; dansOptions = false; continue;
    }
    if (!champ) continue;
    if ((m = /^ {6}required:\s*(true|false)\s*$/.exec(ligne))) champ.requis = m[1] === "true";
    else if (/^ {8}number:\s*$/.test(ligne)) { champ.type = "nombre"; dansNombre = true; }
    else if (/^ {8}boolean:\s*(\{\})?\s*$/.test(ligne)) champ.type = "booleen";
    else if (/^ {8}select:\s*$/.test(ligne)) Object.assign(champ, { type: "choix", valeurs: [] });
    else if (/^ {8}(text|entity):/.test(ligne)) champ.type = "texte";
    else if (dansNombre && (m = /^ {10}(min|max):\s*(-?[\d.]+)\s*$/.exec(ligne))) champ[m[1]] = +m[2];
    else if (/^ {10}options:\s*$/.test(ligne)) dansOptions = true;
    else if (dansOptions && (m = /^ {12}- (.+?)\s*$/.exec(ligne))) champ.valeurs.push(m[1]);
  }
  return out;
}

// Forme comparable d'une liste de champs, cibles exclues (`date` n'est qu'une `str` pour le schéma).
function formes(champs) {
  return Object.fromEntries(Object.entries(champs)
    .filter(([cle]) => !CIBLES.includes(cle))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cle, r]) => [cle, {
      type: r.type === "date" ? "texte" : r.type,
      requis: Boolean(r.requis),
      ...(r.type === "nombre" ? { min: r.min, max: r.max } : {}),
      ...(r.type === "choix" ? { valeurs: [...(r.valeurs || [])] } : {}),
    }]));
}

test("le contrat recopié est celui de l'intégration (dépôt voisin)", (t) => {
  const init = join(DOSSIER_INTEGRATION, "__init__.py");
  if (!existsSync(init)) {
    t.skip(`intégration absente (${DOSSIER_INTEGRATION}) : contrat NON confronté`);
    return;
  }
  const lu = lireSchemas(readFileSync(init, "utf-8"),
    readFileSync(join(DOSSIER_INTEGRATION, "const.py"), "utf-8"));
  const yaml = lireServicesYaml(readFileSync(join(DOSSIER_INTEGRATION, "services.yaml"), "utf-8"));
  assert.deepEqual(lu.cibles, CIBLES, "les champs de cible de l'intégration ont changé");
  assert.ok(lu.ciblesParSelecteur, "une clé de cible ne passe plus par `_target_selector_value`");
  assert.ok(lu.cibleAccepteTexte, "`_target_selector_value` n'accepte plus une cible en chaîne");
  for (const [service, champs] of Object.entries(CONTRAT)) {
    const s = lu.schemas[service];
    assert.ok(s, `${service} : schéma introuvable dans __init__.py`);
    assert.ok(s.cible, `${service} : le schéma n'accepte plus de cible`);
    assert.deepEqual(s.nonLitterales, [], `${service} : clé non littérale, illisible pour ce test`);
    assert.deepEqual(formes(s.champs), formes(champs), `${service} : le schéma voluptuous diffère du contrat`);
    const y = yaml[service];
    assert.ok(y, `${service} : absent de services.yaml`);
    assert.ok(y.cible || "entity_id" in y.champs, `${service} : services.yaml ne propose aucune cible`);
    assert.deepEqual(formes(y.champs), formes(champs), `${service} : services.yaml diffère du contrat`);
  }
});
