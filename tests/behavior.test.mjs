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

test("un état qui change reconstruit bien le DOM", () => {
  const { el } = makeCard();
  const avant = el.shadowRoot.getElementById("gi-card").firstElementChild;
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].state = "arrosage";
  copie.states["sensor.gazon_intelligent_assistant"].attributes.action = "arrosage";
  el.hass = copie;
  const apres = el.shadowRoot.getElementById("gi-card").firstElementChild;
  assert.notEqual(avant, apres, "un vrai changement doit redessiner");
});

test("le défilement des onglets survit à un vrai re-rendu", () => {
  const { el } = makeCard();
  const barre = el.shadowRoot.querySelector(".tabs");
  assert.ok(barre, "barre d'onglets présente");
  barre.scrollLeft = 120;           // l'utilisateur a fait défiler
  const copie = JSON.parse(JSON.stringify(el._hass));
  copie.states["sensor.gazon_intelligent_assistant"].state = "arrosage";
  copie.states["sensor.gazon_intelligent_assistant"].attributes.action = "arrosage";
  el.hass = copie;
  const apresBarre = el.shadowRoot.querySelector(".tabs");
  // ⚠️ Sans cette assertion, le test passait sur un élément JAMAIS remplacé : il ne prouvait
  // rien, et la mutation qui supprime la restauration y survivait.
  assert.notEqual(apresBarre, barre, "le re-rendu n'a pas eu lieu, le test ne prouve rien");
  assert.equal(apresBarre.scrollLeft, 120, "la position de défilement a été perdue");
});
