// Tests comportementaux : on instancie la carte dans un DOM jsdom,
// on la rend, et on vérifie la navigation par onglets et le rendu de base.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { JSDOM } from "jsdom";

const here   = dirname(fileURLToPath(import.meta.url));
const BUNDLE = readFileSync(join(here, "..", "gazon-intelligent-card.js"), "utf-8");
const CARD_TAG = "gazon-intelligent-card";

function setupWindow() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", {
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const { window } = dom;
  window.requestAnimationFrame  ??= (cb) => window.setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame   ??= (id) => window.clearTimeout(id);
  window.matchMedia             ??= () => ({
    matches: false, media: "",
    addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  });
  window.ResizeObserver ??= class {
    observe() {} unobserve() {} disconnect() {}
  };
  window.eval(BUNDLE);
  return window;
}

const HASS = {
  states: {
    "sensor.gazon_intelligent_assistant": {
      entity_id: "sensor.gazon_intelligent_assistant",
      state: "tonte",
      attributes: { action: "tonte", status: "blocked", reason: "Nuit: attendre le lever du soleil." },
    },
    "weather.forecast_home": {
      entity_id: "weather.forecast_home",
      state: "sunny",
      attributes: { temperature: 20, friendly_name: "Météo" },
    },
  },
  callService() {},
  locale: { language: "fr" },
};

function makeCard(hass = HASS) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, entity_assistant: "sensor.gazon_intelligent_assistant" });
  if (hass) el.hass = hass;
  return { window, el };
}

// ── Structure de base ────────────────────────────────────────────────────────

test("le rendu réel ne jette pas et produit un shadowRoot", () => {
  const { el } = makeCard();
  assert.ok(el.shadowRoot, "shadowRoot présent");
  assert.ok(el.shadowRoot.innerHTML.length > 0, "contenu rendu");
});

test("la carte rend 6 onglets", () => {
  const { el } = makeCard();
  const tabs = el.shadowRoot.querySelectorAll(".tab[data-tab]");
  assert.equal(tabs.length, 6, "6 onglets présents");
});

test("l'onglet initial est Synthèse", () => {
  const { el } = makeCard();
  assert.equal(el._tab, "synthese", "_tab initial = synthese");
  const active = el.shadowRoot.querySelector(".tab.active");
  assert.ok(active, "un onglet a la classe active");
  assert.equal(active.dataset.tab, "synthese", "l'onglet actif est synthese");
});

// ── Navigation ────────────────────────────────────────────────────────────────

test("cliquer un onglet change l'onglet actif", () => {
  const { el } = makeCard();
  const root = el.shadowRoot;
  const other = root.querySelector(".tab[data-tab]:not(.active)");
  assert.ok(other, "un onglet inactif est présent");
  const target = other.dataset.tab;
  other.click();
  assert.equal(el._tab, target, `_tab = ${target} après clic`);
  const nowActive = root.querySelector(".tab.active");
  assert.equal(nowActive && nowActive.dataset.tab, target, "le bon onglet a la classe active");
});

test("tous les onglets attendus sont présents", () => {
  const { el } = makeCard();
  const tabs = [...el.shadowRoot.querySelectorAll(".tab[data-tab]")].map(t => t.dataset.tab);
  for (const key of ["synthese", "arrosage", "tonte", "gazon", "produits", "reglages"]) {
    assert.ok(tabs.includes(key), `onglet ${key} présent`);
  }
});

// ── Synthèse ─────────────────────────────────────────────────────────────────

test("l'onglet Synthèse rend un hero", () => {
  const { el } = makeCard();
  const hero = el.shadowRoot.querySelector(".hero");
  assert.ok(hero, ".hero présent dans la Synthèse");
  assert.ok(hero.textContent.length > 0, "hero a du contenu");
});

test("le hero porte un titre capitalisé", () => {
  const { el } = makeCard();
  const title = el.shadowRoot.querySelector(".hero-title");
  assert.ok(title, ".hero-title présent");
  const text = title.textContent.trim();
  assert.ok(text.length > 0, "hero-title non vide");
  assert.equal(text[0], text[0].toUpperCase(), "premier caractère capitalisé");
});

test("le rendu n'utilise pas les anciennes classes de navigation", () => {
  const { el } = makeCard();
  const root = el.shadowRoot;
  assert.equal(root.querySelector(".gz2-nav"),    null, ".gz2-nav absent");
  assert.equal(root.querySelector(".tab-nav"),    null, ".tab-nav absent");
  assert.equal(root.querySelector(".section-nav"), null, ".section-nav absent");
});

// ── Défilement des onglets sur téléphone ──────────────────────────────────────
// ⚠️ `set hass` est appelé à CHAQUE changement d'état de Home Assistant, plusieurs fois par
// seconde. Reconstruire le DOM à l'identique détruisait la barre d'onglets, qui défile
// horizontalement sur mobile : son `scrollLeft` repartait à zéro et l'inertie du doigt était
// tuée en plein geste. Signalé le 26/08/2026 : « elle revient sans cesse au début ».

test("un hass identique ne reconstruit pas le DOM", () => {
  const { el, window } = makeCard();
  const avant = el.shadowRoot.getElementById("gi-card").firstElementChild;
  el.hass = el._hass;               // même état : rien de neuf à afficher
  const apres = el.shadowRoot.getElementById("gi-card").firstElementChild;
  assert.equal(avant, apres, "le DOM a été reconstruit alors que rien n'a changé");
  assert.ok(window, "fenêtre disponible");
});

test("un état qui change redessine le contenu", () => {
  const { el } = makeCard();
  // ⚠️ Ce test exigeait autrefois que TOUT le DOM soit reconstruit (`firstElementChild`
  // différent). Il décrivait le défaut, pas l'objectif : le rendu ne remplace plus que les
  // blocs qui ont changé, et l'en-tête ne bouge pas ici. Ce qui compte, c'est que le contenu
  // suive l'état — pas que la carte entière clignote.
  const contenu = el.shadowRoot.querySelector(".content");
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].state = "arrosage";
  copie.states["sensor.gazon_intelligent_assistant"].attributes.action = "arrosage";
  el.hass = copie;
  assert.notEqual(el.shadowRoot.querySelector(".content"), contenu,
    "un vrai changement doit redessiner le contenu");
});

test("le défilement des onglets survit à un vrai re-rendu", () => {
  const { el } = makeCard();
  const barre = el.shadowRoot.querySelector(".tabs");
  barre.scrollLeft = 120;           // l'utilisateur a fait défiler
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].state = "arrosage";
  copie.states["sensor.gazon_intelligent_assistant"].attributes.action = "arrosage";
  el.hass = copie;
  // ⚠️ La garantie est plus forte qu'une restauration : la barre n'est pas recréée du tout,
  // donc ni sa position ni le geste en cours ne peuvent être perdus. Une version précédente
  // de ce test exigeait au contraire qu'elle SOIT recréée — elle décrivait l'ancien correctif,
  // celui qui ne marchait qu'à moitié.
  const apresBarre = el.shadowRoot.querySelector(".tabs");
  assert.equal(apresBarre, barre, "la barre a été recréée");
  assert.equal(apresBarre.scrollLeft, 120, "la position de défilement a été perdue");
});

