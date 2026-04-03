import {
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  DEFAULT_CONFIG,
  ENTITY_KEYS,
  RENDER_SIGNATURE_ATTRS,
  SECTION_DEFS,
  STATUS_COLORS,
  STATUS_LABELS,
  TAB_DEFS,
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
  formatPlanType,
  formatProductAnnualLimit,
  formatProductUsageMode,
  formatPostApplicationStatusPresentation,
  formatRecommendationState,
  formatStateLabel,
  formatStatusLabel,
  formatSwitchState,
  formatWateringBlockReason,
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
  statusTone,
  toneToColor,
  weatherIconForState,
  weatherToneForState,
  safeRenderIconBox as renderIconBox,
  safeRenderStatusPill as renderStatusPill,
} from "./utils/formatters.js";
import {
  renderActiveTab,
  renderDecisionLayout,
  renderHeader,
  renderSectionNav,
  renderTabNav,
  renderWateringProgressSection,
} from "./renderers/layout.js";


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
    this._wateringProgressTick = 0;
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
      entity_fenetre_optimale: DEFAULT_CONFIG.entity_fenetre_optimale,
      entity_weather: DEFAULT_CONFIG.entity_weather,
      entity_plan_arrosage: DEFAULT_CONFIG.entity_plan_arrosage,
      entity_dernier_arrosage: DEFAULT_CONFIG.entity_dernier_arrosage,
      entity_derniere_application: DEFAULT_CONFIG.entity_derniere_application,
      entity_conseil: DEFAULT_CONFIG.entity_conseil,
      entity_action: DEFAULT_CONFIG.entity_action,
      entity_avoid: DEFAULT_CONFIG.entity_avoid,
      entity_niveau_pertinence: DEFAULT_CONFIG.entity_niveau_pertinence,
      entity_prochaine_fenetre_optimale: DEFAULT_CONFIG.entity_prochaine_fenetre_optimale,
      entity_prochain_blocage_attendu: DEFAULT_CONFIG.entity_prochain_blocage_attendu,
      entity_mode: DEFAULT_CONFIG.entity_mode,
      entity_switch_arrosage_automatique: DEFAULT_CONFIG.entity_switch_arrosage_automatique,
      entity_arrosage_recommande: DEFAULT_CONFIG.entity_arrosage_recommande,
      entity_arrosage_apres_application_autorise: DEFAULT_CONFIG.entity_arrosage_apres_application_autorise,
      entity_debug_intervention: DEFAULT_CONFIG.entity_debug_intervention,
      entity_signal_irrigation: DEFAULT_CONFIG.entity_signal_irrigation,
      entity_tonte_autorisee: DEFAULT_CONFIG.entity_tonte_autorisee,
      entity_signal_intervention: DEFAULT_CONFIG.entity_signal_intervention,
      entity_objectif_arrosage: DEFAULT_CONFIG.entity_objectif_arrosage,
      entity_type_arrosage: DEFAULT_CONFIG.entity_type_arrosage,
      entity_tonte: DEFAULT_CONFIG.entity_tonte,
      entity_hauteur: DEFAULT_CONFIG.entity_hauteur,
      entity_arrosage_en_cours: DEFAULT_CONFIG.entity_arrosage_en_cours,
      entity_debit_zone_1: DEFAULT_CONFIG.entity_debit_zone_1,
      entity_debit_zone_2: DEFAULT_CONFIG.entity_debit_zone_2,
      entity_debit_zone_3: DEFAULT_CONFIG.entity_debit_zone_3,
      entity_debit_zone_4: DEFAULT_CONFIG.entity_debit_zone_4,
      entity_debit_zone_5: DEFAULT_CONFIG.entity_debit_zone_5,
      entity_hauteur_min_tondeuse: DEFAULT_CONFIG.entity_hauteur_min_tondeuse,
      entity_hauteur_max_tondeuse: DEFAULT_CONFIG.entity_hauteur_max_tondeuse,
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "show_header", selector: { boolean: {} } },
        { name: "show_icons", selector: { boolean: {} } },
        { name: "show_background", selector: { boolean: {} } },
        { name: "compact", selector: { boolean: {} } },
        { name: "minimal_mode", selector: { boolean: {} } },
        { name: "show_secondary_info", selector: { boolean: {} } },
        { name: "show_advanced_details", selector: { boolean: {} } },
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_weather", selector: { entity: { domain: ["weather"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau_pertinence", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_blocage_attendu", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_mode", selector: { entity: { domain: ["select"] } } },
        { name: "entity_switch_arrosage_automatique", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_arrosage_recommande", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_arrosage_apres_application_autorise", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_debug_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_signal_irrigation", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_tonte_autorisee", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_signal_intervention", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_objectif_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_type_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_arrosage_en_cours", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_debit_zone_1", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_2", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_3", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_4", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_5", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_min_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_max_tondeuse", selector: { entity: { domain: ["number"] } } },
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
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 6;
    }
    if (this._isMinimalMode()) {
      return this._config.show_header ? 4 : 3;
    }
    let size = this._config.compact ? 7 : 8;
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
    return {
      rows,
      columns: 12,
      min_rows: rows,
      min_columns: 6,
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
    this.shadowRoot?.removeEventListener("click", this._onClick);
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

  _serviceTargetEntityId() {
    return (
      this._entityId("entity_derniere_application") ||
      this._entityId("entity_produit_intervention") ||
      this._entityId("entity_catalogue_produits") ||
      null
    );
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
    const selectedProductId = String(attrs.selected_product_id || "").trim();
    const entityState = String(entity?.state || "").trim();
    const selectedProductName = String(
      attrs.selected_product_name || (isUnavailableState(entityState) ? "" : entityState) || "",
    ).trim();
    const selectedProductMonths = attrs.selected_product_months;
    const selectedProductMonthsLabel = String(attrs.selected_product_months_label || "").trim();
    const selectedProductUsageMode = String(attrs.selected_product_usage_mode || "").trim();
    const selectedProductUsageModeLabel = String(attrs.selected_product_usage_mode_label || "").trim();
    const selectedProductMaxApplicationsPerYear = asNumber(attrs.selected_product_max_applications_per_year);
    const selectedProductMaxApplicationsPerYearLabel = String(attrs.selected_product_max_applications_per_year_label || "").trim();
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
    const payload = attrs.payload && typeof attrs.payload === "object" ? attrs.payload : attrs;
    const catalogue = this._catalogueState();
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
    const selectedProductMonths = Array.isArray(selection.months) ? selection.months : [];
    const selectedProductMonthsLabel = String(selection.months_label || attrs.selected_product_months_label || "").trim() || null;
    const selectedProductUsageMode = String(selection.usage_mode || attrs.selected_product_usage_mode || "").trim() || null;
    const selectedProductUsageModeLabel = String(selection.usage_mode_label || attrs.selected_product_usage_mode_label || "").trim() || null;
    const selectedProductMaxApplicationsPerYear = asNumber(
      selection.max_applications_per_year ?? attrs.selected_product_max_applications_per_year,
    );
    const selectedProductMaxApplicationsPerYearLabel = String(
      selection.max_applications_per_year_label || attrs.selected_product_max_applications_per_year_label || "",
    ).trim() || null;
    const recommendedProductMonths = Array.isArray(product.months) ? product.months : [];
    const recommendedProductMonthsLabel = String(product.months_label || attrs.recommended_product_months_label || "").trim() || null;
    const recommendedProductId = String(product.id || attrs.recommended_product_id || "").trim() || null;
    const recommendedProductName = String(product.name || attrs.recommended_product_name || "").trim() || null;
    const recommendedProductType = String(product.type || attrs.recommended_product_type || "").trim() || null;
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
    return {
      entity,
      hasApplication,
      label: hasApplication ? rawState : "Aucune application",
      summary: summary || (hasApplication ? "Dernière application enregistrée" : "Aucune application enregistrée"),
      detail: detailParts.join(" · "),
      productId: String(attrs.produit_id || "").trim() || null,
      productName: String(attrs.produit || attrs.libelle || "").trim() || null,
      when,
    };
  }

  _objectiveEntity() {
    return this._entity("entity_objectif_arrosage");
  }

  _objectiveMm() {
    return this._entityNumber("entity_objectif_arrosage");
  }

  _windowState() {
    const entity = this._windowEntity();
    const attrs = entity?.attributes || {};
    const status = String(attrs.status || "").trim().toLowerCase();
    const summary = String(attrs.summary || entity?.state || "Irrigation prévue").trim();
    const nextAction = String(attrs.next_action || "").trim();
    const nextActionDisplay = String(attrs.next_action_display || "").trim();
    const nextActionDate = String(attrs.next_action_date || "").trim();
    const blockReason = String(attrs.block_reason || "").trim();
    const blockReasonLabel = formatWateringBlockReason(blockReason);
    const objective = this._objectiveMm() ?? 0;
    const isAwaiting = status === "en_attente";
    const showManualAction = objective > 0 && status === "auto";
    const isBlocked = status === "bloque";
    const isNoActionRequired = !isBlocked && objective <= 0;
    const displaySummary = isBlocked ? "Irrigation bloquée" : summary;
    const displayNextAction = isBlocked
      ? blockReasonLabel || nextActionDisplay || nextAction || "Attendre la fin du bloc"
      : nextActionDisplay || nextAction || "";
    return {
      entity,
      status,
      summary,
      displaySummary,
      nextAction,
      nextActionDisplay,
      displayNextAction,
      nextActionDate,
      blockReason,
      blockReasonLabel,
      objective,
      showManualAction,
      isAwaiting,
      isBlocked,
      isNoActionRequired,
      tone: statusTone(status),
      statusLabel: formatStatusLabel(status),
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
    return {
      entity,
      summary: summary || "Aucun plan d'arrosage",
      durationHuman: durationHuman || formatDurationHuman(attrs.total_duration_min ?? entity?.state),
      zoneCount: zoneCount ?? 0,
      objectiveMm: objectiveMm ?? 0,
      planType: planType || "no_plan",
      passages: passages ?? 1,
      fractionation: Boolean(attrs.fractionation),
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
    if (totalSeconds > 0 && passages > 1) {
      totalSeconds = (totalSeconds * passages) + (pauseMinutes * 60.0 * (passages - 1));
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
    const totalSeconds = this._estimatedWateringTotalSeconds();
    const elapsedSeconds = Number.isFinite(startedAt)
      ? Math.max(0, (Date.now() - startedAt) / 1000)
      : asNumber(attrs.elapsed_seconds) ?? 0;
    const progressPercent = totalSeconds > 0
      ? Math.min(100, (elapsedSeconds / totalSeconds) * 100)
      : asNumber(attrs.progress_percent) ?? asNumber(entity.state) ?? 0;
    const remainingSeconds = totalSeconds > 0 ? Math.max(totalSeconds - elapsedSeconds, 0) : asNumber(attrs.remaining_seconds) ?? 0;
    const activeZoneCount = asNumber(attrs.active_zone_count) ?? 0;
    const zoneCount = asNumber(attrs.zone_count) ?? activeZoneCount;
    const startedAtLabel = String(attrs.started_at || "").trim() || (startedAtRaw ? humanDateTimeText(startedAtRaw) : "");
    const detailParts = [];
    if (startedAtLabel) {
      detailParts.push(`Démarré ${startedAtLabel}`);
    }
    detailParts.push(`${activeZoneCount} zone${activeZoneCount > 1 ? "s" : ""} active${activeZoneCount > 1 ? "s" : ""}`);
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
      zoneCount,
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
          this._wateringProgressTick = Date.now();
          this._render();
        }, 5000);
      }
      return;
    }
    this._clearWateringProgressTimer();
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
    };
  }

  _objectiveContext() {
    const entity = this._objectiveEntity();
    const temperature = asNumber(entity?.attributes?.temperature);
    const etp = asNumber(entity?.attributes?.etp);
    const risk = this._entityState("entity_risque", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    return {
      entity,
      temperature,
      etp,
      risk,
      mode,
      typeArrosage,
    };
  }

  _manualActionService() {
    const service = String(this._config?.manual_action_service || "").trim();
    if (!service) {
      return "gazon_intelligent.start_manual_irrigation";
    }
    return service;
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
      "background: linear-gradient(135deg, #2ec86f 0%, #19a3ff 100%)",
      "border: 1px solid #1e8f55",
      "color: #ffffff",
      "box-shadow: 0 12px 24px rgba(30, 143, 85, 0.28), 0 0 0 1px rgba(30, 143, 85, 0.18)",
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

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize }) {
    if (!this.style) {
      return;
    }
    const vars = {
      "--gazon-accent-color": accent,
      "--gazon-card-accent": accent,
      "--gazon-card-tone-color": accent,
      "--gazon-card-tone": activeTone,
      "--gazon-section-accent": sectionAccent,
      "--gazon-lawn-color": `color-mix(in srgb, ${sectionAccent} 62%, #80da67)`,
      "--gazon-water-color": `color-mix(in srgb, ${accent} 42%, #44c8ea)`,
      "--gazon-moss-color": `color-mix(in srgb, ${sectionAccent} 74%, #4d9f58)`,
      "--gi-soil-color": `color-mix(in srgb, ${accent} 18%, #b8865d)`,
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
      "entity_type_arrosage",
      "entity_mode",
      "entity_switch_arrosage_automatique",
      "entity_arrosage_en_cours",
      "entity_debit_zone_1",
      "entity_debit_zone_2",
      "entity_debit_zone_3",
      "entity_debit_zone_4",
      "entity_debit_zone_5",
      "entity_hauteur_min_tondeuse",
      "entity_hauteur_max_tondeuse",
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
        ["entity_phase", "entity_sous_phase", "entity_niveau", "entity_risque", "entity_conseil", "entity_action", "entity_avoid"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "products") {
        ["entity_catalogue_produits", "entity_produit_intervention", "entity_derniere_application"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "config") {
        [
          "entity_switch_arrosage_automatique",
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
        ].forEach((key) => keys.add(key));
      } else {
        [
          "entity_fenetre_optimale",
          "entity_plan_arrosage",
          "entity_dernier_arrosage",
          "entity_derniere_application",
          "entity_debug_intervention",
          "entity_conseil",
          "entity_action",
          "entity_avoid",
          "entity_objectif_arrosage",
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

    if (this._hasActiveWateringProgress()) {
      keys.add(`watering_progress_${this._wateringProgressTick || 0}`);
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
        compact: Boolean(this._config.compact),
        minimal_mode: Boolean(this._config.minimal_mode),
        show_secondary_info: Boolean(this._config.show_secondary_info),
        show_advanced_details: Boolean(this._config.show_advanced_details),
        theme_mode: this._config.theme_mode,
        accent_color: this._config.accent_color,
        icon_size: this._config.icon_size,
        border_radius: this._config.border_radius,
        background_style: this._config.background_style,
        use_gradient: Boolean(this._config.use_gradient),
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

  _renderContextPill(label, value, tone = "neutral", icon = null) {
    if (isEmpty(value)) {
      return "";
    }
    return renderPill({
      label,
      value,
      tone,
      icon: this._config?.show_icons ? icon : null,
    });
  }

  _renderTabPill(label, value, tone = "neutral", icon = null) {
    return this._renderContextPill(label, value, tone, icon);
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
    const lastWatering = this._lastWateringState();
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

    const wateringFocus = objective > 0 || arrosageRecommande === "on" || windowState.isAwaiting || windowState.showManualAction;
    const mowingFocus =
      computeTonteTone(tonte) !== "neutral" ||
      computeRisqueTone(risk) !== "neutral" ||
      tonteAutorisee === "off" ||
      !isEmpty(phase) ||
      !isEmpty(subPhase);
    const configFocus =
      switchState.tone !== "success" ||
      ["bloque", "en_attente", "non_autorise"].includes(afterApplicationInfo.kind) ||
      !isEmpty(mode);
    const stableState = !wateringFocus && !mowingFocus && !configFocus;

    const waterGroup = [
      {
        label: "Irrigation",
        value: formatRecommendationState(arrosageRecommande),
        tone: arrosageRecommande === "on" ? "success" : windowState.tone,
        icon: "mdi:water-check",
        secondary: windowState.summary || planState.summary || objectiveLabel,
        entityKey: "entity_arrosage_recommande",
      },
      {
        label: "Fenêtre d'irrigation",
        value: windowState.statusLabel,
        tone: windowState.tone,
        icon: "mdi:clock-outline",
        secondary: windowState.summary || windowState.nextAction || planState.summary,
        entityKey: "entity_fenetre_optimale",
      },
      {
        label: "Objectif d'irrigation",
        value: objectiveLabel,
        tone: objective > 0 ? "success" : "neutral",
        icon: "mdi:water-percent",
        secondary: typeArrosage ? `Type: ${formatApplicationMode(typeArrosage)}` : "",
        entityKey: "entity_objectif_arrosage",
      },
      {
        label: "Plan d'irrigation",
        value: planState.summary,
        tone: this._planTypeTone(planState.planType),
        icon: "mdi:timer-outline",
        secondary: `${planState.durationHuman}${planState.zoneCount ? ` · ${planState.zoneCount} zone${planState.zoneCount > 1 ? "s" : ""}` : ""}`,
        entityKey: "entity_plan_arrosage",
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

    if (wateringFocus) {
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

  _renderConfigActionCard(label, entityKey, value, tone = "neutral", icon = null, secondary = "") {
    const entityId = this._entityId(entityKey);
    const card = this._renderStatCard(label, value, tone, icon, secondary, true);
    if (!entityId) {
      return card;
    }
    return `
      <button
        type="button"
        class="gi-action gi-config-action"
        data-more-info-entity="${escapeHtml(entityId)}"
        aria-label="Modifier ${escapeHtml(label)}"
      >
        ${card}
      </button>
    `;
  }

  _renderLinkedStatCard(fact) {
    const card = this._renderStatCard(
      fact.label,
      fact.value,
      fact.tone,
      fact.icon,
      this._config?.show_secondary_info ? fact.secondary : "",
      true,
    );
    const entityId = this._entityId(fact.entityKey);
    if (!entityId) {
      return card;
    }
    return `
      <button
        type="button"
        class="gi-action gi-overview-action"
        data-more-info-entity="${escapeHtml(entityId)}"
        aria-label="Ouvrir ${escapeHtml(fact.label)}"
      >
        ${card}
      </button>
    `;
  }

  _renderWateringProgressSection(progressState) {
    return renderWateringProgressSection(this, progressState);
  }

  _overviewProposal() {
    const windowState = this._windowState();
    const planState = this._planState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const tonte = this._entityState("entity_tonte", null);
    const risk = this._entityState("entity_risque", null);
    const conseil = this._entityState("entity_conseil", null);
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const arrosageApresApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(arrosageApresApplication);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const actionTone = this._actionTone();

    let title = "Vue d’ensemble";
    let hint = conseil || planState.summary || windowState.summary || "Les paramètres restent cohérents.";
    let tone = "neutral";
    let icon = "mdi:check-circle-outline";

    if (windowState.isAwaiting && objective > 0) {
      title = "Irrigation prévue demain matin";
      hint = `${windowState.nextAction || "Attendre le créneau prévu."}${planState.summary ? ` · ${planState.summary}` : ""}`;
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
    } else if (computeTonteTone(tonte) === "danger") {
      title = "Tonte interdite";
      hint = avoid || "Tondre avant levée complète.";
      tone = "danger";
      icon = "mdi:content-cut";
    } else if (computeRisqueTone(risk) === "danger" || computeRisqueTone(risk) === "critical") {
      title = "Risque gazon élevé";
      hint = action || conseil || "Ouvrir l’onglet Gazon pour voir les détails avancés.";
      tone = computeRisqueTone(risk);
      icon = "mdi:shield-alert-outline";
    } else if (arrosageRecommande === "on") {
      title = "Autorisé";
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
    } else if (tonteAutorisee === "off") {
      title = "Tonte interdite";
      hint = action || "Sursemis en cours.";
      tone = "danger";
      icon = "mdi:content-cut";
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
      return {
        value: suffix ? `${formatNumber(numeric, 1)} ${suffix}` : formatNumber(numeric, 1) || String(raw),
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

  _renderGazonTab() {
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const risk = this._entityState("entity_risque", null);
    const action = this._entityState("entity_niveau", null);
    const progress = asNumber(this._entity("entity_sous_phase")?.attributes?.sous_phase_progression);
    const progressDetail = this._entity("entity_sous_phase")?.attributes?.sous_phase_detail || "";
    const progressLabel = progress === null ? "Progression non disponible" : `${formatNumber(progress, 0)} %`;
    const progressWidth = progress === null ? 0 : Math.max(0, Math.min(100, progress));
    const gazonStatusIcon = this._config?.show_icons ? "mdi:grass" : null;
    const gazonSummary = [
      phase ? `Phase ${formatStatusLabel(phase)}` : "",
      subPhase ? `Sous-phase ${formatStatusLabel(subPhase)}` : "",
    ].filter(Boolean).join(" · ") || "Contexte gazon";
    const gazonHint = [
      risk ? `Risque ${formatStatusLabel(risk)}` : "",
      action ? `Action ${formatStatusLabel(action)}` : "",
    ].filter(Boolean).join(" · ") || "Les détails avancés suivent l’onglet actif.";
    const gazonFacts = [
      {
        label: "Phase dominante",
        value: formatStatusLabel(phase),
        tone: phaseTone(phase),
        icon: "mdi:grass",
        secondary: "",
        entityKey: "entity_phase",
      },
      {
        label: "Sous-phase",
        value: formatStatusLabel(subPhase),
        tone: phaseTone(phase),
        icon: "mdi:sprout",
        secondary: progressDetail || "",
        entityKey: "entity_sous_phase",
      },
      {
        label: "Risque gazon",
        value: formatStatusLabel(risk),
        tone: computeRisqueTone(risk),
        icon: "mdi:shield-alert-outline",
        secondary: "",
        entityKey: "entity_risque",
      },
      {
        label: "Niveau d'action",
        value: formatStatusLabel(action),
        tone: computeActionTone(action),
        icon: "mdi:signal",
        secondary: "",
        entityKey: "entity_niveau",
      },
    ];

    return `
      <section class="tab-panel gi-panel tab-panel--gazon">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Gazon</div>
            <div class="tab-panel__title">Phase, sous-phase et contexte avancé</div>
            <div class="tab-panel__header-hint">${escapeHtml(gazonSummary)}${gazonHint ? ` · ${escapeHtml(gazonHint)}` : ""}</div>
          </div>
          ${renderStatusPill(formatStatusLabel(action), computeActionTone(action), gazonStatusIcon, "tab-panel__status")}
        </div>

        <div class="tab-panel__grid">
          ${gazonFacts.map((fact) => this._renderLinkedStatCard(fact)).join("")}
        </div>

        <div class="tab-panel__section">
          <div class="tab-panel__section-title">Progression de la sous-phase</div>
          <div class="tab-progress" aria-label="${escapeHtml(progressLabel)}">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar ${computeActionTone(action) === "critical" ? "gi-progress__bar--critical" : ""}" style="width:${escapeHtml(String(progressWidth))}%;"></span>
            </div>
            <div class="tab-progress__meta">${escapeHtml(progressLabel)}</div>
          </div>
        </div>
      </section>
    `;
  }

  _renderMowingTab() {
    const tonte = this._entity("entity_tonte");
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const height = this._entity("entity_hauteur");
    const windowState = this._windowState();
    const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
    const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
    const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
    const windowSummary = windowState.entity ? windowState.summary : "Fenêtre optimale non disponible";
    const mowingStatusIcon = this._config?.show_icons ? "mdi:content-cut" : null;
    const mowingFacts = [
      {
        label: "État de tonte",
        value: tonteValue,
        tone: computeTonteTone(tonteValue),
        icon: "mdi:content-cut",
        secondary: "",
        entityKey: "entity_tonte",
      },
      {
        label: "Tonte autorisée",
        value: formatAuthorizationState(tonteAutorisee),
        tone: tonteAutorisee === "on" ? "success" : "danger",
        icon: "mdi:content-cut",
        secondary: "",
        entityKey: "entity_tonte_autorisee",
      },
      {
        label: "Hauteur conseillée",
        value: heightValue,
        tone: this._phaseTone(),
        icon: "mdi:ruler-square",
        secondary: heightSecondary,
        entityKey: "entity_hauteur",
      },
      {
        label: "Fenêtre optimale",
        value: windowSummary,
        tone: windowState.tone,
        icon: "mdi:clock-outline",
        secondary: windowState.nextAction || "",
        entityKey: "entity_fenetre_optimale",
      },
    ];

    return `
      <section class="tab-panel gi-panel tab-panel--mowing">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Tonte</div>
            <div class="tab-panel__title">État, hauteur et créneau</div>
          </div>
          ${renderStatusPill(tonteValue, computeTonteTone(tonteValue), mowingStatusIcon, "tab-panel__status")}
        </div>

        <div class="tab-panel__grid">
          ${mowingFacts.map((fact) => this._renderLinkedStatCard(fact)).join("")}
        </div>
      </section>
    `;
  }

  _renderOverviewTab() {
    const windowState = this._windowState();
    const planState = this._planState();
    const proposal = this._overviewProposal();
    const overviewTone = proposal.tone;
    const overviewIcon = this._config?.show_icons ? proposal.icon : null;
    const facts = this._overviewFacts();
    const wateringProgress = this._wateringProgressState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);

    return `
      <section class="tab-panel gi-panel tab-panel--overview">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${overviewTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Vue prioritaire</div>
            ${renderStatusPill(proposal.title, overviewTone, overviewIcon, `tab-panel__status tab-panel__status--${overviewTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(windowState.summary || planState.summary || "Vue d’ensemble de la carte.")}</div>
          <div class="tab-panel__hero-hint">${escapeHtml("Le résumé s’adapte automatiquement à la situation réelle et remonte les informations utiles en premier.")}</div>
        </div>

        ${this._renderWateringProgressSection(wateringProgress)}

        <div class="tab-panel__grid tab-panel__grid--overview">
          ${facts
            .map((fact) => this._renderLinkedStatCard(fact))
            .join("")}
        </div>

        ${
          `<section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--overview-brief">
            <div class="tab-panel__eyebrow">Lecture rapide</div>
            <div class="tab-panel__section-summary">${escapeHtml(proposal.title)}</div>
            <div class="tab-panel__block-hint">${escapeHtml(proposal.hint)}</div>
          </section>`
        }
      </section>
    `;
  }

  _renderWateringTab() {
    const windowState = this._windowState();
    const planState = this._planState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const context = this._objectiveContext();
    const lastWatering = this._lastWateringState();
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const afterApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(afterApplication);
    const tone = windowState.tone;
    const windowIcon = this._statusIcon(windowState.status);
    const windowStatusIcon = this._config?.show_icons ? windowIcon : null;
    const isBlocked = windowState.isBlocked;
    const isAwaiting = windowState.isAwaiting;
    const noActionText = windowState.isNoActionRequired ? "Non requis" : "";
    const noActionHint = windowState.isNoActionRequired ? windowState.summary || "Non requis" : "";
    const blockText = isBlocked
      ? windowState.summary || "Irrigation bloquée"
      : isAwaiting
        ? windowState.summary || "Irrigation prévue"
        : noActionText;
    const blockHint = isBlocked
      ? windowState.nextAction || ""
      : isAwaiting
        ? windowState.nextAction || "Attendre le créneau prévu"
        : noActionHint;
    const planTypeLabel = formatPlanType(planState.planType);

    const contextPills = [
      this._renderTabPill("Irrigation", formatRecommendationState(arrosageRecommande), arrosageRecommande === "on" ? "success" : "neutral", "mdi:water-check"),
      this._renderTabPill("Post-application", afterApplicationInfo.label, afterApplicationInfo.tone, "mdi:water-off"),
      this._renderTabPill("Profil d'irrigation", formatStateLabel(context.typeArrosage), isEmpty(context.typeArrosage) ? "neutral" : "accent", "mdi:sprinkler"),
      this._renderTabPill("Dernier arrosage", lastWatering.label, lastWatering.value !== null ? "success" : "neutral", "mdi:water-check"),
      this._renderTabPill("Risque gazon", context.risk, computeRisqueTone(context.risk), "mdi:shield-alert-outline"),
      this._renderTabPill(
        "Température",
        context.temperature === null ? "Non disponible" : `${formatNumber(context.temperature, 1)} °C`,
        context.temperature !== null && context.temperature >= 24 ? "warning" : "neutral",
        "mdi:thermometer",
      ),
      this._renderTabPill(
        "ETP",
        context.etp === null ? "Non disponible" : `${formatNumber(context.etp, 1)} mm`,
        context.etp !== null && context.etp >= 4 ? "warning" : "neutral",
        "mdi:weather-sunny",
      ),
    ];

    const planChips = [
      this._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
      this._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
      this._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
      this._renderTabPill("Type de plan", planTypeLabel, this._planTypeTone(planState.planType), "mdi:shape"),
      this._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
    ];
    const wateringProgress = this._wateringProgressState();
    const manualActionLabel = this._manualActionLabel();

    return `
      <section class="tab-panel gi-panel tab-panel--watering">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${tone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(windowState.summary || "Irrigation")}</div>
            ${renderStatusPill(windowState.statusLabel, tone, windowStatusIcon, `tab-panel__hero-status tab-panel__hero-status--${tone}`)}
          </div>
          ${
            windowState.nextAction
              ? `<div class="tab-panel__hero-next">${escapeHtml(windowState.nextAction)}</div>`
              : ""
          }
          ${
            isBlocked && blockHint
              ? `<div class="tab-panel__hero-hint">${escapeHtml(blockHint)}</div>`
              : ""
          }
        </div>

        ${this._renderWateringProgressSection(wateringProgress)}

        <section class="gi-info gi-info--main tab-panel__section">
            <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Plan d'irrigation</div>
            <div class="tab-panel__section-meta">${escapeHtml(planState.durationHuman)} · ${escapeHtml(planTypeLabel)}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(planState.summary)}</div>
          ${
            this._config?.show_secondary_info
              ? `<div class="tab-panel__chips">${planChips.join("")}</div>`
              : ""
          }
        </section>

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__eyebrow">Contexte de décision</div>
          <div class="tab-panel__grid">
            ${contextPills.join("")}
          </div>
        </section>
      </section>
    `;
  }

  _renderActiveTab() {
    return renderActiveTab(this);
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
    if (["entity_arrosage_recommande", "entity_objectif_arrosage", "entity_type_arrosage", "entity_signal_irrigation"].includes(fieldKey)) {
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

  _renderSectionNav() {
    return renderSectionNav(this);
  }

  _renderHero() {
    const tonte = this._entityState("entity_tonte", null);
    const arrosage = this._entityState("entity_arrosage_recommande", null);
    const afterApplication = this._entity("entity_arrosage_apres_application_autorise");
    const afterApplicationInfo = this._postApplicationState(afterApplication);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const hauteur = this._entityState("entity_hauteur", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const objective = this._objectiveMm();
    const objectiveLabel = objective === null ? "Non disponible" : formatMm(objective);
    const windowState = this._windowState();
    const conseil = this._entityState("entity_conseil", null);
    const sectionAccent = this._sectionAccent("overview");

    return `
      <section class="hero" style="--gazon-section-accent:${escapeHtml(sectionAccent)};">
        <div class="gi-row hero__lead ${this._primaryTone() === "danger" ? "hero__lead--danger" : ""}">
          <div class="hero__lead-icon">${this._config.show_icons ? renderIconBox("mdi:leaf", "md") : ""}</div>
          <div class="hero__lead-content">
            <div class="hero__label">Conseil principal</div>
            <div class="hero__value">${escapeHtml(conseil || "Non configuré.")}</div>
          </div>
        </div>
        <div class="hero__metrics">
          ${this._renderMetric("Fenêtre", windowState.summary || windowState.statusLabel, windowState.tone, this._heroMetricIcon("entity_fenetre_optimale", windowState.summary || windowState.statusLabel))}
          ${this._renderMetric("Objectif", objectiveLabel, objective !== null && objective > 0 ? "success" : "neutral", "mdi:water-percent")}
          ${this._renderMetric("Profil d'irrigation", formatApplicationMode(typeArrosage), isEmpty(typeArrosage) ? "neutral" : "accent", "mdi:sprinkler")}
          ${this._renderMetric("Tonte", tonte, computeTonteTone(tonte), this._heroMetricIcon("entity_tonte", tonte))}
          ${this._renderMetric("Irrigation", formatRecommendationState(arrosage), arrosage === "on" ? "success" : "neutral", this._heroMetricIcon("entity_arrosage_recommande", arrosage))}
          ${this._renderMetric("Tonte autorisée", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", this._heroMetricIcon("entity_tonte_autorisee", tonteAutorisee))}
          ${this._renderMetric("Post-application", afterApplicationInfo.label, afterApplicationInfo.tone, this._heroMetricIcon("entity_arrosage_apres_application_autorise", afterApplication?.state ?? ""))}
          ${this._renderMetric("Hauteur", formatCm(hauteur), this._phaseTone(), this._heroMetricIcon("entity_hauteur", hauteur))}
        </div>
      </section>
    `;
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
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
      const triggerKind = String(entity.attributes?.trigger_kind || "").trim().toLowerCase();
      if (["post_application", "hydrique"].includes(triggerKind)) {
        return "success";
      }
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
      return formatStatusLabel(entity.state);
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
    if (field.key === "entity_tonte") {
      return formatStatusLabel(entity.state);
    }
    if (field.key === "entity_signal_intervention" || field.key === "entity_signal_irrigation") {
      return String(entity.attributes?.summary || formatStatusLabel(entity.state)).trim() || "Non disponible";
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
      return parts.join(" · ");
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

  _buildDecisionBlocks(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
      return "";
    }
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    if (!action && !avoid) {
      return "";
    }
    return `
      <section class="decision-grid">
        ${
          action
              ? `<div class="gi-info gi-info--secondary decision decision--action">
                <div class="decision__label">Action recommandée</div>
                <div class="decision__value">${escapeHtml(action)}</div>
              </div>`
            : ""
        }
        ${
          avoid
            ? `<div class="gi-info gi-info--secondary decision decision--avoid">
                <div class="decision__label">Action à éviter</div>
                <div class="decision__value">${escapeHtml(avoid)}</div>
              </div>`
            : ""
        }
      </section>
    `;
  }

  _buildContent() {
    const section = this._isMinimalMode() ? "overview" : this._activeSection;
    const tiles = this._visibleFields(section).map((field) => this._renderTile(field)).filter(Boolean);
    if (tiles.length === 0) {
      return "";
    }
    return `
      <section class="tiles tiles--${section} ${this._config.compact ? "tiles--compact" : ""} ${this._isMinimalMode() ? "tiles--minimal" : ""}">
        ${tiles.join("")}
      </section>
    `;
  }

  _buildFooter(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
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
      this._lastRenderSignature = renderSignature;

      const activeTone = this._cardTone();
      const accent = this._config.accent_color || this._accentColorFromTone(activeTone);
      const sectionAccent = this._tabAccent(this._activeTab);
      const background = this._config.show_background ? "true" : "false";
      const backgroundStyle = this._config.background_style || "solid";
      const themeMode = this._config.theme_mode || "auto";
      const resolvedThemeMode = themeMode === "auto" ? (this._hass?.themes?.darkMode ? "dark" : "light") : themeMode;
      const borderRadius = `${this._config.border_radius ?? 24}px`;
      const iconSize = `${this._config.icon_size ?? 24}px`;
      const actionCritical = this._actionTone() === "critical";
      const isPreview = this._isPreviewMode();

      this._applyHostVariables({
        accent,
        activeTone,
        sectionAccent,
        borderRadius,
        iconSize,
      });

      const rootClass = [
        "card",
        this._config.compact ? "card--compact" : "",
        backgroundStyle ? `card--${backgroundStyle}` : "",
        resolvedThemeMode ? `card--theme-${resolvedThemeMode}` : "",
        this._config.use_gradient ? "card--gradient" : "",
        actionCritical ? "card--pulse-critical" : "",
        isPreview ? "card--editor-preview" : "",
      ]
        .filter(Boolean)
        .join(" ");

      this.shadowRoot.innerHTML = `
        <style>
${CARD_STYLES}
        </style>

          <ha-card
            class="gi-card ${rootClass}"
            aria-label="${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}"
            data-background="${background}"
            data-tone="${activeTone}"
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
      this.shadowRoot.removeEventListener("change", this._onChange);
      this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
      this.shadowRoot.addEventListener("click", this._onClick);
      this.shadowRoot.addEventListener("change", this._onChange);
      this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
      this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
      this.shadowRoot.addEventListener("keydown", this._onKeyDown);
      this._syncWateringProgressTimer();
    } catch (error) {
      console.error("[gazon-intelligent-card] render failed", error);
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
      event.preventDefault();
      event.stopPropagation();
      this._triggerManualIrrigation();
      return;
    }
    const declareTarget = event.target.closest("[data-gazon-action='declare-product-intervention']");
    if (declareTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._triggerSelectedProductIntervention();
      return;
    }
    const removeLastApplicationTarget = event.target.closest("[data-gazon-action='remove-last-application']");
    if (removeLastApplicationTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._triggerRemoveLastApplication();
      return;
    }
    const tabTarget = event.target.closest("[data-tab]");
    if (tabTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveTab(tabTarget.dataset.tab);
      return;
    }
    const sectionTarget = event.target.closest("[data-section]");
    if (sectionTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveSection(sectionTarget.dataset.section);
      return;
    }
  }

  _onChange(event) {
    const selectTarget = event.target?.closest?.("[data-gazon-action='select-intervention-product']");
    if (selectTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._triggerInterventionProductSelection(selectTarget.value);
    }
  }

  _onContextMenu(event) {
    event.preventDefault();
  }

  _onDoubleClick(event) {
    event.preventDefault();
  }

  _onKeyDown(event) {
    const target = event.target;
    if (target && ["SELECT", "INPUT", "TEXTAREA"].includes(String(target.tagName || "").toUpperCase())) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
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
    this._hass.callService(service.domain, service.service, {
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
    const payload = {
      intervention,
      date_action: this._todayIsoDate(),
      produit_id: productId,
      produit: productName,
      note: "Déclaration rapide depuis la carte",
    };
    const targetEntityId = this._serviceTargetEntityId();
    if (targetEntityId) {
      payload.entity_id = targetEntityId;
    }
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
    const payload = {};
    const targetEntityId = this._serviceTargetEntityId();
    if (targetEntityId) {
      payload.entity_id = targetEntityId;
    }
    this._hass.callService(service.domain, service.service, payload);
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
