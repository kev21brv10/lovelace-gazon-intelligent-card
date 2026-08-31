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