test("la barre d'onglets n'est JAMAIS recréée", () => {
  const { el } = makeCard();
  const barre = el.shadowRoot.querySelector(".tabs");
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].state = "arrosage";
  copie.states["sensor.gazon_intelligent_assistant"].attributes.action = "arrosage";
  el.hass = copie;
  assert.equal(el.shadowRoot.querySelector(".tabs"), barre,
    "la barre a été recréée : le geste de défilement sera cassé sur mobile");
  // Le contenu, lui, doit bien avoir été redessiné.
  assert.ok(el.shadowRoot.querySelector(".content"), "contenu présent après rendu");
});

test("changer d'onglet met à jour la classe active sans recréer la barre", () => {
  const { el } = makeCard();
  const barre = el.shadowRoot.querySelector(".tabs");
  el.shadowRoot.querySelector('.tab[data-tab="tonte"]').click();
  assert.equal(el._tab, "tonte");
  assert.equal(el.shadowRoot.querySelector(".tabs"), barre, "barre préservée au changement d'onglet");
  assert.equal(el.shadowRoot.querySelector(".tab.active").dataset.tab, "tonte");
});

test("un clic ne déclenche qu'un seul rendu, même après plusieurs mises à jour", () => {
  const { el } = makeCard();
  for (let i = 0; i < 5; i++) {
    const c = JSON.parse(JSON.stringify(el._hass));
    c.states["sensor.gazon_intelligent_assistant"].attributes.reason = `raison ${i}`;
    el.hass = c;
  }
  let rendus = 0;
  const vrai = el._render.bind(el);
  el._render = () => { rendus++; return vrai(); };
  el.shadowRoot.querySelector('.tab[data-tab="gazon"]').click();
  assert.equal(rendus, 1, `écouteurs accumulés : ${rendus} rendus pour un seul clic`);
});

test("un changement de contenu ne remplace pas l'en-tête", () => {
  const { el } = makeCard();
  const entete = el.shadowRoot.querySelector(".header");
  const contenu = el.shadowRoot.querySelector(".content");
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].attributes.reason = "Herbe mouillée.";
  el.hass = copie;
  assert.equal(el.shadowRoot.querySelector(".header"), entete,
    "l'en-tête a été remplacé alors qu'il n'a pas changé");
  assert.notEqual(el.shadowRoot.querySelector(".content"), contenu,
    "le contenu aurait dû être redessiné");
});

test("un hass identique ne refait aucun travail de rendu", () => {
  const { el } = makeCard();
  let travail = 0;
  const vrai = el._bindEvents.bind(el);
  el._bindEvents = (c) => { travail++; return vrai(c); };
  el.hass = el._hass;               // même état : rien à redessiner
  assert.equal(travail, 0, "le rendu a travaillé alors que rien n'avait changé");
});

// ── Version affichée et accords ───────────────────────────────────────────────
// ⚠️ `GI_VERSION` est restée figée à 0.26.0 pendant les 0.26.1, 0.26.2 et 0.26.3, alors que
// son commentaire affirmait que le build la tenait à jour. Or l'onglet Réglages est
// précisément l'endroit où l'on vérifie quelle version le navigateur a chargée après avoir
// vidé son cache : une version qui ment y est pire que pas de version du tout.

test("la version affichée est celle de package.json", async () => {
  const pkg = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf-8"));
  assert.match(BUNDLE, new RegExp(`const GI_VERSION = '${pkg.version.replace(/\./g, "\\.")}';`),
    `le bundle n'annonce pas ${pkg.version} — le build n'injecte plus la version`);
});

test("la version annoncée apparaît dans l'onglet Réglages", () => {
  const pkg = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf-8"));
  const { el } = makeCard();
  el._tab = "reglages";
  el._render();
  assert.ok(el.shadowRoot.textContent.includes(`v${pkg.version}`),
    `Réglages n'affiche pas v${pkg.version}`);
});

test("une seule session ne s'écrit pas « 1 sessions »", () => {
  const { el } = makeCard();
  const un = el._t("session_n");
  const plusieurs = el._t("sessions_n");
  assert.notEqual(un, plusieurs, "le singulier et le pluriel sont identiques");
  assert.ok(BUNDLE.includes("sessCount > 1 ? 'sessions_n' : 'session_n'"),
    "le compteur de sessions n'accorde pas");
});

// ── Entités déduites ─────────────────────────────────────────────────────────
// Trois entités n'ont pas de défaut à elles : elles se déduisent d'une autre pour
// suivre le préfixe de l'instance. La déduction lisait `config.entity_…` — la valeur
// BRUTE — au lieu du défaut résolu : une carte qui ne déclarait pas la source les
// laissait à `undefined`, donc silencieusement muettes (hauteur du jour, catalogue,
// dernière application), alors que toutes les autres entités avaient un défaut.

test("les entités déduites tombent sur le défaut quand rien n'est déclaré", () => {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  el.setConfig({ type: `custom:${CARD_TAG}` });
  assert.equal(el._config.entity_hauteur_gazon_estimee,
    "sensor.gazon_intelligent_hauteur_gazon_estimee");
  assert.equal(el._config.entity_catalogue_produits,
    "sensor.gazon_intelligent_catalogue_produits");
  assert.equal(el._config.entity_derniere_application,
    "sensor.gazon_intelligent_derniere_application");
});

test("les entités déduites suivent le préfixe d'une seconde instance", () => {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  el.setConfig({
    type: `custom:${CARD_TAG}`,
    entity_hauteur_conseillee:     "sensor.gi_potager_hauteur_de_tonte_conseillee",
    entity_prochaine_intervention: "sensor.gi_potager_prochaine_intervention",
  });
  assert.equal(el._config.entity_hauteur_gazon_estimee,
    "sensor.gi_potager_hauteur_gazon_estimee");
  assert.equal(el._config.entity_catalogue_produits,
    "sensor.gi_potager_catalogue_produits");
  assert.equal(el._config.entity_derniere_application,
    "sensor.gi_potager_derniere_application");
});

test("une entité déduite déclarée explicitement gagne", () => {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  el.setConfig({
    type: `custom:${CARD_TAG}`,
    entity_prochaine_intervention: "sensor.gi_potager_prochaine_intervention",
    entity_derniere_application:   "sensor.choisi_a_la_main",
  });
  assert.equal(el._config.entity_derniere_application, "sensor.choisi_a_la_main");
});

// ── Écouteurs et rendus préservés ────────────────────────────────────────────
// Depuis que `_render` PRÉSERVE les blocs dont le HTML n'a pas changé, un élément d'action
// survit aux rendus. Sans garde, `_bindEvents` lui rajoutait un écouteur à CHAQUE rendu :
// un seul clic finissait par émettre autant d'appels de service que de rendus subis —
// autant de `switch.toggle`, d'arrosages manuels ou de déclarations de produit.
// `set hass` étant appelé plusieurs fois par seconde, l'addition est rapide.

function carteAvecActions() {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({
    type: `custom:${CARD_TAG}`,
    entity_assistant: "sensor.gazon_intelligent_assistant",
    entity_switch_arrosage_auto: "switch.gi_arrosage_auto",
    zones: [{ name: "Zone A", switch: "switch.gi_zone_1", debit: 14 }],
  });
  el._tab = "reglages";
  return { window, el };
}

