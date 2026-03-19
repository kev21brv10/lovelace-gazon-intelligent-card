const CARD_TYPE = "gazon-intelligent-card";
const CARD_NAME = "Gazon Intelligent Card";
const CARD_VERSION = "0.1.0";

const DEFAULT_CONFIG = {
  title: "Gazon Intelligent",
  show_icons: true,
  show_header: true,
  show_background: true,
  compact: false,
  theme_mode: "auto",
  accent_color: "",
  card_height: "",
  icon_size: 24,
  border_radius: 24,
  background_style: "solid",
  use_gradient: true,
  show_secondary_info: true,
  tap_action: { action: "more-info" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
};

const ENTITY_KEYS = [
  { key: "entity_phase", label: "Phase dominante", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_sous_phase", label: "Sous-phase", icon: "mdi:sprout", domain: ["sensor"] },
  { key: "entity_conseil", label: "Conseil principal", icon: "mdi:message-text-outline", domain: ["sensor"] },
  { key: "entity_action", label: "Action recommandée", icon: "mdi:check-circle-outline", domain: ["sensor"] },
  { key: "entity_avoid", label: "Action à éviter", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_niveau", label: "Niveau d'action", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_tonte", label: "État de tonte", icon: "mdi:content-cut", domain: ["sensor"] },
  { key: "entity_hauteur", label: "Hauteur de tonte conseillée", icon: "mdi:ruler-square", domain: ["sensor"] },
  { key: "entity_arrosage_recommande", label: "Arrosage recommandé", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_objectif_arrosage", label: "Objectif d'arrosage", icon: "mdi:water-percent", domain: ["sensor"] },
  { key: "entity_type_arrosage", label: "Type d'arrosage", icon: "mdi:sprinkler", domain: ["sensor"] },
  { key: "entity_risque", label: "Risque gazon", icon: "mdi:shield-alert-outline", domain: ["sensor"] },
];

const TONE_MAP = {
  danger: "danger",
  warning: "warning",
  success: "success",
  neutral: "neutral",
  accent: "accent",
};

function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function isUnavailableState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "" || normalized === "unknown" || normalized === "unavailable" || normalized === "none";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value, digits = 1) {
  const number = asNumber(value);
  if (number === null) {
    return null;
  }
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: Number.isInteger(number) ? 0 : 1,
  }).format(number);
}

function formatCm(value) {
  const formatted = formatNumber(value, 1);
  return formatted === null ? "—" : `${formatted} cm`;
}

function formatMm(value) {
  const number = asNumber(value);
  if (number === null) {
    return "—";
  }
  if (number <= 0) {
    return "Aucun arrosage nécessaire";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

function formatBoolState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Oui";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function normalizeDisplayValue(value) {
  if (isUnavailableState(value)) {
    return "Non disponible";
  }
  return String(value);
}

function computeTonteTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("interdit")) {
    return "danger";
  }
  if (normalized.includes("autor") || normalized.includes("possible")) {
    return "success";
  }
  if (normalized.includes("surveil") || normalized.includes("prud")) {
    return "warning";
  }
  return "neutral";
}

function computeRisqueTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("eleve") || normalized.includes("élev")) {
    return "danger";
  }
  if (normalized.includes("moyen")) {
    return "warning";
  }
  if (normalized.includes("faible")) {
    return "success";
  }
  return "neutral";
}

function computeActionTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("crit")) {
    return "danger";
  }
  if (normalized.includes("a_faire") || normalized.includes("à faire")) {
    return "warning";
  }
  if (normalized.includes("aucune")) {
    return "success";
  }
  if (normalized.includes("surve")) {
    return "accent";
  }
  return "neutral";
}

function phaseTone(value) {
  if (isEmpty(value)) {
    return "neutral";
  }
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("sursem")) {
    return "warning";
  }
  if (normalized.includes("trait")) {
    return "danger";
  }
  if (normalized.includes("hivern")) {
    return "neutral";
  }
  if (normalized.includes("fert")) {
    return "accent";
  }
  return "success";
}

