import {
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  SECTION_ACCENTS,
  DEFAULT_CONFIG,
  ENTITY_KEYS,
  MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS,
  RENDER_SIGNATURE_ATTRS,
  SECTION_DEFS,
  STATUS_COLORS,
  STATUS_LABELS,
  TAB_DEFS,
  createStubConfig,
} from "./constants.js";
import { CARD_STYLES } from "./styles/card-styles.js";
import {
  asNumber,
  computeActionTone,
  computeRisqueTone,
  computeTonteTone,
  domainMatches,
  escapeHtml,
  formatApplicationMode,
  formatAuthorizationState,
  formatCm,
  formatDurationHuman,
  formatInterventionStatusPresentation,
  formatMm,
  formatMonthLabel,
  formatIrrigationSignalLabel,
  formatIrrigationSignalTone,
  formatMowerReasonLabel,
  formatMowingBlockReason,
  formatPlanType,
  formatProductAnnualLimit,
  formatProductUsageMode,
  formatPostApplicationStatusPresentation,
  formatRecommendationState,
  formatStateLabel,
  formatStatusLabel,
  formatSwitchState,
  formatWateringCauseLabel,
  formatWateringBlockReason,
  formatWateringTypeLabel,
  safeFormatWeatherConditionLabel as formatWeatherConditionLabel,
  formatNumber,
  iconForField,
  humanDateTimeText,
  isEmpty,
  isUnavailableState,
  mergeConfig,
  normalizeConfig,
  normalizeDisplayValue,
  phaseTone,
  sectionToAccent,
  splitServiceName,
  compactDecisionText,
  statusTone,
  toneToColor,
  weatherIconForState,
  weatherToneForState,
  safeRenderIconBox as renderIconBox,
  safeRenderStatusPill as renderStatusPill,
} from "./utils/formatters.js";
import { renderPill } from "./renderers/primitives.js";
import {
  renderActiveTab,
  renderDecisionLayout,
  renderHeader,
  renderTabNav,
  renderWateringProgressSection,
} from "./renderers/layout.js";

function normalizeOptionalDisplayValue(value) {
  const normalized = normalizeDisplayValue(value);
  return normalized === "Non disponible" ? "" : normalized;
}


// Shared constants are imported from ./constants.js.

class GazonIntelligentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._lastRenderSignature = null;
    this._activeTab = "overview";
    this._activeSection = "overview";
    this._wateringProgressTimer = null;
    this._cardActionTimer = null;
    this._holdActionTimer = null;
    this._holdActionTriggered = false;
    this._pendingInterventionSelection = null;
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onPointerCancel = this._onPointerCancel.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static getStubConfig() {
    return createStubConfig();
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "show_header", selector: { boolean: {} } },
        { name: "show_icons", selector: { boolean: {} } },
        { name: "show_background", selector: { boolean: {} } },
        { name: "minimal_mode", selector: { boolean: {} } },
        { name: "show_secondary_info", selector: { boolean: {} } },
        { name: "show_advanced_details", selector: { boolean: {} } },
        { name: "tap_action", selector: { action: {} } },
        { name: "hold_action", selector: { action: {} } },
        { name: "double_tap_action", selector: { action: {} } },
        { name: "theme_mode", selector: { select: { options: ["auto", "light", "dark"] } } },
        { name: "accent_color", selector: { text: {} } },
        { name: "icon_size", selector: { number: { min: 16, mode: "box", step: 1 } } },
        { name: "border_radius", selector: { number: { min: 0, mode: "box", step: 1 } } },
        { name: "background_style", selector: { select: { options: ["solid", "glass", "minimal"] } } },
        { name: "entity_assistant", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_weather", selector: { entity: { domain: ["weather"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage_total_zones", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_tonte", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_action_utilisateur", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_catalogue_produits", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_produit_intervention", selector: { entity: { domain: ["select"] } } },
        { name: "entity_prochaine_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau_pertinence", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_blocage_attendu", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_arrosage_auto_blocage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_mode", selector: { entity: { domain: ["select"] } } },
        { name: "entity_switch_arrosage_automatique", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_switch_coordination_tondeuse", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_arrosage_recommande", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_arrosage_apres_application_autorise", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_debug_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_signal_irrigation", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_tonte_autorisee", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_signal_intervention", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_objectif_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_objectif_legacy", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_objectif_depletion", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_reserve_actuelle", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_depletion_ratio", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_etat_hydrique", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_et0", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_etc", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_type_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_sous_phase", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_risque", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_arrosage_en_cours", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_debit_zone_1", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_2", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_3", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_4", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_5", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_min_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_max_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_coupe_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_delai_reprise_tonte_apres_arrosage", selector: { entity: { domain: ["number"] } } },
        { name: "entity_tonte", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_hauteur", selector: { entity: { domain: ["sensor"] } } },
        { name: "manual_action_service", selector: { text: {} } },
        { name: "manual_action_label", selector: { text: {} } },
      ],
    };
  }

  setConfig(config) {
    if (!config || config.type !== `custom:${CARD_TYPE}`) {
      throw new Error(`Invalid configuration for ${CARD_NAME}.`);
    }
    this._clearWateringProgressTimer();
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config));
    this._lastRenderSignature = null;
    this._activeTab = "overview";
    this._activeSection = "overview";
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._syncPendingInterventionSelection();
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 6;
    }
    if (this._isMinimalMode()) {
      return this._config.show_header ? 4 : 3;
    }
    let size = 8;
    if (!this._config.show_header) {
      size -= 1;
    }
    if (this._config.show_advanced_details) {
      size += 3;
    }
    return Math.max(4, size);
  }

  getGridOptions() {
    const size = this.getCardSize();
    const rows = Math.max(3, Math.ceil((size * 50 + 8) / 64));
    const viewportWidth =
      window?.innerWidth ||
      document?.documentElement?.clientWidth ||
      1440;
    const minColumns = viewportWidth < 1500 ? 12 : 6;
    return {
      rows,
      columns: 12,
      min_rows: rows,
      min_columns: minColumns,
    };
  }

  getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  connectedCallback() {
    this._render();
    this._syncWateringProgressTimer();
  }

  disconnectedCallback() {
    this._clearWateringProgressTimer();
    this._clearCardActionTimer();
    this._clearHoldActionTimer();
    this.shadowRoot?.removeEventListener("click", this._onClick);
    this.shadowRoot?.removeEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot?.removeEventListener("pointerup", this._onPointerUp);
    this.shadowRoot?.removeEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot?.removeEventListener("pointerleave", this._onPointerCancel);
    this.shadowRoot?.removeEventListener("change", this._onChange);
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

  _defaultActionEntityId() {
    for (const key of ["entity_weather", ...ENTITY_KEYS.map((entry) => entry.key)]) {
      const entityId = this._entityId(key);
      if (entityId) {
        return entityId;
      }
    }
    return null;
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

  _normalizeWateringCause(value, fallback = null) {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (["hydrique", "post_application"].includes(normalized)) {
      return normalized;
    }
    return fallback;
  }

  _inferWateringCause({ entity = null, attrs = null, typeArrosage = "", source = "" } = {}) {
    const resolvedEntity = entity && typeof entity === "object" ? entity : null;
    const resolvedAttrs = attrs && typeof attrs === "object" ? attrs : resolvedEntity?.attributes || {};
    const explicitCause = this._normalizeWateringCause(resolvedAttrs.watering_cause);
    if (explicitCause) {
      return explicitCause;
    }
    const postStatus = String(resolvedAttrs.application_post_watering_status || "").trim().toLowerCase();
    if (["bloque", "en_attente", "autorise"].includes(postStatus)) {
      return "post_application";
    }
    const normalizedType = String(typeArrosage || resolvedAttrs.type_arrosage || "").trim().toLowerCase();
    if (["application_technique", "application_technique_auto"].includes(normalizedType)) {
      return "post_application";
    }
    const normalizedSource = String(source || resolvedAttrs.source || "").trim().toLowerCase();
    if (["application_technique", "application_technique_auto", "manual_application"].includes(normalizedSource)) {
      return "post_application";
    }
    return "hydrique";
  }

  _wateringSourceLabel(source, fallbackCause = "hydrique") {
    const normalized = String(source ?? "").trim().toLowerCase();
    if (normalized === "application_technique_auto") {
      return "Post-produit auto";
    }
    if (normalized === "manual_application") {
      return "Post-produit manuel";
    }
    if (normalized === "application_technique") {
      return "Post-produit";
    }
    if (normalized === "zone_session") {
      return fallbackCause === "post_application" ? "Post-produit" : "Hydrique";
    }
    if (!normalized) {
      return formatWateringCauseLabel(fallbackCause);
    }
    return formatStateLabel(source);
  }

  _postApplicationState(entity = null) {
    const application = entity && typeof entity === "object" ? entity : this._entity("entity_arrosage_apres_application_autorise");
    if (!application) {
      return {
        status: "unavailable",
        kind: "unavailable",
        label: "Non disponible",
        tone: "neutral",
        active: false,
      };
    }

    const rawState = String(application.state ?? "").trim().toLowerCase();
    if (isUnavailableState(rawState)) {
      return {
        status: "unavailable",
        kind: "unavailable",
        label: "Non disponible",
        tone: "neutral",
        active: false,
      };
    }

    const attrs = application.attributes ?? {};
    const explicitStatus = String(attrs.application_post_watering_status ?? "").trim().toLowerCase();
    const normalizedStatus = explicitStatus || (["autorise", "en_attente", "bloque", "non_requis", "non_autorise", "indisponible", "non_disponible"].includes(rawState) ? rawState : "indisponible");
    const presentation = typeof formatPostApplicationStatusPresentation === "function"
      ? formatPostApplicationStatusPresentation(normalizedStatus)
      : {
          kind: normalizedStatus || "indisponible",
          label: isEmpty(normalizedStatus) ? "Non disponible" : formatStateLabel(normalizedStatus),
          tone: "neutral",
          active: false,
        };
    return {
      status: normalizedStatus,
      kind: presentation.kind,
      label: presentation.label,
      tone: presentation.tone,
      active: presentation.active,
      value: explicitStatus || "Non disponible",
      rawStatus: rawState,
    };
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

  _riskTone() {
    const tone = computeRisqueTone(this._entityState("entity_risque"));
    return tone || "neutral";
  }

  _actionTone() {
    const tone = computeActionTone(this._entityState("entity_niveau"));
    return tone || "neutral";
  }

  _sectionAccent(section = this._activeSection) {
    return sectionToAccent(section);
  }

  _tabAccent(tab = this._activeTab) {
    switch (tab) {
      case "watering":
        return SECTION_ACCENTS.watering;
      case "mowing":
        return SECTION_ACCENTS.mowing;
      case "gazon":
        return "#4f8f3a";
      case "products":
        return SECTION_ACCENTS.products;
      case "config":
        return SECTION_ACCENTS.details;
      default:
        return SECTION_ACCENTS.overview;
    }
  }

  _tabPalette(tab = this._activeTab) {
    const accent = this._tabAccent(tab);
    switch (tab) {
      case "watering":
        return {
          accent,
          companion: "#88e4ff",
          glow: "#31b8d4",
          mist: "#58cfd6",
        };
      case "mowing":
        return {
          accent,
          companion: "#e6cf73",
          glow: "#a6cb58",
          mist: "#c8d86b",
        };
      case "gazon":
        return {
          accent,
          companion: "#9fd874",
          glow: "#5bb56e",
          mist: "#7ec788",
        };
      case "products":
        return {
          accent,
          companion: "#d9bf73",
          glow: "#57c18d",
          mist: "#8ecf90",
        };
      case "intervention":
        return {
          accent,
          companion: "#f1b86f",
          glow: "#5ac7b0",
          mist: "#93d3a4",
        };
      case "config":
        return {
          accent,
          companion: "#8eb8d8",
          glow: "#7b8da0",
          mist: "#a5b3bf",
        };
      case "overview":
      default:
        return {
          accent,
          companion: "#7fd6b6",
          glow: "#58c27d",
          mist: "#75cfd2",
        };
    }
  }

  _normalizedActionConfig(action) {
    if (typeof action === "string") {
      return { action };
    }
    if (action && typeof action === "object") {
      return action;
    }
    return { action: "none" };
  }

  _configuredAction(actionKey) {
    return this._normalizedActionConfig(this._config?.[actionKey] ?? DEFAULT_CONFIG[actionKey]);
  }

  _hasConfiguredAction(actionKey) {
    const action = this._configuredAction(actionKey);
    return String(action.action || "none").trim().toLowerCase() !== "none";
  }

  _hasCardAction() {
    return this._hasConfiguredAction("tap_action")
      || this._hasConfiguredAction("hold_action")
      || this._hasConfiguredAction("double_tap_action");
  }

  _isActionEventCandidateTarget(target) {
    if (!(target instanceof Element)) {
      return false;
    }
    if (!target.closest("ha-card")) {
      return false;
    }
    return !target.closest(
      "[data-gazon-action], [data-more-info-entity], [data-tab], [data-section], button, select, input, textarea, a, summary",
    );
  }

  _clearCardActionTimer() {
    if (this._cardActionTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this._cardActionTimer);
    }
    this._cardActionTimer = null;
  }

  _clearHoldActionTimer() {
    if (this._holdActionTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this._holdActionTimer);
    }
    this._holdActionTimer = null;
  }

  _actionEventName(actionKey) {
    return String(actionKey || "").replace(/_action$/, "");
  }

  _actionConfigForEvent(actionKey, action, fallbackEntityId) {
    const normalized = { ...this._normalizedActionConfig(action) };
    let actionName = String(normalized.action || "none").trim().toLowerCase();
    if (actionName === "more_info") {
      actionName = "more-info";
    }
    if (actionName === "perform_action" || actionName === "call-service") {
      actionName = "perform-action";
    }
    if (actionName === "none") {
      return null;
    }

    const eventConfig = {
      [actionKey]: {
        ...normalized,
        action: actionName,
      },
    };
    const actionConfig = eventConfig[actionKey];
    const targetEntityId = actionConfig.entity || actionConfig.entity_id || fallbackEntityId || null;

    if (actionConfig.service && !actionConfig.perform_action) {
      actionConfig.perform_action = actionConfig.service;
    }
    if (actionConfig.service_name && !actionConfig.perform_action) {
      actionConfig.perform_action = actionConfig.service_name;
    }
    if (actionConfig.service_data !== undefined && actionConfig.data === undefined) {
      actionConfig.data = actionConfig.service_data;
    }
    if (actionConfig.path && actionConfig.navigation_path === undefined) {
      actionConfig.navigation_path = actionConfig.path;
    }
    if (actionConfig.url && actionName === "navigate" && actionConfig.navigation_path === undefined) {
      actionConfig.navigation_path = actionConfig.url;
    }
    if (actionConfig.url && actionName === "url" && actionConfig.url_path === undefined) {
      actionConfig.url_path = actionConfig.url;
    }

    delete actionConfig.service;
    delete actionConfig.service_name;
    delete actionConfig.service_data;
    delete actionConfig.path;
    delete actionConfig.url;
    delete actionConfig.entity_id;

    if (actionName === "perform-action" && targetEntityId && actionConfig.target === undefined) {
      actionConfig.target = { entity_id: targetEntityId };
    }
    if (actionName !== "perform-action" && targetEntityId && eventConfig.entity === undefined) {
      eventConfig.entity = targetEntityId;
    }

    return eventConfig;
  }

  _performConfiguredAction(actionKey, fallbackEntityId = this._defaultActionEntityId()) {
    const config = this._actionConfigForEvent(actionKey, this._configuredAction(actionKey), fallbackEntityId);
    if (!config) {
      return;
    }
    const event = new Event("hass-action", {
      bubbles: true,
      composed: true,
    });
    event.detail = {
      config,
      action: this._actionEventName(actionKey),
    };
    this.dispatchEvent(event);
  }

  _handleCardTapAction(fallbackEntityId) {
    const hasTapAction = this._hasConfiguredAction("tap_action");
    const hasDoubleTapAction = this._hasConfiguredAction("double_tap_action");
    if (!hasTapAction && !hasDoubleTapAction) {
      return;
    }
    if (!hasDoubleTapAction) {
      this._performConfiguredAction("tap_action", fallbackEntityId);
      return;
    }
    if (this._cardActionTimer !== null) {
      this._clearCardActionTimer();
      this._performConfiguredAction("double_tap_action", fallbackEntityId);
      return;
    }
    this._cardActionTimer = window.setTimeout(() => {
      this._cardActionTimer = null;
      if (hasTapAction) {
        this._performConfiguredAction("tap_action", fallbackEntityId);
      }
    }, 250);
  }

  _primaryTone() {
    const actionTone = this._actionTone();
    const tonteTone = computeTonteTone(this._entityState("entity_tonte"));
    const riskTone = this._riskTone();
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

  _cardTone() {
    const actionTone = this._actionTone();
    const riskTone = this._riskTone();

    if (actionTone === "critical") {
      return "critical";
    }
    if (riskTone && riskTone !== "neutral") {
      return riskTone;
    }
    if (actionTone && actionTone !== "neutral") {
      return actionTone;
    }
    return "neutral";
  }

  _tabTone(tab = this._activeTab) {
    if (tab === "watering") {
      return this._windowState().tone;
    }
    if (tab === "mowing") {
      return computeTonteTone(this._entityState("entity_tonte"));
    }
    if (tab === "gazon") {
      const actionTone = this._actionTone();
      const riskTone = this._riskTone();
      const phaseToneValue = this._phaseTone();
      if (phaseToneValue !== "success") {
        return phaseToneValue;
      }
      if (riskTone === "danger") {
        return riskTone;
      }
      if (actionTone === "danger") {
        return actionTone;
      }
      if (actionTone === "warning" || riskTone === "warning") {
        return "warning";
      }
      return "success";
    }
    if (tab === "products") {
      const selection = this._productSelectionState();
      const catalogue = this._catalogueState();
      if (selection.selectedProductId) {
        return "success";
      }
      if (catalogue.hasProducts) {
        return "accent";
      }
      return "neutral";
    }
    if (tab === "intervention") {
      const selection = this._productSelectionState();
      const catalogue = this._catalogueState();
      if (selection.selectedProductId) {
        return "success";
      }
      if (catalogue.hasProducts) {
        return "accent";
      }
      return "neutral";
    }
    if (tab === "config") {
      const autoState = String(this._entityState("entity_switch_arrosage_automatique", "")).trim().toLowerCase();
      if (["on", "true", "yes", "1", "oui"].includes(autoState)) {
        return "success";
      }
      if (["off", "false", "no", "0", "non"].includes(autoState)) {
        return "danger";
      }
      return "neutral";
    }
    return this._primaryTone();
  }

  _windowEntity() {
    return this._entity("entity_fenetre_optimale");
  }

  _assistantEntity() {
    return this._entity("entity_assistant");
  }

  _planEntity() {
    return this._entity("entity_plan_arrosage");
  }

  _weatherEntity() {
    return this._entity("entity_weather");
  }

  _lastWateringEntity() {
    return this._entity("entity_dernier_arrosage");
  }

  _applicationEntity() {
    return this._entity("entity_derniere_application");
  }

  _lastUserActionEntity() {
    return this._entity("entity_derniere_action_utilisateur");
  }

  _catalogueEntity() {
    return this._entity("entity_catalogue_produits");
  }

  _productSelectionEntity() {
    return this._entity("entity_produit_intervention");
  }

  _interventionRecommendationEntity() {
    return this._entity("entity_prochaine_intervention");
  }

  _catalogueState() {
    const entity = this._catalogueEntity();
    const attrs = entity?.attributes || {};
    const count = asNumber(attrs.products_count ?? entity?.state);
    const summary = String(attrs.summary || "").trim();
    const productNames = String(attrs.product_names || "").trim();
    const productIds = String(attrs.product_ids || "").trim();
    return {
      entity,
      count: count ?? 0,
      summary: summary || (count === 0 ? "Aucun produit enregistré" : count === 1 ? "1 produit enregistré" : `${count} produits enregistrés`),
      productNames,
      productIds,
      hasProducts: (count ?? 0) > 0,
    };
  }

  _productSelectionState() {
    const entity = this._productSelectionEntity();
    const attrs = entity?.attributes || {};
    const pendingSelection = this._pendingInterventionSelection;
    const selectedProductId = String(attrs.selected_product_id || pendingSelection?.id || "").trim();
    const entityState = String(entity?.state || "").trim();
    const selectedProductName = String(
      attrs.selected_product_name || pendingSelection?.name || (isUnavailableState(entityState) ? "" : entityState) || "",
    ).trim();
    const selectedProductMonths = attrs.selected_product_months ?? pendingSelection?.months ?? [];
    const selectedProductMonthsLabel = String(attrs.selected_product_months_label || pendingSelection?.monthsLabel || "").trim();
    const selectedProductUsageMode = String(attrs.selected_product_usage_mode || pendingSelection?.usageMode || "").trim();
    const selectedProductUsageModeLabel = String(attrs.selected_product_usage_mode_label || pendingSelection?.usageModeLabel || "").trim();
    const selectedProductMaxApplicationsPerYear = asNumber(
      attrs.selected_product_max_applications_per_year ?? pendingSelection?.maxApplicationsPerYear,
    );
    const selectedProductMaxApplicationsPerYearLabel = String(
      attrs.selected_product_max_applications_per_year_label || pendingSelection?.maxApplicationsPerYearLabel || "",
    ).trim();
    const summary = String(attrs.summary || "").trim();
    const productsCount = asNumber(attrs.products_count ?? this._catalogueState().count) ?? 0;
    return {
      entity,
      selectedProductId: selectedProductId || null,
      selectedProductName: selectedProductName || null,
      selectedProductMonths: Array.isArray(selectedProductMonths) ? selectedProductMonths : [],
      selectedProductMonthsLabel: selectedProductMonthsLabel || null,
      selectedProductUsageMode: selectedProductUsageMode || null,
      selectedProductUsageModeLabel:
        selectedProductUsageModeLabel ||
        formatProductUsageMode(selectedProductUsageMode),
      selectedProductMaxApplicationsPerYear: selectedProductMaxApplicationsPerYear,
      selectedProductMaxApplicationsPerYearLabel:
        selectedProductMaxApplicationsPerYearLabel ||
        formatProductAnnualLimit(selectedProductMaxApplicationsPerYear),
      summary:
        summary ||
        (selectedProductName
          ? `Produit sélectionné : ${selectedProductName}`
          : productsCount > 0
            ? "Aucun produit sélectionné"
            : "Aucun produit enregistré"),
      productsCount,
      label: selectedProductName || "Aucun produit sélectionné",
    };
  }

  _syncPendingInterventionSelection() {
    if (!this._pendingInterventionSelection) {
      return;
    }
    const entity = this._productSelectionEntity();
    const attrs = entity?.attributes || {};
    const selectedProductId = String(attrs.selected_product_id || "").trim();
    const selectedProductName = String(attrs.selected_product_name || "").trim();
    const entityState = String(entity?.state || "").trim();
    const pending = this._pendingInterventionSelection;
    const hasConfirmedSelection =
      (selectedProductId && pending.id && selectedProductId === pending.id)
      || (selectedProductName && pending.name && selectedProductName === pending.name)
      || (entityState && pending.optionLabel && entityState === pending.optionLabel);
    if (hasConfirmedSelection) {
      this._pendingInterventionSelection = null;
    }
  }

  _catalogueProducts() {
    const entity = this._catalogueEntity();
    const products = entity?.attributes?.products_summary;
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    return products.filter((product) => product && typeof product === "object");
  }

  _catalogueProductOptions() {
    const products = this._catalogueProducts();
    if (!products.length) {
      return [];
    }
    const nameCounts = new Map();
    for (const product of products) {
      const productName = String(product.nom || product.id || "").trim();
      if (!productName) {
        continue;
      }
      const key = productName.toLocaleLowerCase();
      nameCounts.set(key, (nameCounts.get(key) || 0) + 1);
    }
    return products
      .map((product) => {
        const id = String(product.id || "").trim();
        if (!id) {
          return null;
        }
        const name = String(product.nom || id || "").trim() || id;
        const monthsLabel = String(product.application_months_label || "").trim();
        const usageMode = String(product.usage_mode || "").trim();
        const usageModeLabel = formatProductUsageMode(usageMode);
        const annualLimit = asNumber(product.max_applications_per_year);
        const annualLimitLabel = formatProductAnnualLimit(annualLimit);
        const duplicateCount = nameCounts.get(name.toLocaleLowerCase()) || 0;
        const baseLabel = duplicateCount > 1 && id ? `${name} — ${id}` : name;
        const labelParts = [baseLabel];
        if (monthsLabel) {
          labelParts.push(monthsLabel);
        }
        if (usageModeLabel) {
          labelParts.push(`Mode ${usageModeLabel}`);
        }
        if (annualLimitLabel) {
          labelParts.push(`Max ${annualLimitLabel}`);
        }
        return {
          id,
          name,
          label: labelParts.join(" · "),
          monthsLabel: String(product.application_months_label || "").trim() || null,
          usageMode: usageMode || null,
          usageModeLabel: usageModeLabel || null,
          maxApplicationsPerYear: annualLimit,
          maxApplicationsPerYearLabel: annualLimitLabel,
        };
      })
      .filter(Boolean);
  }

  _interventionRecommendationState() {
    const entity = this._interventionRecommendationEntity();
    const attrs = entity?.attributes || {};
    // L'entité publique « prochaine_intervention » n'expose qu'un payload plat ; le
    // détail riche (product / selection / constraints / context) vit sur l'entité de
    // debug. On l'utilise comme source du payload quand elle est disponible.
    const debugEntity = this._entity("entity_debug_intervention");
    const debugAttrs = debugEntity?.attributes && typeof debugEntity.attributes === "object"
      ? debugEntity.attributes
      : null;
    const richDebug = debugAttrs
      && (debugAttrs.product || debugAttrs.selection || debugAttrs.constraints || debugAttrs.context)
      ? debugAttrs
      : null;
    const payload = attrs.payload && typeof attrs.payload === "object"
      ? attrs.payload
      : richDebug
        ? { ...attrs, ...richDebug }
        : attrs;
    const catalogue = this._catalogueState();
    // Détails de la sélection (mode d'usage / max par an) absents du payload
    // d'intervention : on les complète depuis l'entité select.
    const productSelection = this._productSelectionState();
    const pertinenceEntity = this._entity("entity_niveau_pertinence");
    const product = payload.product && typeof payload.product === "object" ? payload.product : {};
    const selection = payload.selection && typeof payload.selection === "object" ? payload.selection : {};
    const context = payload.context && typeof payload.context === "object" ? payload.context : {};
    const state = String(payload.status || entity?.state || attrs.state || "").trim().toLowerCase();
    const normalizedState = state || "unavailable";
    const score = asNumber(payload.score ?? attrs.score ?? pertinenceEntity?.attributes?.score) ?? 0;
    const scoreLevel = String(
      payload.score_level
        || attrs.score_level
        || pertinenceEntity?.attributes?.score_level
        || pertinenceEntity?.state
        || "",
    ).trim().toLowerCase();
    const hasHighScore = ["élevé", "eleve", "high", "haut"].includes(scoreLevel) || score >= 71;
    const fallbackPresentation = {
      status: normalizedState,
      title: "Intervention",
      badge: "Non disponible",
      tone: "neutral",
      icon: "mdi:spray-bottle",
      summary: "Non disponible",
      hint: "Aucune recommandation exploitable n’est disponible.",
      actionLabel: "Non disponible",
      selectionSummary: "Aucun produit identifié",
      selectionHint: "Aucune recommandation exploitable n’est disponible.",
      declarationSummary: "Non disponible",
      declarationHint: "Aucune recommandation exploitable n’est disponible.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const lowScorePresentation = {
      status: normalizedState,
      title: "À surveiller",
      badge: "Score insuffisant",
      tone: "neutral",
      icon: "mdi:chart-line-variant",
      summary: "Aucune intervention proposée",
      hint: "L’intervention n’est proposée que lorsque le score est élevé.",
      actionLabel: "Surveiller",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "La sélection reste possible, mais aucune intervention n’est proposée tant que le score n’est pas élevé.",
      declarationSummary: "Pas de proposition",
      declarationHint: "Aucune intervention n’est proposée tant que le score n’est pas élevé.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const lowScoreCandidatePresentation = {
      status: normalizedState,
      title: "À envisager",
      badge: "Pertinence faible",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "Intervention non prioritaire",
      hint: "Un candidat existe, mais le contexte actuel limite sa pertinence.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "La sélection reste possible pour préparer la déclaration.",
      declarationSummary: "À envisager",
      declarationHint: "La déclaration reste possible, mais elle n’est pas prioritaire tant que la pertinence est faible.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    };
    const basePresentation = typeof formatInterventionStatusPresentation === "function"
      ? formatInterventionStatusPresentation(normalizedState)
      : (function mapFallbackInterventionStatus(status) {
          const normalized = String(status ?? "").trim().toLowerCase();
          if (normalized === "recommended") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.recommended };
          }
          if (normalized === "possible") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.possible };
          }
          if (normalized === "preparation") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.preparation };
          }
          if (normalized === "ready") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.ready };
          }
          if (normalized === "blocked") {
            return { status: normalized, ...INTERVENTION_STATUS_PRESENTATIONS.blocked };
          }
          if (normalized === "unavailable" || normalized === "non_disponible") {
            return { status: normalized || "unavailable", ...INTERVENTION_STATUS_PRESENTATIONS.unavailable };
          }
          return fallbackPresentation;
        })(normalizedState);
    const presentation = hasHighScore || ["blocked", "unavailable", "non_disponible"].includes(normalizedState)
      ? basePresentation
      : ["preparation", "possible"].includes(normalizedState)
        ? lowScoreCandidatePresentation
        : lowScorePresentation;
    const reason = String(payload.reason || "").trim();
    const whyNow = String(payload.why_now || "").trim();
    const title = presentation.title;
    const badge = presentation.badge;
    const tone = presentation.tone;
    const icon = presentation.icon;
    const summary = presentation.summary;
    const hint = reason || whyNow || presentation.hint;
    const actionLabel = presentation.actionLabel;
    const reasons = Array.isArray(payload.reasons) ? payload.reasons.filter(Boolean).map((reason) => String(reason)) : [];
    const constraints = Array.isArray(payload.constraints)
      ? payload.constraints
          .filter((constraint) => constraint && typeof constraint === "object")
          .map((constraint) => ({
            code: String(constraint.code || "").trim() || null,
            label: String(constraint.label || "").trim() || "",
            value: constraint.value ?? null,
            hint: String(constraint.hint || "").trim() || null,
            met: Boolean(constraint.met),
            blocking: Boolean(constraint.blocking),
          }))
      : [];
    const selectedProductId = String(selection.id || attrs.selected_product_id || "").trim() || null;
    const selectedProductName = String(selection.name || attrs.selected_product_name || "").trim() || null;
    const selectedProductMonths = Array.isArray(selection.months) && selection.months.length
      ? selection.months
      : (Array.isArray(productSelection.selectedProductMonths) ? productSelection.selectedProductMonths : []);
    const selectedProductMonthsLabel = String(
      selection.months_label || attrs.selected_product_months_label || productSelection.selectedProductMonthsLabel || "",
    ).trim() || null;
    const selectedProductUsageMode = String(
      selection.usage_mode || attrs.selected_product_usage_mode || productSelection.selectedProductUsageMode || "",
    ).trim() || null;
    const selectedProductUsageModeLabel = String(
      selection.usage_mode_label || attrs.selected_product_usage_mode_label || productSelection.selectedProductUsageModeLabel || "",
    ).trim() || null;
    const selectedProductMaxApplicationsPerYear = asNumber(
      selection.max_applications_per_year
        ?? attrs.selected_product_max_applications_per_year
        ?? productSelection.selectedProductMaxApplicationsPerYear,
    );
    const selectedProductMaxApplicationsPerYearLabel = String(
      selection.max_applications_per_year_label
        || attrs.selected_product_max_applications_per_year_label
        || productSelection.selectedProductMaxApplicationsPerYearLabel
        || "",
    ).trim() || null;
    const recommendedProductMonths = Array.isArray(product.months) ? product.months : [];
    const recommendedProductMonthsLabel = String(product.months_label || attrs.recommended_product_months_label || "").trim() || null;
    const recommendedProductId = String(product.id || payload.product_id || attrs.product_id || attrs.recommended_product_id || "").trim() || null;
    const recommendedProductName = String(product.name || payload.product_name || attrs.product_name || attrs.recommended_product_name || "").trim() || null;
    const recommendedProductType = String(product.type || payload.product_type || attrs.product_type || attrs.recommended_product_type || "").trim() || null;
    const readyToDeclare = Boolean(payload.ready_to_declare) && hasHighScore;
    return {
      entity,
      payload,
      schemaVersion: asNumber(payload.schema_version) ?? null,
      status: normalizedState,
      recommendedAction: String(payload.recommended_action || "").trim() || null,
      priority: String(payload.priority || "").trim() || null,
      score,
      scoreLevel: scoreLevel || null,
      scoreHigh: hasHighScore,
      reason: String(payload.reason || "").trim() || "",
      whyNow: String(payload.why_now || "").trim() || "",
      reasons,
      constraints,
      missingRequirements: Array.isArray(payload.missing_requirements)
        ? payload.missing_requirements.filter(Boolean).map((value) => String(value))
        : [],
      monthMatch: Boolean(payload.month_match),
      readyToDeclare,
      product: {
        id: recommendedProductId,
        name: recommendedProductName,
        type: recommendedProductType,
        months: recommendedProductMonths,
        monthsLabel: recommendedProductMonthsLabel,
        phaseCompatible: Array.isArray(product.phase_compatible) ? product.phase_compatible : [],
        latestApplicationDate: String(product.latest_application_date || "").trim() || null,
        nextReapplicationDate: String(product.next_reapplication_date || "").trim() || null,
        nextReapplicationDisplay: String(product.next_reapplication_display || "").trim() || null,
        due: Boolean(product.due),
        phaseMatch: Boolean(product.phase_match),
        monthMatch: Boolean(product.month_match),
      },
      selection: {
        id: selectedProductId,
        name: selectedProductName,
        type: String(selection.type || attrs.selected_product_type || "").trim() || null,
        months: selectedProductMonths,
        monthsLabel: selectedProductMonthsLabel,
        usageMode: selectedProductUsageMode,
        usageModeLabel: selectedProductUsageModeLabel || formatProductUsageMode(selectedProductUsageMode),
        maxApplicationsPerYear: selectedProductMaxApplicationsPerYear,
        maxApplicationsPerYearLabel:
          selectedProductMaxApplicationsPerYearLabel ||
          formatProductAnnualLimit(selectedProductMaxApplicationsPerYear),
        ready: Boolean(payload.selected_product_ready || selection.ready),
        selected: Boolean(selectedProductId || selectedProductName),
      },
      context: {
        catalogueCount: asNumber(context.catalogue_count ?? attrs.catalogue_count ?? catalogue.count) ?? catalogue.count ?? 0,
        eligibleCount: asNumber(context.eligible_count ?? attrs.eligible_count) ?? 0,
        blockedProductsCount: asNumber(context.blocked_products_count ?? attrs.blocked_products_count) ?? 0,
        currentMonth: asNumber(context.current_month ?? attrs.current_month) ?? null,
        currentPhase: String((context.current_phase ?? attrs.current_phase) || "").trim() || null,
        currentSubPhase: String((context.current_sub_phase ?? attrs.current_sub_phase) || "").trim() || null,
      },
      ui: {
        title,
        badge,
        tone,
        icon,
        summary,
        hint,
        actionLabel,
        selectionSummary: presentation.selectionSummary,
        selectionHint: presentation.selectionHint,
        declarationSummary: presentation.declarationSummary,
        declarationHint: reason || whyNow || presentation.declarationHint,
        historySummary: presentation.historySummary,
        historyHint: presentation.historyHint,
      },
    };
  }

  _selectedProductOptionLabel() {
    const options = this._catalogueProductOptions();
    if (!options.length) {
      return null;
    }
    const selection = this._productSelectionState();
    if (selection.selectedProductId) {
      const match = options.find((option) => option.id === selection.selectedProductId);
      if (match) {
        return match.label;
      }
    }
    if (selection.selectedProductName) {
      const normalizedName = String(selection.selectedProductName).trim().toLocaleLowerCase();
      const match = options.find((option) => option.name.toLocaleLowerCase() === normalizedName);
      if (match) {
        return match.label;
      }
    }
    if (options.length === 1) {
      return options[0].label;
    }
    return null;
  }

  _selectedProductRecord() {
    const selectedProductId = this._productSelectionState().selectedProductId;
    const products = this._catalogueProducts();
    if (products.length === 0) {
      return null;
    }
    if (selectedProductId) {
      const normalizedSelectedProductId = String(selectedProductId).trim();
      const record = products.find((product) => String(product.id || "").trim() === normalizedSelectedProductId);
      if (record) {
        return record;
      }
    }
    if (products.length === 1) {
      return products[0];
    }
    return null;
  }

  _todayIsoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  _todayDisplayDate() {
    try {
      return new Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date());
    } catch (_error) {
      return this._todayIsoDate();
    }
  }

  _selectedProductInterventionState() {
    const record = this._selectedProductRecord();
    const selectedName = String(record?.nom || record?.id || "").trim();
    const type = String(record?.type || "").trim();
    const optionLabel = this._selectedProductOptionLabel();
    if (!record || !type) {
      return {
        record: null,
        disabled: true,
        label: "Sélectionne un produit",
        summary: "Aucune intervention rapide possible sans produit sélectionné.",
        optionLabel,
        actionLabel: "Déclarer l'intervention",
      };
    }
    return {
      record,
      disabled: false,
      label: selectedName || "Produit sélectionné",
      summary: `${formatStatusLabel(type)} · ${this._todayDisplayDate()}`,
      dateActionLabel: this._todayDisplayDate(),
      optionLabel,
      actionLabel: `Déclarer ${formatStatusLabel(type)}`,
    };
  }

  _lastApplicationState() {
    const entity = this._applicationEntity();
    const rawState = String(entity?.state || "").trim();
    const normalizedState = rawState.toLowerCase();
    const hasApplication =
      Boolean(entity)
      && !isUnavailableState(rawState)
      && !["aucune application", "aucune application détectée"].includes(normalizedState);
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || "").trim();
    const when = String(attrs.last_application_when || "").trim() || (attrs.declared_at ? humanDateTimeText(attrs.declared_at) : "");
    const detailParts = [];
    if (when) {
      detailParts.push(when);
    }
    if (attrs.application_type) {
      detailParts.push(`Type: ${formatStatusLabel(attrs.application_type)}`);
    }
    if (attrs.application_irrigation_mode) {
      detailParts.push(`Mode: ${formatStatusLabel(attrs.application_irrigation_mode)}`);
    }
    let history = Array.isArray(attrs.application_history)
      ? attrs.application_history.filter((item) => item && typeof item === "object")
      : [];
    if (!history.length && hasApplication) {
      history = [
        {
          libelle: String(attrs.libelle || attrs.produit || rawState || "Application").trim(),
          produit: String(attrs.produit || attrs.libelle || rawState || "Application").trim(),
          type: String(attrs.type || attrs.application_type || "").trim(),
          dose: String(attrs.dose || "").trim(),
          application_type: String(attrs.application_type || "").trim(),
          application_irrigation_mode: String(attrs.application_irrigation_mode || "").trim(),
          note: String(attrs.note || "").trim(),
          date_action: String(attrs.date_action || attrs.date || "").trim(),
          date: String(attrs.date || "").trim(),
          declared_at: attrs.declared_at || null,
        },
      ];
    }
    return {
      entity,
      hasApplication,
      label: hasApplication ? rawState : "Aucune application",
      summary: summary || (hasApplication ? "Dernière application enregistrée" : "Aucune application enregistrée"),
      detail: detailParts.join(" · "),
      productId: String(attrs.produit_id || "").trim() || null,
      productName: String(attrs.produit || attrs.libelle || "").trim() || null,
      when,
      history,
    };
  }

  _lastUserActionState() {
    const entity = this._lastUserActionEntity();
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || "").trim();
    const when = String(attrs.last_action_when || "").trim();
    const action = String(attrs.execution_action || "").trim();
    const reason = String(attrs.execution_reason || "").trim();
    const state = String(attrs.execution_state || entity?.state || "").trim();
    if (!entity || isUnavailableState(String(entity?.state || ""))) {
      return { entity, summary: "", when: "", action: "", reason: "", state: "" };
    }
    return {
      entity,
      summary: summary || action || state || "",
      when,
      action,
      reason,
      state,
    };
  }

  _objectiveEntity() {
    return this._entity("entity_objectif_arrosage");
  }

  _objectiveMm() {
    return this._entityNumber("entity_objectif_arrosage");
  }

  _assistantState() {
    const entity = this._assistantEntity();
    const attrs = entity?.attributes || {};
    const action = String(attrs.action || entity?.state || "").trim().toLowerCase();
    const actionLabel = formatStatusLabel(action || entity?.state || "non disponible");
    const moment = String(attrs.moment || "").trim().toLowerCase();
    const momentLabel = moment ? formatStatusLabel(moment) : "";
    const status = String(attrs.status || "").trim().toLowerCase();
    const reason = String(attrs.reason || "").trim();
    const quantityMm = asNumber(attrs.quantity_mm);
    const normalizedReason = reason.toLowerCase();
    const isMowingBusy = status === "blocked" && action === "tonte" && (
      normalizedReason.includes("déjà en cours")
      || normalizedReason.includes("en cours")
      || normalizedReason.includes("mower_mowing")
    );
    let tone = "neutral";
    if (status === "action_required") {
      tone = action.includes("arros") ? "accent" : "success";
    } else if (isMowingBusy) {
      tone = "warning";
    } else if (status.includes("block") || normalizedReason.includes("bloqu")) {
      tone = "danger";
    } else if (action.includes("surveil")) {
      tone = "warning";
    }
    // L'intégration émet action="none" (pas "aucune_action") au repos.
    const isPassiveState = action === "none" && moment === "attendre";
    const isBlockedByConditions = action === "none" && status === "blocked_due_to_conditions";
    const isBlockedMowing = status === "blocked" && action === "tonte" && (
      normalizedReason.includes("déjà en cours")
      || normalizedReason.includes("en cours")
      || normalizedReason.includes("mower_mowing")
    );
    const summary = isBlockedByConditions
      ? (momentLabel && moment !== "attendre"
          ? `Attendre ${momentLabel.toLowerCase()}`
          : "Attendre conditions favorables")
      : isPassiveState
      ? "Aucune action immédiate"
      : isBlockedMowing
        ? "Tonte en cours"
      : [
          actionLabel,
          momentLabel && moment !== "maintenant" ? momentLabel.toLowerCase() : moment === "maintenant" ? "maintenant" : "",
        ].filter(Boolean).join(" ");
    return {
      entity,
      action,
      actionLabel,
      moment,
      momentLabel,
      status,
      reason,
      quantityMm,
      tone,
      summary: summary || actionLabel,
      detail: reason || (quantityMm !== null && quantityMm > 0 ? `${formatMm(quantityMm)} demandés` : ""),
    };
  }

  _mowerState() {
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mower_operation_state
      || tonteAttrs.mower_operation_label
      || tonteAttrs.tondeuse_statut
      || tonteAttrs.tondeuse_statut_libelle
      ? tonteAttrs
      : fallbackAttrs;
    const status = String(
      attrs.mower_operation_state
      || attrs.tondeuse_statut
      || "",
    ).trim().toLowerCase();
    const operationLabel = normalizeOptionalDisplayValue(
      attrs.mower_operation_label
      || attrs.tondeuse_statut_libelle
      || formatStatusLabel(status || "non disponible"),
    );
    const battery = asNumber(attrs.tondeuse_batterie);
    const nextDeparture = normalizeOptionalDisplayValue(
      attrs.tondeuse_prochain_depart_display
      || humanDateTimeText(attrs.tondeuse_prochain_depart)
      || "",
    );
    const cuttingHeightMm = asNumber(attrs.tondeuse_hauteur_coupe_mm);
    const reason = normalizeOptionalDisplayValue(
      attrs.mower_reason_label
      || formatMowerReasonLabel(attrs.mower_reason_code)
      || attrs.tondeuse_raison
      || attrs.tondeuse_erreur_libelle
      || "",
    );
    const reasonCode = String(attrs.mower_reason_code || "").trim().toLowerCase();
    const hardBlockReason = ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(reasonCode);
    const name = String(attrs.tondeuse_nom || "").trim();
    const ready = attrs.tondeuse_prete;
    const connected = attrs.tondeuse_connectee;
    const coordinationEnabled = attrs.mower_coordination_enabled;
    const coordinationReady = attrs.mower_coordination_ready;
    const presenceState = String(attrs.mower_presence_state || "").trim().toLowerCase();
    let presenceLabel = normalizeOptionalDisplayValue(attrs.mower_presence_label || formatStatusLabel(presenceState || "non disponible"));
    if (presenceState === "dockee") {
      presenceLabel = "À la station";
    }
    const safeForWatering = attrs.mower_is_safe_for_watering;
    let label = operationLabel || "Non disponible";
    if (presenceState === "dockee" && presenceLabel) {
      label = presenceLabel;
    } else if (!operationLabel && presenceLabel) {
      label = presenceLabel;
    }

    if (
      !status
      && !operationLabel
      && battery === null
      && !nextDeparture
      && cuttingHeightMm === null
      && !reason
      && !presenceState
    ) {
      return {
        present: false,
      };
    }

    let tone = "neutral";
    // Vocabulaire réel de mower_operation_state (mower_coordination.py) :
    // unknown/charging/starting/tonte/transit/zoning/searching_zone/
    // escaped_digital_fence/rain_delayed/paused/error/idle.
    if (hardBlockReason || ["error", "erreur", "indisponible", "pluie", "unknown", "escaped_digital_fence"].includes(status) || coordinationReady === false) {
      tone = "danger";
    } else if (["charging", "en_charge", "retour_station", "retour", "transit", "starting", "zoning", "searching_zone", "rain_delayed", "paused", "pause"].includes(status) || presenceState === "retour") {
      tone = "warning";
    } else if (["mowing", "tonte", "tonte_en_cours"].includes(status)) {
      tone = "accent";
    } else if ((status === "idle" || status === "au_repos") && ready !== false) {
      tone = "success";
    }

    return {
      present: true,
      name,
      status,
      label: hardBlockReason ? (reason || label || "Non disponible") : (label || "Non disponible"),
      operationLabel: operationLabel || "Non disponible",
      tone,
      battery,
      nextDeparture,
      cuttingHeightMm,
      reason,
      reasonCode,
      ready,
      connected,
      coordinationEnabled,
      coordinationReady,
      presenceState,
      presenceLabel: presenceLabel || "Non disponible",
      safeForWatering: hardBlockReason && safeForWatering === undefined ? false : safeForWatering,
      sourceEntity: String(attrs.tondeuse_source_entity || "").trim(),
    };
  }

  _mowingBlockState() {
    const predictiveEntity = this._entity("entity_prochaine_tonte");
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const predictiveAttrs = predictiveEntity?.attributes || {};
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mowing_block_reason_code
      || tonteAttrs.mowing_block_reason_label
      || tonteAttrs.mowing_blocked_by_watering
      || tonteAttrs.mowing_cooldown_remaining_minutes !== undefined
      ? tonteAttrs
      : fallbackAttrs;
    const predictiveBlocked = predictiveAttrs.action_possible === false && Boolean(predictiveAttrs.block_reason || predictiveAttrs.reason || predictiveAttrs.summary);
    const blocked = predictiveBlocked || attrs.mowing_blocked_by_watering === true || Boolean(attrs.mowing_block_reason_code || attrs.mowing_block_reason_label);
    const reasonCode = String(predictiveAttrs.block_reason || attrs.mowing_block_reason_code || "").trim().toLowerCase();
    let reasonLabel = String(formatMowingBlockReason(reasonCode)).trim();
    // Pour « machine indisponible », le composant a déjà résolu un libellé précis
    // (« Robot déjà en tonte… », « Robot en charge… »). On le préfère au générique.
    // Les autres motifs (pluie, sol humide, post-produit, nuit, phase…) gardent
    // leur libellé court inchangé.
    if (reasonCode === "machine_unavailable") {
      const machineLabel = String(
        predictiveAttrs.machine_unavailable_label
        || attrs.machine_unavailable_label
        || predictiveAttrs.reason
        || "",
      ).trim();
      if (machineLabel) {
        reasonLabel = machineLabel;
      }
    }
    const reasonDetail = String(
      predictiveAttrs.reason
      || predictiveAttrs.summary
      || attrs.mowing_block_reason_label
      || reasonLabel,
    ).trim();
    const cooldownRemainingMinutes = asNumber(attrs.mowing_cooldown_remaining_minutes);
    const postApplicationActive = attrs.mowing_post_application_active === true;
    const detail = [
      reasonDetail,
      cooldownRemainingMinutes !== null && cooldownRemainingMinutes > 0 ? `Encore ${formatDurationHuman(cooldownRemainingMinutes)}` : "",
    ].filter(Boolean).join(" · ");
    let tone = "neutral";
    if (blocked) {
      tone = reasonCode === "watering_cooldown" ? "warning" : "danger";
    } else if (cooldownRemainingMinutes !== null && cooldownRemainingMinutes > 0) {
      tone = "warning";
    }
    return {
      blocked,
      reasonCode,
      reasonLabel,
      reasonDetail,
      cooldownRemainingMinutes,
      postApplicationActive,
      detail,
      tone,
    };
  }

  _windowState() {
    const entity = this._windowEntity();
    const attrs = entity?.attributes || {};
    const publicState = String(entity?.state || "").trim().toLowerCase();
    const status = String(attrs.status || publicState).trim().toLowerCase();
    const summary = String(attrs.summary || entity?.state || "Irrigation prévue").trim();
    const reasonSummary = String(attrs.window_reason_summary || "").trim();
    const nextAction = String(attrs.next_action || "").trim();
    const nextActionDisplay = String(attrs.next_action_display || "").trim();
    const nextActionDate = String(attrs.next_action_date || "").trim();
    const blockReason = String(attrs.block_reason || "").trim();
    // Libellé fourni par l'intégration en priorité (couvre tous les motifs émis,
    // ex. « pluie prévue suffisante ») ; repli sur le formatage local.
    const blockReasonLabel = String(attrs.block_reason_label || "").trim()
      || formatWateringBlockReason(blockReason);
    const objective = this._objectiveMm() ?? 0;
    const typeArrosage = String(this._entityState("entity_type_arrosage", "") || "").trim();
    const wateringCause = this._inferWateringCause({ entity, attrs, typeArrosage });
    const isPostApplication = wateringCause === "post_application";
    const wateringWindowDisplay = String(attrs.watering_window_display || "").trim();
    const optimalWindowDisplay = String(attrs.optimal_window_display || "").trim();
    const eveningWindowDisplay = String(attrs.evening_window_display || "").trim();
    const isAwaiting = status === "en_attente" || (!isPostApplication && publicState === "attendre");
    const showManualAction = isPostApplication ? status === "autorise" : objective > 0 && status === "auto";
    const isBlocked = status === "bloque";
    const isNoActionRequired = !isPostApplication && !isBlocked && !isAwaiting && !showManualAction && objective <= 0;
    const displaySummary = isBlocked
      ? (isPostApplication ? "Arrosage post-produit bloqué" : "Irrigation bloquée")
      : (reasonSummary || summary);
    const normalizedBlockedAction = String(nextActionDisplay || nextAction || "").trim().toLowerCase();
    const blockedFallbackAction = publicState === "apres_pluie"
      ? "Attendre après la pluie"
      : blockReasonLabel
        ? `Attendre: ${blockReasonLabel}`
        : "Attendre des conditions favorables";
    const displayNextAction = isBlocked
      ? (
          !normalizedBlockedAction
          || normalizedBlockedAction === "attendre la fin du bloc"
            ? blockedFallbackAction
            : (nextActionDisplay || nextAction)
        )
      : nextActionDisplay || nextAction || "";
    let tone = statusTone(status);
    if (isPostApplication) {
      if (status === "auto" || status === "autorise") {
        tone = "success";
      } else if (isAwaiting) {
        tone = "warning";
      } else if (isBlocked) {
        tone = "danger";
      } else {
        tone = "neutral";
      }
    } else if (isNoActionRequired) {
      tone = "neutral";
    } else if (["maintenant", "ce_matin"].includes(publicState)) {
      tone = "success";
    } else if (["demain_matin", "apres_pluie", "soir"].includes(publicState)) {
      tone = "accent";
    } else if (publicState === "attendre") {
      tone = objective > 0 ? "warning" : "neutral";
    }
    let statusLabel = formatStatusLabel(publicState || status);
    if (isPostApplication) {
      if (status === "auto") {
        statusLabel = "Post-produit auto";
      } else if (status === "autorise") {
        statusLabel = "Post-produit autorisé";
      } else if (status === "en_attente") {
        statusLabel = "Post-produit en attente";
      } else if (status === "bloque") {
        statusLabel = "Post-produit bloqué";
      } else {
        statusLabel = formatWateringCauseLabel(wateringCause);
      }
    }
    return {
      entity,
      status,
      publicState,
      wateringCause,
      isPostApplication,
      summary,
      reasonSummary,
      displaySummary,
      nextAction,
      nextActionDisplay,
      displayNextAction,
      nextActionDate,
      blockReason,
      blockReasonLabel,
      objective,
      wateringWindowDisplay,
      optimalWindowDisplay,
      eveningWindowDisplay,
      wateringEveningAllowed: Boolean(attrs.watering_evening_allowed),
      showManualAction,
      isAwaiting,
      isBlocked,
      isNoActionRequired,
      tone,
      statusLabel,
      rawStatus: attrs.status,
      autoIrrigationEnabled: attrs.auto_irrigation_enabled,
    };
  }

  _planState() {
    const entity = this._planEntity();
    const attrs = entity?.attributes || {};
    const summary = String(attrs.summary || entity?.state || "").trim();
    const durationHuman = String(attrs.duration_human || "").trim();
    const zoneCount = asNumber(attrs.zone_count);
    const objectiveMm = asNumber(attrs.objective_mm);
    const planType = String(attrs.plan_type || "").trim();
    const passages = asNumber(attrs.passages);
    const planState = {
      entity,
      summary: summary || "Aucun plan d'arrosage",
      durationHuman: durationHuman || formatDurationHuman(attrs.total_duration_min ?? entity?.state),
      zoneCount: zoneCount ?? 0,
      objectiveMm: objectiveMm ?? 0,
      planType: planType || "no_plan",
      passages: passages ?? 1,
      fractionation: Boolean(attrs.fractionation),
      isRuntimeFallback: false,
    };
    const wateringProgress = this._wateringProgressState();
    if (!wateringProgress.active || planState.planType !== "no_plan") {
      return planState;
    }
    const progressEntity = this._wateringProgressEntity();
    const progressAttrs = progressEntity?.attributes || {};
    const runtimeZoneCount = asNumber(progressAttrs.zone_count) ?? wateringProgress.zoneCount ?? 0;
    const runtimePassages = asNumber(progressAttrs.passage_count) ?? 1;
    const currentPassage = asNumber(progressAttrs.current_passage);
    const plannedTotalSeconds = asNumber(progressAttrs.planned_total_seconds) ?? 0;
    const targetMm = asNumber(progressAttrs.target_mm);
    const summaryParts = [
      runtimeZoneCount > 0 ? `${runtimeZoneCount} zone${runtimeZoneCount > 1 ? "s" : ""}` : "",
      runtimePassages > 1 && currentPassage ? `Passage ${currentPassage}/${runtimePassages}` : "Cycle en cours",
    ].filter(Boolean);
    return {
      ...planState,
      summary: summaryParts.join(" · ") || "Cycle en cours",
      durationHuman: plannedTotalSeconds > 0 ? formatDurationHuman(plannedTotalSeconds / 60.0) : planState.durationHuman,
      zoneCount: runtimeZoneCount,
      objectiveMm: targetMm ?? planState.objectiveMm,
      planType: runtimeZoneCount > 1 ? "multi_zone" : runtimeZoneCount === 1 ? "single_zone" : planState.planType,
      passages: runtimePassages,
      fractionation: runtimePassages > 1,
      isRuntimeFallback: true,
    };
  }

  _weatherState() {
    const entity = this._weatherEntity();
    if (!entity || isUnavailableState(entity.state)) {
      return null;
    }
    const condition = String(entity.state || "").trim().toLowerCase();
    const temperature = asNumber(entity.attributes?.temperature);
    const temperatureLabel = temperature === null ? "" : `${formatNumber(temperature, 1)} °C`;
    const label = formatWeatherConditionLabel(condition);
    const summary = [label, temperatureLabel].filter(Boolean).join(" · ");
    if (!summary) {
      return null;
    }
    return {
      entity,
      condition,
      label,
      summary,
      icon: weatherIconForState(condition),
      tone: weatherToneForState(condition),
      temperature,
      temperatureLabel,
    };
  }

  _wateringProgressEntity() {
    return this._entity("entity_arrosage_en_cours");
  }

  _friendlyZoneLabel(zoneId) {
    const entityId = String(zoneId || "").trim();
    if (!entityId) {
      return "Zone";
    }
    const stateObj = this._hass?.states?.[entityId];
    const friendlyName = String(stateObj?.attributes?.friendly_name || "").trim();
    if (friendlyName) {
      return friendlyName;
    }
    const objectId = entityId.includes(".") ? entityId.split(".").slice(1).join(".") : entityId;
    const zoneMatch = objectId.match(/zone[_-]?(\d+)/i);
    if (zoneMatch) {
      return `Zone ${zoneMatch[1]}`;
    }
    return objectId
      .replace(/[_-]+/g, " ")
      .trim()
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || entityId;
  }

  _activeZoneLabels(attrs) {
    const labelValue = attrs.active_zone_labels;
    if (Array.isArray(labelValue)) {
      const labels = labelValue.map((item) => String(item || "").trim()).filter(Boolean);
      if (labels.length) {
        return labels;
      }
    }
    const activeValue = attrs.active_zones;
    if (Array.isArray(activeValue)) {
      return activeValue.map((zoneId) => this._friendlyZoneLabel(zoneId)).filter(Boolean);
    }
    return [];
  }

  _estimatedWateringTotalSeconds() {
    const entity = this._planEntity();
    const attrs = entity?.attributes || {};
    const zones = Array.isArray(attrs.zones) ? attrs.zones : [];
    let totalSeconds = 0;
    for (const zone of zones) {
      if (!zone || typeof zone !== "object") {
        continue;
      }
      const durationSeconds = asNumber(zone.duration_seconds);
      if (durationSeconds !== null && durationSeconds > 0) {
        totalSeconds += durationSeconds;
        continue;
      }
      const durationMin = asNumber(zone.duration_min);
      if (durationMin !== null && durationMin > 0) {
        totalSeconds += durationMin * 60.0;
      }
    }
    if (totalSeconds <= 0) {
      const totalDurationMin = asNumber(attrs.total_duration_min);
      if (totalDurationMin !== null && totalDurationMin > 0) {
        totalSeconds = totalDurationMin * 60.0;
      }
    }
    const passages = Math.max(1, asNumber(attrs.passages) ?? 1);
    const pauseMinutes = Math.max(0, asNumber(attrs.pause_between_passages_minutes) ?? 0);
    // total_duration_min / la somme des durées de zone correspondent DÉJÀ au temps
    // d'arrosage total sur l'ensemble des passages — on n'ajoute donc QUE les pauses
    // inter-passages. (Avant : on multipliait le flux par `passages`, d'où un « restant »
    // ~2-3× trop élevé, ex. 166 min au lieu de ~82.)
    if (totalSeconds > 0 && passages > 1) {
      totalSeconds = totalSeconds + (pauseMinutes * 60.0 * (passages - 1));
    }
    return totalSeconds > 0 ? totalSeconds : 0;
  }

  _wateringProgressState() {
    const entity = this._wateringProgressEntity();
    const attrs = entity?.attributes || {};
    const active = Boolean(attrs.active);
    if (!entity || !active) {
      return {
        active: false,
        progressPercent: 0,
        summary: "Aucune irrigation en cours",
        detail: "Aucune session active",
      };
    }

    const startedAtRaw = String(attrs.started_at_utc || "").trim();
    const startedAt = startedAtRaw ? Date.parse(startedAtRaw) : NaN;
    // Total de référence = celui calculé par l'intégration (inclut les pauses) s'il est
    // disponible ; sinon repli sur l'estimation à partir du plan.
    const plannedTotalFromAttrs = asNumber(attrs.planned_total_seconds);
    const totalSeconds = plannedTotalFromAttrs !== null && plannedTotalFromAttrs > 0
      ? plannedTotalFromAttrs
      : this._estimatedWateringTotalSeconds();
    const elapsedSeconds = Number.isFinite(startedAt)
      ? Math.max(0, (Date.now() - startedAt) / 1000)
      : asNumber(attrs.elapsed_seconds) ?? 0;
    const progressPercent = totalSeconds > 0
      ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
      : asNumber(attrs.progress_percent) ?? asNumber(entity.state) ?? 0;
    const remainingSeconds = totalSeconds > 0 ? Math.max(totalSeconds - elapsedSeconds, 0) : asNumber(attrs.remaining_seconds) ?? 0;
    const activeZoneCount = asNumber(attrs.active_zone_count) ?? 0;
    const zoneCount = asNumber(attrs.zone_count) ?? activeZoneCount;
    const activeZoneLabels = this._activeZoneLabels(attrs);
    const startedAtLabel = String(attrs.started_at || "").trim() || (startedAtRaw ? humanDateTimeText(startedAtRaw) : "");
    const currentPassage = asNumber(attrs.current_passage);
    const passageCount = asNumber(attrs.passage_count);
    const plannedTotalSeconds = asNumber(attrs.planned_total_seconds) ?? 0;
    const detailParts = [];
    if (startedAtLabel) {
      detailParts.push(`Démarré ${startedAtLabel}`);
    }
    detailParts.push(`${activeZoneCount} zone${activeZoneCount > 1 ? "s" : ""} active${activeZoneCount > 1 ? "s" : ""}`);
    if (activeZoneLabels.length) {
      const zonePrefix = activeZoneLabels.length > 1 ? "Zones en cours" : "Zone en cours";
      detailParts.push(`${zonePrefix} ${activeZoneLabels.join(", ")}`);
    }
    if (currentPassage && passageCount && passageCount > 1) {
      detailParts.push(`Passage ${currentPassage}/${passageCount}`);
    }
    if (totalSeconds > 0) {
      detailParts.push(`Restant ${formatDurationHuman(remainingSeconds / 60.0)}`);
    }
    const summary = `Irrigation en cours ${formatNumber(progressPercent, 0) || 0}%`;
    return {
      active: true,
      progressPercent,
      remainingSeconds,
      elapsedSeconds,
      summary,
      detail: detailParts.join(" · "),
      startedAtLabel,
      activeZoneCount,
      activeZoneLabels,
      zoneCount,
      currentPassage,
      passageCount: passageCount ?? 1,
      plannedTotalSeconds,
      critical: progressPercent >= 90,
    };
  }

  _hasActiveWateringProgress() {
    return this._wateringProgressState().active;
  }

  _clearWateringProgressTimer() {
    if (this._wateringProgressTimer !== null) {
      window.clearInterval(this._wateringProgressTimer);
      this._wateringProgressTimer = null;
    }
  }

  _syncWateringProgressTimer() {
    if (typeof window === "undefined") {
      return;
    }
    if (this._hasActiveWateringProgress()) {
      if (this._wateringProgressTimer === null) {
        this._wateringProgressTimer = window.setInterval(() => {
          if (!this.isConnected) {
            return;
          }
          this._refreshWateringProgressSection();
        }, 5000);
      }
      return;
    }
    this._clearWateringProgressTimer();
  }

  _refreshWateringProgressSection() {
    if (!this.shadowRoot) {
      return;
    }
    const progressState = this._wateringProgressState();
    const sections = Array.from(this.shadowRoot.querySelectorAll('[data-watering-progress="section"]'));
    if (!sections.length) {
      return;
    }
    if (!progressState.active) {
      this._render();
      return;
    }
    const percent = Math.max(0, Math.min(100, asNumber(progressState.progressPercent) ?? 0));
    const remainingSeconds = Math.max(0, asNumber(progressState.remainingSeconds) ?? 0);
    const remainingLabel =
      progressState.remainingSeconds !== undefined && progressState.remainingSeconds !== null
        ? formatDurationHuman(remainingSeconds / 60.0)
        : "0 min";
    const summary = String(progressState.summary || "Irrigation en cours").trim();
    const detail = String(progressState.detail || "").trim();
    const activeZoneLabels = Array.isArray(progressState.activeZoneLabels) ? progressState.activeZoneLabels.filter(Boolean) : [];
    const activeZoneLabel = activeZoneLabels.join(" · ");
    const metaParts = [];
    if (progressState.startedAtLabel) {
      metaParts.push(progressState.startedAtLabel);
    }
    if (detail) {
      metaParts.push(detail);
    }
    if (remainingSeconds > 0) {
      metaParts.push(`${remainingLabel} restants`);
    }
    const metaText = metaParts.join(" · ") || "Session active";
    sections.forEach((section) => {
      const percentNode = section.querySelector('[data-watering-progress="percent"]');
      if (percentNode) {
        percentNode.textContent = `${Math.round(percent)} %`;
      }
      const summaryNode = section.querySelector('[data-watering-progress="summary"]');
      if (summaryNode) {
        summaryNode.textContent = summary;
      }
      const zoneNode = section.querySelector('[data-watering-progress="zone"]');
      if (zoneNode) {
        if (activeZoneLabel) {
          zoneNode.hidden = false;
          zoneNode.textContent = `Zone active · ${activeZoneLabel}`;
        } else {
          zoneNode.hidden = true;
          zoneNode.textContent = "";
        }
      }
      const progressNode = section.querySelector('[data-watering-progress="progress"]');
      if (progressNode) {
        progressNode.setAttribute("aria-label", summary);
      }
      const barNode = section.querySelector('[data-watering-progress="bar"]');
      if (barNode) {
        barNode.style.width = `${percent}%`;
        barNode.classList.toggle("gi-progress__bar--critical", Boolean(progressState.critical));
      }
      const metaNode = section.querySelector('[data-watering-progress="meta"]');
      if (metaNode) {
        metaNode.textContent = metaText;
      }
    });
  }

  _lastWateringState() {
    const entity = this._lastWateringEntity();
    if (!entity) {
      return {
        label: "Aucune irrigation détectée",
        detail: "Historique vide",
        value: null,
      };
    }
    const rawValue = asNumber(entity.state);
    const source = String(entity.attributes?.source || "").trim();
    const wateringCause = this._inferWateringCause({ entity, source });
    const dateAction = String(entity.attributes?.date_action || entity.attributes?.detected_at || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (source === "none" || rawValue === null || rawValue <= 0) {
      return {
        label: "Aucune irrigation détectée",
        detail: "Historique vide",
        value: null,
      };
    }
    const fragments = [];
    const sourceLabel = this._wateringSourceLabel(source, wateringCause);
    if (sourceLabel) {
      fragments.push(sourceLabel);
    }
    if (dateAction) {
      fragments.push(dateAction);
    }
    if (zoneCount !== null) {
      fragments.push(`${zoneCount} zone${zoneCount > 1 ? "s" : ""}`);
    }
    return {
      label: formatMm(rawValue),
      detail: fragments.join(" · "),
      value: rawValue,
      source,
      wateringCause,
    };
  }

  _lastWateringTotalState() {
    const entity = this._entity("entity_dernier_arrosage_total_zones");
    if (!entity) {
      return { label: "", detail: "", value: null };
    }
    const rawValue = asNumber(entity.state);
    const summary = String(entity.attributes?.summary || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (rawValue === null || rawValue <= 0) {
      return { label: "", detail: "", value: null };
    }
    return {
      label: formatMm(rawValue),
      detail: [
        zoneCount !== null ? `${zoneCount} zone${zoneCount > 1 ? "s" : ""}` : "",
        summary,
      ].filter(Boolean).join(" · "),
      value: rawValue,
    };
  }

  _nextMowingState() {
    const predictiveEntity = this._entity("entity_prochaine_tonte");
    if (predictiveEntity) {
      const attrs = predictiveEntity.attributes || {};
      const actionPossible = attrs.action_possible !== undefined ? Boolean(attrs.action_possible) : null;
      const normalized = (value) => {
        const text = String(value || "").trim();
        if (!text) {
          return "";
        }
        return text.toLowerCase() === "unavailable" ? "" : text;
      };
      const sensorState = normalized(predictiveEntity.state);
      const label = String(
        normalized(attrs.target_datetime_display)
        || normalized(attrs.target_display)
        || normalized(attrs.target_date)
        || sensorState
        || "",
      ).trim();
      const detail = compactDecisionText(String(attrs.reason || attrs.summary || "").trim(), { maxLength: 132 });
      const blockReason = String(attrs.block_reason || attrs.reason || "").trim().toLowerCase();
      const tone = actionPossible === true
        ? "success"
        : blockReason
          ? (blockReason.startsWith("phase_") ? "danger" : "warning")
          : "neutral";
      if (label) {
        return {
          label,
          detail,
          tone,
          value: label,
        };
      }
    }

    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || tonteAutoriseeEntity?.attributes || {};
    const mowerState = this._mowerState();
    const mowingBlock = this._mowingBlockState();
    const gazonPermetTonte = tonteAttrs.gazon_permet_tonte !== undefined
      ? Boolean(tonteAttrs.gazon_permet_tonte)
      : this._entityState("entity_tonte_autorisee", null) === "on";
    const machinePermetTonte = tonteAttrs.machine_permet_tonte !== undefined
      ? Boolean(tonteAttrs.machine_permet_tonte)
      : mowerState.present ? mowerState.ready === true : false;
    const actionPossible = tonteAttrs.action_possible !== undefined
      ? Boolean(tonteAttrs.action_possible)
      : gazonPermetTonte && machinePermetTonte && !mowingBlock.blocked;
    const nextDisplay = String(
      tonteAttrs.next_mowing_display
      || tonteAttrs.next_mowing_date
      || mowerState.nextDeparture
      || "",
    ).trim();
    if (actionPossible) {
      return {
        label: "Maintenant",
        detail: mowerState.present ? (mowerState.reason || "Terrain et machine prêts") : "Terrain prêt",
        tone: "success",
        value: "now",
      };
    }
    if (nextDisplay) {
      return {
        label: nextDisplay,
        detail: mowingBlock.reasonLabel || mowingBlock.detail || mowerState.reason || "",
        tone: mowingBlock.blocked ? "warning" : "neutral",
        value: nextDisplay,
      };
    }
    return {
      label: "À estimer",
      detail: mowingBlock.reasonLabel || mowerState.reason || "Aucune fenêtre de tonte calculée",
      tone: mowingBlock.blocked ? "warning" : "neutral",
      value: null,
    };
  }

  _nextWateringState() {
    const predictiveEntity = this._entity("entity_prochain_arrosage");
    if (predictiveEntity) {
      const attrs = predictiveEntity.attributes || {};
      const normalized = (value) => {
        const text = String(value || "").trim();
        if (!text) {
          return "";
        }
        return text.toLowerCase() === "unavailable" ? "" : text;
      };
      const stateValue = normalized(predictiveEntity.state);
      const lowerState = stateValue.toLowerCase();
      const hasBlock = String(attrs.block_reason || "").trim().length > 0;
      const noAction = lowerState.includes("non requis");
      const label = String(
        noAction || hasBlock
          ? stateValue
          : (
            normalized(attrs.target_display)
            || normalized(attrs.target_datetime)
            || normalized(attrs.target_window_label)
            || normalized(attrs.target_window)
            || stateValue
            || ""
          ),
      ).trim();
      const detail = String(
        attrs.summary
        || attrs.next_action
        || attrs.block_reason_label
        || attrs.block_reason
        || "",
      ).trim();
      const isNoAction = noAction || detail.toLowerCase().includes("aucun arrosage nécessaire");
      const tone = isNoAction
        ? "neutral"
        : hasBlock
          ? "warning"
          : lowerState.includes("maintenant") || lowerState.includes("en cours")
            ? "accent"
            : "neutral";
      if (label) {
        return {
          label,
          detail,
          tone,
          value: label,
        };
      }
    }

    const nextWindowEntity = this._entity("entity_prochaine_fenetre_optimale");
    const windowState = this._windowState();
    const wateringProgress = this._wateringProgressState();
    if (wateringProgress.active) {
      return {
        label: "En cours",
        detail: wateringProgress.detail || wateringProgress.summary,
        tone: "accent",
        value: "active",
      };
    }
    const nextWindowState = String(nextWindowEntity?.state || "").trim().toLowerCase();
    const nextWindowLabel = formatStatusLabel(nextWindowState);
    const nextWindowSummary = String(nextWindowEntity?.attributes?.summary || "").trim();
    const nextActionDate = String(windowState.nextActionDate || "").trim();
    const windowLabel = windowState.optimalWindowDisplay || windowState.wateringWindowDisplay || "";
    if (windowState.isNoActionRequired) {
      return {
        label: "Non requis",
        detail: windowState.displaySummary || nextWindowSummary || "Aucun arrosage nécessaire",
        tone: "neutral",
        value: null,
      };
    }
    if (nextActionDate || windowLabel || nextWindowState) {
      return {
        label: nextActionDate || windowLabel || nextWindowLabel,
        detail: compactDecisionText(windowState.displayNextAction || nextWindowSummary || windowState.summary, { maxLength: 120 }),
        tone: windowState.tone,
        value: nextActionDate || windowLabel || nextWindowState,
      };
    }
    return {
      label: windowState.statusLabel || "À définir",
      detail: compactDecisionText(windowState.displaySummary || windowState.summary || "Aucune fenêtre d'arrosage calculée", { maxLength: 120 }),
      tone: windowState.tone,
      value: null,
    };
  }

  _objectiveContext() {
    const entity = this._objectiveEntity();
    const temperature = asNumber(entity?.attributes?.temperature);
    const etp = asNumber(entity?.attributes?.etp);
    const risk = this._entityState("entity_risque", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const hydricState = String(entity?.attributes?.hydric_state || "").trim();
    const hydricStrategy = String(entity?.attributes?.hydric_strategy || "").trim();
    const hydricBalanceLevel = String(entity?.attributes?.hydric_balance_level || "").trim();
    const reserveActuelle = asNumber(entity?.attributes?.reserve_actuelle_mm);
    const reserveStock = asNumber(entity?.attributes?.reserve_stock_mm);
    const reserveStockMax = asNumber(entity?.attributes?.reserve_stock_max_mm);
    const reserveUsefulMax = asNumber(entity?.attributes?.reserve_utile_max_mm ?? entity?.attributes?.reserve_utile_mm);
    const reserveSurplus = asNumber(entity?.attributes?.reserve_surplus_mm);
    const depletionMm = asNumber(entity?.attributes?.depletion_mm);
    const depletionRatio = asNumber(entity?.attributes?.depletion_ratio);
    const madRatio = asNumber(entity?.attributes?.mad_ratio);
    const et0 = asNumber(entity?.attributes?.et0_mm);
    const etc = asNumber(entity?.attributes?.etc_mm);
    const kc = asNumber(entity?.attributes?.kc_gazon);
    return {
      entity,
      temperature,
      etp,
      risk,
      mode,
      typeArrosage,
      hydricState,
      hydricStrategy,
      hydricBalanceLevel,
      reserveActuelle,
      reserveStock,
      reserveStockMax,
      reserveUsefulMax,
      reserveSurplus,
      depletionMm,
      depletionRatio,
      madRatio,
      et0,
      etc,
      kc,
    };
  }

  _autoBlockageState() {
    const entity = this._entity("entity_arrosage_auto_blocage");
    if (!entity) {
      return { present: false };
    }
    const attrs = entity.attributes || {};
    const blocked = attrs.bloque === true;
    const safetyLock = attrs.safety_lock_actif === true;
    const code = String(attrs.code || "").trim();
    const reason = String(entity.state || "").trim();
    const why = String(attrs.pourquoi || "").trim();
    const howToUnblock = String(attrs.comment_debloquer || "").trim();
    return {
      present: true,
      entity,
      blocked,
      safetyLock,
      code,
      reason: reason && reason.toLowerCase() !== "unknown" ? reason : "",
      why,
      howToUnblock,
      tone: safetyLock ? "danger" : blocked ? "warning" : "success",
    };
  }

  _irrigationSignalState() {
    const entity = this._entity("entity_signal_irrigation");
    const attrs = entity?.attributes || {};
    const reasonKind = String(attrs.reason_kind || "").trim().toLowerCase();
    const actionLabel = formatIrrigationSignalLabel({
      actionLabel: attrs.action_label,
      summary: attrs.summary,
      reasonKind,
    });
    const summary = String(attrs.summary || "").trim() || actionLabel || "Non disponible";
    const sourceStatus = String(attrs.source_status || "").trim();
    const triggerKind = String(attrs.trigger_kind || "").trim();
    const typeArrosage = String(attrs.type_arrosage || "").trim();
    const applicationStatus = String(attrs.application_post_watering_status || "").trim();
    const wateringBlockedByMower = attrs.watering_blocked_by_mower === true;
    const wateringBlockReasonCode = String(attrs.watering_block_reason_code || "").trim().toLowerCase();
    const wateringBlockReasonLabel = String(
      attrs.watering_block_reason_label
      || formatWateringBlockReason(wateringBlockReasonCode),
    ).trim();
    const wateringCause = this._inferWateringCause({ entity, attrs, typeArrosage });
    return {
      entity,
      reasonKind,
      actionLabel,
      summary,
      sourceStatus,
      triggerKind,
      wateringCause,
      typeArrosage,
      applicationStatus,
      wateringBlockedByMower,
      wateringBlockReasonCode,
      wateringBlockReasonLabel,
      tone: formatIrrigationSignalTone({ reasonKind, triggerKind }),
    };
  }

  _manualActionService() {
    const service = String(this._config?.manual_action_service || "").trim();
    if (!service) {
      return "gazon_intelligent.start_manual_irrigation";
    }
    return service;
  }

  _serviceTargetEntityId() {
    return (
      this._entityId("entity_assistant") ||
      this._entityId("entity_mode") ||
      this._entityId("entity_conseil") ||
      this._entityId("entity_tonte")
    );
  }

  _manualActionLabel() {
    const label = String(this._config?.manual_action_label || "").trim();
    if (!label || label.toLowerCase() === "lancer l'arrosage manuel") {
      return "Irrigation manuelle";
    }
    return label;
  }

  _manualActionStyle() {
    return [
      "background: linear-gradient(135deg, color-mix(in srgb, var(--gazon-success-color) 88%, white) 0%, color-mix(in srgb, var(--gazon-water-color) 84%, white) 100%)",
      "border: 1px solid color-mix(in srgb, var(--gazon-success-color) 52%, var(--divider-color))",
      "color: var(--primary-text-color)",
      "box-shadow: 0 12px 24px color-mix(in srgb, var(--gazon-success-color) 22%, transparent), 0 0 0 1px color-mix(in srgb, var(--gazon-success-color) 16%, transparent)",
    ].join("; ");
  }

  _canShowLegacyDetails() {
    return Boolean(this._config?.show_advanced_details);
  }

  _isPreviewMode() {
    if (typeof window === "undefined") {
      return false;
    }
    const pathname = String(window.location?.pathname || "");
    return pathname.includes("/config/lovelace");
  }

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize, tabPalette }) {
    if (!this.style) {
      return;
    }
    const palette = tabPalette || this._tabPalette(this._activeTab);
    const vars = {
      "--gazon-accent-color": accent,
      // Pilote l'accent du look moderne (pastilles, onglets, héro). Vide → repli sur
      // le vert de marque. Mettre `var(--primary-color)` pour suivre le thème HA.
      "--gazon-brand-accent": this._config?.accent_color || undefined,
      "--gazon-card-accent": accent,
      "--gazon-card-tone-color": accent,
      "--gazon-card-tone": activeTone,
      "--gazon-section-accent": sectionAccent,
      "--gazon-lawn-color": `color-mix(in srgb, ${sectionAccent} 62%, #80da67)`,
      "--gazon-water-color": `color-mix(in srgb, ${accent} 42%, #44c8ea)`,
      "--gazon-moss-color": `color-mix(in srgb, ${sectionAccent} 74%, #4d9f58)`,
      "--gi-soil-color": `color-mix(in srgb, ${accent} 18%, #b8865d)`,
      "--gi-tab-accent": palette.accent,
      "--gi-tab-companion": palette.companion,
      "--gi-tab-glow-color": palette.glow,
      "--gi-tab-mist-color": palette.mist,
      "--gi-tab-shadow": `0 18px 36px color-mix(in srgb, ${palette.glow} 16%, transparent)`,
      "--gazon-danger-color": STATUS_COLORS.danger,
      "--gazon-warning-color": STATUS_COLORS.warning,
      "--gazon-success-color": STATUS_COLORS.success,
      "--gazon-neutral-color": STATUS_COLORS.neutral,
      "--gazon-accent-tone-color": STATUS_COLORS.accent,
      "--gazon-critical-color": STATUS_COLORS.critical,
      "--gazon-border-radius": borderRadius,
      "--gazon-icon-size": iconSize,
      "--gazon-card-gap": this._config?.compact ? "10px" : "16px",
      "--gazon-card-padding": this._config?.compact ? "12px" : "18px",
    };

    Object.entries(vars).forEach(([name, value]) => {
      if (value === undefined || value === null || value === "") {
        this.style.removeProperty(name);
        return;
      }
      this.style.setProperty(name, String(value));
    });
  }

  _renderSignature() {
    if (!this._config) {
      return "no-config";
    }

    const keys = new Set([
      ...MINIMAL_PUBLIC_CONTRACT_ENTITY_KEYS,
      "entity_phase",
      "entity_sous_phase",
      "entity_tonte",
      "entity_hauteur",
      "entity_arrosage_en_cours",
      "entity_arrosage_recommande",
      "entity_arrosage_apres_application_autorise",
      "entity_debug_intervention",
      "entity_tonte_autorisee",
      "entity_niveau",
      "entity_risque",
      "entity_fenetre_optimale",
      "entity_weather",
      "entity_plan_arrosage",
      "entity_dernier_arrosage",
      "entity_derniere_application",
      "entity_conseil",
      "entity_action",
      "entity_avoid",
      "entity_objectif_arrosage",
      "entity_objectif_legacy",
      "entity_objectif_depletion",
      "entity_reserve_actuelle",
      "entity_depletion_ratio",
      "entity_etat_hydrique",
      "entity_et0",
      "entity_etc",
      "entity_type_arrosage",
      "entity_mode",
      "entity_switch_arrosage_automatique",
      "entity_switch_coordination_tondeuse",
      "entity_arrosage_en_cours",
      "entity_debit_zone_1",
      "entity_debit_zone_2",
      "entity_debit_zone_3",
      "entity_debit_zone_4",
      "entity_debit_zone_5",
      "entity_hauteur_min_tondeuse",
      "entity_hauteur_max_tondeuse",
      "entity_delai_reprise_tonte_apres_arrosage",
      "entity_catalogue_produits",
      "entity_produit_intervention",
    ]);

    if (this._canShowLegacyDetails()) {
      LEGACY_ENTITY_KEYS.forEach((key) => keys.add(key));
      ENTITY_KEYS.forEach((field) => keys.add(field.key));
    } else {
      if (this._activeTab === "mowing") {
        ["entity_tonte", "entity_hauteur", "entity_tonte_autorisee", "entity_fenetre_optimale"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "gazon") {
        ["entity_assistant", "entity_phase", "entity_sous_phase", "entity_niveau", "entity_risque", "entity_conseil", "entity_action", "entity_avoid"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "products") {
        ["entity_catalogue_produits", "entity_produit_intervention", "entity_derniere_application"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "config") {
        [
          "entity_switch_arrosage_automatique",
          "entity_switch_coordination_tondeuse",
          "entity_arrosage_apres_application_autorise",
          "entity_tonte_autorisee",
          "entity_mode",
          "entity_debit_zone_1",
          "entity_debit_zone_2",
          "entity_debit_zone_3",
          "entity_debit_zone_4",
          "entity_debit_zone_5",
          "entity_hauteur_min_tondeuse",
          "entity_hauteur_max_tondeuse",
          "entity_delai_reprise_tonte_apres_arrosage",
        ].forEach((key) => keys.add(key));
      } else {
        [
          "entity_fenetre_optimale",
          "entity_plan_arrosage",
          "entity_dernier_arrosage",
          "entity_derniere_application",
          "entity_debug_intervention",
          "entity_assistant",
          "entity_conseil",
          "entity_action",
          "entity_avoid",
          "entity_objectif_arrosage",
          "entity_objectif_legacy",
          "entity_objectif_depletion",
          "entity_reserve_actuelle",
          "entity_depletion_ratio",
          "entity_etat_hydrique",
          "entity_et0",
          "entity_etc",
          "entity_type_arrosage",
          "entity_arrosage_en_cours",
          "entity_arrosage_recommande",
          "entity_arrosage_apres_application_autorise",
          "entity_tonte_autorisee",
          "entity_phase",
          "entity_sous_phase",
          "entity_niveau",
          "entity_tonte",
          "entity_hauteur",
        ].forEach((key) => keys.add(key));
      }
    }

    const snapshot = {
      activeTab: this._activeTab,
      activeSection: this._activeSection,
      preview: this._isPreviewMode(),
      config: {
        title: this._config.title,
        show_icons: Boolean(this._config.show_icons),
        show_header: Boolean(this._config.show_header),
        show_background: Boolean(this._config.show_background),
        minimal_mode: Boolean(this._config.minimal_mode),
        show_secondary_info: Boolean(this._config.show_secondary_info),
        show_advanced_details: Boolean(this._config.show_advanced_details),
        theme_mode: this._config.theme_mode,
        accent_color: this._config.accent_color,
        icon_size: this._config.icon_size,
        border_radius: this._config.border_radius,
        background_style: this._config.background_style,
      },
      entities: {},
    };

    [...keys].sort().forEach((key) => {
      const entity = this._entity(key);
      if (!entity) {
        snapshot.entities[key] = null;
        return;
      }
      const attrs = RENDER_SIGNATURE_ATTRS[key];
      const attributes = {};
      if (Array.isArray(attrs) && attrs.length > 0) {
        attrs.forEach((attr) => {
          if (entity.attributes?.[attr] !== undefined) {
            attributes[attr] = entity.attributes[attr];
          }
        });
      }
      snapshot.entities[key] = {
        state: entity.state,
        attributes,
      };
    });

    return JSON.stringify(snapshot);
  }

  _statusIcon(status) {
    switch (status) {
      case "bloque":
        return "mdi:cancel";
      case "en_attente":
        return "mdi:clock-outline";
      case "auto":
        return "mdi:check-circle-outline";
      default:
        return "mdi:information-outline";
    }
  }

  _renderTabNav() {
    return renderTabNav(this);
  }

  _renderStatCard(label, value, tone = "neutral", icon = null, secondary = "", interactive = false) {
    return renderCardCore({
      kind: "stat",
      label,
      value,
      tone,
      icon: this._config?.show_icons ? icon : null,
      secondary,
      interactive,
    });
  }

  _overviewFacts() {
    const windowState = this._windowState();
    const planState = this._planState();
    const assistant = this._assistantState();
    const conseil = this._entityState("entity_conseil", null);
    const irrigationSignal = this._irrigationSignalState();
    const intervention = this._interventionRecommendationState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const tonte = this._entityState("entity_tonte", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const risk = this._entityState("entity_risque", null);
    const afterApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(afterApplication);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const wateringCause = irrigationSignal.wateringCause || windowState.wateringCause || this._inferWateringCause({ typeArrosage });
    const niveauHydrique = String(this._entityAttribute("entity_niveau", "niveau_action_hydrique", "") || "").trim();
    const lastWatering = this._lastWateringState();
    const nextWatering = this._nextWateringState();
    const nextMowing = this._nextMowingState();
    const nextMowingEntity = this._entity("entity_prochaine_tonte");
    const nextMowingBlockReason = String(nextMowingEntity?.attributes?.block_reason || "").trim().toLowerCase();
    const height = this._entity("entity_hauteur");
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightSecondary =
      height && height.attributes?.hauteur_tonte_min_cm !== undefined && height.attributes?.hauteur_tonte_max_cm !== undefined
        ? `${formatCm(height.attributes.hauteur_tonte_min_cm)} → ${formatCm(height.attributes.hauteur_tonte_max_cm)}`
        : "";
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);

    const facts = [];
    const addFact = ({ label, value, tone = "neutral", icon = null, secondary = "", entityKey = null }) => {
      if (isEmpty(value)) {
        return;
      }
      facts.push({ label, value, tone, icon, secondary, entityKey });
    };

    const wateringFocus = objective > 0 || arrosageRecommande === "on" || windowState.isAwaiting || windowState.showManualAction || wateringCause === "post_application";
    const mowingFocus =
      computeTonteTone(tonte) !== "neutral" ||
      computeRisqueTone(risk) !== "neutral" ||
      tonteAutorisee === "off" ||
      !isEmpty(phase) ||
      !isEmpty(subPhase);
    const strongMowingFocus =
      nextMowingBlockReason.startsWith("phase_")
      || computeTonteTone(tonte) === "danger"
      || computeTonteTone(tonte) === "critical";
    const configFocus =
      switchState.tone !== "success" ||
      ["bloque", "en_attente", "non_autorise"].includes(afterApplicationInfo.kind) ||
      !isEmpty(mode);
    const stableState = !wateringFocus && !mowingFocus && !configFocus;

    const priorityGroup = [
      {
        label: "Assistant",
        value: assistant.summary || conseil || "Non disponible",
        tone: assistant.tone || computeActionTone(this._entityState("entity_niveau", null)),
        icon: "mdi:account-tie-hat-outline",
        secondary: assistant.detail || conseil || "",
        entityKey: "entity_assistant",
      },
      {
        label: "Niveau global",
        value: formatStatusLabel(this._entityState("entity_niveau", null)),
        tone: computeActionTone(this._entityState("entity_niveau", null)),
        icon: "mdi:signal",
        secondary: niveauHydrique ? `Hydrique: ${formatStatusLabel(niveauHydrique)}` : "",
        entityKey: "entity_niveau",
      },
    ];

    const waterGroup = [
      {
        label: "Irrigation",
        value: irrigationSignal.actionLabel || irrigationSignal.summary || formatRecommendationState(arrosageRecommande),
        tone: irrigationSignal.tone || (arrosageRecommande === "on" ? "success" : windowState.tone),
        icon: "mdi:sprinkler",
        secondary: [
          irrigationSignal.summary || windowState.displaySummary || planState.summary || objectiveLabel,
          wateringCause ? `Cause: ${formatWateringCauseLabel(wateringCause)}` : "",
        ].filter(Boolean).join(" · "),
        entityKey: "entity_signal_irrigation",
      },
      {
        label: "Prochain arrosage",
        value: nextWatering.label,
        tone: nextWatering.tone,
        icon: "mdi:clock-water-outline",
        secondary: nextWatering.detail,
        entityKey: "entity_prochain_arrosage",
      },
      {
        label: "Dernier arrosage",
        value: lastWatering.label,
        tone: lastWatering.value !== null ? "success" : "neutral",
        icon: "mdi:water-check",
        secondary: lastWatering.detail,
        entityKey: "entity_dernier_arrosage",
      },
    ];

    const mowingGroup = [
      {
        label: "Tonte",
        value: formatStatusLabel(tonte),
        tone: computeTonteTone(tonte),
        icon: "mdi:content-cut",
        secondary: heightValue !== "Non disponible" ? `Hauteur: ${heightValue}` : "",
        entityKey: "entity_tonte",
      },
      {
        label: "Prochaine tonte",
        value: nextMowing.label,
        tone: nextMowing.tone,
        icon: "mdi:calendar-clock",
        secondary: nextMowing.detail,
        entityKey: "entity_prochaine_tonte",
      },
      {
        label: "Risque",
        value: formatStatusLabel(risk),
        tone: computeRisqueTone(risk),
        icon: "mdi:shield-alert-outline",
        secondary: subPhase ? `Sous-phase: ${formatStatusLabel(subPhase)}` : "",
        entityKey: "entity_risque",
      },
      {
        label: "Hauteur",
        value: heightValue,
        tone: this._phaseTone(),
        icon: "mdi:ruler-square",
        secondary: heightSecondary,
        entityKey: "entity_hauteur",
      },
      {
        label: "Sous-phase",
        value: formatStatusLabel(subPhase),
        tone: phaseTone(phase),
        icon: "mdi:sprout",
        secondary: phase ? `Phase: ${formatStatusLabel(phase)}` : "",
        entityKey: "entity_sous_phase",
      },
    ];

    const configGroup = [
      {
        label: "Réglages",
        value: switchState.label,
        tone: switchState.tone,
        icon: "mdi:switch",
        secondary: !isEmpty(mode)
          ? `Mode: ${formatApplicationMode(mode)}`
          : afterApplication
            ? `Post-application: ${afterApplicationInfo.label}`
            : "",
        entityKey: "entity_switch_arrosage_automatique",
      },
      {
        label: "Dernier arrosage",
        value: lastWatering.label,
        tone: lastWatering.value !== null ? "success" : "neutral",
        icon: "mdi:water-check",
        secondary: lastWatering.detail,
        entityKey: "entity_dernier_arrosage",
      },
    ];

    const pushGroup = (group) => {
      for (const item of group) {
        if (facts.length >= 4) {
          return;
        }
        addFact(item);
      }
    };

    pushGroup(priorityGroup);

    if (strongMowingFocus) {
      pushGroup(mowingGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (wateringFocus) {
      pushGroup(waterGroup);
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (mowingFocus) {
      pushGroup(mowingGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    } else if (configFocus) {
      pushGroup(configGroup);
      if (facts.length < 4) {
        pushGroup(waterGroup);
      }
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
    } else if (stableState) {
      pushGroup(waterGroup);
      if (facts.length < 4) {
        pushGroup(mowingGroup);
      }
      if (facts.length < 4) {
        pushGroup(configGroup);
      }
    }

    if (facts.length < 4) {
      pushGroup([
        {
          label: "Intervention",
          value: intervention.entity ? (intervention.ui?.summary || "Intervention") : "Aucune intervention",
          tone: intervention.entity ? (intervention.ui?.tone || "neutral") : "neutral",
          icon: intervention.entity ? (intervention.ui?.icon || "mdi:spray-bottle") : "mdi:spray-bottle",
          secondary: intervention.entity ? (intervention.ui?.hint || intervention.reason || "") : "",
          entityKey: "entity_prochaine_intervention",
        },
      ]);
    }

    if (facts.length < 4) {
      pushGroup([
        {
          label: "Réglages",
          value: switchState.label,
          tone: switchState.tone,
          icon: "mdi:switch",
          secondary: !isEmpty(mode) ? `Mode: ${formatApplicationMode(mode)}` : "",
          entityKey: "entity_switch_arrosage_automatique",
        },
        {
          label: "Dernier arrosage",
          value: lastWatering.label,
          tone: lastWatering.value !== null ? "success" : "neutral",
          icon: "mdi:water-check",
          secondary: lastWatering.detail,
          entityKey: "entity_dernier_arrosage",
        },
      ]);
    }

    return facts.slice(0, 4);
  }

  _renderWateringProgressSection(progressState) {
    return renderWateringProgressSection(this, progressState);
  }

  _overviewProposal() {
    const windowState = this._windowState();
    const planState = this._planState();
    const assistant = this._assistantState();
    const irrigationSignal = this._irrigationSignalState();
    const intervention = this._interventionRecommendationState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const mowerState = this._mowerState();
    const tonte = this._entityState("entity_tonte", null);
    const risk = this._entityState("entity_risque", null);
    const conseil = this._entityState("entity_conseil", null);
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const arrosageApresApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(arrosageApresApplication);
    const wateringCause = irrigationSignal.wateringCause || windowState.wateringCause || this._inferWateringCause({ typeArrosage: this._entityState("entity_type_arrosage", null) });
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const tonteEntity = this._entity("entity_tonte");
    const prochaineTonteEntity = this._entity("entity_prochaine_tonte");
    const tonteAttrs = tonteEntity?.attributes || {};
    const nextMowingBlockReason = String(prochaineTonteEntity?.attributes?.block_reason || "").trim().toLowerCase();
    const tonteReason = String(
      prochaineTonteEntity?.attributes?.reason
      || prochaineTonteEntity?.attributes?.summary
      || tonteEntity?.attributes?.raison_blocage_tonte
      || tonteEntity?.attributes?.summary
      || "",
    ).trim();
    const assistantReason = String(assistant.reason || "").trim();
    const tonteNextMowing = String(
      mowerState.nextDeparture
      || tonteEntity?.attributes?.next_mowing_display
      || this._entity("entity_tonte_autorisee")?.attributes?.next_mowing_display
      || "",
    ).trim();
    const tonteStatusLabel = formatStatusLabel(tonte);
    const tonteTone = computeTonteTone(tonte);
    const strongMowingBlock =
      nextMowingBlockReason.startsWith("phase_")
      || tonteTone === "danger"
      || tonteTone === "critical";
    const interventionSignal = this._entity("entity_signal_intervention");
    const actionTone = this._actionTone();

    let title = "Vue d’ensemble";
    let hint = compactDecisionText(conseil || planState.summary || windowState.summary || "Les paramètres restent cohérents.", { maxLength: 150 });
    let tone = "neutral";
    let icon = "mdi:check-circle-outline";
    const mowingBusy = assistant.status === "blocked" && assistant.action === "tonte" && (
      assistantReason.toLowerCase().includes("déjà en cours")
      || assistantReason.toLowerCase().includes("en cours")
      || tonteReason.toLowerCase().includes("déjà en cours")
      || tonteReason.toLowerCase().includes("en cours")
      || mowerState.tone === "accent"
      || mowerState.operationLabel === "Tonte en cours"
    );
    const mowingActionPossible = tonteAttrs.action_possible !== undefined
      ? Boolean(tonteAttrs.action_possible)
      : tonteAutorisee === "on" && mowerState.ready === true;

    if (strongMowingBlock) {
      title = tonteStatusLabel || "Tonte interdite";
      hint = compactDecisionText(tonteReason || avoid || "Tonte déconseillée dans les conditions actuelles.", { maxLength: 150 });
      tone = tonteTone === "critical" ? "critical" : "danger";
      icon = "mdi:content-cut";
    } else if (wateringCause === "post_application" && irrigationSignal.reasonKind === "blocked") {
      title = "Post-produit bloqué";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage post-produit.", { maxLength: 150 });
      tone = "danger";
      icon = "mdi:cancel";
    } else if (wateringCause === "post_application" && irrigationSignal.reasonKind === "waiting") {
      title = "Post-produit en attente";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage reste en attente.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (wateringCause === "post_application" && ["post_application", "hydric_need"].includes(irrigationSignal.reasonKind)) {
      title = irrigationSignal.actionLabel || "Post-produit prêt";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage est prêt.", { maxLength: 150 });
      tone = "success";
      icon = "mdi:sprinkler";
    } else if (assistant.entity && assistant.status === "action_required") {
      title = assistant.summary || assistant.actionLabel;
      hint = compactDecisionText(conseil || assistant.reason || irrigationSignal.summary || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = assistant.tone || "success";
      icon = assistant.action.includes("arros") ? "mdi:sprinkler" : assistant.action.includes("tonte") ? "mdi:content-cut" : "mdi:account-tie-hat-outline";
    } else if (irrigationSignal.reasonKind === "blocked") {
      title = irrigationSignal.actionLabel || "Irrigation bloquée";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage.", { maxLength: 150 });
      tone = "danger";
      icon = "mdi:cancel";
    } else if (irrigationSignal.reasonKind === "waiting" && objective > 0) {
      title = irrigationSignal.actionLabel || "Attendre";
      hint = compactDecisionText(irrigationSignal.summary || windowState.displaySummary || "Le prochain créneau n’est pas encore ouvert.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.isAwaiting && objective > 0) {
      title = "Irrigation prévue demain matin";
      hint = compactDecisionText(`${windowState.nextAction || "Attendre le créneau prévu."}${planState.summary ? ` · ${planState.summary}` : ""}`, { maxLength: 150 });
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.showManualAction && objective > 0) {
      title = "Irrigation manuelle possible";
      hint = `${objectiveLabel} à déclencher maintenant.${conseil ? ` ${conseil}` : ""}`.trim();
      tone = actionTone === "critical" ? "critical" : "success";
      icon = "mdi:water-pump";
    } else if (windowState.isBlocked) {
      title = "Irrigation bloquée";
      hint = windowState.nextAction || windowState.summary || "Le créneau prévu n’est pas encore ouvert.";
      tone = "danger";
      icon = "mdi:cancel";
    } else if (mowingBusy) {
      title = "Tonte en cours";
      hint = compactDecisionText(assistant.reason || tonteReason || "La tondeuse est déjà en train de tondre.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:content-cut";
    } else if (assistant.status === "blocked" && assistant.action === "tonte") {
      title = assistant.reason || assistant.summary || "Tonte différée";
      hint = compactDecisionText(assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = assistant.tone === "danger" ? "danger" : "warning";
      icon = "mdi:content-cut";
    } else if (mowingActionPossible) {
      title = "Tonte possible";
      hint = compactDecisionText(assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary, { maxLength: 150 });
      tone = "success";
      icon = "mdi:content-cut";
    } else if (tonteTone === "danger" || tonteTone === "critical") {
      title = tonteStatusLabel || "Tonte interdite";
      hint = compactDecisionText(tonteReason || avoid || "Tonte déconseillée dans les conditions actuelles.", { maxLength: 150 });
      tone = tonteTone === "critical" ? "critical" : "danger";
      icon = "mdi:content-cut";
    } else if (tonteTone === "warning") {
      title = tonteStatusLabel || "Tonte à surveiller";
      const mowerHint = mowerState.present && mowerState.nextDeparture
        ? `Prochain départ programmé le ${mowerState.nextDeparture}.`
        : "";
      hint = compactDecisionText([
        tonteReason,
        mowerHint || (tonteNextMowing ? `Prochaine tonte estimée le ${tonteNextMowing}.` : ""),
      ].filter(Boolean).join(" ") || conseil || "Attendre une meilleure fenêtre de tonte.", { maxLength: 150 });
      tone = "warning";
      icon = "mdi:content-cut";
    } else if (computeRisqueTone(risk) === "danger" || computeRisqueTone(risk) === "critical") {
      title = "Risque gazon élevé";
      hint = action || conseil || "Ouvrir l’onglet Gazon pour voir les détails avancés.";
      tone = computeRisqueTone(risk);
      icon = "mdi:shield-alert-outline";
    } else if (arrosageRecommande === "on") {
      title = "Irrigation recommandée";
      hint = `${conseil || planState.summary || objectiveLabel}${
        ["bloque", "en_attente", "non_autorise"].includes(afterApplicationInfo.kind)
          ? ` · Post-application ${afterApplicationInfo.label.toLowerCase()}`
          : ""
      }`;
      tone = "success";
      icon = "mdi:water-check";
    } else if (switchState.tone === "danger") {
      title = "Irrigation automatique désactivée";
      hint = "L’onglet Réglages permet de vérifier l’autorisation et les débits.";
      tone = "danger";
      icon = "mdi:switch-off";
    } else if (conseil) {
      const normalizedAdvice = String(conseil).trim().toLowerCase();
      const interventionTrigger = String(interventionSignal?.attributes?.trigger_kind || "").trim().toLowerCase();
      hint = conseil;
      if (normalizedAdvice.startsWith("tonte")) {
        title = mowingActionPossible ? "Tonte possible" : "Tonte en cours";
        tone = mowingActionPossible ? "success" : "warning";
        icon = "mdi:content-cut";
      } else if (normalizedAdvice.startsWith("intervention")) {
        title = interventionTrigger === "ready" ? "Intervention prête" : interventionTrigger === "recommended" ? "Intervention recommandée" : "Intervention à préparer";
        tone = interventionTrigger === "ready" || interventionTrigger === "recommended" ? "success" : "warning";
        icon = "mdi:spray-bottle";
      } else if (normalizedAdvice.startsWith("traitement")) {
        title = normalizedAdvice.includes("bloqué") || normalizedAdvice.includes("bloque") ? "Traitement bloqué" : "Traitement conseillé";
        tone = normalizedAdvice.includes("bloqué") || normalizedAdvice.includes("bloque") ? "warning" : "success";
        icon = "mdi:flask-outline";
      } else if (normalizedAdvice.startsWith("pas d'arrosage") || normalizedAdvice.startsWith("n'arrose pas")) {
        title = "Aucune irrigation requise";
        tone = "neutral";
        icon = "mdi:water-off";
      }
    } else if (intervention.entity) {
      title = intervention.ui?.summary || intervention.ui?.title || "Intervention";
      hint = intervention.ui?.hint || intervention.reason || intervention.whyNow || "Intervention disponible";
      tone = intervention.ui?.tone || "neutral";
      icon = intervention.ui?.icon || "mdi:spray-bottle";
    }

    return { title, hint, tone, icon };
  }

  _planTypeTone(planType) {
    const normalized = String(planType ?? "").trim().toLowerCase();
    if (normalized === "multi_zone") {
      return "accent";
    }
    if (normalized === "single_zone") {
      return "success";
    }
    if (normalized === "no_plan") {
      return "neutral";
    }
    return "neutral";
  }

  _configSwitchState() {
    const state = String(this._entityState("entity_switch_arrosage_automatique", "")).trim().toLowerCase();
    if (["on", "true", "yes", "1", "oui"].includes(state)) {
      return { label: "Autorisé", tone: "success" };
    }
    if (["off", "false", "no", "0", "non"].includes(state)) {
      return { label: "Désactivé", tone: "danger" };
    }
    return { label: "Non disponible", tone: "neutral" };
  }

  _mowerCoordinationSwitchState() {
    const state = String(this._entityState("entity_switch_coordination_tondeuse", "")).trim().toLowerCase();
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mower_coordination_ready !== undefined
      || tonteAttrs.mower_reason_label
      || tonteAttrs.mower_reason_code
      ? tonteAttrs
      : fallbackAttrs;
    const coordinationReady = attrs.mower_coordination_ready;
    const reasonCode = String(attrs.mower_reason_code || "").trim().toLowerCase();
    const reasonLabel = String(
      attrs.mower_reason_label
      || formatMowerReasonLabel(reasonCode),
    ).trim();
    const hardBlockReason = ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(reasonCode);
    if (hardBlockReason) {
      return { label: reasonLabel || "Tondeuse à vérifier", tone: "danger" };
    }
    if (["on", "true", "yes", "1", "oui"].includes(state)) {
      if (coordinationReady === false) {
        const tone = reasonCode === "error" ? "danger" : "warning";
        return { label: reasonLabel || "À surveiller", tone };
      }
      return { label: "Active", tone: "success" };
    }
    if (["off", "false", "no", "0", "non"].includes(state)) {
      return { label: "Désactivée", tone: "danger" };
    }
    return { label: "Non disponible", tone: "neutral" };
  }

  _zoneDebitEntries() {
    return [
      { key: "entity_debit_zone_1", label: "Débit zone 1" },
      { key: "entity_debit_zone_2", label: "Débit zone 2" },
      { key: "entity_debit_zone_3", label: "Débit zone 3" },
      { key: "entity_debit_zone_4", label: "Débit zone 4" },
      { key: "entity_debit_zone_5", label: "Débit zone 5" },
    ];
  }

  _renderConfigValue(entityKey, suffix = "") {
    const entity = this._entity(entityKey);
    if (!entity) {
      return { value: "Non disponible", tone: "neutral", secondary: "" };
    }
    const raw = entity.state;
    const numeric = asNumber(raw);
    if (numeric !== null) {
      const digits = suffix === "min" ? 0 : 1;
      return {
        value: suffix ? `${formatNumber(numeric, digits)} ${suffix}` : formatNumber(numeric, digits) || String(raw),
        tone: "accent",
        secondary: "",
      };
    }
    return {
      value: normalizeDisplayValue(raw),
      tone: String(raw).toLowerCase() === "on" ? "success" : String(raw).toLowerCase() === "off" ? "danger" : "neutral",
      secondary: "",
    };
  }

  _renderDecisionLayout() {
    return renderDecisionLayout(this);
  }

  _setActiveSection(section) {
    if (!SECTION_FIELDS[section] || this._activeSection === section) {
      return;
    }
    this._activeSection = section;
    this._render();
  }

  _sectionForTab(tab) {
    switch (tab) {
      case "watering":
        return "watering";
      case "mowing":
        return "mowing";
      case "gazon":
      case "config":
        return "details";
      case "overview":
      default:
        return "overview";
    }
  }

  _setActiveTab(tab) {
    if (!TAB_DEFS.some((entry) => entry.key === tab) || this._activeTab === tab) {
      return;
    }
    this._activeTab = tab;
    if (this._canShowLegacyDetails()) {
      this._activeSection = this._sectionForTab(tab);
    }
    this._render();
  }

  _scrollTabNavIntoView() {
    if (typeof window === "undefined" || !this.shadowRoot) {
      return;
    }

    const sync = (navSelector, activeSelector) => {
      const nav = this.shadowRoot.querySelector(navSelector);
      const active = this.shadowRoot.querySelector(activeSelector);
      if (!nav || !active || typeof active.scrollIntoView !== "function") {
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.left < navRect.left || activeRect.right > navRect.right) {
        active.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    };

    sync(".tab-nav", ".tab-nav__item--active");
    sync(".section-nav", ".section-nav__item--active");
  }

  _fieldSection(fieldKey) {
    if (OVERVIEW_ENTITY_KEYS.has(fieldKey)) {
      return "overview";
    }
    if ([
      "entity_arrosage_recommande",
      "entity_objectif_arrosage",
      "entity_objectif_legacy",
      "entity_objectif_depletion",
      "entity_type_arrosage",
      "entity_signal_irrigation",
      "entity_reserve_actuelle",
      "entity_depletion_ratio",
      "entity_etat_hydrique",
      "entity_et0",
      "entity_etc",
    ].includes(fieldKey)) {
      return "watering";
    }
    if (["entity_tonte", "entity_hauteur"].includes(fieldKey)) {
      return "mowing";
    }
    return "details";
  }

  _fieldAccent(fieldKey, tone = "neutral") {
    if (tone && tone !== "neutral") {
      return toneToColor(tone);
    }
    return this._sectionAccent(this._fieldSection(fieldKey));
  }

  _isMinimalMode() {
    return Boolean(this._config?.minimal_mode);
  }

  _heroMetricIcon(fieldKey, value) {
    const normalized = String(value ?? "").toLowerCase();

    if (fieldKey === "entity_niveau_pertinence") {
      return "mdi:signal";
    }

    if (fieldKey === "entity_prochaine_fenetre_optimale") {
      return "mdi:clock-outline";
    }

    if (fieldKey === "entity_prochain_blocage_attendu") {
      return "mdi:alert-circle-outline";
    }

    if (fieldKey === "entity_phase") {
      if (normalized.includes("sursem")) return "mdi:sprout";
      if (normalized.includes("hivern")) return "mdi:snowflake";
      if (normalized.includes("trait")) return "mdi:flask-outline";
      if (normalized.includes("fert")) return "mdi:leaf";
      return "mdi:grass";
    }

    if (fieldKey === "entity_sous_phase") {
      if (normalized.includes("germin")) return "mdi:seed";
      if (normalized.includes("enracin")) return "mdi:sprout";
      if (normalized.includes("reprise")) return "mdi:autorenew";
      return "mdi:sprout";
    }

    if (fieldKey === "entity_tonte") {
      if (normalized.includes("interdit")) return "mdi:content-cut";
      if (normalized.includes("surveil") || normalized.includes("prud")) return "mdi:content-cut";
      return "mdi:content-cut";
    }

    if (fieldKey === "entity_arrosage_recommande") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:water-check" : "mdi:water-off";
    }

    if (fieldKey === "entity_tonte_autorisee") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:content-cut" : "mdi:content-cut";
    }

    if (fieldKey === "entity_arrosage_apres_application_autorise") {
      return ["on", "true", "yes", "1", "oui"].includes(normalized) ? "mdi:water-check" : "mdi:water-off";
    }

    if (fieldKey === "entity_signal_irrigation") {
      return "mdi:sprinkler";
    }

    if (fieldKey === "entity_signal_intervention") {
      return "mdi:spray-bottle";
    }

    if (fieldKey === "entity_hauteur") {
      return "mdi:ruler-square";
    }

    return "mdi:information-outline";
  }

  _renderMetric(label, value, tone = "neutral", icon = null) {
    if (isEmpty(value)) {
      return "";
    }
    return renderCardCore({
      kind: "metric",
      label,
      value,
      tone,
      icon,
      iconSize: "sm",
      secondary: "",
    });
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
    const icon = this._config?.show_icons
      ? (typeof iconForField === "function" ? iconForField(field) : "mdi:help-circle-outline")
      : null;
    const accent = this._fieldAccent(field.key, tone);

    return renderCardCore({
      kind: "tile",
      label: field.label,
      value,
      tone,
      icon,
      secondary: this._config?.show_secondary_info ? secondary : "",
      style: accent ? `--gazon-tile-accent: ${accent};` : "",
    });
  }

  _renderAdvancedGroup(title, meta, keys, eyebrow = "Détail") {
    const fields = keys
      .map((key) => ENTITY_KEYS.find((field) => field.key === key))
      .filter(Boolean)
      .filter((field) => this._entityId(field.key));
    if (!fields.length) {
      return "";
    }
    const cards = fields.map((field) => {
      const entity = this._entity(field.key);
      const value = this._formatFieldValue(field, entity);
      const tone = this._toneForField(field, entity);
      const secondary = this._config?.show_secondary_info ? this._secondaryFieldText(field, entity) : "";
      const eid = this._entityId(field.key);
      const vTone = ["success", "warning", "danger", "critical"].includes(tone) ? ` gz2-card__value--${tone}` : "";
      return `
        <button type="button" class="gz2-card" data-more-info-entity="${escapeHtml(eid)}">
          <div class="gz2-card__label">${escapeHtml(field.label)}</div>
          <div class="gz2-card__value${vTone}">${escapeHtml(value)}</div>
          ${secondary ? `<div class="gz2-card__sub">${escapeHtml(secondary)}</div>` : ""}
        </button>`;
    }).join("");
    return `
      <div class="gz2-eyebrow gz2-eyebrow--section">${escapeHtml(title)}</div>
      <div class="gz2-cards">${cards}</div>
    `;
  }

  _buildAdvancedContent(tab = this._activeTab) {
    const groupsByTab = {
      overview: [
        {
          title: "Pilotage global",
          meta: "Les signaux les plus utiles pour comprendre la priorité du moment.",
          eyebrow: "Synthèse",
          keys: ["entity_assistant", "entity_conseil", "entity_niveau", "entity_risque", "entity_phase", "entity_sous_phase"],
        },
        {
          title: "Priorités dérivées",
          meta: "Ce qui fait évoluer la recommandation globale.",
          eyebrow: "Priorité",
          keys: ["entity_niveau_pertinence", "entity_prochaine_fenetre_optimale", "entity_prochain_blocage_attendu", "entity_prochaine_intervention"],
        },
      ],
      watering: [
        {
          title: "Conduite d'irrigation",
          meta: "Besoin hydrique, fenêtre et plan à exécuter.",
          eyebrow: "Hydrique",
          keys: [
            "entity_fenetre_optimale",
            "entity_objectif_arrosage",
            "entity_type_arrosage",
            "entity_plan_arrosage",
            "entity_arrosage_recommande",
            "entity_arrosage_apres_application_autorise",
            "entity_signal_irrigation",
            "entity_arrosage_en_cours",
            "entity_dernier_arrosage",
          ],
        },
        {
          title: "Observabilité hydrique",
          meta: "Suivi avancé du contexte hydrique sans alourdir la façade publique.",
          eyebrow: "Diagnostic",
          keys: [
            "entity_etat_hydrique",
            "entity_reserve_actuelle",
            "entity_depletion_ratio",
            "entity_et0",
            "entity_etc",
            "entity_objectif_legacy",
            "entity_objectif_depletion",
          ],
        },
        {
          title: "Réglages irrigation",
          meta: "Paramètres qui influencent directement les cycles.",
          eyebrow: "Configuration",
          keys: [
            "entity_switch_arrosage_automatique",
            "entity_debit_zone_1",
            "entity_debit_zone_2",
            "entity_debit_zone_3",
            "entity_debit_zone_4",
            "entity_debit_zone_5",
          ],
        },
      ],
      mowing: [
        {
          title: "Décision tonte",
          meta: "Statut courant, autorisation et hauteur conseillée.",
          eyebrow: "Tonte",
          keys: ["entity_tonte", "entity_tonte_autorisee", "entity_hauteur", "entity_phase", "entity_sous_phase", "entity_risque"],
        },
        {
          title: "Réglages tonte",
          meta: "Bornes de coupe et délai de reprise après arrosage.",
          eyebrow: "Configuration",
          keys: ["entity_hauteur_min_tondeuse", "entity_hauteur_max_tondeuse", "entity_delai_reprise_tonte_apres_arrosage"],
        },
      ],
      gazon: [
        {
          title: "État du gazon",
          meta: "Lecture métier de la phase, du niveau d'action et du risque.",
          eyebrow: "Gazon",
          keys: ["entity_assistant", "entity_conseil", "entity_niveau", "entity_risque", "entity_phase", "entity_sous_phase", "entity_action", "entity_avoid"],
        },
        {
          title: "Contexte hydrique",
          meta: "Ce qui nourrit l'analyse sans surcharger le résumé principal.",
          eyebrow: "Contexte",
          keys: ["entity_objectif_arrosage", "entity_type_arrosage", "entity_fenetre_optimale", "entity_etat_hydrique", "entity_reserve_actuelle"],
        },
      ],
      products: [
        {
          title: "Catalogue",
          meta: "Référentiel local disponible pour la saison.",
          eyebrow: "Produits",
          keys: ["entity_catalogue_produits", "entity_produit_intervention", "entity_derniere_application"],
        },
      ],
      intervention: [
        {
          title: "Recommandation intervention",
          meta: "Produit ciblé, statut et préparation de déclaration.",
          eyebrow: "Intervention",
          keys: [
            "entity_prochaine_intervention",
            "entity_signal_intervention",
            "entity_produit_intervention",
            "entity_catalogue_produits",
            "entity_derniere_application",
            "entity_niveau_pertinence",
            "entity_prochaine_fenetre_optimale",
            "entity_prochain_blocage_attendu",
          ],
        },
        {
          title: "Debug métier",
          meta: "Lecture détaillée du moteur quand il faut investiguer.",
          eyebrow: "Debug",
          keys: ["entity_debug_intervention"],
        },
      ],
      config: [
        {
          title: "Paramètres actifs",
          meta: "Configuration effectivement utilisée par le moteur.",
          eyebrow: "Réglages",
          keys: [
            "entity_mode",
            "entity_switch_arrosage_automatique",
            "entity_switch_coordination_tondeuse",
            "entity_delai_reprise_tonte_apres_arrosage",
            "entity_debit_zone_1",
            "entity_debit_zone_2",
            "entity_debit_zone_3",
            "entity_debit_zone_4",
            "entity_debit_zone_5",
            "entity_hauteur_min_tondeuse",
            "entity_hauteur_max_tondeuse",
          ],
        },
      ],
    };
    const groups = groupsByTab[tab] || groupsByTab.overview;
    return groups
      .map((group) => this._renderAdvancedGroup(group.title, group.meta, group.keys, group.eyebrow))
      .filter(Boolean)
      .join("");
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
    }
    if (field.key === "entity_assistant") {
      return this._assistantState().tone || "neutral";
    }
    if (field.key === "entity_niveau_pertinence") {
      const tone = String(entity.attributes?.tone || "").trim().toLowerCase();
      if (tone === "success" || tone === "warning" || tone === "neutral") {
        return tone;
      }
      const level = String(entity.state || entity.attributes?.score_level || "").trim().toLowerCase();
      if (level === "élevé" || level === "eleve") {
        return "success";
      }
      if (level === "moyen") {
        return "warning";
      }
      return "neutral";
    }
    if (field.key === "entity_prochaine_fenetre_optimale") {
      const status = String(entity.state || "").trim().toLowerCase();
      if (status === "attendre") {
        return "warning";
      }
      if (["maintenant", "ce_matin"].includes(status)) {
        return "success";
      }
      if (["demain_matin", "apres_pluie", "soir"].includes(status)) {
        return "accent";
      }
      return "neutral";
    }
    if (field.key === "entity_prochain_blocage_attendu") {
      return isEmpty(entity.state) ? "neutral" : "danger";
    }
    if (field.key === "entity_fenetre_optimale") {
      return this._windowState().tone;
    }
    if (field.key === "entity_tonte") {
      return computeTonteTone(entity.state);
    }
    if (field.key === "entity_tonte_autorisee") {
      return String(entity.state).toLowerCase() === "on" ? "success" : "danger";
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
    if (field.key === "entity_switch_coordination_tondeuse") {
      return String(entity.state).toLowerCase() === "on" ? "success" : String(entity.state).toLowerCase() === "off" ? "danger" : "neutral";
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      return asNumber(entity.state) !== null ? "accent" : "neutral";
    }
    if (field.key === "entity_arrosage_apres_application_autorise") {
      return this._postApplicationState(entity).tone;
    }
    if (field.key === "entity_signal_intervention") {
      const triggerKind = String(entity.attributes?.trigger_kind || "").trim().toLowerCase();
      if (["recommended", "ready"].includes(triggerKind)) {
        return "success";
      }
      if (triggerKind === "soft") {
        return "warning";
      }
      return String(entity.state).toLowerCase() === "on" ? "success" : "neutral";
    }
    if (field.key === "entity_signal_irrigation") {
      return this._irrigationSignalState().tone;
    }
    if (field.key === "entity_phase") {
      return phaseTone(entity.state);
    }
    if (field.key === "entity_hauteur") {
      return this._phaseTone();
    }
    if (field.key === "entity_objectif_arrosage") {
      const hydricState = String(entity.attributes?.hydric_state || "").trim().toLowerCase();
      if (hydricState === "plein") {
        return "success";
      }
      if (hydricState.includes("surveil")) {
        return "warning";
      }
      return asNumber(entity.state) > 0 ? "accent" : "neutral";
    }
    return "neutral";
  }

  _formatFieldValue(field, entity) {
    if (!entity) {
      return "Non disponible";
    }
    if (field.key === "entity_assistant") {
      return this._assistantState().summary || "Non disponible";
    }
    if (field.key === "entity_niveau_pertinence") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_prochaine_fenetre_optimale") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_prochain_blocage_attendu") {
      return String(entity.attributes?.block_label || entity.attributes?.summary || formatStatusLabel(entity.state)).trim() || "Non disponible";
    }
    if (field.key === "entity_fenetre_optimale") {
      return this._windowState().statusLabel;
    }
    if (field.key === "entity_arrosage_recommande") {
      return formatRecommendationState(entity.state);
    }
    if (field.key === "entity_arrosage_apres_application_autorise" || field.key === "entity_tonte_autorisee") {
      if (field.key === "entity_arrosage_apres_application_autorise") {
        return this._postApplicationState(entity).label;
      }
      return formatAuthorizationState(entity.state);
    }
    if (field.key === "entity_objectif_arrosage") {
      const numeric = asNumber(entity.state);
      return formatMm(numeric);
    }
    if (field.key === "entity_hauteur") {
      const numeric = asNumber(entity.state);
      return formatCm(numeric);
    }
    if (field.key === "entity_switch_arrosage_automatique") {
      return formatSwitchState(entity.state);
    }
    if (field.key === "entity_switch_coordination_tondeuse") {
      return formatSwitchState(entity.state);
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      const numeric = asNumber(entity.state);
      return numeric === null ? "Non disponible" : `${formatNumber(numeric, 0)} min`;
    }
    if (field.key === "entity_tonte") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_signal_irrigation") {
      return this._irrigationSignalState().actionLabel || "Non disponible";
    }
    if (field.key === "entity_signal_intervention") {
      return String(entity.attributes?.summary || formatStatusLabel(entity.state)).trim() || "Non disponible";
    }
    if (field.key === "entity_prochaine_intervention") {
      return String(entity.attributes?.summary || entity.state || "").trim() || "Non disponible";
    }
    if (field.key === "entity_niveau" || field.key === "entity_phase" || field.key === "entity_sous_phase") {
      return formatStatusLabel(entity.state);
    }
    return normalizeDisplayValue(entity.state);
  }

  _secondaryFieldText(field, entity) {
    if (!entity) {
      return "";
    }
    if (field.key === "entity_assistant") {
      const assistant = this._assistantState();
      return [
        assistant.reason,
        assistant.momentLabel ? `Moment: ${assistant.momentLabel}` : "",
        assistant.status ? `Statut: ${formatStatusLabel(assistant.status)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (["entity_niveau_pertinence", "entity_prochaine_fenetre_optimale", "entity_prochain_blocage_attendu", "entity_signal_intervention", "entity_signal_irrigation"].includes(field.key)) {
      const parts = [];
      const summary = String(entity.attributes?.summary || "").trim();
      const triggerKind = String(entity.attributes?.trigger_kind || "").trim();
      const sourceStatus = String(entity.attributes?.source_status || "").trim();
      const score = asNumber(entity.attributes?.score);
      const scoreLevel = String(entity.attributes?.score_level || "").trim();
      if (summary) {
        parts.push(summary);
      }
      if (score !== null) {
        parts.push(`Score: ${formatNumber(score, 0)}/100`);
      }
      if (scoreLevel) {
        parts.push(`Niveau: ${formatStatusLabel(scoreLevel)}`);
      }
      if (triggerKind) {
        parts.push(`Déclencheur: ${formatStatusLabel(triggerKind)}`);
      }
      if (sourceStatus && sourceStatus !== summary) {
        parts.push(`Statut source: ${formatStatusLabel(sourceStatus)}`);
      }
      if (field.key === "entity_signal_irrigation") {
        const reasonKind = String(entity.attributes?.reason_kind || "").trim();
        const actionLabel = String(entity.attributes?.action_label || "").trim();
        const typeArrosage = String(entity.attributes?.type_arrosage || "").trim();
        const wateringBlockReason = String(entity.attributes?.watering_block_reason_label || "").trim();
        if (actionLabel && actionLabel !== summary) {
          parts.unshift(actionLabel);
        }
        if (reasonKind) {
          parts.push(`Raison: ${formatStatusLabel(reasonKind)}`);
        }
        if (typeArrosage) {
          parts.push(`Profil: ${formatWateringTypeLabel(typeArrosage)}`);
        }
        if (wateringBlockReason) {
          parts.push(`Blocage: ${wateringBlockReason}`);
        }
      }
      return parts.join(" · ");
    }
    if (field.key === "entity_fenetre_optimale") {
      const windowState = this._windowState();
      return [
        windowState.reasonSummary || windowState.summary,
        windowState.optimalWindowDisplay ? `Optimal: ${windowState.optimalWindowDisplay}` : "",
        windowState.wateringWindowDisplay ? `Créneau: ${windowState.wateringWindowDisplay}` : "",
        windowState.eveningWindowDisplay ? `Soir: ${windowState.eveningWindowDisplay}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_hauteur") {
      const min = asNumber(entity.attributes?.hauteur_tonte_min_cm);
      const max = asNumber(entity.attributes?.hauteur_tonte_max_cm);
      if (min === null || max === null) {
        return "";
      }
      return `${formatCm(min)} → ${formatCm(max)}`;
    }
    if (field.key === "entity_tonte" || field.key === "entity_tonte_autorisee") {
      const mowerLabel = String(entity.attributes?.mower_operation_label || entity.attributes?.tondeuse_statut_libelle || "").trim();
      const mowingBlockReason = String(entity.attributes?.mowing_block_reason_label || "").trim();
      const cooldown = asNumber(entity.attributes?.mowing_cooldown_remaining_minutes);
      return [
        mowerLabel ? `Robot: ${mowerLabel}` : "",
        mowingBlockReason ? `Blocage: ${mowingBlockReason}` : "",
        cooldown !== null && cooldown > 0 ? `Cooldown: ${formatDurationHuman(cooldown)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_delai_reprise_tonte_apres_arrosage") {
      const numeric = asNumber(entity.state);
      return numeric === null ? "" : `Valeur active: ${formatNumber(numeric, 0)} min`;
    }
    if (field.key === "entity_objectif_arrosage") {
      return [
        entity.attributes?.hydric_state ? `État: ${formatStatusLabel(entity.attributes.hydric_state)}` : "",
        entity.attributes?.hydric_strategy ? `Stratégie: ${formatStatusLabel(entity.attributes.hydric_strategy)}` : "",
        asNumber(entity.attributes?.reserve_actuelle_mm) !== null ? `Réserve: ${formatNumber(entity.attributes.reserve_actuelle_mm, 1)} mm` : "",
        asNumber(entity.attributes?.depletion_ratio) !== null ? `Déplétion: ${formatNumber(entity.attributes.depletion_ratio, 3)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (field.key === "entity_niveau") {
      const hydric = String(entity.attributes?.niveau_action_hydrique || "").trim();
      return hydric ? `Hydrique: ${formatStatusLabel(hydric)}` : "";
    }
    if (field.key === "entity_conseil") {
      const hydric = String(entity.attributes?.niveau_action_hydrique || "").trim();
      return hydric ? `Hydrique: ${formatStatusLabel(hydric)}` : "";
    }
    if (field.key === "entity_prochaine_intervention") {
      return [
        String(entity.attributes?.hint || "").trim(),
        String(entity.attributes?.action_label || "").trim(),
        String(entity.attributes?.opportunity_level || "").trim() ? `Opportunité: ${formatStatusLabel(entity.attributes.opportunity_level)}` : "",
      ].filter(Boolean).join(" · ");
    }
    if (["entity_etat_hydrique", "entity_reserve_actuelle", "entity_depletion_ratio", "entity_et0", "entity_etc", "entity_objectif_legacy", "entity_objectif_depletion"].includes(field.key)) {
      return Object.entries(entity.attributes || {})
        .slice(0, 4)
        .map(([key, value]) => `${formatStatusLabel(key)}: ${normalizeDisplayValue(value)}`)
        .join(" · ");
    }
    return "";
  }

  _visibleFields(section = this._activeSection) {
    if (this._isMinimalMode()) {
      section = "overview";
    }
    const wanted = SECTION_FIELDS[section] || SECTION_FIELDS.overview;
    return ENTITY_KEYS.filter((field) => this._config?.[field.key] && wanted.includes(field.key));
  }

  _buildHeader() {
    return renderHeader(this);
  }

  _buildDecisionBlocks() {
    if (!this._canShowLegacyDetails() || this._isMinimalMode()) {
      return "";
    }
    if (!["overview", "gazon"].includes(this._activeTab)) {
      return "";
    }
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    if (!action && !avoid) {
      return "";
    }
    return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Décision</div>
      <div class="gz2-cards">
        ${action ? `<div class="gz2-card gz2-card--static"><div class="gz2-card__label">À faire</div><div class="gz2-card__value">${escapeHtml(action)}</div></div>` : ""}
        ${avoid ? `<div class="gz2-card gz2-card--static"><div class="gz2-card__label">À éviter</div><div class="gz2-card__value">${escapeHtml(avoid)}</div></div>` : ""}
      </div>
    `;
  }

  _buildContent() {
    const section = this._isMinimalMode() ? "overview" : this._activeSection;
    if (this._canShowLegacyDetails()) {
      return this._buildAdvancedContent(this._activeTab);
    }
    const tiles = this._visibleFields(section).map((field) => this._renderTile(field)).filter(Boolean);
    if (tiles.length === 0) {
      return "";
    }
    return `
      <section class="tiles tiles--${section} ${this._isMinimalMode() ? "tiles--minimal" : ""}">
        ${tiles.join("")}
      </section>
    `;
  }

  _buildFooter() {
    if (!this._canShowLegacyDetails() || this._isMinimalMode()) {
      return "";
    }
    if (!["overview", "gazon"].includes(this._activeTab)) {
      return "";
    }
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
    return `<footer class="gi-info gi-info--secondary footer">${parts.map((part) => `<span>${escapeHtml(part)}</span>`).join(" · ")}</footer>`;
  }

  _ensureStyles() {
    // Injecte la feuille de style UNE seule fois (adoptedStyleSheets) au lieu de
    // la ré-injecter à chaque rendu → plus de re-parse CSS = plus de clignotement.
    if (!this.shadowRoot) {
      return false;
    }
    try {
      const supportsAdopted =
        typeof CSSStyleSheet === "function"
        && typeof CSSStyleSheet.prototype.replaceSync === "function"
        && "adoptedStyleSheets" in this.shadowRoot;
      if (!supportsAdopted) {
        return false;
      }
      if (!this._styleSheet) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(CARD_STYLES);
      }
      if (!this.shadowRoot.adoptedStyleSheets.includes(this._styleSheet)) {
        this.shadowRoot.adoptedStyleSheets = [this._styleSheet];
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    try {
      if (!this._config) {
        if (this._lastRenderSignature === "no-config") {
          return;
        }
        this._lastRenderSignature = "no-config";
        this.shadowRoot.innerHTML = `<div class="empty">Configuration manquante.</div>`;
        return;
      }

      const renderSignature = this._renderSignature();
      if (renderSignature === this._lastRenderSignature) {
        return;
      }

      const activeTone = this._cardTone();
      const accent = this._config.accent_color || this._accentColorFromTone(activeTone);
      const sectionAccent = this._tabAccent(this._activeTab);
      const tabPalette = this._tabPalette(this._activeTab);
      const background = this._config.show_background ? "true" : "false";
      const backgroundStyle = this._config.background_style || "solid";
      const themeMode = this._config.theme_mode || "auto";
      const resolvedThemeMode = themeMode === "auto" ? (this._hass?.themes?.darkMode ? "dark" : "light") : themeMode;
      const borderRadius = `${this._config.border_radius ?? 24}px`;
      const iconSize = `${this._config.icon_size ?? 24}px`;
      const actionCritical = this._actionTone() === "critical";
      const isPreview = this._isPreviewMode();
      const hasCardAction = this._hasCardAction();

      this._applyHostVariables({
        accent,
        activeTone,
        sectionAccent,
        borderRadius,
        iconSize,
        tabPalette,
      });

      const rootClass = [
        "card",
        backgroundStyle ? `card--${backgroundStyle}` : "",
        resolvedThemeMode ? `card--theme-${resolvedThemeMode}` : "",
        actionCritical ? "card--pulse-critical" : "",
        isPreview ? "card--editor-preview" : "",
      ]
        .filter(Boolean)
        .join(" ");

      const stylesAdopted = this._ensureStyles();
      const styleBlock = stylesAdopted ? "" : `<style>\n${CARD_STYLES}\n        </style>`;
      this.shadowRoot.innerHTML = `
        ${styleBlock}

          <ha-card
            class="gi-card ${rootClass}"
            aria-label="${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}"
            data-background="${background}"
            data-tone="${activeTone}"
            data-active-tab="${escapeHtml(this._activeTab)}"
            ${hasCardAction ? 'role="button" tabindex="0"' : ""}
          >
          ${this._buildHeader()}
          ${this._renderDecisionLayout()}
        </ha-card>
      `;

      this._bindMoreInfoButtons();
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => {
          if (!this.isConnected) {
            return;
          }
          this._scrollTabNavIntoView();
        });
      }

      this.shadowRoot.removeEventListener("click", this._onClick);
      this.shadowRoot.removeEventListener("pointerdown", this._onPointerDown);
      this.shadowRoot.removeEventListener("pointerup", this._onPointerUp);
      this.shadowRoot.removeEventListener("pointercancel", this._onPointerCancel);
      this.shadowRoot.removeEventListener("pointerleave", this._onPointerCancel);
      this.shadowRoot.removeEventListener("change", this._onChange);
      this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
      this.shadowRoot.addEventListener("click", this._onClick);
      this.shadowRoot.addEventListener("pointerdown", this._onPointerDown);
      this.shadowRoot.addEventListener("pointerup", this._onPointerUp);
      this.shadowRoot.addEventListener("pointercancel", this._onPointerCancel);
      this.shadowRoot.addEventListener("pointerleave", this._onPointerCancel);
      this.shadowRoot.addEventListener("change", this._onChange);
      this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.addEventListener("keydown", this._onKeyDown);
      this._syncWateringProgressTimer();
      // Ne valider la signature qu'APRÈS un rendu réussi : si le rendu échoue,
      // la prochaine mise à jour HA réessaiera au lieu de rester bloquée.
      this._lastRenderSignature = renderSignature;
    } catch (error) {
      console.error("[gazon-intelligent-card] render failed", error);
      // Erreur (souvent transitoire, entité momentanément indisponible) : on
      // réinitialise la signature pour forcer un nouveau rendu à la prochaine
      // mise à jour (auto-réparation, plus besoin de recharger).
      this._lastRenderSignature = null;
      this.shadowRoot.innerHTML = `
        <div class="empty">
          <strong>Carte indisponible.</strong>
          <div>Le rendu de la carte a rencontré un problème. Recharge la ressource Lovelace si besoin.</div>
        </div>
      `;
    }
  }

  _bindMoreInfoButtons() {
    if (!this.shadowRoot) {
      return;
    }
    const buttons = this.shadowRoot.querySelectorAll("[data-more-info-entity]");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this._clearCardActionTimer();
        event.preventDefault();
        event.stopPropagation();
        this._openEntityMoreInfo(button.dataset.moreInfoEntity);
      });
    });
  }

  _accentColorFromTone(tone) {
    switch (tone) {
      case "danger":
        return "var(--gazon-danger-color, #f15f69)";
      case "warning":
        return "var(--gazon-warning-color, #f3ba4b)";
      case "success":
        return "var(--gazon-success-color, #4fc38c)";
      case "accent":
        return "var(--gazon-accent-tone-color, #49cfd0)";
      default:
        return "var(--gazon-success-color, #4fc38c)";
    }
  }

  _onClick(event) {
    const manualTarget = event.target.closest("[data-gazon-action='manual-irrigation']");
    if (manualTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerManualIrrigation();
      return;
    }
    const declareTarget = event.target.closest("[data-gazon-action='declare-product-intervention']");
    if (declareTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerSelectedProductIntervention();
      return;
    }
    const removeLastApplicationTarget = event.target.closest("[data-gazon-action='remove-last-application']");
    if (removeLastApplicationTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerRemoveLastApplication();
      return;
    }
    const recalibrateReserveTarget = event.target.closest("[data-gazon-action='recalibrate-reserve']");
    if (recalibrateReserveTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerRecalibrateReserve();
      return;
    }
    const tabTarget = event.target.closest("[data-tab]");
    if (tabTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._setActiveTab(tabTarget.dataset.tab);
      return;
    }
    const sectionTarget = event.target.closest("[data-section]");
    if (sectionTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._setActiveSection(sectionTarget.dataset.section);
      return;
    }
    if (!this._isActionEventCandidateTarget(event.target)) {
      this._clearCardActionTimer();
      return;
    }
    if (this._holdActionTriggered) {
      this._holdActionTriggered = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this._handleCardTapAction(this._defaultActionEntityId());
  }

  _onChange(event) {
    const selectTarget = event.target?.closest?.("[data-gazon-action='select-intervention-product']");
    if (selectTarget) {
      this._clearCardActionTimer();
      event.preventDefault();
      event.stopPropagation();
      this._triggerInterventionProductSelection(selectTarget.value);
    }
  }

  _onPointerDown(event) {
    if (!this._hasConfiguredAction("hold_action")) {
      return;
    }
    if (event.button !== 0 || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    this._clearHoldActionTimer();
    this._holdActionTriggered = false;
    this._holdActionTimer = window.setTimeout(() => {
      this._holdActionTimer = null;
      this._holdActionTriggered = true;
      this._clearCardActionTimer();
      this._performConfiguredAction("hold_action", this._defaultActionEntityId());
    }, 500);
  }

  _onPointerUp() {
    this._clearHoldActionTimer();
  }

  _onPointerCancel() {
    this._clearHoldActionTimer();
  }

  _onContextMenu(event) {
    this._clearHoldActionTimer();
    if (!this._hasConfiguredAction("hold_action") || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    this._clearCardActionTimer();
    event.preventDefault();
    event.stopPropagation();
    this._performConfiguredAction("hold_action", this._defaultActionEntityId());
  }

  _onDoubleClick(event) {
    if (!this._hasConfiguredAction("double_tap_action") || !this._isActionEventCandidateTarget(event.target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  _onKeyDown(event) {
    const target = event.target;
    if (target && ["SELECT", "INPUT", "TEXTAREA"].includes(String(target.tagName || "").toUpperCase())) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (target instanceof Element && target.tagName === "HA-CARD" && this._hasConfiguredAction("tap_action")) {
      event.preventDefault();
      event.stopPropagation();
      this._clearCardActionTimer();
      this._performConfiguredAction("tap_action", this._defaultActionEntityId());
      return;
    }
    event.preventDefault();
  }

  _openEntityMoreInfo(entityId) {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _triggerManualIrrigation() {
    if (!this._hass) {
      return;
    }
    const objective = this._objectiveMm();
    if (objective === null || objective <= 0) {
      return;
    }
    const service = splitServiceName(this._manualActionService());
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
      objectif_mm: objective,
    });
  }

  _triggerSelectedProductIntervention() {
    if (!this._hass) {
      return;
    }
    const state = this._selectedProductInterventionState();
    if (!state.record || state.disabled) {
      return;
    }
    const intervention = String(state.record.type || "").trim();
    const productId = String(state.record.id || "").trim();
    const productName = String(state.record.nom || state.record.id || "").trim();
    if (!intervention || !productId) {
      return;
    }
    const service = splitServiceName("gazon_intelligent.declare_intervention");
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    const payload = {
      entity_id: targetEntityId,
      intervention,
      date_action: this._todayIsoDate(),
      produit_id: productId,
      produit: productName,
      note: "Déclaration rapide depuis la carte",
    };
    this._hass.callService(service.domain, service.service, payload);
  }

  _triggerInterventionProductSelection(optionLabel) {
    if (!this._hass) {
      return;
    }
    const value = String(optionLabel || "").trim();
    if (!value) {
      return;
    }
    const service = splitServiceName("select.select_option");
    if (!service) {
      return;
    }
    const targetEntityId = this._entityId("entity_produit_intervention");
    if (!targetEntityId) {
      return;
    }
    const selectedOption = this._catalogueProductOptions().find((option) => option.label === value) || null;
    this._pendingInterventionSelection = selectedOption
      ? {
          optionLabel: value,
          id: selectedOption.id || null,
          name: selectedOption.name || null,
          months: [],
          monthsLabel: selectedOption.monthsLabel || null,
          usageMode: selectedOption.usageMode || null,
          usageModeLabel: selectedOption.usageModeLabel || null,
          maxApplicationsPerYear: selectedOption.maxApplicationsPerYear ?? null,
          maxApplicationsPerYearLabel: selectedOption.maxApplicationsPerYearLabel || null,
        }
      : null;
    this._lastRenderSignature = null;
    this._render();
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
      option: value,
    });
  }

  _triggerRemoveLastApplication() {
    if (!this._hass) {
      return;
    }
    const lastApplication = this._lastApplicationState();
    if (!lastApplication.hasApplication) {
      return;
    }
    const confirmationLabel = lastApplication.productName || lastApplication.label || "la dernière application";
    const confirmationDetails = [];
    if (lastApplication.when) {
      confirmationDetails.push(`Date: ${lastApplication.when}`);
    }
    if (lastApplication.productId) {
      confirmationDetails.push(`Produit: ${lastApplication.productName || lastApplication.productId}`);
    }
    if (lastApplication.summary) {
      confirmationDetails.push(lastApplication.summary);
    }
    if (lastApplication.detail) {
      confirmationDetails.push(lastApplication.detail);
    }
    const confirmationMessage = [
      `Supprimer ${confirmationLabel} ? Cette action supprimera la dernière application enregistrée et ne peut pas être annulée.`,
      ...confirmationDetails.map((line) => `\n${line}`),
    ].join("");
    const confirmed = window.confirm(
      confirmationMessage,
    );
    if (!confirmed) {
      return;
    }
    const service = splitServiceName("gazon_intelligent.remove_last_application");
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
    });
  }

  _triggerRecalibrateReserve() {
    if (!this._hass) {
      return;
    }
    const service = splitServiceName("gazon_intelligent.recalibrate_reserve");
    if (!service) {
      return;
    }
    const targetEntityId = this._serviceTargetEntityId();
    if (!targetEntityId) {
      return;
    }
    const current = this._entityNumber("entity_reserve_actuelle");
    const input = window.prompt(
      "Recaler la réserve hydrique du sol (mm).\n\nLa valeur est figée pour le reste de la journée puis évolue normalement dès demain. À utiliser de préférence le soir, hors pluie ou arrosage important.",
      current !== null ? String(current) : "",
    );
    if (input === null) {
      return;
    }
    const value = Number(String(input).replace(",", ".").trim());
    if (!Number.isFinite(value) || value < 0) {
      window.alert("Valeur invalide : saisis un nombre de millimètres positif.");
      return;
    }
    this._hass.callService(service.domain, service.service, {
      entity_id: targetEntityId,
      reserve_mm: Math.round(value * 10) / 10,
    });
  }

}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, GazonIntelligentCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "Carte Lovelace pour les décisions de gazon intelligent.",
    documentationURL:
      "https://github.com/kev21brv10/lovelace-gazon-intelligent-card",
  });
}