test("un élément d'action préservé ne reçoit qu'UN seul écouteur", () => {
  const { el } = carteAvecActions();
  const appels = [];
  const hass = (raison) => ({
    ...HASS,
    states: {
      ...HASS.states,
      "switch.gi_arrosage_auto": {
        entity_id: "switch.gi_arrosage_auto", state: "on",
        attributes: { friendly_name: "Arrosage automatique" },
      },
      "switch.gi_zone_1": {
        entity_id: "switch.gi_zone_1", state: "off", attributes: { friendly_name: "Zone A" },
      },
      "sensor.gazon_intelligent_assistant": {
        entity_id: "sensor.gazon_intelligent_assistant",
        state: "tonte",
        attributes: { action: "tonte", status: "blocked", reason: raison },
      },
    },
    callService: (...args) => appels.push(args),
  });

  // Cinq rendus successifs. `_lastHtml = null` reproduit exactement ce qui se passe dès
  // qu'une partie QUELCONQUE de la carte change (l'heure courante suffit) : le rendu
  // repart, le diff préserve les blocs identiques — et `_bindEvents` repasse dessus.
  // Sans le garde, ce scénario produit SIX appels de service pour un seul clic.
  el.hass = hass("Nuit : attendre le lever du soleil.");
  for (let i = 0; i < 5; i++) { el._lastHtml = null; el._render(); }

  const cible = el.shadowRoot.querySelector('[data-action]');
  assert.ok(cible, "aucun élément [data-action] rendu — le test ne mordrait pas");
  const avant = appels.length;
  cible.click();
  const declenches = appels.length - avant;
  assert.equal(declenches, 1,
    `un clic a déclenché ${declenches} appels de service au lieu d'un : les écouteurs se sont accumulés sur 5 rendus`);
});

test("les variables CSS utilisées par la carte existent toutes", () => {
  // Trois propriétés (`--gi-line`, `--gi-card`, `--gi-ink`) étaient référencées sans jamais
  // être définies : le navigateur jette la déclaration, et le stepper retombait sur les
  // couleurs par défaut de l'agent — illisibles en thème sombre. Le repère de plancher du
  // budget, lui, devenait carrément transparent.
  const utilisees = new Set([...BUNDLE.matchAll(/var\((--gi-[a-z0-9-]+)/g)].map(m => m[1]));
  const definies  = new Set([...BUNDLE.matchAll(/^\s*(--gi-[a-z0-9-]+)\s*:/gm)].map(m => m[1]));
  const fantomes  = [...utilisees].filter(v => !definies.has(v));
  assert.deepEqual(fantomes, [], `variables utilisées mais jamais définies : ${fantomes.join(", ")}`);
});

test("« Semaine couverte » suit la décision de l'intégration, pas le seul plancher", () => {
  // Franchir `weekly_guardrail_mm_min` ne suffit PAS à retenir l'arrosage : la retenue est
  // conditionnelle (trois arrosages, le plancher franchi ET un besoin faible). La carte
  // annonçait « ⏸ Semaine couverte · reprise dès que le besoin remonte » sur le seul montant,
  // pendant que le hero du même écran, lui, ne montrait aucun blocage. Un fait, deux sources.
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({
    type: `custom:${CARD_TAG}`,
    entity_reserve: "sensor.gi_reserve",
    entity_fenetre_optimale: "sensor.gi_fenetre",
    entity_prochain_arrosage: "sensor.gi_prochain",
    zones: [{ name: "Zone A", switch: "switch.gi_z1", debit: 14 }],
  });

  const etat = (blockReason) => ({
    ...HASS,
    states: {
      ...HASS.states,
      "sensor.gi_reserve": {
        entity_id: "sensor.gi_reserve", state: "8",
        // 22,1 mm consommés : au-dessus du plancher (21), sous le plafond (31,6).
        attributes: { arrosage_recent_7j: 22.1, arrosage_applique_7j: 22.1 },
      },
      "sensor.gi_fenetre": {
        entity_id: "sensor.gi_fenetre", state: "ideal",
        attributes: { weekly_guardrail_mm_min: 21, weekly_guardrail_mm_max: 31.6 },
      },
      "sensor.gi_prochain": {
        entity_id: "sensor.gi_prochain", state: "2026-08-30T06:00:00+02:00",
        attributes: { block_reason: blockReason },
      },
      "switch.gi_z1": {
        entity_id: "switch.gi_z1", state: "off", attributes: { friendly_name: "Zone A" },
      },
    },
  });

  el._tab = "arrosage";
  el.hass = etat("");                        // l'intégration ne bloque PAS
  el._lastHtml = null; el._render();
  assert.ok(!el.shadowRoot.querySelector(".budget-held"),
    "« Semaine couverte » affiché alors que l'intégration n'annonce aucun garde-fou");

  el.hass = etat("garde_fou_hebdomadaire");  // l'intégration bloque
  el._lastHtml = null; el._render();
  assert.ok(el.shadowRoot.querySelector(".budget-held"),
    "« Semaine couverte » absent alors que l'intégration annonce le garde-fou");
});

// ── Travail de tonte ─────────────────────────────────────────────────────────
// L'intégration publiait la progression, l'état de la déclaration et le bilan de la
// journée ; la carte n'en lisait AUCUN. On venait donc y chercher « est-ce qu'elle a
// fini ? » sans pouvoir le savoir.

// ⚠️ LE TRAVAIL EST PUBLIÉ SUR `sensor.…_etat_de_tonte`, PAS sur le binaire
// `tonte_autorisee`. Une première version de ces tests posait les attributs sur le binaire :
// ils passaient tous, et le bloc restait invisible en production. Le montage part donc
// maintenant du capteur réel, et un test vérifie explicitement que l'autre ne suffit pas.
const ETAT_TONTE = "sensor.gazon_intelligent_etat_de_tonte";
const TONTE_AUTORISEE = "binary_sensor.gazon_intelligent_tonte_autorisee";

function carteTonte(extra = {}, { surLeBinaire = false } = {}) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
  const cible = surLeBinaire ? TONTE_AUTORISEE : ETAT_TONTE;
  el.hass = {
    ...HASS,
    states: {
      ...HASS.states,
      [TONTE_AUTORISEE]: {
        entity_id: TONTE_AUTORISEE, state: "off",
        attributes: { tonte_statut: "a_surveiller", ...(surLeBinaire ? extra : {}) },
      },
      [ETAT_TONTE]: {
        entity_id: ETAT_TONTE, state: "a_surveiller",
        attributes: surLeBinaire ? {} : { ...extra },
      },
    },
  };
  el._tab = "tonte";
  el._lastHtml = null;
  el._render();
  return el;
}

test("le travail est lu sur le capteur d'état de tonte, pas sur le binaire", () => {
  // Le défaut vécu : attributs cherchés sur `tonte_autorisee`, bloc invisible en production.
  // Le garde d'absence masquait proprement — donc rien ne signalait l'erreur.
  const attrs = { mower_job_progress_pct: 55, mower_auto_declaration_state: "travail_en_cours" };
  assert.ok(carteTonte(attrs).shadowRoot.querySelector(".travail"),
    "le bloc ne lit pas sensor.…_etat_de_tonte");
  assert.equal(carteTonte(attrs, { surLeBinaire: true }).shadowRoot.querySelector(".travail"), null,
    "le bloc lit le binaire tonte_autorisee — ce n'est pas là que l'intégration publie");
});

