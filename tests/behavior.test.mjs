// Tests COMPORTEMENTAUX (vs les tests de contrat en Python qui ne lisent que le
// source) : on instancie réellement la carte dans un DOM jsdom, on la rend, et on
// vérifie le routage des clics. C'est ce qui aurait attrapé les bugs « clic =
// météo » et « défilement onglet cassé » que les tests texte avaient laissés passer.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { JSDOM } from "jsdom";

const here = dirname(fileURLToPath(import.meta.url));
const BUNDLE = readFileSync(join(here, "..", "gazon-intelligent-card.js"), "utf-8");
const CARD_TAG = "gazon-intelligent-card";

function setupWindow() {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", {
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const { window } = dom;
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb) => window.setTimeout(() => cb(Date.now()), 0);
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  }
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      media: "",
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    });
  }
  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  // Le bundle s'auto-enregistre (customElements.define) et logge sa bannière de version.
  window.eval(BUNDLE);
  return window;
}

const HASS = {
  states: {
    "sensor.gazon_intelligent_assistant": {
      entity_id: "sensor.gazon_intelligent_assistant",
      state: "tonte",
      attributes: { action: "tonte", status: "blocked", reason: "Robot indisponible" },
    },
    "weather.forecast_home": {
      entity_id: "weather.forecast_home",
      state: "sunny",
      attributes: { temperature: 30, friendly_name: "Météo" },
    },
  },
  callService() {},
  locale: { language: "fr" },
};

function makeCard(hass = HASS) {
  const window = setupWindow();
  const el = window.document.createElement(CARD_TAG);
  window.document.body.appendChild(el);
  el.setConfig({ type: `custom:${CARD_TAG}` });
  if (hass) {
    el.hass = hass;
  }
  return { window, el };
}

test("le rendu réel ne jette pas et produit un shadowRoot", () => {
  const { el } = makeCard();
  assert.ok(el.shadowRoot, "shadowRoot présent");
  assert.ok(el.shadowRoot.innerHTML.length > 0, "contenu rendu");
});

test("repli d'action carte = entité assistant, jamais la météo", () => {
  const { el } = makeCard();
  const fallback = el._defaultActionEntityId();
  assert.equal(fallback, "sensor.gazon_intelligent_assistant");
  assert.doesNotMatch(String(fallback), /^weather\./, "ne doit jamais retomber sur weather.*");
});

test("le fond de carte n'ouvre RIEN par défaut (pas d'action globale)", () => {
  const { el } = makeCard();
  assert.equal((el._config.tap_action || {}).action, "none", "tap_action par défaut = none");
  let fired = false;
  el.addEventListener("hass-action", () => {
    fired = true;
  });
  el._performConfiguredAction("tap_action", el._defaultActionEntityId());
  assert.equal(fired, false, "aucune action globale n'est dispatchée sur le fond");
});

test("la scène (synthèse) est cliquable et ouvre la fiche de son entité", () => {
  const { el } = makeCard();
  const scene = el.shadowRoot.querySelector(".gz-scene[data-more-info-entity]");
  assert.ok(scene, "scène cliquable rendue");
  assert.equal(scene.getAttribute("data-more-info-entity"), "sensor.gazon_intelligent_assistant");
  assert.ok(scene.classList.contains("gz-scene--clickable"));
  let info = null;
  el.addEventListener("hass-more-info", (ev) => {
    info = ev.detail;
  });
  scene.click();
  assert.equal(info && info.entityId, "sensor.gazon_intelligent_assistant", "clic scène → more-info de l'entité");
});

test("le rendu expose la nav gz2 et plus l'ancienne .tab-nav / .section-nav", () => {
  const { el } = makeCard();
  const root = el.shadowRoot;
  assert.ok(root.querySelector(".gz2-nav"), ".gz2-nav rendue");
  assert.equal(root.querySelector(".tab-nav"), null, "ancienne .tab-nav absente du DOM");
  assert.equal(root.querySelector(".section-nav"), null, "ancienne .section-nav absente du DOM");
});

test("_scrollTabNavIntoView vise la nav réelle sans jeter", () => {
  const { el } = makeCard();
  assert.doesNotThrow(() => el._scrollTabNavIntoView());
});

test("cliquer un onglet change l'onglet actif", () => {
  const { el } = makeCard();
  const root = el.shadowRoot;
  const tabBtn = root.querySelector('.gz2-nav__item[data-tab]:not(.gz2-nav__item--active)');
  assert.ok(tabBtn, "un onglet inactif est présent");
  const targetTab = tabBtn.dataset.tab;
  tabBtn.click();
  assert.equal(el._activeTab, targetTab, "l'onglet cliqué devient actif");
});
