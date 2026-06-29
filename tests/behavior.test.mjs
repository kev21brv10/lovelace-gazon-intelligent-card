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