test("le travail de tonte affiche sa progression et son état", () => {
  const el = carteTonte({
    mower_job_progress_pct: 55,
    mower_job_completion_state: "en_cours",
    mower_auto_declaration_state: "travail_en_cours",
    mower_mowing_minutes_today: 107.6,
    mower_pass_count_today: 2,
  });
  const bloc = el.shadowRoot.querySelector(".travail");
  assert.ok(bloc, "le bloc « travail de tonte » ne s'affiche pas");
  const txt = bloc.textContent.replace(/\s+/g, " ");
  assert.match(txt, /55 %/, "la progression n'apparaît pas");
  // ⚠️ En HEURES : un travail complet dure 4 à 5 h, « 108 min » demandait une conversion
  // mentale à chaque lecture. 107,6 min → « 1 h 48 ».
  assert.match(txt, /1 h 48/, "la durée du jour n'est pas affichée en heures");
  assert.ok(!/108 min/.test(txt), "la durée est encore affichée en minutes brutes");
  assert.match(txt, /2 passes/, "le nombre de passes n'apparaît pas");
  assert.match(el.shadowRoot.querySelector(".travail-bar").getAttribute("style"), /width:55%/);
});

test("les durées de tonte sont affichées en heures", () => {
  const el = carteTonte({
    mower_job_progress_pct: 55,
    mower_mowing_minutes_today: 107.6,
    mower_full_pass_minutes_median: 86.2,
  });
  const txt = el.shadowRoot.querySelector(".travail").textContent.replace(/\s+/g, " ");
  assert.match(txt, /1 h 48/, "107,6 min doit s'écrire 1 h 48");
  assert.match(txt, /1 h 26/, "la médiane 86,2 min doit s'écrire 1 h 26");
});

test("zéro minute tondue est une MESURE, pas une valeur absente", () => {
  // Revue Codex sur la PR #44 : `fmtDuration` rend « — » à zéro — c'est sa convention de
  // valeur manquante, juste pour la durée d'arrosage. Mais le compteur du jour vaut
  // légitimement 0 tous les matins avant la première sortie, et le bloc s'affiche quand
  // même (la progression existe). « Tondu aujourd'hui — » disait donc « je ne sais pas »
  // alors que l'intégration avait répondu « zéro ».
  const txt = carteTonte({ mower_job_progress_pct: 100, mower_mowing_minutes_today: 0 })
    .shadowRoot.querySelector(".travail").textContent.replace(/\s+/g, " ");
  assert.match(txt, /Tondu aujourd.hui 0 min/,
    "un zéro mesuré s'affiche comme une valeur absente");
});

test("l'absence de mesure reste une absence : rien ne s'affiche", () => {
  // L'autre sens du même garde — la tondeuse injoignable ne doit pas devenir « 0 min ».
  const txt = carteTonte({ mower_job_progress_pct: 100, mower_mowing_minutes_today: null })
    .shadowRoot.querySelector(".travail").textContent.replace(/\s+/g, " ");
  assert.ok(!/Tondu aujourd.hui/.test(txt),
    "une mesure absente est présentée comme un zéro tondu");
});

test("sous l'heure, la durée reste en minutes", () => {
  // Une sortie avortée de 12 min ne doit pas devenir « 0 h 12 ».
  const el = carteTonte({ mower_job_progress_pct: 5, mower_mowing_minutes_today: 12 });
  const txt = el.shadowRoot.querySelector(".travail").textContent.replace(/\s+/g, " ");
  assert.match(txt, /12 min/);
  assert.ok(!/0 h/.test(txt), "une durée sous l'heure s'affiche avec un « 0 h » inutile");
});

test("la déclaration n'est verte QUE si une tonte a été inscrite", () => {
  // ⚠️ 107,6 min dépassent l'ancien seuil de 90 : c'est précisément le cas où l'ancienne
  // règle déclarait à 49 % de travail. Le vert ne doit pas revenir par la bande.
  const enCours = carteTonte({
    mower_job_progress_pct: 55,
    mower_auto_declaration_state: "travail_en_cours",
    mower_mowing_minutes_today: 107.6,
  });
  assert.ok(!enCours.shadowRoot.querySelector(".travail-decl.ok"),
    "« travail inachevé » est affiché comme une réussite");

  const inscrite = carteTonte({
    mower_job_progress_pct: 100,
    mower_job_completion_state: "termine",
    mower_auto_declaration_state: "declaree",
  });
  assert.ok(inscrite.shadowRoot.querySelector(".travail-decl.ok"),
    "une tonte réellement inscrite n'est pas signalée comme telle");
});

test("sans aucune mesure, le bloc ne s'affiche pas du tout", () => {
  // `null` = tondeuse injoignable. Mieux vaut rien qu'une rangée de tirets qui ressemble
  // à des zéros mesurés — c'est la règle « absence ≠ zéro » de tout le projet.
  const el = carteTonte({
    mower_job_progress_pct: null,
    mower_job_completion_state: null,
    mower_auto_declaration_state: null,
    mower_mowing_minutes_today: null,
  });
  assert.equal(el.shadowRoot.querySelector(".travail"), null,
    "un bloc vide s'affiche alors qu'aucune valeur n'est mesurée");
});

test("une seule passe ne s'écrit pas « 1 passes »", () => {
  const el = carteTonte({ mower_job_progress_pct: 20, mower_mowing_minutes_today: 40, mower_pass_count_today: 1 });
  const txt = el.shadowRoot.querySelector(".travail").textContent.replace(/\s+/g, " ");
  assert.match(txt, /1 passe(?! s)/);
  assert.ok(!/1 passes/.test(txt), "le compteur de passes ne s'accorde pas");
});

// ── Hauteur de coupe : la lame réelle fait référence ──────────────────────────
// `hauteur_tonte_recommandee_cm` est ce que l'intégration CONSEILLE de régler sur la lame
// (« ne pas descendre sous X cm »), pas une hauteur que l'herbe doit atteindre. La carte
// l'affichait en « hauteur cible » puis annonçait qu'il restait au gazon 0,5 cm « à pousser »
// pour l'atteindre. Et comme la lame de Kévin coupe SOUS la recommandation (5,5 vs 6,0),
// l'herbe repartant de 5,5 après chaque tonte, la phrase se réaffichait indéfiniment : une
// cible inatteignable par construction. Arbitré le 30/08/2026 — la lame réelle fait foi.

function carteHauteur({ coupeMm = 55, reco = "6.0", herbe = "5.5" } = {}) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
  el.hass = {
    ...HASS,
    states: {
      ...HASS.states,
      [ETAT_TONTE]: {
        entity_id: ETAT_TONTE, state: "a_surveiller",
        attributes: { tondeuse_hauteur_coupe_mm: coupeMm },
      },
      "sensor.gazon_intelligent_hauteur_de_tonte_conseillee": {
        entity_id: "sensor.gazon_intelligent_hauteur_de_tonte_conseillee", state: reco,
        attributes: { hauteur_tonte_min_cm: 3, hauteur_tonte_max_cm: 6 },
      },
      "sensor.gazon_intelligent_hauteur_gazon_estimee": {
        entity_id: "sensor.gazon_intelligent_hauteur_gazon_estimee", state: herbe,
        attributes: { gazon_pousse_jour_cm: 0.24 },
      },
    },
  };
  el._tab = "tonte";
  el._lastHtml = null;
  el._render();
  return el;
}

test("la hauteur affichée est celle réglée sur la lame, pas la recommandation", () => {
  const el = carteHauteur({ coupeMm: 55, reco: "6.0" });
  const tuile = [...el.shadowRoot.querySelectorAll(".stat-card")]
    .find(x => /hauteur/i.test(x.textContent));
  const txt = tuile.textContent.replace(/\s+/g, " ");
  assert.match(txt, /5,5 cm/, "la hauteur réelle de la lame n'est pas la valeur affichée");
  assert.match(txt, /recommandé 6,0 cm/, "la recommandation n'est pas signalée comme telle");
});