function iconForTone(tone) {
  switch (tone) {
    case "danger":
      return "mdi:alert";
    case "warning":
      return "mdi:alert-outline";
    case "success":
      return "mdi:check-circle-outline";
    case "accent":
      return "mdi:star-circle-outline";
    default:
      return "mdi:information-outline";
  }
}

function iconForField(field) {
  return field.icon || "mdi:information-outline";
}

function splitServiceName(service) {
  const parts = String(service ?? "").split(".");
  if (parts.length !== 2) {
    return null;
  }
  return { domain: parts[0], service: parts[1] };
}

function mergeConfig(base, update) {
  return { ...base, ...update };
}

function domainMatches(entity, acceptedDomains) {
  if (!acceptedDomains || acceptedDomains.length === 0) {
    return true;
  }
  const domain = String(entity?.entity_id ?? "").split(".")[0];
  return acceptedDomains.includes(domain);
}

class GazonIntelligentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._tapTimer = null;
    this._onClick = this._onClick.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_TYPE}`,
      title: DEFAULT_CONFIG.title,
      show_icons: DEFAULT_CONFIG.show_icons,
      show_header: DEFAULT_CONFIG.show_header,
      show_background: DEFAULT_CONFIG.show_background,
      compact: DEFAULT_CONFIG.compact,
    };
  }

  setConfig(config) {
    if (!config || config.type !== `custom:${CARD_TYPE}`) {
      throw new Error(`Invalid configuration for ${CARD_NAME}.`);
    }
    this._config = mergeConfig(DEFAULT_CONFIG, config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 3;
    }
    const fields = this._visibleFields().length;
    const base = this._config.show_header ? 2 : 1;
    const tiles = this._config.show_secondary_info ? Math.ceil(fields / 2) : Math.ceil(fields / 3);
    const actions = 2;
    const compactOffset = this._config.compact ? 1 : 0;
    return Math.max(3, base + tiles + actions - compactOffset);
  }

  getGridOptions() {
    return {
      rows: this.getCardSize(),
      columns: 6,
      min_rows: this._config?.compact ? 2 : 3,
      min_columns: 3,
    };
  }

  getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this.shadowRoot?.removeEventListener("click", this._onClick);
    this.shadowRoot?.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot?.removeEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot?.removeEventListener("keydown", this._onKeyDown);
  }

  _entity(entityKey) {
    if (!this._config || !this._hass) {
      return null;
    }
    const entityId = this._config[entityKey];
    if (isEmpty(entityId)) {
      return null;
    }
    return this._hass.states?.[entityId] ?? null;
  }

  _entityId(entityKey) {
    return isEmpty(this._config?.[entityKey]) ? null : this._config[entityKey];
  }

  _entityState(entityKey, fallback = "Non disponible") {
    const entity = this._entity(entityKey);
    if (!entity) {
      return fallback;
    }
    const state = entity.state;
    if (isUnavailableState(state)) {
      return fallback;
    }
    return state;
  }

  _entityNumber(entityKey, attr = null) {
    const entity = this._entity(entityKey);
    if (!entity) {
      return null;
    }
    const raw = attr ? entity.attributes?.[attr] : entity.state;
    return asNumber(raw);
  }

  _entityAttribute(entityKey, attr, fallback = null) {
    const entity = this._entity(entityKey);
    if (!entity) {
      return fallback;
    }
    const value = entity.attributes?.[attr];
    return value === undefined ? fallback : value;
  }

  _possibleValues(entityKey) {
    const entity = this._entity(entityKey);
    const possibleValues = entity?.attributes?.possible_values;
    if (Array.isArray(possibleValues) && possibleValues.length > 0) {
      return possibleValues;
    }
    return null;
  }

  _phaseTone() {
    return phaseTone(this._entityState("entity_phase"));
  }

  _primaryTone() {
    const actionTone = computeActionTone(this._entityState("entity_niveau"));
    const tonteTone = computeTonteTone(this._entityState("entity_tonte"));
    const riskTone = computeRisqueTone(this._entityState("entity_risque"));
    const phase = this._phaseTone();

    if (phase !== "success") {
      return phase;
    }
    if (riskTone === "danger") {
      return riskTone;
    }
    if (tonteTone === "danger") {
      return tonteTone;
    }
    if (actionTone === "danger") {
      return actionTone;
    }
    if (tonteTone === "warning" || actionTone === "warning" || riskTone === "warning") {
      return "warning";
    }
    if (this._entityState("entity_arrosage_recommande") === "on") {
      return "accent";
    }
    return "neutral";
  }

  _primaryEntityId() {
    return (
      this._entityId("entity_phase") ||
      this._entityId("entity_conseil") ||
      this._entityId("entity_tonte") ||
      this._entityId("entity_hauteur")
    );
  }

  _renderBadge(label, value, tone = "neutral", icon = null) {
    if (isEmpty(value)) {
      return "";
    }
    const iconHtml = this._config?.show_icons && icon ? `<ha-icon icon="${escapeHtml(icon)}"></ha-icon>` : "";
    return `
      <div class="badge badge--${tone}">
        ${iconHtml}
        <span class="badge__label">${escapeHtml(label)}</span>
        <strong class="badge__value">${escapeHtml(value)}</strong>
      </div>
    `;
  }

  _renderTile(field) {
    const entityId = this._entityId(field.key);
    if (!entityId) {
      return "";
    }
    const entity = this._entity(field.key);
    const value = this._formatFieldValue(field, entity);
    const tone = this._toneForField(field, entity);
    const secondary = this._secondaryFieldText(field, entity);
    const icon = this._config?.show_icons ? iconForField(field) : null;

    return `
      <section class="tile tile--${tone}">
        ${icon ? `<div class="tile__icon"><ha-icon icon="${escapeHtml(icon)}"></ha-icon></div>` : ""}
        <div class="tile__content">
          <div class="tile__label">${escapeHtml(field.label)}</div>
          <div class="tile__value">${escapeHtml(value)}</div>
          ${
            this._config?.show_secondary_info && secondary
              ? `<div class="tile__secondary">${escapeHtml(secondary)}</div>`
              : ""
          }
        </div>
      </section>
    `;
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
    }
    if (field.key === "entity_tonte") {
      return computeTonteTone(entity.state);
    }
    if (field.key === "entity_niveau") {
      return computeActionTone(entity.state);
    }
    if (field.key === "entity_risque") {
      return computeRisqueTone(entity.state);
    }
    if (field.key === "entity_arrosage_recommande") {
      return String(entity.state).toLowerCase() === "on" ? "success" : "neutral";
    }
    if (field.key === "entity_phase") {
      return phaseTone(entity.state);
    }
    if (field.key === "entity_hauteur") {
      return this._phaseTone();
    }
    return "neutral";
  }

  _formatFieldValue(field, entity) {
    if (!entity) {
      return "Non disponible";
    }
    if (field.key === "entity_arrosage_recommande") {
      return formatBoolState(entity.state);
    }
    if (field.key === "entity_objectif_arrosage") {
      const numeric = asNumber(entity.state);
      return formatMm(numeric);
    }
    if (field.key === "entity_hauteur") {
      const numeric = asNumber(entity.state);
      return formatCm(numeric);
    }
    if (field.key === "entity_tonte") {
      return normalizeDisplayValue(entity.state);
    }
    return normalizeDisplayValue(entity.state);
  }

  _secondaryFieldText(field, entity) {
    if (!entity) {
      return "";
    }
    if (field.key === "entity_hauteur") {
      const min = asNumber(entity.attributes?.hauteur_tonte_min_cm);
      const max = asNumber(entity.attributes?.hauteur_tonte_max_cm);
      if (min === null || max === null) {
        return "";
      }
      return `${formatCm(min)} → ${formatCm(max)}`;
    }
    if (field.key === "entity_objectif_arrosage") {
      const phase = entity.attributes?.phase_active;
      return isEmpty(phase) ? "" : `Phase: ${phase}`;
    }
    return "";
  }

  _visibleFields() {
    return ENTITY_KEYS.filter((field) => this._config?.[field.key]);
  }

  _buildHeader() {
    if (!this._config?.show_header) {
      return "";
    }
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const tone = this._phaseTone();
    const risk = this._entityState("entity_risque", null);
    const action = this._entityState("entity_niveau", null);
    const tonteState = this._entityState("entity_tonte", null);
    const primaryEntity = this._primaryEntityId();

    return `
      <header class="header ${primaryEntity ? "header--clickable" : ""}" data-action-target="primary">
        <div class="header__title-wrap">
          <div class="header__icon header__icon--${tone}">
            ${this._config.show_icons ? '<ha-icon icon="mdi:grass"></ha-icon>' : ""}
          </div>
          <div class="header__titles">
            <div class="header__title">${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}</div>
            <div class="header__subtitle">
              ${phase ? `<span>${escapeHtml(phase)}</span>` : "<span>Phase non disponible</span>"}
              ${subPhase ? `<span>· ${escapeHtml(subPhase)}</span>` : ""}
            </div>
          </div>
        </div>

        <div class="header__badges">
          ${this._renderBadge("Niveau", action, computeActionTone(action), iconForTone(computeActionTone(action)))}
          ${this._renderBadge("Risque", risk, computeRisqueTone(risk), iconForTone(computeRisqueTone(risk)))}
          ${this._renderBadge("Tonte", tonteState, computeTonteTone(this._entityState("entity_tonte")), "mdi:content-cut")}
        </div>
      </header>
    `;
  }

  _buildLead() {
    const conseil = this._entityState("entity_conseil", null);
    if (isEmpty(conseil)) {
      return `
        <section class="lead lead--empty">
          Conseil principal non configuré.
        </section>
      `;
    }
    return `
      <section class="lead ${this._primaryTone() === "danger" ? "lead--danger" : ""}" data-action-target="primary">
        ${escapeHtml(conseil)}
      </section>
    `;
  }

  _buildDecisionBlocks() {
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    if (!action && !avoid) {
      return "";
    }
    return `
      <section class="decision-grid">
        ${
          action
            ? `<div class="decision decision--action">
                <div class="decision__label">Action recommandée</div>
                <div class="decision__value">${escapeHtml(action)}</div>
              </div>`
            : ""
        }
        ${
          avoid
            ? `<div class="decision decision--avoid">
                <div class="decision__label">Action à éviter</div>
                <div class="decision__value">${escapeHtml(avoid)}</div>
              </div>`
            : ""
        }
      </section>
    `;
  }

  _buildTiles() {
    const tiles = this._visibleFields().map((field) => this._renderTile(field)).filter(Boolean);
    if (tiles.length === 0) {
      return "";
    }
    return `
      <section class="tiles ${this._config.compact ? "tiles--compact" : ""}">
        ${tiles.join("")}
      </section>
    `;
  }

  _buildFooter() {
    const phaseSource = this._entity("entity_phase")?.attributes?.phase_dominante_source;
    const pluieSource = this._entity("entity_phase")?.attributes?.pluie_demain_source;
    const parts = [];
    if (!isEmpty(phaseSource)) {
      parts.push(`Source phase: ${phaseSource}`);
    }
    if (!isEmpty(pluieSource)) {
      parts.push(`Pluie demain: ${pluieSource}`);
    }
    if (parts.length === 0) {
      return "";
    }
    return `<footer class="footer">${parts.map((part) => `<span>${escapeHtml(part)}</span>`).join(" · ")}</footer>`;
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    if (!this._config) {
      this.shadowRoot.innerHTML = `<div class="empty">Configuration manquante.</div>`;
      return;
    }

    const accent = this._config.accent_color || this._accentColorFromTone(this._primaryTone());
    const background = this._config.show_background ? "true" : "false";
    const backgroundStyle = this._config.background_style || "solid";
    const themeMode = this._config.theme_mode || "auto";
    const numericHeight = asNumber(this._config.card_height);
    const height = numericHeight && numericHeight > 0 ? `${numericHeight}px` : "";
    const borderRadius = `${this._config.border_radius ?? 24}px`;
    const iconSize = `${this._config.icon_size ?? 24}px`;

    const rootClass = [
      "card",
      this._config.compact ? "card--compact" : "",
      backgroundStyle ? `card--${backgroundStyle}` : "",
      themeMode ? `card--theme-${themeMode}` : "",
      this._config.use_gradient ? "card--gradient" : "",
    ]
      .filter(Boolean)
      .join(" ");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --gazon-accent-color: ${accent};
          --gazon-border-radius: ${borderRadius};
          --gazon-icon-size: ${iconSize};
          --gazon-card-height: ${height || "auto"};
          --gazon-card-gap: ${this._config.compact ? "10px" : "16px"};
          --gazon-card-padding: ${this._config.compact ? "12px" : "18px"};
          --ha-card-border-radius: var(--gazon-border-radius);
        }

        * {
          box-sizing: border-box;
        }

        .card {
          display: block;
          min-height: var(--gazon-card-height);
          border-radius: var(--gazon-border-radius);
          color: var(--primary-text-color);
          background: var(--card-background-color, var(--ha-card-background, transparent));
          border: 1px solid var(--divider-color);
          box-shadow: var(--ha-card-box-shadow, none);
          overflow: hidden;
          padding: var(--gazon-card-padding);
          position: relative;
        }

        .card > * {
          position: relative;
          z-index: 1;
        }

        .card[data-background="false"] {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 5px;
          background: var(--gazon-accent-color);
          opacity: 0.95;
          z-index: 0;
        }

        .card--gradient::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 140px;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--gazon-accent-color) 10%, transparent) 100%
          );
          opacity: 0.8;
          z-index: 0;
        }

        .card--solid {
          background: var(--card-background-color, var(--ha-card-background, transparent));
        }

        .card--glass {
          backdrop-filter: blur(12px);
          background: color-mix(in srgb, var(--card-background-color, #1f1f1f) 82%, transparent);
        }

        .card--minimal {
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .header--clickable,
        .lead[data-action-target="primary"] {
          cursor: pointer;
        }

        .header__title-wrap {
          display: flex;
          gap: 12px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }

        .header__icon {
          width: calc(var(--gazon-icon-size) * 1.8);
          height: calc(var(--gazon-icon-size) * 1.8);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: var(--gazon-accent-color);
          flex: none;
        }

        .header__icon--warning { background: var(--warning-color, #ffa000); }
        .header__icon--danger { background: var(--error-color, #d32f2f); }
        .header__icon--success { background: var(--success-color, #2e7d32); }
        .header__icon--neutral { background: var(--secondary-text-color, #9e9e9e); }
        .header__icon--accent { background: var(--primary-color, #03a9f4); }

        .header__titles {
          min-width: 0;
        }

        .header__title {
          font-size: 1.12rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .header__subtitle {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          color: var(--secondary-text-color);
          font-size: 0.88rem;
        }

        .header__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(127, 127, 127, 0.18);
          font-size: 0.78rem;
          background: var(--secondary-background-color);
        }

        .badge ha-icon {
          width: 16px;
          height: 16px;
          color: var(--secondary-text-color);
        }

        .badge--danger { color: var(--error-color, #d32f2f); background: color-mix(in srgb, var(--error-color, #d32f2f) 10%, transparent); }
        .badge--warning { color: var(--warning-color, #ffa000); background: color-mix(in srgb, var(--warning-color, #ffa000) 10%, transparent); }
        .badge--success { color: var(--success-color, #2e7d32); background: color-mix(in srgb, var(--success-color, #2e7d32) 10%, transparent); }
        .badge--accent { color: var(--primary-color, #03a9f4); background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, transparent); }
        .badge--neutral { color: var(--primary-text-color); background: var(--secondary-background-color); }

        .badge__label {
          opacity: 0.74;
        }

        .badge__value {
          font-weight: 700;
        }

        .lead {
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.45;
          padding: 14px 0 10px 0;
        }

        .lead--empty {
          color: var(--secondary-text-color);
          font-weight: 500;
        }

        .lead--danger {
          color: var(--error-color, #d32f2f);
        }

        .decision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin: 8px 0 14px;
        }

        .decision {
          border-radius: 18px;
          padding: 12px 14px;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background: var(--secondary-background-color);
        }

        .decision--action {
          border-color: color-mix(in srgb, var(--success-color, #2e7d32) 20%, transparent);
        }

        .decision--avoid {
          border-color: color-mix(in srgb, var(--error-color, #d32f2f) 18%, transparent);
        }

        .decision__label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
          margin-bottom: 6px;
        }

        .decision__value {
          font-weight: 600;
          line-height: 1.4;
        }

        .tiles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 8px;
        }

        .tiles--compact {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .tile {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px;
          border-radius: 18px;
          background: var(--secondary-background-color);
          border: 1px solid rgba(127, 127, 127, 0.15);
          min-height: 78px;
        }

        .tile__icon {
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          color: var(--gazon-accent-color);
        }

        .tile__icon ha-icon {
          width: 24px;
          height: 24px;
        }

        .tile__content {
          min-width: 0;
          flex: 1;
        }

        .tile__label {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .tile__value {
          font-size: 0.98rem;
          line-height: 1.35;
          font-weight: 700;
          word-break: break-word;
        }

        .tile__secondary {
          margin-top: 4px;
          font-size: 0.82rem;
          color: var(--secondary-text-color);
        }

        .tile--danger { border-color: color-mix(in srgb, var(--error-color, #d32f2f) 22%, transparent); }
        .tile--warning { border-color: color-mix(in srgb, var(--warning-color, #ffa000) 22%, transparent); }
        .tile--success { border-color: color-mix(in srgb, var(--success-color, #2e7d32) 22%, transparent); }
        .tile--accent { border-color: color-mix(in srgb, var(--primary-color, #03a9f4) 22%, transparent); }

        .footer {
          margin-top: 14px;
          color: var(--secondary-text-color);
          font-size: 0.8rem;
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
          border: 1px dashed var(--divider-color);
          border-radius: 16px;
        }

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
          }

          .header__badges {
            justify-content: flex-start;
          }
        }
      </style>

      <ha-card
        class="${rootClass}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}"
        data-background="${background}"
        data-tone="${this._primaryTone()}"
        data-action-target="primary"
        style="${this._config.show_background ? `--gazon-accent-color:${accent};` : ""}"
      >
        ${this._buildHeader()}
        ${this._buildLead()}
        ${this._buildDecisionBlocks()}
        ${this._buildTiles()}
        ${this._buildFooter()}
      </ha-card>
    `;

    this.shadowRoot.removeEventListener("click", this._onClick);
    this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
    this.shadowRoot.addEventListener("click", this._onClick);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.addEventListener("keydown", this._onKeyDown);
  }

  _accentColorFromTone(tone) {
    switch (tone) {
      case "danger":
        return "var(--error-color, #d32f2f)";
      case "warning":
        return "var(--warning-color, #ffa000)";
      case "success":
        return "var(--success-color, #2e7d32)";
      case "accent":
        return "var(--primary-color, #03a9f4)";
      default:
        return "var(--primary-color, #03a9f4)";
    }
  }

  _onClick(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null;
      this._performAction(this._config?.tap_action, this._primaryEntityId());
    }, 220);
  }

  _onContextMenu(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    this._performAction(this._config?.hold_action, this._primaryEntityId());
  }

  _onDoubleClick(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this._performAction(this._config?.double_tap_action, this._primaryEntityId());
  }

  _onKeyDown(event) {
    const target = event.target.closest("[data-action-target]");
    if (!target) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    this._performAction(this._config?.tap_action, this._primaryEntityId());
  }

  _performAction(action, fallbackEntityId) {
    const normalized = typeof action === "string" ? { action } : action || { action: "none" };
    const actionName = String(normalized.action || "none").toLowerCase();
    const entityId = normalized.entity_id || fallbackEntityId;

    switch (actionName) {
      case "none":
        return;
      case "more-info":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "call-service": {
        const service = splitServiceName(normalized.service || normalized.service_name);
        if (!service || !this._hass) {
          return;
        }
        this._hass.callService(service.domain, service.service, normalized.service_data || normalized.data || {});
        return;
      }
      case "toggle":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-toggle", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "navigate": {
        const path = normalized.navigation_path || normalized.path || normalized.url;
        if (!path) {
          return;
        }
        if (path.startsWith("http://") || path.startsWith("https://")) {
          window.open(path, "_blank", "noopener");
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-navigate", {
            detail: { path },
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }
      case "url":
        if (normalized.url) {
          window.open(normalized.url, "_blank", "noopener");
        }
        return;
      default:
        return;
    }
  }
}

class GazonIntelligentCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._handleInput = this._handleInput.bind(this);
  }

  setConfig(config) {
    this._config = mergeConfig(DEFAULT_CONFIG, config || {});
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
    return GazonIntelligentCard.getStubConfig();
  }

  _entityOptions(domainFilter = null) {
    const entities = Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
    return entities;
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

    const next = { ...this._config };
    let value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    if (value === "" && !["title"].includes(key)) {
      delete next[key];
    } else {
      next[key] = value;
    }

    this._config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _renderInput(field, type = "text", placeholder = "") {
    const value = this._config?.[field] ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(field)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="${type}"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
          ${type === "checkbox" && value ? "checked" : ""}
        />
      </label>
    `;
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._config?.[field]);
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderEntityInput(field, label, domains = null) {
    const value = this._config?.[field] ?? "";
    const listId = "gazon-intelligent-card-entities";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${listId}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="sensor.gazon_intelligent_..."
        />
      </label>
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

    const entityOptions = this._entityOptions();
    const idList = entityOptions
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
        }
        .editor {
          padding: 16px;
          display: grid;
          gap: 16px;
          color: var(--primary-text-color);
        }
        .section {
          display: grid;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--editor-border);
          border-radius: 16px;
          background: var(--card-background-color);
        }
        .section h3 {
          margin: 0 0 4px 0;
          font-size: 1rem;
        }
        .section p {
          margin: 0;
          color: var(--secondary-text-color);
          font-size: 0.88rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }
        .field {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
        }
        .field span {
          color: var(--secondary-text-color);
        }
        .field input,
        .field select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--secondary-background-color);
          color: var(--primary-text-color);
        }
        .field--checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .field--checkbox input {
          width: auto;
        }
        .hint {
          font-size: 0.84rem;
          color: var(--secondary-text-color);
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
        }
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            <label class="field">
              <span>Titre</span>
              <input data-config-key="title" type="text" value="${escapeHtml(this._config.title || "")}" placeholder="Gazon Intelligent" />
            </label>
            <label class="field">
              <span>Mode de fond</span>
              <select data-config-key="background_style">
                ${["solid", "glass", "minimal"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.background_style === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>Couleur d'accent</span>
              <input data-config-key="accent_color" type="text" value="${escapeHtml(this._config.accent_color || "")}" placeholder="var(--primary-color)" />
            </label>
            <label class="field">
              <span>Mode thème</span>
              <select data-config-key="theme_mode">
                ${["auto", "light", "dark"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.theme_mode === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("compact", "Mode compact")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("use_gradient", "Utiliser un dégradé")}
          </div>
          <div class="row">
            <label class="field">
              <span>Hauteur de carte (px)</span>
              <input data-config-key="card_height" type="number" min="0" step="1" value="${escapeHtml(this._config.card_height || "")}" placeholder="auto" />
            </label>
            <label class="field">
              <span>Taille des icônes (px)</span>
              <input data-config-key="icon_size" type="number" min="16" step="1" value="${escapeHtml(this._config.icon_size ?? 24)}" />
            </label>
          </div>
          <div class="row">
            <label class="field">
              <span>Rayon des bords (px)</span>
              <input data-config-key="border_radius" type="number" min="0" step="1" value="${escapeHtml(this._config.border_radius ?? 24)}" />
            </label>
            <div class="hint">La carte reste compatible avec le thème clair / sombre de Home Assistant.</div>
          </div>
        </section>

        <section class="section">
          <h3>Entités principales</h3>
          <p>La carte fonctionne même si certaines entités sont absentes. Renseigne au moins les blocs que tu veux afficher.</p>
          <datalist id="gazon-intelligent-card-entities">${idList}</datalist>
          <div class="grid">
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Arrosage recommandé")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'arrosage")}
            ${this._renderEntityInput("entity_type_arrosage", "Type d'arrosage")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
          </div>
        </section>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, GazonIntelligentCard);
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "Carte Lovelace pour les décisions de gazon intelligent.",
  });
}
