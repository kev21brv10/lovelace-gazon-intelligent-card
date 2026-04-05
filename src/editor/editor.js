import { CARD_TYPE, DEFAULT_CONFIG, ENTITY_KEYS, createStubConfig } from "../constants.js";
import {
  domainMatches,
  escapeHtml,
  mergeConfig,
  normalizeConfig,
} from "../utils/formatters.js";
import { EDITOR_STYLES } from "../styles/editor-styles.js";

const ENTITY_FIELD_DOMAINS = {
  entity_weather: ["weather"],
  ...Object.fromEntries(
    ENTITY_KEYS.map((field) => [field.key, field.domain || null]),
  ),
};

const ACTION_OPTIONS = [
  { value: "none", label: "Aucune action" },
  { value: "more-info", label: "More-info" },
  { value: "toggle", label: "Basculer" },
  { value: "perform-action", label: "Exécuter une action" },
  { value: "navigate", label: "Naviguer" },
  { value: "url", label: "Ouvrir une URL" },
  { value: "assist", label: "Assist" },
];

export class GazonIntelligentCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._handleInput = this._handleInput.bind(this);
  }

  setConfig(config) {
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config || {}));
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  getStubConfig() {
    return createStubConfig();
  }

  _entityOptions(domainFilter = null) {
    return Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  }

  _getConfigValue(key) {
    return String(key || "")
      .split(".")
      .filter(Boolean)
      .reduce((value, segment) => value?.[segment], this._config);
  }

  _cloneBranch(value) {
    if (Array.isArray(value)) {
      return [...value];
    }
    if (value && typeof value === "object") {
      return { ...value };
    }
    return {};
  }

  _pruneEmptyObjects(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === "object") {
      const next = {};
      Object.entries(value).forEach(([key, child]) => {
        const prunedChild = this._pruneEmptyObjects(child);
        if (prunedChild !== undefined) {
          next[key] = prunedChild;
        }
      });
      return Object.keys(next).length ? next : undefined;
    }
    return value === undefined ? undefined : value;
  }

  _setConfigValue(config, key, value) {
    const path = String(key || "").split(".").filter(Boolean);
    if (!path.length) {
      return config;
    }
    const next = { ...config };
    let cursor = next;
    let sourceCursor = config;
    for (let index = 0; index < path.length - 1; index += 1) {
      const segment = path[index];
      const sourceValue = sourceCursor?.[segment];
      cursor[segment] = this._cloneBranch(sourceValue);
      cursor = cursor[segment];
      sourceCursor = sourceValue;
    }
    const leaf = path[path.length - 1];
    if (value === undefined) {
      delete cursor[leaf];
    } else {
      cursor[leaf] = value;
    }
    return this._pruneEmptyObjects(next) || {};
  }

  _handleInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const key = target.dataset.configKey;
    if (!key || !this._config) {
      return;
    }

    let value;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    const shouldDelete = value === "" && !["title"].includes(key);
    const next = this._setConfigValue(this._config, key, shouldDelete ? undefined : value);
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, next));
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _bindInputs() {
    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._getConfigValue(field));
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderTextInput(field, label, placeholder = "") {
    const value = this._getConfigValue(field) ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
      </label>
    `;
  }

  _renderNumberInput(field, label, min = 0) {
    const value = this._getConfigValue(field);
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="number"
          min="${escapeHtml(String(min))}"
          step="1"
          value="${escapeHtml(value ?? "")}"
        />
      </label>
    `;
  }

  _renderSelect(field, label, options) {
    const value = String(this._getConfigValue(field) ?? "");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <select data-config-key="${escapeHtml(field)}">
          ${options
            .map(
              (option) => `
                <option value="${escapeHtml(option.value)}" ${option.value === value ? "selected" : ""}>
                  ${escapeHtml(option.label)}
                </option>
              `,
            )
            .join("")}
        </select>
      </label>
    `;
  }

  _renderEntityInput(field, label, placeholder = "sensor.gazon_intelligent_...", domainFilter = undefined, hint = "") {
    const value = this._getConfigValue(field) ?? "";
    const domains = domainFilter === undefined ? ENTITY_FIELD_DOMAINS[field] || null : domainFilter;
    const listId = `gazon-intelligent-card-entities-${field.replaceAll(".", "-")}`;
    const options = this._entityOptions(domains)
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${escapeHtml(listId)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
        <datalist id="${escapeHtml(listId)}">${options}</datalist>
        ${hint ? `<small class="hint">${escapeHtml(hint)}</small>` : ""}
      </label>
    `;
  }

  _renderActionEditor(actionKey, title) {
    const actionType = String(this._getConfigValue(`${actionKey}.action`) || DEFAULT_CONFIG[actionKey]?.action || "none");
    const rows = [
      this._renderSelect(`${actionKey}.action`, title, ACTION_OPTIONS),
      this._renderEntityInput(`${actionKey}.entity`, "Entité", "sensor.exemple", null),
    ];

    if (actionType === "perform-action") {
      rows.push(this._renderTextInput(`${actionKey}.perform_action`, "Action Home Assistant", "light.turn_on"));
    }
    if (actionType === "navigate") {
      rows.push(this._renderTextInput(`${actionKey}.navigation_path`, "Chemin de navigation", "/lovelace/gazon"));
    }
    if (actionType === "url") {
      rows.push(this._renderTextInput(`${actionKey}.url_path`, "URL", "https://www.home-assistant.io"));
    }
    if (actionType === "assist") {
      rows.push(this._renderTextInput(`${actionKey}.pipeline_id`, "Pipeline Assist", "preferred"));
      rows.push(this._renderCheckbox(`${actionKey}.start_listening`, "Démarrer l'écoute"));
    }

    return `
      <div class="section section--sub">
        <h3>${escapeHtml(title)}</h3>
        <div class="grid">
          ${rows.join("")}
        </div>
      </div>
    `;
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    if (!this._config) {
      this.shadowRoot.innerHTML = `<div class="editor empty">Chargement de l'éditeur…</div>`;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
${EDITOR_STYLES}
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            ${this._renderTextInput("title", "Titre", "Gazon Intelligent")}
            ${this._renderSelect("background_style", "Mode de fond", [
              { value: "solid", label: "solid" },
              { value: "glass", label: "glass" },
              { value: "minimal", label: "minimal" },
            ])}
            ${this._renderTextInput("accent_color", "Couleur d'accent", "var(--primary-color)")}
            ${this._renderSelect("theme_mode", "Mode thème", [
              { value: "auto", label: "auto" },
              { value: "light", label: "light" },
              { value: "dark", label: "dark" },
            ])}
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("compact", "Mode compact")}
            ${this._renderCheckbox("minimal_mode", "Mode minimal")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("use_gradient", "Utiliser un dégradé")}
            ${this._renderCheckbox("show_advanced_details", "Afficher les détails avancés")}
          </div>
          <div class="row">
            ${this._renderNumberInput("icon_size", "Taille des icônes (px)", 16)}
            ${this._renderNumberInput("border_radius", "Rayon des bords (px)", 0)}
          </div>
          <div class="row">
            ${this._renderTextInput("manual_action_service", "Service du bouton manuel", "gazon_intelligent.start_manual_irrigation")}
            ${this._renderTextInput("manual_action_label", "Libellé du bouton manuel", "Irrigation manuelle")}
          </div>
          <div class="hint">L’éditeur filtre les entités par domaine quand la carte connaît le type attendu.</div>
        </section>

        <section class="section">
          <h3>Actions de la carte</h3>
          <p>Ces actions s’appliquent au fond de la carte, hors boutons internes et sélecteurs dédiés.</p>
          ${this._renderActionEditor("tap_action", "Tap")}
          ${this._renderActionEditor("hold_action", "Hold")}
          ${this._renderActionEditor("double_tap_action", "Double tap")}
        </section>

        <section class="section">
          <h3>Synthèse et irrigation</h3>
          <p>Ces entités alimentent la synthèse principale et l'onglet Irrigation.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_fenetre_optimale", "Fenêtre optimale")}
            ${this._renderEntityInput("entity_weather", "Météo")}
            ${this._renderEntityInput("entity_plan_arrosage", "Plan d'irrigation")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'irrigation")}
            ${this._renderEntityInput("entity_niveau_pertinence", "Niveau de pertinence")}
            ${this._renderEntityInput("entity_prochaine_fenetre_optimale", "Prochaine fenêtre optimale")}
            ${this._renderEntityInput("entity_prochain_blocage_attendu", "Prochain blocage attendu")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Irrigation")}
            ${this._renderEntityInput("entity_arrosage_apres_application_autorise", "Post-application")}
            ${this._renderEntityInput("entity_signal_irrigation", "Signal irrigation")}
            ${this._renderEntityInput("entity_dernier_arrosage", "Dernier arrosage")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
          </div>
        </section>

        <section class="section">
          <h3>Référentiel produit</h3>
          <p>Ces entités séparent la recommandation, le catalogue et l’historique local. Pour le produit courant, branche l’entité Home Assistant visible comme “Produit sélectionné”.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_catalogue_produits", "Référentiel produits")}
            ${this._renderEntityInput(
              "entity_produit_intervention",
              "Produit sélectionné",
              "select.gazon_intelligent_produit_d_intervention",
              undefined,
              "Entité attendue dans Home Assistant: Produit sélectionné (select.gazon_intelligent_produit_d_intervention).",
            )}
            ${this._renderEntityInput("entity_prochaine_intervention", "Prochaine intervention")}
            ${this._renderEntityInput("entity_derniere_application", "Dernière intervention")}
            ${this._renderEntityInput("entity_signal_intervention", "Signal intervention")}
          </div>
        </section>

        <section class="section">
          <h3>Gazon et tonte</h3>
          <p>Ces entités alimentent les onglets Gazon et Tonte.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_mode", "Mode du gazon")}
            ${this._renderEntityInput("entity_type_arrosage", "Profil d'irrigation")}
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_tonte_autorisee", "Tonte autorisée")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
          </div>
        </section>

        <section class="section">
          <h3>Réglages</h3>
          <p>Ces entités alimentent l'onglet Réglages pour l'autorisation, les débits et les hauteurs.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_switch_arrosage_automatique", "Irrigation automatique")}
            ${this._renderEntityInput("entity_debit_zone_1", "Débit zone 1")}
            ${this._renderEntityInput("entity_debit_zone_2", "Débit zone 2")}
            ${this._renderEntityInput("entity_debit_zone_3", "Débit zone 3")}
            ${this._renderEntityInput("entity_debit_zone_4", "Débit zone 4")}
            ${this._renderEntityInput("entity_debit_zone_5", "Débit zone 5")}
            ${this._renderEntityInput("entity_hauteur_min_tondeuse", "Hauteur min tondeuse")}
            ${this._renderEntityInput("entity_hauteur_max_tondeuse", "Hauteur max tondeuse")}
          </div>
        </section>

        <section class="section">
          <h3>Détails avancés</h3>
          <p>Ces champs alimentent les vues détaillées et les écrans de diagnostic.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_debug_intervention", "Debug métier")}
            ${this._renderEntityInput("entity_arrosage_en_cours", "Irrigation en cours")}
          </div>
        </section>
      </div>
    `;

    this._bindInputs();
  }
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
}