test("le gazon à la hauteur de coupe ne « doit » plus pousser pour atteindre une cible", () => {
  // Le cas exact de l'écran de Kévin : herbe 5,5 · lame 5,5 · recommandation 6,0.
  const el = carteHauteur({ coupeMm: 55, reco: "6.0", herbe: "5.5" });
  const txt = el.shadowRoot.querySelector(".pousse").textContent.replace(/\s+/g, " ");
  assert.ok(!/à pousser/.test(txt),
    "la carte demande encore au gazon de pousser pour atteindre un réglage de lame");
  assert.match(txt, /pile à la hauteur de coupe/);
});

test("sous la lame, la carte ne dit pas que le gazon est « pile » à la hauteur", () => {
  // Revue Codex sur la PR #44 : le commentaire du code annonçait « trois cas, et non deux »
  // au-dessus d'un ternaire qui n'en implémentait que DEUX. `aCouper` vaut 0 aussi bien
  // quand l'herbe est À la lame que quand elle est DESSOUS — le cas vécu dès que Kévin
  // remonte la lame de 5,5 à 6,0 : l'herbe repart de 5,5 et la carte annonçait « pile ».
  const el = carteHauteur({ coupeMm: 60, reco: "6.0", herbe: "5.5" });
  const txt = el.shadowRoot.querySelector(".pousse").textContent.replace(/\s+/g, " ");
  assert.ok(!/pile à la hauteur de coupe/.test(txt),
    "un gazon SOUS la lame est annoncé « pile à la hauteur de coupe »");
  assert.match(txt, /0,5 cm sous la lame/, "l'écart sous la lame n'est pas dit");
  assert.match(txt, /6,0 cm/, "la hauteur de lame n'est pas rappelée");
  // ⚠️ Le mot ne doit pas suggérer que l'herbe DOIT rejoindre un objectif : la lame est un
  // réglage, pas une cible de pousse. C'est tout le sens de l'arbitrage du 30/08/2026.
  assert.ok(!/à pousser|atteindre/.test(txt),
    "la carte redemande au gazon de pousser vers un réglage de lame");
});

test("l'égalité stricte reste « pile », elle ne bascule pas dans le cas « sous »", () => {
  const txt = carteHauteur({ coupeMm: 55, reco: "6.0", herbe: "5.5" })
    .shadowRoot.querySelector(".pousse").textContent.replace(/\s+/g, " ");
  assert.match(txt, /pile à la hauteur de coupe/);
  assert.ok(!/sous la lame/.test(txt), "l'égalité est comptée comme « sous la lame »");
});

test("au-dessus de la lame, la carte dit combien il y a à couper", () => {
  const el = carteHauteur({ coupeMm: 55, herbe: "7.0" });
  const txt = el.shadowRoot.querySelector(".pousse").textContent.replace(/\s+/g, " ");
  assert.match(txt, /1,5 cm à couper/, "la hauteur à couper n'est pas calculée sur la lame réelle");
  assert.match(txt, /5,5 cm/, "elle ne ramène pas à la hauteur de coupe réelle");
});

test("lame et recommandation identiques : pas de mention redondante", () => {
  const el = carteHauteur({ coupeMm: 60, reco: "6.0" });
  const tuile = [...el.shadowRoot.querySelectorAll(".stat-card")]
    .find(x => /hauteur/i.test(x.textContent));
  assert.ok(!/recommandé/.test(tuile.textContent),
    "la recommandation est répétée alors qu'elle est identique au réglage");
});

// ── Les boutons durs à cliquer (10/09/2026) ──────────────────────────────────
//
// ⚠️ CE QUE CES DEUX TESTS PROTÈGENT. Kévin : « certains boutons de la carte ont du mal à
// s'actionner au clic ». Cause mécanique : un `click` n'est émis QUE si l'appui et le
// relâchement tombent sur le même élément. Tous les boutons d'un onglet vivent dans le seul
// bloc `.content`, que `_render` remplace dès que son HTML change — et la frise d'arrosage
// positionnait ses barres en pourcentage d'une fenêtre ancrée sur `Date.now()`, à deux
// décimales : 0,01 % de 24 h = 8,64 s. Le bloc, donc tous ses boutons, était détruit et
// reconstruit toutes les 8,6 secondes sans qu'aucun état ne bouge.

function cardArrosage() {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({
    type: `custom:${CARD_TAG}`,
    entity_assistant: "sensor.gazon_intelligent_assistant",
    zones: [{ name: "Zone 1", switch: "switch.zone1" }],
  });
  el.hass = {
    ...HASS,
    states: { ...HASS.states,
              "switch.zone1": { entity_id: "switch.zone1", state: "off", attributes: {} } },
  };
  // ⚠️ AVANT tout rendu de l'onglet : `_timeline` déclenche sinon une récupération
  // d'historique asynchrone qui écrase le fixture entre l'appel et l'assertion.
  el._historyTs = Date.now();
  el._tab = "arrosage";
  return { window, el };
}

// ⚠️ PAS DE TEST SUR L'ANCRAGE DE LA FRISE, ET C'EST DÉLIBÉRÉ. Le cas est établi par
// l'arithmétique du code — `leftPct.toFixed(2)` sur une fenêtre de 24 h ancrée sur
// `Date.now()` : 0,01 % = 8,64 s, donc la chaîne change toutes les 8,6 s pour une session
// passée figée. Mais reproduire une barre FIDÈLE dans jsdom demande un historique de vannes
// que `_fetchHistory` écrase, et le fixture bricolé rendait une barre time-invariante : le
// test passait à vide, dans les deux sens. Un test qui ne mord pas est pire que pas de test
// (leçon du projet). L'ancrage à la minute est conservé comme réduction de travail inutile ;
// le correctif qui traite VRAIMENT le symptôme est le suivant, et lui est testé.

test("aucun bloc n'est remplacé tant qu'un doigt est posé", () => {
  const { window, el } = makeCard();          // onglet Synthèse : il affiche l'assistant
  const card = el.shadowRoot.getElementById("gi-card");
  const avant = card.querySelector(".content");
  assert.ok(avant, "prémisse : le bloc .content doit exister");

  const nouvelEtat = {
    ...HASS,
    states: { ...HASS.states,
      "sensor.gazon_intelligent_assistant": {
        entity_id: "sensor.gazon_intelligent_assistant",
        state: "arrosage",
        attributes: { action: "arrosage", status: "action_required",
                      reason: "Arrosage requis ce matin." },
      } },
  };

  // Le doigt se pose, PUIS l'état change : le rendu doit attendre.
  card.dispatchEvent(new window.Event("pointerdown", { bubbles: true }));
  el.hass = nouvelEtat;
  assert.equal(card.querySelector(".content"), avant,
    "le bloc a été remplacé sous le doigt : le clic n'émettra aucun événement");
  assert.equal(el._renduDiffere, true, "le rendu n'a pas été mémorisé pour plus tard");

  // ⚠️ LE DOIGT SE LÈVE — ET LE RENDU NE DOIT TOUJOURS PAS PARTIR. `click` est émis APRÈS
  // `pointerup`, dans la même salve : remplacer le bloc ici supprimerait le clic, exactement
  // le défaut qu'on corrige. Le premier jet de ce correctif rendait en synchrone et ne
  // marchait donc QUE si aucune mise à jour n'était arrivée pendant l'appui — le seul cas qui
  // n'avait besoin de rien.
  window.document.dispatchEvent(new window.Event("pointerup", { bubbles: true }));
  assert.equal(card.querySelector(".content"), avant,
    "le bloc est remplacé entre pointerup et click : le clic est supprimé");

  // ⚠️ VÉRIFIÉ AU BANC AVEC DE VRAIS CLICS SOURIS, le 10/09/2026 : le navigateur n'émet pas
  // toujours `pointerup` et `click` dans la MÊME tâche. Différer d'une seule tâche après le
  // pointerup ne suffit donc pas — le rendu s'intercalait entre les deux et le clic n'existait
  // pas. C'est le `click` qui libère ; le pointerup ne pose qu'un filet de 150 ms.
  return new Promise(resolve => setTimeout(() => {
    assert.equal(card.querySelector(".content"), avant,
      "le rendu part entre pointerup et click : c'est le défaut, pas le correctif");
    card.dispatchEvent(new window.Event("click", { bubbles: true }));
    setTimeout(() => {
      assert.notEqual(card.querySelector(".content"), avant,
        "le rendu différé n'a jamais été rejoué : la carte reste figée");
      window.close();
      resolve();
    }, 60);
  }, 30));   // 30 + 60 restent SOUS le filet de 150 ms : c'est bien le clic qu'on teste
});

test("sans clic, un filet libère quand même le rendu", () => {
  const { window, el } = makeCard();
  const card = el.shadowRoot.getElementById("gi-card");
  const avant = card.querySelector(".content");

  card.dispatchEvent(new window.Event("pointerdown", { bubbles: true }));
  el.hass = {
    ...HASS,
    states: { ...HASS.states,
      "sensor.gazon_intelligent_assistant": {
        entity_id: "sensor.gazon_intelligent_assistant", state: "arrosage",
        attributes: { action: "arrosage", status: "action_required", reason: "Filet." } } },
  };
  // Glissement : le doigt se lève ailleurs, aucun `click` ne suivra jamais. Sans filet, la
  // carte resterait figée pour de bon — bien pire que le défaut corrigé.
  window.document.dispatchEvent(new window.Event("pointerup", { bubbles: true }));
  return new Promise(resolve => setTimeout(() => {
    assert.notEqual(card.querySelector(".content"), avant,
      "aucun clic n'est venu et le filet n'a pas libéré : la carte est figée");
    window.close();
    resolve();
  }, 250));
});

// ─── 0.29.0 — les cinq états de tonte et le motif de la hauteur conseillée ─────────────────
// Copie littérale de POSSIBLE_TONTE_STATUT_VALUES (intégration, decision_models.py) : la table de la
// carte ne couvrait que 2 des 5 valeurs réelles, les 3 autres tombaient dans le repli sans accents.
const STATUTS_TONTE = ["autorisee", "autorisee_avec_precaution", "a_surveiller", "deconseillee", "interdite"];

function carteStatut(statut, langue = "fr") {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
  el.hass = {
    ...HASS,
    locale: { language: langue },
    states: {
      ...HASS.states,
      [TONTE_AUTORISEE]: { entity_id: TONTE_AUTORISEE, state: "off", attributes: { tonte_statut: statut } },
    },
  };
  el._tab = "tonte";
  el._lastHtml = null;
  el._render();
  return el;
}

function pastilleTonte(el, prefixe) {
  return [...el.shadowRoot.querySelectorAll(".chip")].find((c) => c.textContent.trim().startsWith(prefixe));
}

test("les cinq états de tonte ont leur libellé exact, accents compris", () => {
  const attendus = ["Autorisée", "Autorisée avec précaution", "À surveiller", "Déconseillée", "Interdite"];
  STATUTS_TONTE.forEach((statut, i) => {
    const chip = pastilleTonte(carteStatut(statut), "Tonte :");
    assert.ok(chip, `pas de pastille Tonte pour ${statut}`);
    assert.equal(chip.textContent.trim(), `Tonte : ${attendus[i]}`);
  });
});

test("en anglais, plus un mot de français dans la pastille de tonte", () => {
  // `_t` retombe SILENCIEUSEMENT sur le français quand une clé anglaise manque : ce test est le seul
  // à voir « Interdite » affiché sur une interface anglaise.
  const attendus = ["Allowed", "Allowed with caution", "Monitor", "Not recommended", "Forbidden"];
  STATUTS_TONTE.forEach((statut, i) => {
    const chip = pastilleTonte(carteStatut(statut, "en"), "Mowing :");
    assert.ok(chip, `pas de pastille Mowing pour ${statut}`);
    assert.equal(chip.textContent.trim(), `Mowing : ${attendus[i]}`);
  });
});

test("couleur : même convention que la pastille Créneau, sans clignotement vert/gris", () => {
  const couleur = (statut) => pastilleTonte(carteStatut(statut), "Tonte :").querySelector(".chip-dot").style.background;
  // autorisé = accent ; à éviter = orange ; bloqué = gris.
  assert.equal(couleur("autorisee"), "var(--gi-accent)");
  assert.equal(couleur("autorisee_avec_precaution"), couleur("autorisee"), "une tonte autorisée ne se grise pas");
  assert.equal(couleur("a_surveiller"), "var(--gi-warn)");
  assert.equal(couleur("deconseillee"), couleur("a_surveiller"));
  assert.equal(couleur("interdite"), "var(--gi-muted)");
});

test("un état inconnu reste présentable : sans tiret bas, point gris", () => {
  const chip = pastilleTonte(carteStatut("nouvel_etat"), "Tonte :");
  assert.equal(chip.textContent.trim(), "Tonte : Nouvel etat");
  assert.equal(chip.querySelector(".chip-dot").style.background, "var(--gi-muted)");
});

function carteMotif({ coupeMm = 40, reco = "4.0", motif, garde, onglet = "tonte" } = {}) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
  const attrs = { hauteur_tonte_min_cm: 3, hauteur_tonte_max_cm: 6 };
  if (motif !== undefined) attrs.hauteur_tonte_motif = motif;
  if (garde !== undefined) attrs.hauteur_tonte_garde_fou_label = garde;
  el.hass = {
    ...HASS,
    states: {
      ...HASS.states,
      [ETAT_TONTE]: { entity_id: ETAT_TONTE, state: "a_surveiller", attributes: { tondeuse_hauteur_coupe_mm: coupeMm } },
      "sensor.gazon_intelligent_hauteur_de_tonte_conseillee": {
        entity_id: "sensor.gazon_intelligent_hauteur_de_tonte_conseillee", state: reco, attributes: attrs,
      },
      "sensor.gazon_intelligent_hauteur_gazon_estimee": {
        entity_id: "sensor.gazon_intelligent_hauteur_gazon_estimee", state: "5.5", attributes: { gazon_pousse_jour_cm: 0.24 },
      },
    },
  };
  el._tab = onglet;
  el._lastHtml = null;
  el._render();
  return el;
}

function tuileHauteur(el) {
  return [...el.shadowRoot.querySelectorAll(".stat-card")].find((t) => /Hauteur de coupe/.test(t.textContent));
}

test("le motif de la hauteur conseillée s'affiche dans la tuile Hauteur", () => {
  const motif = "Septembre : base 4,0 cm (hauteur de pousse).";
  const note = tuileHauteur(carteMotif({ motif })).querySelector(".mow-motif");
  assert.ok(note, "le motif n'est pas affiché");
  assert.equal(note.textContent, motif);
});

test("le motif suit « recommandé X cm » et précède les bornes Min/Max", () => {
  const tuile = tuileHauteur(carteMotif({ coupeMm: 55, reco: "6.0", motif: "Juillet : base 5,0 cm, forte chaleur (34,0 °C) +1,0." }));
  const enfants = [...tuile.children];
  const iReco = enfants.findIndex((e) => /recommandé 6,0 cm/.test(e.textContent));
  const iMotif = enfants.findIndex((e) => e.classList.contains("mow-motif"));
  const iBornes = enfants.findIndex((e) => /^Min /.test(e.textContent.trim()));
  assert.ok(iReco >= 0 && iMotif > iReco && iBornes > iMotif, `ordre : reco ${iReco}, motif ${iMotif}, bornes ${iBornes}`);
});

test("sans motif (intégration plus ancienne), rien de nouveau ni de vide", () => {
  for (const motif of [undefined, "", "   "]) {
    const tuile = tuileHauteur(carteMotif({ motif }));
    assert.equal(tuile.querySelector(".mow-motif"), null, `note rendue pour ${JSON.stringify(motif)}`);
    assert.equal(tuile.querySelector(".stat-note"), null);
  }
});

test("le motif est échappé", () => {
  const tuile = tuileHauteur(carteMotif({ motif: "<b>x</b>" }));
  assert.equal(tuile.querySelector("b"), null);
  assert.equal(tuile.querySelector(".mow-motif").textContent, "<b>x</b>");
});

test("le motif n'explique pas la jauge de pousse (sa cible est la lame)", () => {
  const el = carteMotif({ motif: "Septembre : base 4,0 cm (hauteur de pousse)." });
  const jauge = el.shadowRoot.querySelector(".pousse");
  assert.ok(jauge, "prémisse : la jauge de pousse est rendue");
  assert.ok(!/Septembre/.test(jauge.textContent), "motif rattaché à la jauge");
});

test("motif et garde-fou coexistent : le pourquoi d'abord, puis les chiffres du tiers", () => {
  const tuile = tuileHauteur(carteMotif({
    motif: "Septembre : base 4,0 cm (hauteur de pousse) ; relevée par la règle du tiers.",
    garde: "Règle du tiers : gazon à 7 cm → ne pas descendre sous 4.7 cm.",
  }));
  const notes = [...tuile.querySelectorAll(".stat-note")].map((n) => n.textContent);
  assert.equal(notes.length, 2);
  assert.match(notes[0], /^Septembre/);
  assert.match(notes[1], /^Règle du tiers/);
});

test("onglet Gazon : la tuile Hauteur porte le motif en infobulle, et rien sans motif", () => {
  const motif = "Septembre : base 4,0 cm (hauteur de pousse).";
  const tuileGazon = (el) => [...el.shadowRoot.querySelectorAll(".stat-card")].find((t) => /Hauteur tonte/.test(t.textContent));
  const avec = tuileGazon(carteMotif({ motif, onglet: "gazon" }));
  assert.ok(avec, "tuile Hauteur tonte introuvable dans l'onglet Gazon");
  assert.equal(avec.getAttribute("title"), motif);
  const sans = tuileGazon(carteMotif({ onglet: "gazon" }));
  assert.equal(sans.hasAttribute("title"), false);
});

test("lame inconnue : le motif s'affiche sous la valeur, qui EST alors la recommandation", () => {
  const motif = "Octobre : base 4,0 cm ; semis en stabilisation (J+40) : plancher 5,0 cm.";
  const tuile = tuileHauteur(carteMotif({ coupeMm: null, reco: "5.0", motif }));
  assert.match(tuile.querySelector(".stat-value").textContent, /5,0 cm/);
  assert.equal(tuile.querySelector(".mow-motif")?.textContent, motif);
});

test("onglet Gazon : l'infobulle est échappée, aucun attribut injecté", () => {
  const motif = 'a" onmouseover="x <b>';
  const el = carteMotif({ motif, onglet: "gazon" });
  const tuile = [...el.shadowRoot.querySelectorAll(".stat-card")].find((t) => /Hauteur tonte/.test(t.textContent));
  assert.equal(tuile.getAttribute("title"), motif);
  assert.equal(tuile.hasAttribute("onmouseover"), false);
  assert.equal(tuile.querySelector("b"), null);
});

test("un motif qui n'est pas une chaîne n'affiche rien (ni « [object Object] »)", () => {
  for (const motif of [{}, ["a", "b"], 5, true]) {
    const el = carteMotif({ motif });
    assert.equal(tuileHauteur(el).querySelector(".mow-motif"), null, `rendu pour ${JSON.stringify(motif)}`);
    assert.ok(!/object Object/.test(el.shadowRoot.innerHTML));
  }
  const gazon = carteMotif({ motif: {}, onglet: "gazon" });
  const tuile = [...gazon.shadowRoot.querySelectorAll(".stat-card")].find((t) => /Hauteur tonte/.test(t.textContent));
  assert.equal(tuile.hasAttribute("title"), false);
});

test("la date par défaut des formulaires est la date LOCALE, pas la date UTC", () => {
  // À 00:30 à Paris (UTC+2 l'été), `toISOString()` donnait la VEILLE.
  const tzAvant = process.env.TZ;
  process.env.TZ = "Europe/Paris";
  try {
    const window = setupWindow();
    const minuitTrente = new window.Date(2026, 8, 12, 0, 30);
    assert.equal(window.jourLocalIso(minuitTrente), "2026-09-12");
    assert.equal(window.jourLocalIso(new window.Date(2026, 8, 12, 23, 59)), "2026-09-12");
  } finally {
    if (tzAvant === undefined) delete process.env.TZ; else process.env.TZ = tzAvant;
  }
});

test("le formulaire « Déclarer un produit » propose la date LOCALE à 00:30", () => {
  // Le test précédent ne vérifie que la fonction : on peut revenir à `toISOString()` sur un site
  // sans le voir. Ici l'horloge du DOM est figée AVANT le chargement de la carte, puis on rend
  // le vrai formulaire (contre-revue du 11/09/2026).
  const tzAvant = process.env.TZ;
  process.env.TZ = "Europe/Paris";
  try {
    const dom = new JSDOM("<!DOCTYPE html><body></body>", { runScripts: "outside-only", pretendToBeVisual: true });
    const { window } = dom;
    window.requestAnimationFrame ??= (cb) => window.setTimeout(() => cb(0), 0);
    window.matchMedia ??= () => ({ matches: false, media: "", addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    window.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
    window.eval(`(() => {
      const R = Date; const T = new R(2026, 8, 12, 0, 30).getTime();
      class D extends R { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } }
      globalThis.Date = D;
    })()`);
    window.eval(BUNDLE);
    const el = window.document.createElement(CARD_TAG);
    window.document.body.appendChild(el);
    el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
    el._declareOpen = true;  // ouvert AVANT le premier rendu (déclenché par l'affectation de hass)
    el.hass = {
      ...HASS,
      states: {
        ...HASS.states,
        // Le champ date n'est rendu que si le catalogue contient au moins un produit.
        "sensor.gazon_intelligent_catalogue_produits": {
          entity_id: "sensor.gazon_intelligent_catalogue_produits", state: "1",
          attributes: { products_summary: [{ id: "floranid", nom: "Floranid", type: "Fertilisation" }] },
        },
      },
    };
    el._lastHtml = null;
    el._render();
    const champ = el.shadowRoot.querySelector("#gi-decl-date");
    assert.ok(champ, "formulaire non rendu");
    assert.equal(champ.getAttribute("value"), "2026-09-12");
    assert.equal(champ.getAttribute("max"), "2026-09-12");
  } finally {
    if (tzAvant === undefined) delete process.env.TZ; else process.env.TZ = tzAvant;
  }
});

test("« J'ai tondu » n'est plus proposé le jour d'une tonte enregistrée", () => {
  // L'attribut `derniere_tonte_date` (intégration 0.88.0) n'était publié par personne : le bouton
  // restait proposé en permanence depuis la 0.21.2.
  const aujourdhui = (() => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); })();
  const avec = carteTonte({ derniere_tonte_date: aujourdhui }, { surLeBinaire: true });
  assert.ok(!/J'ai tondu/.test(avec.shadowRoot.textContent), "bouton proposé après une tonte du jour");
  const hier = carteTonte({ derniere_tonte_date: "2000-01-01" }, { surLeBinaire: true });
  assert.ok(/J'ai tondu/.test(hier.shadowRoot.textContent));
});

// ── Heure du prochain lancement (intégration 0.90.0) ─────────────────────────
// L'arrosage du matin ne part plus à l'ouverture de la fenêtre (03:45) : il part pour finir
// 15 min avant le lever du soleil. Kévin veut voir L'HEURE du lancement, pas la fenêtre.

function carteProchainArrosage(attrs, onglet) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
  el._historyTs = Date.now();  // pas de récupération d'historique asynchrone pendant le test
  el.hass = {
    ...HASS,
    states: {
      ...HASS.states,
      "sensor.gazon_intelligent_prochain_arrosage": {
        entity_id: "sensor.gazon_intelligent_prochain_arrosage", state: "16/09/2026",
        attributes: { objective_mm: 5.3, watering_window_display: "03:45–10:00", ...attrs },
      },
      "switch.z1": { entity_id: "switch.z1", state: "off", attributes: {} },
    },
  };
  el._tab = onglet;
  el._lastHtml = null;
  el._render();
  return el;
}

function demainA(hhmm) {
  const d = new Date(Date.now() + 86400000);
  const jour = new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  return `${jour}T${hhmm}:00`;
}

function tuileProchainArrosage(el) {
  return [...el.shadowRoot.querySelectorAll(".stat-card")]
    .find(c => c.querySelector(".stat-label")?.textContent.trim() === "Prochain arrosage");
}

test("la tuile « Prochain arrosage » donne l'heure du lancement, pas la fenêtre", () => {
  const el = carteProchainArrosage(
    { departure_time: "06:15", end_time: "07:19", target_datetime: demainA("06:15") }, "synthese");
  const tuile = tuileProchainArrosage(el);
  assert.ok(tuile, "tuile introuvable");
  assert.equal(tuile.querySelector(".stat-value").textContent.trim(), "06:15 → 07:19");
  const sous = tuile.querySelector(".stat-sub").textContent;
  assert.match(sous, /5,3 mm/);
  assert.match(sous, /Demain/);
});

test("sans heure de lancement publiée, la tuile garde la fenêtre", () => {
  const el = carteProchainArrosage({}, "synthese");
  assert.equal(tuileProchainArrosage(el).querySelector(".stat-value").textContent.trim(), "03:45–10:00");
});

test("une heure de lancement illisible est ignorée", () => {
  for (const departure_time of ["6h15", "", 615, { h: 6 }]) {
    const el = carteProchainArrosage({ departure_time, end_time: "07:19" }, "synthese");
    assert.equal(tuileProchainArrosage(el).querySelector(".stat-value").textContent.trim(), "03:45–10:00",
      `heure acceptée à tort : ${JSON.stringify(departure_time)}`);
  }
});

test("l'onglet Arrosage annonce le départ et la fin, la fenêtre garde son libellé", () => {
  const el = carteProchainArrosage(
    { departure_time: "06:15", end_time: "07:19", target_datetime: demainA("06:15") }, "arrosage");
  const ligne = el.shadowRoot.querySelector(".gi-launch");
  assert.ok(ligne, "ligne de lancement absente");
  assert.equal(ligne.textContent.trim(), "Demain · départ 06:15 · fin vers 07:19");
  const badge = [...el.shadowRoot.querySelectorAll(".hero-badge")].map(b => b.textContent.trim());
  assert.ok(badge.includes("Fenêtre : 03:45–10:00"), `badge inattendu : ${badge}`);
  // Et sans départ calé, rien de neuf : pas de ligne, la plage reste nue comme avant.
  const sans = carteProchainArrosage({}, "arrosage");
  assert.equal(sans.shadowRoot.querySelector(".gi-launch"), null);
  assert.ok([...sans.shadowRoot.querySelectorAll(".hero-badge")].some(b => b.textContent.trim() === "03:45–10:00"));
});

test("le soir d'un changement d'heure, le départ de demain s'affiche « Demain »", () => {
  // Le 25/10/2026 dure 25 h : « demain » comparé en millisecondes (86 400 000) ne tombait plus
  // juste, et la ligne de lancement affichait « lun. 26 oct. » au lieu de « Demain ».
  const tzAvant = process.env.TZ;
  process.env.TZ = "Europe/Paris";
  try {
    for (const [soir, demain] of [["2026, 9, 25, 20, 0", "2026-10-26"], ["2027, 2, 28, 20, 0", "2027-03-29"]]) {
      const dom = new JSDOM("<!DOCTYPE html><body></body>", { runScripts: "outside-only", pretendToBeVisual: true });
      const { window } = dom;
      window.requestAnimationFrame ??= (cb) => window.setTimeout(() => cb(0), 0);
      window.matchMedia ??= () => ({ matches: false, media: "", addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
      window.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
      window.eval(`(() => {
        const R = Date; const T = new R(${soir}).getTime();
        class D extends R { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } }
        globalThis.Date = D;
      })()`);
      window.eval(BUNDLE);
      const el = window.document.createElement(CARD_TAG);
      window.document.body.appendChild(el);
      el.setConfig({ type: `custom:${CARD_TAG}`, zones: [{ name: "Z", switch: "switch.z1", debit: 14 }] });
      el._historyTs = Date.now();
      el.hass = {
        ...HASS,
        states: {
          ...HASS.states,
          "sensor.gazon_intelligent_prochain_arrosage": {
            entity_id: "sensor.gazon_intelligent_prochain_arrosage", state: demain,
            attributes: { objective_mm: 5.3, watering_window_display: "03:45–10:00",
                          departure_time: "06:15", end_time: "07:19", target_datetime: `${demain}T06:15:00` },
          },
          "switch.z1": { entity_id: "switch.z1", state: "off", attributes: {} },
        },
      };
      el._tab = "arrosage";
      el._lastHtml = null;
      el._render();
      const ligne = el.shadowRoot.querySelector(".gi-launch");
      assert.ok(ligne, `ligne de lancement absente (${demain})`);
      assert.equal(ligne.textContent.trim(), "Demain · départ 06:15 · fin vers 07:19", `soir du ${soir}`);
      window.close();
    }
  } finally {
    if (tzAvant === undefined) delete process.env.TZ; else process.env.TZ = tzAvant;
  }
});
