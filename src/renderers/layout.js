import { TAB_DEFS } from "../constants.js";

// Identifiant d'entité pour rendre une zone cliquable (more-info), seulement si
// l'entité existe réellement côté hass — sinon on n'ajoute pas le binding.
function moreInfoId(card, key) {
  return card._entity(key) ? card._entityId(key) : null;
}
import {
  asNumber,
  computeActionTone,
  computeRisqueTone,
  computeTonteTone,
  escapeHtml,
  formatApplicationMode,
  formatAuthorizationState,
  formatCm,
  formatMm,
  formatPlanType,
  formatProductUsageMode,
  formatIrrigationSignalLabel,
  formatStatusLabel,
  formatNumber,
  formatDurationHuman,
  formatInterventionStatusPresentation,
  formatWateringCauseLabel,
  formatWateringTypeLabel,
  compactDecisionText,
  safeFormatMonthLabel as formatMonthLabel,
  safeRenderIconBox as renderIconBox,
  safeRenderStatusPill as renderStatusPill,
  humanDateTimeText,
  isEmpty,
  phaseTone,
  formatHydricUxState,
  formatSkipReason,
  formatSkipRelativeDate,
  zoneColor,
  zoneLabel,
  formatWateringCause,
} from "../utils/formatters.js";

function renderGz2Hero(eyebrow, title, sub = "", opts = {}) {
  const icon = opts.icon || null;
  const tone = opts.tone || "accent";
  const badge = icon
    ? `<div class="gz2-hero__badge gz2-hero__badge--${escapeHtml(tone)}">${renderIconBox(icon, "md")}</div>`
    : "";
  return `
        <div class="gz2-hero${icon ? " gz2-hero--withicon" : ""}">
          ${badge}
          <div class="gz2-hero__body">
            <div class="gz2-eyebrow">${escapeHtml(eyebrow)}</div>
            <div class="gz2-hero__title">${escapeHtml(title)}</div>
            ${sub ? `<div class="gz2-hero__sub">${escapeHtml(sub)}</div>` : ""}
          </div>
        </div>`;
}

function renderGz2Cards(card, items) {
  const showSub = card._config?.show_secondary_info !== false;
  return items.map((f) => {
    const eid = f.entityKey ? card._entityId(f.entityKey) : null;
    const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
    const inner = `
        <div class="gz2-card__label">${escapeHtml(f.label)}</div>
        <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
        ${showSub && f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}`;
    return eid
      ? `<button type="button" class="gz2-card" data-more-info-entity="${escapeHtml(eid)}">${inner}</button>`
      : `<div class="gz2-card gz2-card--static">${inner}</div>`;
  }).join("");
}

function renderGz2Chips(items) {
  return items.map((c) => {
    const tone = ["success", "warning", "danger", "critical", "accent", "neutral"].includes(c.tone) ? c.tone : "neutral";
    return `<span class="gz2-chip gz2-chip--${tone}">${escapeHtml(c.value)}</span>`;
  }).join("");
}

export function renderTabNav(card) {
  return `
      <nav class="gz2-nav" aria-label="Domaines de la carte">
        ${TAB_DEFS.map((tab) => {
          const active = tab.key === card._activeTab;
          return `<button type="button" class="gz2-nav__item ${active ? "gz2-nav__item--active" : ""}" data-tab="${escapeHtml(tab.key)}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(tab.label)}</button>`;
        }).join("")}
      </nav>
    `;
}

function formatTemperatureRangeConstraint(constraint) {
  if (!constraint || typeof constraint !== "object") {
    return null;
  }
  const value = constraint.value && typeof constraint.value === "object" ? constraint.value : {};
  const current = asNumber(value.current ?? value.temperature ?? value.current_temperature ?? value.temperature_current);
  const min = asNumber(value.min ?? value.temperature_min);
  const max = asNumber(value.max ?? value.temperature_max);
  const currentLabel = current === null ? null : `${formatNumber(current, 1)} °C`;
  let expectedLabel = null;
  if (min !== null && max !== null) {
    expectedLabel = `${formatNumber(min, 1)} à ${formatNumber(max, 1)} °C`;
  } else if (min !== null) {
    expectedLabel = `au moins ${formatNumber(min, 1)} °C`;
  } else if (max !== null) {
    expectedLabel = `au plus ${formatNumber(max, 1)} °C`;
  }
  const tone = Boolean(constraint.blocking)
    ? "danger"
    : Boolean(constraint.met)
      ? "success"
      : "warning";
  const icon = Boolean(constraint.blocking)
    ? "mdi:thermometer-alert"
    : Boolean(constraint.met)
      ? "mdi:thermometer-check"
      : "mdi:thermometer";
  const title = Boolean(constraint.blocking)
    ? "Température bloquante"
    : Boolean(constraint.met)
      ? "Température compatible"
      : "Température hors plage";
  const detailParts = [];
  if (currentLabel) {
    detailParts.push(`Actuelle: ${currentLabel}`);
  }
  if (expectedLabel) {
    detailParts.push(`Attendu: ${expectedLabel}`);
  }
  const detail = detailParts.length ? detailParts.join(" · ") : "Température non disponible";
  const hint = String(constraint.hint || "").trim() || null;
  return {
    code: String(constraint.code || "").trim() || null,
    title,
    tone,
    icon,
    detail,
    hint,
    current,
    min,
    max,
    met: Boolean(constraint.met),
    blocking: Boolean(constraint.blocking),
  };
}

function formatDebugRecommendedAction(action) {
  const normalized = String(action ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "select_product") {
    return "Sélectionner le produit";
  }
  if (normalized === "declare_intervention") {
    return "Déclarer maintenant";
  }
  if (normalized === "wait") {
    return "Attendre";
  }
  if (normalized === "add_product") {
    return "Ajouter un produit";
  }
  return formatStatusLabel(normalized);
}

function formatDebugConstraintImpact(constraint) {
  const impact = String(constraint?.impact || "").trim().toLowerCase();
  if (impact === "bloquant") {
    return {
      label: "Bloquant",
      tone: "danger",
      icon: "mdi:alert-circle-outline",
    };
  }
  if (impact === "dégradant" || impact === "degradant") {
    return {
      label: "Dégradant",
      tone: "warning",
      icon: "mdi:shield-alert-outline",
    };
  }
  return {
    label: "Neutre",
    tone: "neutral",
    icon: "mdi:check-circle-outline",
  };
}

function resolveInterventionStatusPresentation(status) {
  if (typeof formatInterventionStatusPresentation === "function") {
    return formatInterventionStatusPresentation(status);
  }
  const normalized = String(status ?? "").trim().toLowerCase();
  const presentations = {
    recommended: {
      title: "Recommandé",
      badge: "Recommandé",
      tone: "success",
      icon: "mdi:spray-bottle",
      summary: "Recommandé",
      hint: "La prochaine intervention est prête à être déclarée.",
      actionLabel: "Déclarer maintenant",
      selectionSummary: "Produit sélectionné",
      selectionHint: "Le produit sélectionné alimente la déclaration.",
      declarationSummary: "Prêt à déclarer",
      declarationHint: "La déclaration peut être lancée maintenant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    possible: {
      title: "À préparer",
      badge: "À préparer",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "À préparer",
      hint: "La prochaine intervention est à préparer.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "Le produit sélectionné alimente la déclaration.",
      declarationSummary: "À préparer",
      declarationHint: "La déclaration n’est pas encore prête.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    preparation: {
      title: "À envisager",
      badge: "À envisager",
      tone: "warning",
      icon: "mdi:spray-bottle",
      summary: "À envisager",
      hint: "La prochaine intervention reste possible, mais le contexte actuel limite sa pertinence.",
      actionLabel: "Choisir le produit",
      selectionSummary: "Produit à sélectionner",
      selectionHint: "Le produit peut être préparé, mais la recommandation reste prudente.",
      declarationSummary: "À envisager",
      declarationHint: "La déclaration n’est pas encore prioritaire dans le contexte actuel.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    ready: {
      title: "Prêt à déclarer",
      badge: "Prêt à déclarer",
      tone: "success",
      icon: "mdi:spray-bottle",
      summary: "Prêt à déclarer",
      hint: "Le produit peut être déclaré maintenant.",
      actionLabel: "Déclarer",
      selectionSummary: "Produit sélectionné",
      selectionHint: "Le produit sélectionné est prêt à être confirmé.",
      declarationSummary: "Prêt à déclarer",
      declarationHint: "La déclaration peut être lancée maintenant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    blocked: {
      title: "Bloqué",
      badge: "Bloqué",
      tone: "danger",
      icon: "mdi:cancel",
      summary: "Bloqué",
      hint: "Une contrainte bloque la prochaine intervention.",
      actionLabel: "Attendre",
      selectionSummary: "Produit sélectionné",
      selectionHint: "La sélection reste disponible, mais la déclaration est bloquée.",
      declarationSummary: "Bloqué",
      declarationHint: "Une contrainte bloque la déclaration.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
    unavailable: {
      title: "Non disponible",
      badge: "Non disponible",
      tone: "neutral",
      icon: "mdi:package-variant-closed",
      summary: "Non disponible",
      hint: "Aucun statut exploitable n’est disponible.",
      actionLabel: "Non disponible",
      selectionSummary: "Aucun produit disponible",
      selectionHint: "Sélectionne un produit dans la liste pour préparer la déclaration.",
      declarationSummary: "Non disponible",
      declarationHint: "Aucune recommandation n’est disponible pour l’instant.",
      historySummary: "Dernière application",
      historyHint: "Historique local des applications enregistrées.",
    },
  };
  return {
    status: normalized || "unavailable",
    ...(presentations[normalized] || presentations.unavailable),
  };
}

function renderDebugConstraintCards(card, constraints, emptyText) {
  const items = Array.isArray(constraints) ? constraints : [];
  if (!items.length) {
    return `<div class="tab-panel__empty">${escapeHtml(emptyText)}</div>`;
  }
  return items
    .map((constraint) => {
      if (!constraint || typeof constraint !== "object") {
        return "";
      }
      const code = String(constraint.code || "").trim() || "contrainte";
      const label = String(constraint.label || "").trim() || "Sans libellé";
      const hint = String(constraint.hint || "").trim();
      const impact = formatDebugConstraintImpact(constraint);
      const metLabel = constraint.met === false ? "Non satisfaite" : "Satisfaite";
      const secondaryParts = [
        `Code: ${code}`,
        `Impact: ${impact.label}`,
        `État: ${metLabel}`,
      ];
      if (hint) {
        secondaryParts.push(hint);
      }
      return card._renderStatCard(
        code,
        label,
        impact.tone,
        impact.icon,
        secondaryParts.join(" · "),
      );
    })
    .filter(Boolean)
    .join("");
}

function getDebugInterventionState(card) {
  const entity = card._entity("entity_debug_intervention");
  if (!entity) {
    return null;
  }
  const attrs = entity.attributes || {};
  const payload = attrs.payload && typeof attrs.payload === "object" ? attrs.payload : attrs;
  const status = String(payload.status || entity.state || attrs.status || "").trim().toLowerCase() || "unavailable";
  const presentation = resolveInterventionStatusPresentation(status);
  const product = payload.product && typeof payload.product === "object" ? payload.product : {};
  const selection = payload.selection && typeof payload.selection === "object" ? payload.selection : {};
  const context = payload.context && typeof payload.context === "object" ? payload.context : {};
  const rawConstraints = Array.isArray(payload.constraints) ? payload.constraints : Array.isArray(attrs.constraints) ? attrs.constraints : [];
  const normalizeConstraint = (constraint) => {
    const item = { ...constraint };
    const impact = String(item.impact || "").trim().toLowerCase();
    if (!impact) {
      item.impact = item.blocking ? "bloquant" : item.met === false ? "dégradant" : "neutre";
    }
    return item;
  };
  const constraints = rawConstraints.filter((constraint) => constraint && typeof constraint === "object").map(normalizeConstraint);
  const blockingConstraints = Array.isArray(payload.blocking_constraints)
    ? payload.blocking_constraints.filter((constraint) => constraint && typeof constraint === "object")
    : constraints.filter((constraint) => String(constraint.impact || "").trim().toLowerCase() === "bloquant");
  const nonBlockingConstraints = Array.isArray(payload.non_blocking_constraints)
    ? payload.non_blocking_constraints.filter((constraint) => constraint && typeof constraint === "object")
    : constraints.filter((constraint) => String(constraint.impact || "").trim().toLowerCase() !== "bloquant");
  const reasons = Array.isArray(payload.reasons)
    ? payload.reasons.filter(Boolean).map((value) => String(value).trim()).filter(Boolean)
    : [];
  const missingRequirements = Array.isArray(payload.missing_requirements)
    ? payload.missing_requirements
        .filter(Boolean)
        .map((value) => {
          if (typeof value === "string") {
            return value.trim();
          }
          if (typeof value !== "object") {
            return "";
          }
          return String(value.label || value.code || "").trim();
        })
        .filter(Boolean)
    : [];
  const productId = String(payload.product_id || product.id || "").trim() || null;
  const productName = String(payload.product_name || product.name || "").trim() || null;
  const productType = String(product.type || "").trim() || null;
  const temperature = context.temperature ?? product.temperature_value ?? context.current_temperature ?? null;
  const month = context.month ?? context.current_month ?? null;
  return {
    entity,
    status,
    statusLabel: presentation.badge || presentation.summary || "Non disponible",
    statusTone: presentation.tone || "neutral",
    statusIcon: presentation.icon || "mdi:bug-outline",
    summary: String(payload.summary || attrs.summary || presentation.summary || "").trim() || presentation.summary || "Recommandation disponible",
    reason: String(payload.reason || attrs.reason || "").trim(),
    whyNow: String(payload.why_now || attrs.why_now || "").trim(),
    recommendedAction: String(payload.recommended_action || attrs.recommended_action || "").trim() || null,
    recommendedActionLabel: formatDebugRecommendedAction(payload.recommended_action || attrs.recommended_action),
    score: asNumber(payload.score ?? attrs.score) ?? 0,
    productId,
    productName,
    productType,
    product: {
      id: productId,
      name: productName,
      type: productType,
      months: Array.isArray(product.months) ? product.months : [],
      monthsLabel: String(product.months_label || "").trim() || null,
    },
    selection: {
      id: String(selection.id || "").trim() || null,
      name: String(selection.name || "").trim() || null,
      months: Array.isArray(selection.months) ? selection.months : [],
      monthsLabel: String(selection.months_label || "").trim() || null,
      ready: Boolean(payload.selected_product_ready || selection.ready),
    },
    context: {
      phase: String(context.current_phase || context.phase || "").trim() || null,
      month,
      temperature,
      temperatureSource: String(context.temperature_source || product.temperature_source || "").trim() || null,
    },
    constraints,
    blockingConstraints,
    nonBlockingConstraints,
    reasons,
    missingRequirements,
    readyToDeclare: Boolean(payload.ready_to_declare),
    selectedProductReady: Boolean(payload.selected_product_ready),
    uiSummary: String(payload.ui_summary || attrs.ui_summary || "").trim(),
    uiHint: String(payload.ui_hint || attrs.ui_hint || "").trim(),
  };
}

function renderDebugInterventionSection(card, debug, wrapped = true) {
  if (!debug || !debug.entity) {
    return "";
  }

  const score = debug.score === null || debug.score === undefined ? 0 : formatNumber(debug.score, 0);
  const presentation = resolveInterventionStatusPresentation(debug.status);
  const statusLabel = debug.statusLabel || presentation.badge || presentation.summary || "Non disponible";
  const statusTone = debug.statusTone || presentation.tone || "neutral";
  const statusIcon = debug.statusIcon || presentation.icon || "mdi:bug-outline";
  const summary = debug.summary || presentation.summary || "Recommandation disponible";
  const nextReason = debug.reason || debug.uiSummary || summary;
  const detailHintParts = [];
  if (debug.context?.phase) {
    detailHintParts.push(`Phase actuelle: ${formatStatusLabel(debug.context.phase)}`);
  }
  if (debug.context?.month !== null && debug.context?.month !== undefined) {
    detailHintParts.push(`Mois: ${formatMonthLabel(debug.context.month)}`);
  }
  if (debug.context?.temperature !== null && debug.context?.temperature !== undefined) {
    detailHintParts.push(`Température: ${formatNumber(debug.context.temperature, 1)} °C`);
  }
  const detailHint = detailHintParts.join(" · ") || debug.uiHint || "Lecture directe du moteur décisionnel.";
  const productName = debug.productName || "Aucun produit identifié";
  const productHeadingLabel =
    debug.status === "recommended" || debug.status === "ready"
      ? "Produit retenu"
      : debug.status === "possible" || debug.status === "preparation"
        ? "Produit candidat"
        : "Produit évalué";
  const productType = debug.productType ? formatStatusLabel(debug.productType) : null;
  const productId = debug.productId ? `ID: ${debug.productId}` : "";
  const actionLabel = debug.recommendedActionLabel || formatDebugRecommendedAction(debug.recommendedAction);
  const contextPills = [];
  if (debug.context?.phase) {
    contextPills.push(renderStatusPill(`Phase: ${formatStatusLabel(debug.context.phase)}`, "neutral", "mdi:grass", "debug-chip"));
  }
  if (debug.context?.month !== null && debug.context?.month !== undefined) {
    contextPills.push(renderStatusPill(`Mois: ${formatMonthLabel(debug.context.month)}`, "neutral", "mdi:calendar-month", "debug-chip"));
  }
  if (debug.context?.temperature !== null && debug.context?.temperature !== undefined) {
    contextPills.push(
      renderStatusPill(`Température: ${formatNumber(debug.context.temperature, 1)} °C`, "neutral", "mdi:thermometer", "debug-chip"),
    );
  }
  if (debug.context?.temperatureSource) {
    contextPills.push(
      renderStatusPill(`Source: ${formatStatusLabel(debug.context.temperatureSource)}`, "neutral", "mdi:database", "debug-chip"),
    );
  }
  const reasons = Array.isArray(debug.reasons) ? debug.reasons.filter(Boolean).map((value) => String(value).trim()).filter(Boolean) : [];
  const missingRequirements = Array.isArray(debug.missingRequirements)
    ? debug.missingRequirements.filter(Boolean).map((value) => String(value).trim()).filter(Boolean)
    : [];
  const blockingConstraints = Array.isArray(debug.blockingConstraints) ? debug.blockingConstraints : [];
  const nonBlockingConstraints = Array.isArray(debug.nonBlockingConstraints) ? debug.nonBlockingConstraints : [];

  const inner = `
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Analyse moteur</div>
          <div class="tab-panel__section-meta">${escapeHtml(statusLabel)}</div>
        </div>

        <div class="decision-hero">
          <div class="decision-hero__top">
            <div class="decision-hero__summary">Score ${escapeHtml(String(score))}</div>
            ${renderStatusPill(statusLabel, statusTone, statusIcon, `decision-status decision-status--${statusTone}`)}
          </div>
          <div class="decision-hero__next">${escapeHtml(nextReason)}</div>
          <div class="decision-hero__hint">${escapeHtml(detailHint)}</div>
        </div>

        <div class="decision-plan">
          <div class="decision-plan__header">
            <div class="decision-plan__label">${escapeHtml(productHeadingLabel)}</div>
            <div class="decision-plan__meta">${escapeHtml(actionLabel)}</div>
          </div>
          <div class="decision-plan__summary">${escapeHtml(productName)}</div>
          <div class="decision-plan__chips">
            ${productId ? renderStatusPill(productId, "neutral", "mdi:identifier", "debug-chip") : ""}
            ${productType ? renderStatusPill(`Type: ${productType}`, "neutral", "mdi:package-variant", "debug-chip") : ""}
            ${contextPills.join("")}
          </div>
        </div>

        <div class="tab-panel__debug-columns">
          <div class="decision-context">
            <div class="decision-plan__header">
              <div class="decision-plan__label">Contraintes bloquantes</div>
              <div class="decision-plan__meta">${escapeHtml(String(blockingConstraints.length))}</div>
            </div>
            <div class="tab-panel__debug-grid">
              ${renderDebugConstraintCards(card, blockingConstraints, "Aucune contrainte bloquante.")}
            </div>
          </div>

          <div class="decision-context">
            <div class="decision-plan__header">
              <div class="decision-plan__label">Contraintes non bloquantes</div>
              <div class="decision-plan__meta">${escapeHtml(String(nonBlockingConstraints.length))}</div>
            </div>
            <div class="tab-panel__debug-grid">
              ${renderDebugConstraintCards(card, nonBlockingConstraints, "Aucune contrainte non bloquante.")}
            </div>
          </div>
        </div>

        <div class="decision-plan">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Signaux retenus</div>
            <div class="decision-plan__meta">${escapeHtml(String(reasons.length))}</div>
          </div>
          <div class="decision-plan__chips">
            ${
              reasons.length
                ? reasons.map((reason) => renderStatusPill(reason, "neutral", "mdi:check-circle-outline", "debug-chip")).join("")
                : renderStatusPill("Aucune raison détaillée", "neutral", "mdi:check-circle-outline", "debug-chip")
            }
          </div>
          <div class="decision-plan__header" style="margin-top: 10px;">
            <div class="decision-plan__label">Pré-requis manquants</div>
            <div class="decision-plan__meta">${escapeHtml(String(missingRequirements.length))}</div>
          </div>
          <div class="decision-plan__chips">
            ${
              missingRequirements.length
                ? missingRequirements
                    .map((requirement) => renderStatusPill(requirement, "warning", "mdi:alert-circle-outline", "debug-chip"))
                    .join("")
                : renderStatusPill("Aucun manque déclaré", "success", "mdi:check-circle-outline", "debug-chip")
            }
          </div>
        </div>
    `;

  if (!wrapped) {
    return `<div class="tab-panel__debug-foldout-body">${inner}</div>`;
  }

  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--debug-intervention">
        ${inner}
      </section>
    `;
}

function renderInterventionOverviewSection(
  card,
  recommendation,
  {
    quickAction,
    hasProductOptions,
    canDeclare,
    ui,
    recommendationTone,
    recommendationIcon,
  },
) {
  const proposedProductValue = recommendation.product.name || ui.summary || "Aucun produit retenu";
  const productOptions = card._catalogueProductOptions();
  const selectedProductOptionLabel = quickAction.optionLabel || (productOptions.length === 1 ? productOptions[0].label : "");
  const selectionMeta = quickAction.record
    ? "Sélection active"
    : hasProductOptions
      ? "Produit à sélectionner"
      : "Aucun produit disponible";
  const selectionValue = quickAction.record ? quickAction.label : "Aucun produit sélectionné";
  const selectionSecondary = [
    quickAction.summary || "",
    hasProductOptions && !quickAction.record ? "Sélection nécessaire avant déclaration." : "",
  ].filter(Boolean).join(" · ");
  const declarationMeta = ui.badge || formatStatusLabel(recommendation.status) || "Non disponible";
  const declarationActionLabel = canDeclare
    ? quickAction.actionLabel || "Déclarer le produit"
    : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const declarationValue = canDeclare ? "Déclaration possible" : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const declarationSecondary = [
    ui.declarationSummary || "",
    ui.declarationHint || "",
  ].filter(Boolean).join(" · ");
  const productSecondary = [
    recommendation.product.type ? formatStatusLabel(recommendation.product.type) : "",
    recommendation.product.monthsLabel || "",
    recommendation.score !== null && recommendation.score !== undefined
      ? `Score ${formatNumber(recommendation.score, 0)}/100`
      : "",
  ].filter(Boolean).join(" · ");
  const chips = [
    { label: "Recommandation", value: ui.badge || "Non disponible", tone: recommendationTone },
    { label: "Sélection", value: quickAction.record ? "Active" : selectionMeta, tone: quickAction.record ? "success" : hasProductOptions ? "warning" : "neutral" },
    { label: "Déclaration", value: canDeclare ? "Possible" : declarationMeta, tone: canDeclare ? "success" : recommendationTone },
  ];
  return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Pilotage intervention</div>
      <div class="gz2-chips">${renderGz2Chips(chips)}</div>
      <div class="gz2-cards" style="grid-template-columns: 1fr;">
        ${renderGz2Cards(card, [{ label: "Produit proposé", value: proposedProductValue, tone: "neutral", secondary: productSecondary || ui.hint || "" }])}
      </div>
      <div class="gz2-field">
        <span class="gz2-field__label">Produit à déclarer</span>
        <select
          class="gz2-select"
          data-gazon-action="select-intervention-product"
          aria-label="Choisir le produit d'intervention"
          ${hasProductOptions ? "" : "disabled"}
        >
          <option value="">${escapeHtml(hasProductOptions ? "Choisir un produit" : "Aucun produit disponible")}</option>
          ${productOptions
            .map((option) => `<option value="${escapeHtml(option.label)}" ${option.label === selectedProductOptionLabel ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
            .join("")}
        </select>
        ${selectionSecondary ? `<div class="gz2-card__sub" style="margin-top: 7px;">${escapeHtml(selectionSecondary)}</div>` : ""}
      </div>
      <button
        type="button"
        class="gz2-btn gz2-btn--block"
        data-gazon-action="declare-product-intervention"
        ${canDeclare ? "" : "disabled"}
        aria-label="${escapeHtml(canDeclare ? (quickAction.actionLabel || "Déclarer le produit") : (ui.actionLabel || "Choisir le produit"))}"
      >
        ${renderIconBox("mdi:spray-bottle", "sm")}<span>${escapeHtml(declarationActionLabel)}</span>
      </button>
      ${declarationSecondary ? `<div class="gz2-card__sub" style="margin-top: 8px;">${escapeHtml(declarationSecondary)}</div>` : ""}
    `;
}

function renderInterventionTechnicalSummary(card, recommendation, debug) {
  const lastUserAction = card._lastUserActionState();
  const scoreValue = recommendation.score !== null && recommendation.score !== undefined
    ? `${formatNumber(recommendation.score, 0)}/100`
    : "—";
  const blockingConstraints = Array.isArray(debug?.blockingConstraints)
    ? debug.blockingConstraints.length
    : Array.isArray(recommendation.constraints)
      ? recommendation.constraints.filter((constraint) => constraint?.blocking).length
      : 0;
  const nonBlockingConstraints = Array.isArray(debug?.nonBlockingConstraints)
    ? debug.nonBlockingConstraints.length
    : Array.isArray(recommendation.constraints)
      ? recommendation.constraints.filter((constraint) => !constraint?.blocking).length
      : 0;
  const missingRequirements = Array.isArray(debug?.missingRequirements)
    ? debug.missingRequirements.length
    : Array.isArray(recommendation.missingRequirements)
      ? recommendation.missingRequirements.length
      : 0;
  const scoreTone = recommendation.scoreHigh ? "success" : recommendation.status === "blocked" ? "danger" : "warning";
  const techCards = [
    { label: "Score", value: scoreValue, tone: scoreTone, secondary: `Niveau ${formatStatusLabel(recommendation.scoreLevel || "neutral")}` },
    { label: "Bloquantes", value: String(blockingConstraints), tone: blockingConstraints > 0 ? "danger" : "success", secondary: blockingConstraints > 0 ? "Une ou plusieurs contraintes bloquent la déclaration." : "Aucune contrainte bloquante." },
    { label: "Non bloquantes", value: String(nonBlockingConstraints), tone: nonBlockingConstraints > 0 ? "warning" : "neutral", secondary: nonBlockingConstraints > 0 ? "Signaux dégradants ou neutres pris en compte." : "Aucun signal secondaire détaillé." },
    { label: "Manquants", value: String(missingRequirements), tone: missingRequirements > 0 ? "warning" : "success", secondary: missingRequirements > 0 ? "Des étapes restent à compléter avant déclaration." : "Aucun pré-requis manquant." },
    ...(lastUserAction.summary
      ? [{ label: "Dernière exécution", value: lastUserAction.action || lastUserAction.state || "Exécution", tone: "neutral", secondary: [lastUserAction.when, lastUserAction.reason].filter(Boolean).join(" · ") || lastUserAction.summary }]
      : []),
  ];
  return `
      <div class="gz2-eyebrow gz2-eyebrow--section">Repères techniques</div>
      <div class="gz2-cards">${renderGz2Cards(card, techCards)}</div>
    `;
}

export function renderWateringProgressSection(card, progressState) {
  try {
    if (!progressState?.active) {
      return "";
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
    const waterText = String(progressState.waterText || "").trim();
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
    return `
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--watering-progress" data-watering-progress="section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Irrigation en cours</div>
            <div class="tab-panel__section-meta" data-watering-progress="percent">${escapeHtml(`${Math.round(percent)} %`)}</div>
          </div>
          <div class="tab-panel__section-summary" data-watering-progress="summary">${escapeHtml(summary)}</div>
          ${activeZoneLabel ? `<div class="tab-panel__watering-zone" data-watering-progress="zone">Zone active · ${escapeHtml(activeZoneLabel)}</div>` : `<div class="tab-panel__watering-zone" data-watering-progress="zone" hidden></div>`}
          ${waterText ? `<div class="tab-panel__watering-water" data-watering-progress="water">${escapeHtml(waterText)}</div>` : `<div class="tab-panel__watering-water" data-watering-progress="water" hidden></div>`}
          <div class="tab-progress" data-watering-progress="progress" aria-label="${escapeHtml(summary)}">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar ${progressState.critical ? "gi-progress__bar--critical" : ""}" data-watering-progress="bar" style="width:${escapeHtml(String(percent))}%;"></span>
            </div>
            <div class="tab-progress__meta" data-watering-progress="meta">${escapeHtml(metaParts.join(" · ") || "Session active")}</div>
          </div>
        </section>
      `;
  } catch (error) {
    console.error("[gazon-intelligent-card] progress render failed", error);
    return `
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--watering-progress">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Irrigation en cours</div>
            <div class="tab-panel__section-meta">—</div>
          </div>
          <div class="tab-panel__section-summary">Suivi de progression indisponible</div>
          <div class="tab-progress">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar" style="width:0%;"></span>
            </div>
            <div class="tab-progress__meta">La session reste active.</div>
          </div>
        </section>
      `;
  }
}

function renderCatalogueProductCards(card) {
  const products = card._catalogueProducts();
  const selection = card._productSelectionState();
  const selectedProductId = String(selection.selectedProductId || "").trim().toLowerCase();
  if (!products.length) {
    return `<div class="gz2-empty">Aucun produit enregistré.</div>`;
  }
  const items = products.map((product) => {
    const productId = String(product.id || "").trim();
    const productName = String(product.nom || productId || "").trim() || "Produit";
    const productType = String(product.type || "").trim();
    const usageMode = String(product.usage_mode || "").trim();
    const monthsLabel = String(product.application_months_label || "").trim();
    const requiresWateringAfter = Boolean(product.application_requires_watering_after);
    const isSelected = selectedProductId && productId.toLowerCase() === selectedProductId;
    const secondaryParts = [
      usageMode ? `Mode ${formatProductUsageMode(usageMode)}` : "",
      monthsLabel,
      requiresWateringAfter ? "Arrosage après application" : "",
    ].filter(Boolean);
    return {
      label: productType ? formatStatusLabel(productType) : "Produit",
      value: productName,
      tone: isSelected ? "success" : "neutral",
      secondary: secondaryParts.join(" · "),
    };
  });
  return `<div class="gz2-cards">${renderGz2Cards(card, items)}</div>`;
}

function buildApplicationHistoryRows(items) {
  return Array.isArray(items)
    ? items
        .filter((item) => item && typeof item === "object")
        .slice()
        .reverse()
        .map((item) => {
          const productLabel = String(item.libelle || item.produit || item.type || "Application").trim();
          const whenLabel = humanDateTimeText(item.date_action || item.date || item.declared_at) || String(item.date || "").trim() || "";
          const detailParts = [];
          const typeLabel = String(item.type || "").trim();
          const dose = String(item.dose || "").trim();
          const applicationType = String(item.application_type || "").trim();
          const irrigationMode = String(item.application_irrigation_mode || "").trim();
          const note = String(item.note || "").trim();
          if (typeLabel) {
            detailParts.push(formatStatusLabel(typeLabel));
          }
          if (dose) {
            detailParts.push(dose);
          }
          if (applicationType) {
            detailParts.push(formatStatusLabel(applicationType));
          }
          if (irrigationMode) {
            detailParts.push(`Mode ${formatApplicationMode(irrigationMode)}`);
          }
          if (note) {
            detailParts.push(note);
          }
          return {
            label: whenLabel || "Application",
            value: productLabel,
            note: detailParts.join(" · "),
            tone: "neutral",
          };
        })
    : [];
}

function renderApplicationHistoryInline(items) {
  const history = Array.isArray(items) ? items.filter((item) => item && typeof item === "object") : [];
  if (!history.length) {
    return "";
  }
  const countLabel = history.length > 1 ? `${history.length} applications enregistrées` : "1 application enregistrée";
  const rows = buildApplicationHistoryRows(history);
  return `
      <div class="tab-panel__history-inline">
        <div class="tab-panel__history-inline-head">
          <div class="tab-panel__eyebrow">Historique</div>
          <div class="tab-panel__history-inline-meta">${escapeHtml(countLabel)} · plus récente en haut</div>
        </div>
        <div class="tab-panel__history-rail-body tab-panel__history-rail-body--inline">
          <div class="tab-panel__history-rail-track">
            ${rows
              .map(
                (row) => `
                  <div class="tab-panel__history-rail-item tab-panel__summary-row tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}">
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
}

export function renderProductsTab(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const application = card._applicationEntity();
  const lastApplication = card._lastApplicationState();
  const hasApplication = Boolean(lastApplication.hasApplication);
  const applicationHistory = Array.isArray(lastApplication.history) ? lastApplication.history : [];
  const hasProductData = Boolean(
    selection.selectedProductId || selection.selectedProductName || catalogue.hasProducts || application,
  );
  const emptyStateMessage = "Aucune donnée produit disponible";
  const productsTone = hasProductData
    ? selection.selectedProductId || catalogue.hasProducts
      ? "success"
      : "accent"
    : "neutral";
  const productsSummary = hasProductData
    ? selection.selectedProductName
      ? `Produit actif : ${selection.selectedProductName}`
      : catalogue.hasProducts
        ? "Aucun produit n’est sélectionné"
        : "Aucun produit enregistré"
    : emptyStateMessage;
  const productsHintParts = [
    selection.selectedProductMonthsLabel ? `Période: ${selection.selectedProductMonthsLabel}` : "",
    selection.usageModeLabel ? `Mode: ${selection.usageModeLabel}` : "",
    selection.maxApplicationsPerYearLabel ? `Max/an: ${selection.maxApplicationsPerYearLabel}` : "",
  ].filter(Boolean);
  const productsHint = hasProductData
    ? productsHintParts.join(" · ") || "Le référentiel produit alimente la prochaine recommandation."
    : emptyStateMessage;
  const lastApplicationSummary = hasApplication ? lastApplication.summary : "Aucune application enregistrée.";
  const lastApplicationHint = hasApplication
    ? lastApplication.detail || "Dernière application détectée."
    : "Aucune application enregistrée dans l’historique local.";
  const applicationHistorySummary = hasApplication
    ? applicationHistory.length > 1
      ? `${applicationHistory.length} applications enregistrées`
      : "1 application enregistrée"
    : "Aucune application enregistrée";

  // --- Scène ludique Produits : le flacon ---
  const prodActive = Boolean(selection.selectedProductId) && !/^aucun/i.test(String(selection.selectedProductName || "").trim());
  const prMood = prodActive ? "active" : "idle";
  const prTitle = prodActive ? "Produit prêt" : (catalogue.hasProducts ? "Aucun produit choisi" : "Pas encore de produit");
  const prSentence = prodActive
    ? `Produit actif : ${selection.selectedProductName}.`
    : (catalogue.hasProducts ? "Choisis un produit pour la prochaine intervention." : "Ajoute un produit dans le catalogue pour commencer.");
  const productsScene = renderPlayfulScene({
    variant: "product",
    entityId: moreInfoId(card, "entity_catalogue_produits"),
    eyebrow: "Produits",
    title: prTitle,
    sentence: prSentence,
    pillIcon: "mdi:package-variant",
    pill: prodActive ? (selection.selectedProductName || "Produit actif") : "Catalogue",
    mascot: gzProductMascot({ mood: prMood }),
    tiles: [
      { icon: "mdi:package-variant", label: "Produit", value: prodActive ? selection.selectedProductName : "Aucun", sub: prodActive ? (selection.usageModeLabel || "") : "" },
      { icon: "mdi:calendar-month", label: "Période", value: prodActive ? (selection.selectedProductMonthsLabel || "—") : "—", sub: "" },
      { icon: "mdi:history", label: "Dernière application", value: hasApplication ? "Faite" : "Aucune", sub: "" },
    ],
  });

  return `
      ${productsScene}

      <details class="gz-details">
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Produits (détails)">
        ${renderGz2Hero("Référentiel produit", productsSummary, productsHint, { icon: "mdi:package-variant", tone: "accent" })}
        <div class="gz2-eyebrow gz2-eyebrow--section">Catalogue</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(catalogue.summary || "Catalogue local")}</div>
        ${renderCatalogueProductCards(card)}
        <div class="gz2-eyebrow gz2-eyebrow--section">Dernière application</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(hasApplication ? lastApplicationSummary : lastApplicationHint)}</div>
        ${renderApplicationHistoryInline(applicationHistory)}
      </section>
      </details>
    `;
}

export function renderInterventionTab(card) {
  const recommendation = card._interventionRecommendationState();
  const debug = getDebugInterventionState(card);
  const quickAction = card._selectedProductInterventionState();
  const ui = recommendation.ui || {};
  const hasProductOptions = card._catalogueProductOptions().length > 0;
  const canDeclare = Boolean(quickAction.record && !quickAction.disabled);
  const recommendationTone = ui.tone || formatIrrigationSignalTone({
    reasonKind: recommendation.status,
    triggerKind: recommendation.triggerKind,
  }) || "neutral";
  const recommendationIcon = ui.icon || "mdi:spray-bottle";
  const recommendationLabel = formatIrrigationSignalLabel({
    actionLabel: ui.actionLabel,
    summary: ui.summary,
    reasonKind: recommendation.status,
  });
  const temperatureConstraint = (Array.isArray(recommendation.constraints)
    ? recommendation.constraints.find((constraint) => constraint?.code === "temperature_range")
    : null);
  const temperatureConstraintState = formatTemperatureRangeConstraint(temperatureConstraint);

  // --- Scène ludique Intervention : le carnet / check-list ---
  const interText = `${ui.title || ""} ${ui.badge || ""} ${recommendation.status || ""}`.toLowerCase();
  const interScore = asNumber(debug?.score);
  let interTodo;
  if (/(non prioritaire|faible|rien|aucune)/.test(interText)) {
    interTodo = false;
  } else if (interScore != null) {
    interTodo = interScore >= 50;
  } else {
    interTodo = !["neutral", "success"].includes(recommendationTone);
  }
  const interventionScene = renderPlayfulScene({
    variant: "task",
    entityId: moreInfoId(card, "entity_prochaine_intervention"),
    eyebrow: "Intervention",
    title: interTodo ? "Une intervention à prévoir" : "Rien à prévoir",
    sentence: ui.summary || (interTodo ? "Un traitement est recommandé." : "Aucun traitement nécessaire pour le moment."),
    pillIcon: recommendationIcon || "mdi:spray-bottle",
    pill: ui.badge || (interTodo ? "À préparer" : "Rien à faire"),
    mascot: gzTaskMascot({ mood: interTodo ? "todo" : "clear" }),
    tiles: [
      { icon: "mdi:spray-bottle", label: "À préparer", value: ui.actionLabel || "—", sub: "" },
      { icon: "mdi:information-outline", label: "Statut", value: ui.badge || formatStatusLabel(recommendation.status) || "—", sub: "" },
      { icon: "mdi:lightbulb-on-outline", label: "Astuce", value: ui.hint ? "Voir conseil" : "—", sub: ui.hint ? compactDecisionText(ui.hint, { maxLength: 30 }) : "" },
    ],
  });

  return `
      ${interventionScene}

      <details class="gz-details">
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Intervention (détails)">
        ${renderGz2Hero(ui.title || "Intervention", ui.summary || "Non disponible", ui.hint || "", { icon: "mdi:spray-bottle", tone: "accent" })}
        ${
          temperatureConstraintState
            ? `
              <div class="tab-panel__temperature-constraint tab-panel__temperature-constraint--${temperatureConstraintState.tone}">
                ${renderStatusPill(
                  temperatureConstraintState.title,
                  temperatureConstraintState.tone,
                  temperatureConstraintState.icon,
                  `tab-panel__status tab-panel__status--${temperatureConstraintState.tone}`,
                )}
                <div class="tab-panel__temperature-copy">
                  <div class="tab-panel__temperature-detail">${escapeHtml(temperatureConstraintState.detail)}</div>
                  ${
                    temperatureConstraintState.hint
                      ? `<div class="tab-panel__temperature-hint">${escapeHtml(temperatureConstraintState.hint)}</div>`
                      : ""
                  }
                </div>
              </div>
            `
            : ""
        }

        ${renderInterventionOverviewSection(card, recommendation, {
          quickAction,
          hasProductOptions,
          canDeclare,
          ui,
          recommendationTone,
          recommendationIcon,
        })}

        ${renderInterventionTechnicalSummary(card, recommendation, debug)}

        <details class="tab-panel__debug-foldout">
          <summary class="tab-panel__debug-foldout-summary">
            <span class="tab-panel__eyebrow">Analyse moteur</span>
            <span class="tab-panel__debug-foldout-meta">${escapeHtml(
              debug
                ? `Score ${formatNumber(debug.score ?? 0, 0)} · ${debug.blockingConstraints?.length ?? 0} bloquante(s) · ${debug.nonBlockingConstraints?.length ?? 0} signal(s) · ${debug.missingRequirements?.length ?? 0} manquant(s)`
                : `${ui.badge || formatStatusLabel(recommendation.status) || "Recommandation"} · Analyse moteur`,
            )}</span>
          </summary>
          ${renderDebugInterventionSection(card, debug, false)}
        </details>
      </section>
      </details>
    `;
}

export function renderHeader(card) {
  if (!card._config?.show_header) {
    return "";
  }
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const normalizedPhase = String(phase ?? "").trim().toLowerCase();
  const normalizedSubPhase = String(subPhase ?? "").trim().toLowerCase();
  const subtitleParts = [phase ? escapeHtml(phase) : "Phase non disponible"];
  if (subPhase && normalizedSubPhase !== normalizedPhase) {
    subtitleParts.push(escapeHtml(subPhase));
  }
  const weather = card._weatherState();
  const manualActionLabel = card._manualActionLabel();
  const tone = card._cardTone();
  const dotToneMap = { success: "success", warning: "warning", danger: "danger", critical: "danger", accent: "success", neutral: "neutral" };
  const dotTone = dotToneMap[tone] || "neutral";
  return `
      <header class="gz2-header">
        <div class="gz2-header__id">
          <div class="gz2-header__icon">${card._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}</div>
          <div class="gz2-header__titles">
            <div class="gz2-header__name">
              <div class="gz2-header__title">${escapeHtml(card._config.title || "Gazon Intelligent")}</div>
              <span class="gz2-title-dot" style="background: var(--gi-status-${dotTone});" title="État global de la carte" aria-hidden="true"></span>
            </div>
            <div class="gz2-header__sub">${subtitleParts.join(" · ")}</div>
          </div>
        </div>
        <div class="gz2-header__meta">
          ${weather ? `<span class="gz2-weather">${weather.icon ? renderIconBox(weather.icon, "sm") : ""}${escapeHtml(weather.summary)}</span>` : ""}
          <button
            type="button"
            class="gz2-btn"
            data-gazon-action="manual-irrigation"
            aria-label="${escapeHtml(manualActionLabel)}"
          >
            ${card._config?.show_icons ? renderIconBox("mdi:water-pump", "sm") : ""}<span>${escapeHtml(manualActionLabel)}</span>
          </button>
        </div>
      </header>
    `;
}

export function renderOverviewTab(card) {
  const windowState = card._windowState();
  const proposal = card._overviewProposal();
  const facts = card._overviewFacts();
  const nextWatering = card._nextWateringState();
  const nextMowing = card._nextMowingState();
  const lastWatering = card._lastWateringState();
  const titleText = proposal.hint || "Vue d’ensemble du gazon.";
  let heroSub = compactDecisionText(card._entityState("entity_conseil", "") || "", { maxLength: 130 });
  if (!heroSub || heroSub === titleText) {
    heroSub = "";
  }
  const reperes = [
    { label: "Fenêtre", value: windowState.statusLabel, entityKey: "entity_fenetre_optimale" },
    { label: "Prochain arrosage", value: nextWatering.label, entityKey: "entity_prochain_arrosage" },
    { label: "Prochaine tonte", value: nextMowing.label, entityKey: "entity_prochaine_tonte" },
    { label: "Dernier arrosage", value: lastWatering.label, entityKey: "entity_dernier_arrosage" },
  ];

  // --- Scène ludique Synthèse : la pelouse « savante » qui connaît tout ---
  const synthLvl = String(card._entityState("entity_niveau", "") || "").toLowerCase();
  let synthMood = "happy";
  let synthTitle = "Tout roule au jardin !";
  if (/(urgent|alerte|critique|danger)/.test(synthLvl)) { synthMood = "worried"; synthTitle = "Quelque chose à regarder"; }
  else if (/(faire|action)/.test(synthLvl)) { synthMood = "todo"; synthTitle = "Une petite action à prévoir"; }
  const synthPhase = String(card._entityState("entity_phase", "") || "").trim() || "Normal";
  const synthWeather = card._weatherState();
  const synthTemp = synthWeather && synthWeather.temperature != null ? synthWeather.temperature : null;
  const synthCond = synthWeather ? synthWeather.condition || "" : "";
  const synthWeatherPill = synthWeather
    ? { icon: synthWeather.icon || "mdi:weather-partly-cloudy", text: synthWeather.summary }
    : { icon: "mdi:eye-check-outline", text: "Je surveille tout pour toi" };
  const synthScene = renderPlayfulScene({
    variant: "synth",
    entityId: moreInfoId(card, "entity_assistant"),
    eyebrow: "Aujourd'hui",
    title: synthTitle,
    sentence: titleText,
    pillIcon: synthWeatherPill.icon,
    pill: synthWeatherPill.text,
    backdrop: gzWeatherBackdrop(synthTemp, synthCond, gzIsDark(card)),
    mascot: gzSynthMascot({ mood: synthMood, temp: synthTemp, condition: synthCond }),
    tiles: [
      { icon: "mdi:water", label: "Eau", value: nextWatering.label || "—", sub: "prochain arrosage" },
      { icon: "mdi:robot-mower", label: "Tonte", value: nextMowing.label || "—", sub: "prochaine tonte" },
      { icon: "mdi:grass", label: "Gazon", value: synthPhase, sub: "phase actuelle" },
    ],
  });

  return `
      ${synthScene}

      <details class="gz-details">
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Synthèse (détails)">
        ${renderGz2Hero("Conseil du jour", titleText, heroSub, { icon: "mdi:lightbulb-on-outline", tone: "accent" })}

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => {
            const eid = moreInfoId(card, r.entityKey);
            const attrs = eid
              ? ` data-more-info-entity="${escapeHtml(eid)}" role="button" tabindex="0" title="Voir le détail"`
              : "";
            return `
            <div class="gz2-rep${eid ? " gz2-rep--clickable" : ""}"${attrs}>
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
              ${r.sub ? `<div class="gz2-rep__sub">${escapeHtml(r.sub)}</div>` : ""}
            </div>
          `;
          }).join("")}
        </div>

        <div class="gz2-eyebrow">Essentiel</div>
        <div class="gz2-cards">
          ${(() => {
            // Déduplication : on n'affiche pas en sous-texte une phrase déjà dite dans
            // le héro ou dans une carte précédente (évite la répétition du motif de blocage).
            const _norm = (s) => String(s || "").trim().toLowerCase().replace(/[. \s]+$/g, "");
            const seenSubs = new Set([_norm(titleText), _norm(heroSub)].filter(Boolean));
            return facts.map((f) => {
              const eid = card._entityId(f.entityKey);
              const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
              const subNorm = _norm(f.secondary);
              const showSub = Boolean(f.secondary) && subNorm.length > 0 && !seenSubs.has(subNorm);
              if (showSub) {
                seenSubs.add(subNorm);
              }
              return `
              <button type="button" class="gz2-card"${eid ? ` data-more-info-entity="${escapeHtml(eid)}"` : ""}>
                <div class="gz2-card__label">${escapeHtml(f.label)}</div>
                <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
                ${showSub ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}
              </button>
            `;
            }).join("");
          })()}
        </div>
      </section>
      </details>
    `;
}

function gzKidIcon(icon, color) {
  return `<ha-icon icon="${escapeHtml(icon)}" style="--mdc-icon-size:18px;width:18px;height:18px;color:${color || "#2E8B57"};" aria-hidden="true"></ha-icon>`;
}

// --- Helpers météo partagés par les mascottes (température + condition) ---
function gzWeatherFlags(temp = null, condition = "") {
  const cond = String(condition || "").toLowerCase();
  const night = /night/.test(cond);
  return {
    cond,
    has: temp != null || cond !== "",
    raining: /(rain|pour|storm|lightning|hail|drizzle)/.test(cond),
    snowing: /snow/.test(cond),
    cloudy: /(cloud|fog|overcast|mist|partlycloudy)/.test(cond),
    sunny: cond === "sunny" || cond === "clear" || cond === "clear-night",
    night,
    windy: /wind/.test(cond),
    hot: temp != null && temp >= 30,
    veryHot: temp != null && temp >= 34,
    cold: temp != null && temp <= 6,
    frost: temp != null && temp <= 0,
  };
}

export function renderPlayfulScene(scene) {
  const tiles = (scene.tiles || []).filter(Boolean).map((t) => `
      <div class="gz-kidtile">
        <div class="gz-kidtile__h">${gzKidIcon(t.icon)}<span>${escapeHtml(t.label)}</span></div>
        <div class="gz-kidtile__v">${escapeHtml(t.value || "—")}</div>
        ${t.sub ? `<div class="gz-kidtile__s">${escapeHtml(t.sub)}</div>` : ""}
      </div>`).join("");
  // Scène cliquable : si une entité est fournie, toute la scène ouvre sa fiche
  // (more-info), géré par le binding global [data-more-info-entity].
  const eid = scene.entityId || null;
  const sceneAttrs = eid
    ? ` data-more-info-entity="${escapeHtml(eid)}" role="button" tabindex="0" title="Voir le détail"`
    : "";
  const sceneClickable = eid ? " gz-scene--clickable" : "";
  return `
      <div class="gz-scene gz-scene--${escapeHtml(scene.variant || "water")}${sceneClickable}"${sceneAttrs}>
        <div class="gz-scene__art"><div class="gz-scene__stage">${scene.backdrop || ""}${scene.mascot || ""}</div></div>
        <div class="gz-scene__msg">
          <div class="gz-scene__eyebrow">${escapeHtml(scene.eyebrow || "")}</div>
          <div class="gz-scene__title">${escapeHtml(scene.title || "")}</div>
          <div class="gz-scene__text">${escapeHtml(scene.sentence || "")}</div>
          ${scene.pill ? `<div class="gz-scene__pill">${gzKidIcon(scene.pillIcon || "mdi:information-outline")}<span>${escapeHtml(scene.pill)}</span></div>` : ""}
        </div>
      </div>
      ${tiles ? `<div class="gz-kidtiles">${tiles}</div>` : ""}`;
}

// Thème sombre actif ? (résout le mode "auto" via hass.themes.darkMode)
function gzIsDark(card) {
  const tm = (card && card._config && card._config.theme_mode) || "auto";
  if (tm === "dark") return true;
  if (tm === "light") return false;
  return Boolean(card && card._hass && card._hass.themes && card._hass.themes.darkMode);
}

// Décor météo animé rendu DERRIÈRE la mascotte (ciel, soleil/lune, nuages, pluie, neige…)
function gzWeatherBackdrop(temp = null, condition = "", isDark = false) {
  const f = gzWeatherFlags(temp, condition);
  if (!f.has) {
    return `<svg class="gz-scene__sky" viewBox="0 0 150 172" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="150" height="172" fill="var(--gz-sky-edge, #EBF6F0)"/></svg>`;
  }
  // En thème sombre, on rend toujours une scène de NUIT (ciel indigo, lune, étoiles) pour
  // rester cohérent avec l'UI sombre, quelle que soit l'heure réelle.
  const night = f.night || isDark;
  const sig = `${night ? "n" : ""}${f.raining ? "r" : ""}${f.snowing ? "s" : ""}${f.cloudy ? "c" : ""}${f.veryHot ? "H" : ""}${f.hot ? "h" : ""}${f.sunny ? "y" : ""}` || "x";
  const gid = `gzsky_${sig}`;
  let g1; let g2;
  if (night) { g1 = "#3D4C78"; g2 = "#6E7CA6"; }
  else if (f.raining) { g1 = "#B6C5D0"; g2 = "#D7E0E6"; }
  else if (f.snowing) { g1 = "#CBD9E4"; g2 = "#ECF2F7"; }
  else if (f.cloudy) { g1 = "#C3CFD8"; g2 = "#E2E9EE"; }
  else if (f.veryHot) { g1 = "#FCE0B4"; g2 = "#FDF2DD"; }
  else if (f.hot) { g1 = "#FBEBCB"; g2 = "#FCF7EC"; }
  else { g1 = "#CDEBF8"; g2 = "#ECF8FC"; }

  const clear = !f.raining && !f.snowing && !f.cloudy;
  const sun = (clear && !night)
    ? `<g class="gz-spin"><g stroke="${f.veryHot ? "#F6C879" : "#FBE0A0"}" stroke-width="3" stroke-linecap="round">${Array.from({ length: 8 }, (_, i) => { const a = i * 45 * Math.PI / 180; return `<line x1="${(114 + Math.cos(a) * 15).toFixed(1)}" y1="${(40 + Math.sin(a) * 15).toFixed(1)}" x2="${(114 + Math.cos(a) * 22).toFixed(1)}" y2="${(40 + Math.sin(a) * 22).toFixed(1)}"/>`; }).join("")}</g></g><circle cx="114" cy="40" r="13" fill="${f.veryHot ? "#FBD588" : "#FCEAB0"}"/>`
    : "";
  const moon = night
    ? `<circle cx="116" cy="38" r="13" fill="#F3EFD6"/><circle cx="121" cy="34" r="11" fill="${g1}"/>`
    : "";
  const stars = night
    ? `<g fill="#EAF0FF">${[[28, 30, 0], [52, 22, 0.6], [82, 32, 1.1], [40, 52, 1.6], [98, 58, 0.3]].map(([x, y, d]) => `<circle class="gz-twinkle" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="1.5"/>`).join("")}</g>`
    : "";
  const clouds = (f.cloudy || f.raining || f.snowing)
    ? `<g class="gz-drift" fill="#FFFFFF" opacity=".82"><ellipse cx="38" cy="40" rx="20" ry="11"/><ellipse cx="56" cy="36" rx="14" ry="9"/></g><g class="gz-drift gz-drift--2" fill="#FFFFFF" opacity=".6"><ellipse cx="104" cy="60" rx="16" ry="9"/><ellipse cx="118" cy="57" rx="11" ry="7"/></g>`
    : (clear && !night) ? `<g class="gz-drift" fill="#FFFFFF" opacity=".5"><ellipse cx="34" cy="34" rx="15" ry="8"/><ellipse cx="46" cy="31" rx="10" ry="6"/></g>` : "";
  const rain = f.raining
    ? `<g class="gz-rain" stroke="#D4E7F4" stroke-width="2" stroke-linecap="round">${[8, 30, 52, 74, 96, 118, 140].map((x, i) => `<line style="animation-delay:${(i % 4) * 0.16}s" x1="${x}" y1="58" x2="${x - 6}" y2="76"/>`).join("")}</g>`
    : "";
  const snow = f.snowing
    ? `<g class="gz-snow" fill="#FFFFFF">${[[18, 58, 0], [42, 70, 0.5], [68, 56, 1], [94, 72, 0.3], [120, 60, 0.8], [136, 76, 1.3]].map(([x, y, d]) => `<circle style="animation-delay:${d}s" cx="${x}" cy="${y}" r="2.4"/>`).join("")}</g>`
    : "";
  const haze = f.veryHot
    ? `<g class="gz-shimmer" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".4" stroke-linecap="round"><path d="M18 150 q8 -4 16 0 t16 0"/><path d="M74 158 q8 -4 16 0 t16 0"/></g>`
    : "";
  // Le bord (vignette) se fond toujours dans le fond de la scène via --gz-sky-edge
  // (clair en thème clair, sombre en thème sombre) → pas de halo.
  const edge = "var(--gz-sky-edge, #E9F7EF)";
  return `<svg class="gz-scene__sky" viewBox="0 0 150 172" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/></linearGradient>
        <radialGradient id="${gid}_v" cx="50%" cy="40%" r="78%"><stop offset="52%" style="stop-color:${edge};stop-opacity:0"/><stop offset="100%" style="stop-color:${edge};stop-opacity:0.92"/></radialGradient>
      </defs>
      <rect width="150" height="172" fill="url(#${gid})"/>
      ${stars}${sun}${moon}${clouds}${rain}${snow}${haze}
      <ellipse cx="75" cy="178" rx="74" ry="36" fill="#FFFFFF" opacity=".2"/>
      <rect width="150" height="172" fill="url(#${gid}_v)"/>
    </svg>`;
}

function gzWaterMascot({ fillPct = 50, madPct = 50, mood = "happy", raining = false, drinking = false, temp = null, condition = "" } = {}) {
  const top = 46;
  const h = 104;
  const bottom = top + h;
  const wTop = Math.round(bottom - Math.max(4, Math.min(100, fillPct)) / 100 * h);
  const madY = Math.round(bottom - Math.max(0, Math.min(100, madPct)) / 100 * h);
  const mouth = mood === "sad"
    ? `<path d="M62 123 q13 -11 26 0" fill="none" stroke="#21433A" stroke-width="3.5" stroke-linecap="round"/>`
    : drinking
      ? `<ellipse cx="75" cy="120" rx="5.5" ry="6.5" fill="#21433A"/>`
      : `<path d="M62 117 q13 11 26 0" fill="none" stroke="#21433A" stroke-width="3.5" stroke-linecap="round"/>`;
  const sweat = mood === "sad"
    ? `<path class="gz-drop" d="M100 95 q5 7 0 12 q-5 -5 0 -12z" fill="#7CC6F0"/>`
    : "";
  const overDrops = (drinking || raining)
    ? `<g>${[[50, 10, 0], [62, 6, 0.3], [75, 12, 0.6], [88, 7, 0.2], [100, 11, 0.45]].map(
        ([x, y, d]) => `<path class="gz-drop" style="animation-delay:${d}s" d="M${x} ${y} q4.5 7 0 13 q-4.5 -6 0 -13z" fill="#5BB8E8"/>`,
      ).join("")}</g>`
    : "";
  const sleeping = mood === "sleep";
  const eyes = sleeping
    ? `<g class="gz-eyes"><path d="M58 104 q6 6 12 0" fill="none" stroke="#21433A" stroke-width="3.5" stroke-linecap="round"/><path d="M80 104 q6 6 12 0" fill="none" stroke="#21433A" stroke-width="3.5" stroke-linecap="round"/></g>`
    : `<g class="gz-eyes"><circle cx="64" cy="104" r="5.5" fill="#21433A"/><circle cx="86" cy="104" r="5.5" fill="#21433A"/><circle cx="66" cy="102" r="1.6" fill="#fff"/><circle cx="88" cy="102" r="1.6" fill="#fff"/></g>`;
  const zzz = sleeping
    ? `<g class="gz-bob" fill="#5B8C74" font-weight="700"><text x="98" y="64" font-size="12">z</text><text x="108" y="52" font-size="16">Z</text></g>`
    : "";
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="État de la pelouse et de sa réserve d'eau">
        <defs><clipPath id="gzjar"><rect x="38" y="46" width="74" height="104" rx="16"/></clipPath></defs>
        ${overDrops}${zzz}
        <g clip-path="url(#gzjar)">
          <rect x="38" y="46" width="74" height="104" fill="#EAF3FB"/>
          <rect class="gz-wv" x="30" y="${wTop}" width="90" height="${bottom - wTop + 10}" fill="#7CC6F0"/>
          <path class="gz-wv" d="M30 ${wTop} q11 -7 22 0 t22 0 t22 0 t22 0 v12 h-88 z" fill="#9AD6F5"/>
          <circle class="gz-b" cx="58" cy="142" r="3.4" fill="#fff" opacity=".5"/>
          <circle class="gz-b b2" cx="82" cy="142" r="2.6" fill="#fff" opacity=".5"/>
          <circle class="gz-b b3" cx="70" cy="142" r="3" fill="#fff" opacity=".5"/>
        </g>
        <rect x="38" y="46" width="74" height="104" rx="16" fill="none" stroke="#B7D8C6" stroke-width="2"/>
        <line x1="34" y1="${madY}" x2="116" y2="${madY}" stroke="#E08A3C" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="118" y="${madY + 4}" font-size="11" font-weight="600" fill="#B86A22">soif</text>
        <g class="gz-grass"><g stroke="#4FA84F" stroke-width="5" stroke-linecap="round">
          <line x1="62" y1="48" x2="56" y2="26"/><line x1="75" y1="48" x2="75" y2="20"/><line x1="88" y1="48" x2="94" y2="26"/>
        </g></g>
        <g class="gz-face">
          ${eyes}
          ${mouth}
        </g>
        ${sweat}
      </svg>`;
}

function gzSynthMascot({ mood = "happy", temp = null, condition = "" } = {}) {
  const cond = String(condition || "").toLowerCase();
  const hot = temp != null && temp >= 30;
  const veryHot = temp != null && temp >= 34;
  const cold = temp != null && temp <= 6;

  // Joues : chaudes quand il fait chaud, fraîches quand il fait froid
  const cheeks = (hot || veryHot)
    ? `<circle cx="55" cy="112" r="5" fill="#F0A24C" opacity=".5"/><circle cx="95" cy="112" r="5" fill="#F0A24C" opacity=".5"/>`
    : cold
      ? `<circle cx="55" cy="112" r="5" fill="#7FB6E6" opacity=".55"/><circle cx="95" cy="112" r="5" fill="#7FB6E6" opacity=".55"/>`
      : "";
  // Goutte de sueur (chaud) / souffle (froid)
  const sweat = (hot || veryHot)
    ? `<path class="gz-drop" d="M101 98 q5 7 0 12 q-5 -5 0 -12z" fill="#7CC6F0"/>`
    : "";
  const breath = cold
    ? `<ellipse class="gz-drop" cx="98" cy="124" rx="6" ry="4" fill="#FFFFFF" opacity=".6"/>`
    : "";
  // Bouche : pantelante si très chaud, crispée si froid, sinon selon l'humeur
  const mouth = veryHot
    ? `<path d="M66 115 q9 13 18 0 z" fill="#C56B6B" stroke="#21433A" stroke-width="2.6" stroke-linejoin="round"/>`
    : cold
      ? `<path d="M67 119 q8 4 16 0" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
      : mood === "worried"
        ? `<path d="M65 120 q10 -7 20 0" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
        : mood === "todo"
          ? `<path d="M66 116 q9 6 18 0" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
          : `<path d="M64 114 q11 10 22 0" fill="none" stroke="#21433A" stroke-width="3.2" stroke-linecap="round"/>`;
  // Lunettes de soleil quand le soleil tape (utile), sinon rien
  const shades = (cond === "sunny" || cond === "clear") || (temp != null && temp >= 28);
  const niceEyes = `<g class="gz-eyes">
            <ellipse cx="61" cy="100" rx="3.6" ry="4.7" fill="#21433A"/><ellipse cx="89" cy="100" rx="3.6" ry="4.7" fill="#21433A"/>
            <circle cx="62.4" cy="98" r="1.5" fill="#fff"/><circle cx="90.4" cy="98" r="1.5" fill="#fff"/>
          </g>`;
  const sunglasses = `<g class="gz-shades">
            <path d="M50 94 q-7 -1 -12 -6" fill="none" stroke="#26332E" stroke-width="3" stroke-linecap="round"/>
            <path d="M100 94 q7 -1 12 -6" fill="none" stroke="#26332E" stroke-width="3" stroke-linecap="round"/>
            <rect x="49" y="91" width="23" height="16" rx="7" fill="#2B3A36"/>
            <rect x="78" y="91" width="23" height="16" rx="7" fill="#2B3A36"/>
            <path d="M72 95 q3.5 -2 6 0" fill="none" stroke="#26332E" stroke-width="3" stroke-linecap="round"/>
            <line x1="53" y1="95" x2="59" y2="95" stroke="#7FA295" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
            <line x1="82" y1="95" x2="88" y2="95" stroke="#7FA295" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
          </g>`;
  const eyewear = shades ? sunglasses : niceEyes;
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="Pelouse savante qui surveille la météo du jardin">
        <g class="gz-grass"><g stroke="#4FA84F" stroke-width="6" stroke-linecap="round">
          <line x1="60" y1="74" x2="53" y2="44"/><line x1="75" y1="74" x2="75" y2="38"/><line x1="90" y1="74" x2="97" y2="44"/>
        </g></g>
        <circle cx="75" cy="106" r="35" fill="#9AD89A"/>
        <g class="gz-face">
          ${cheeks}
          ${eyewear}
          ${mouth}
        </g>
        ${sweat}${breath}
      </svg>`;
}

function gzMowerMascot({ mood = "rest", temp = null, condition = "" } = {}) {
  const rolling = mood === "mow";
  const wheel = (cx) => `<circle cx="${cx}" cy="122" r="11" fill="#3F5E50"/><circle cx="${cx}" cy="122" r="4" fill="#8FD0A8"/>`;
  const zzz = mood === "charge"
    ? `<g fill="#5B7A6D" font-weight="600"><text x="104" y="58" font-size="13">z</text><text x="114" y="46" font-size="17">Z</text></g>`
    : "";
  const eyes = mood === "charge"
    ? `<line x1="60" y1="92" x2="70" y2="92" stroke="#1F3A4D" stroke-width="3" stroke-linecap="round"/><line x1="80" y1="92" x2="90" y2="92" stroke="#1F3A4D" stroke-width="3" stroke-linecap="round"/>`
    : `<g class="gz-eyes"><circle cx="65" cy="91" r="4.5" fill="#1F3A4D"/><circle cx="85" cy="91" r="4.5" fill="#1F3A4D"/></g>`;
  const mouth = mood === "blocked"
    ? `<path d="M64 108 q11 -7 22 0" fill="none" stroke="#1F3A4D" stroke-width="3" stroke-linecap="round"/>`
    : `<path d="M64 104 q11 9 22 0" fill="none" stroke="#1F3A4D" stroke-width="3" stroke-linecap="round"/>`;
  const clippings = mood === "mow"
    ? `<g class="gz-drop" fill="#4FA84F"><circle cx="116" cy="116" r="2.6"/><circle cx="126" cy="124" r="2"/><circle cx="121" cy="108" r="1.8"/></g>`
    : "";
  const speed = mood === "mow"
    ? `<g stroke="#9FCBB4" stroke-width="2.6" stroke-linecap="round" opacity=".75"><line x1="18" y1="98" x2="32" y2="98"/><line x1="14" y1="108" x2="30" y2="108"/><line x1="20" y1="118" x2="33" y2="118"/></g>`
    : "";
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="Robot tondeuse">
        ${zzz}${clippings}${speed}
        <g class="${rolling ? "gz-mow" : ""}">
          <g class="gz-face">
            <line x1="75" y1="62" x2="75" y2="46" stroke="#7FB39A" stroke-width="3" stroke-linecap="round"/>
            <circle cx="75" cy="42" r="4" fill="${mood === "blocked" ? "#E0843C" : "#5DBE7E"}"/>
            <rect x="40" y="62" width="70" height="52" rx="16" fill="#8FD0A8"/>
            <rect x="50" y="80" width="50" height="20" rx="9" fill="#fff" opacity=".5"/>
            ${eyes}
            ${mouth}
          </g>
          ${wheel(56)}${wheel(94)}
          <g stroke="#4FA84F" stroke-width="4" stroke-linecap="round"><line x1="34" y1="138" x2="34" y2="130"/><line x1="46" y1="138" x2="46" y2="128"/><line x1="104" y1="138" x2="104" y2="128"/><line x1="116" y1="138" x2="116" y2="130"/></g>
        </g>
      </svg>`;
}

function gzGazonMascot({ mood = "normal", temp = null, condition = "" } = {}) {
  const bladeTop = mood === "seed" ? 96 : 70;
  const mouth = mood === "stress"
    ? `<path d="M65 124 q10 -7 20 0" fill="none" stroke="#21433A" stroke-width="3.2" stroke-linecap="round"/>`
    : mood === "winter"
      ? `<path d="M66 122 h18" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="M64 118 q11 10 22 0" fill="none" stroke="#21433A" stroke-width="3.2" stroke-linecap="round"/>`;
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="État du gazon">
        <ellipse cx="75" cy="150" rx="48" ry="13" fill="#D8C39A"/>
        <g class="gz-grass"><g stroke="#4FA84F" stroke-width="7" stroke-linecap="round">
          <line x1="55" y1="150" x2="47" y2="${bladeTop + 8}"/>
          <line x1="75" y1="150" x2="75" y2="${bladeTop}"/>
          <line x1="95" y1="150" x2="103" y2="${bladeTop + 8}"/>
        </g></g>
        <circle cx="75" cy="116" r="27" fill="#9AD89A"/>
        <g class="gz-face">
          <g class="gz-eyes"><circle cx="66" cy="110" r="4.5" fill="#21433A"/><circle cx="84" cy="110" r="4.5" fill="#21433A"/></g>
          ${mouth}
        </g>
      </svg>`;
}

function gzProductMascot({ mood = "active" } = {}) {
  const spray = mood === "active"
    ? `<g class="gz-drop" fill="#7CC6F0"><circle cx="44" cy="58" r="2.6"/><circle cx="35" cy="64" r="2"/><circle cx="39" cy="51" r="2"/></g>`
    : "";
  const mouth = mood === "idle"
    ? `<path d="M70 114 h18" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
    : `<path d="M69 110 q11 9 21 0" fill="none" stroke="#21433A" stroke-width="3.2" stroke-linecap="round"/>`;
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="Produit d'intervention">
        ${spray}
        <rect x="76" y="50" width="16" height="12" rx="2" fill="#7FB39A"/>
        <rect x="58" y="58" width="22" height="9" rx="2" fill="#7FB39A"/>
        <g class="gz-face">
          <rect x="64" y="64" width="48" height="78" rx="13" fill="#9AD6B0"/>
          <rect x="70" y="92" width="36" height="28" rx="6" fill="#fff" opacity=".55"/>
          <g class="gz-eyes"><circle cx="80" cy="100" r="4.5" fill="#21433A"/><circle cx="96" cy="100" r="4.5" fill="#21433A"/></g>
          ${mouth}
        </g>
      </svg>`;
}

function gzTaskMascot({ mood = "clear" } = {}) {
  const content = mood === "todo"
    ? `<g stroke="#9FCBB4" stroke-width="3" stroke-linecap="round"><line x1="60" y1="92" x2="92" y2="92"/><line x1="60" y1="104" x2="92" y2="104"/><line x1="60" y1="116" x2="80" y2="116"/></g>`
    : `<path d="M60 102 l9 9 l18 -20" fill="none" stroke="#4FA84F" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const mouth = mood === "todo"
    ? `<path d="M67 136 h18" fill="none" stroke="#21433A" stroke-width="3" stroke-linecap="round"/>`
    : `<path d="M65 132 q11 9 21 0" fill="none" stroke="#21433A" stroke-width="3.2" stroke-linecap="round"/>`;
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="Intervention à préparer">
        <g class="gz-face">
          <rect x="48" y="64" width="54" height="84" rx="11" fill="#F4FBF7" stroke="#9FCBB4" stroke-width="2.5"/>
          <rect x="62" y="56" width="26" height="14" rx="5" fill="#8FD0A8"/>
          ${content}
          <g class="gz-eyes"><circle cx="64" cy="130" r="3.6" fill="#21433A"/><circle cx="86" cy="130" r="3.6" fill="#21433A"/></g>
          ${mouth}
        </g>
      </svg>`;
}

function gzGearMascot() {
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45) * Math.PI / 180;
    const cx = 75 + Math.cos(a) * 39;
    const cy = 100 + Math.sin(a) * 39;
    return `<rect x="${(cx - 6).toFixed(1)}" y="${(cy - 6).toFixed(1)}" width="12" height="12" rx="2" fill="#AFC4BB" transform="rotate(${i * 45} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
  }).join("");
  return `
      <svg viewBox="0 0 150 172" width="100%" role="img" aria-label="Réglages">
        <g class="gz-spin">${teeth}<circle cx="75" cy="100" r="34" fill="#C6D7CF"/></g>
        <circle cx="75" cy="100" r="27" fill="#9FB7AD"/>
        <g class="gz-face">
          <g class="gz-eyes"><circle cx="66" cy="96" r="4" fill="#2C3E38"/><circle cx="84" cy="96" r="4" fill="#2C3E38"/></g>
          <path d="M67 108 q8 7 16 0" fill="none" stroke="#2C3E38" stroke-width="3" stroke-linecap="round"/>
        </g>
      </svg>`;
}

function renderZoneBars(zones) {
  if (!Array.isArray(zones) || !zones.length) return "";
  const maxMin = Math.max(...zones.map((z) => asNumber(z.duration_min) ?? 0), 1);
  const rows = zones.map((z, i) => {
    const eid = String(z.entity_id || z.zone || "");
    const label = zoneLabel(eid, z.order, i);
    const color = zoneColor(eid, i);
    const pct = Math.max(3, Math.min(100, ((asNumber(z.duration_min) ?? 0) / maxMin) * 100));
    const mm = z.mm != null ? `${formatNumber(asNumber(z.mm), 1)} mm` : "";
    return `
      <div class="gi-zone-bar-row">
        <span class="gi-zone-badge" style="background:${escapeHtml(color)}">${escapeHtml(label)}</span>
        <div class="gi-zone-track"><div class="gi-zone-fill" style="width:${escapeHtml(String(Math.round(pct)))}%;background:${escapeHtml(color)}"></div></div>
        <span class="gi-zone-bar-meta">${escapeHtml(mm)}</span>
      </div>`;
  }).join("");
  return `<div class="gi-zone-bars">${rows}</div>`;
}

function renderWateringHistoryEntry(entry, index) {
  const dateStr = String(entry.date || "").trim();
  const relDate = dateStr ? formatSkipRelativeDate(dateStr) : "";
  const causeLabel = entry.watering_cause ? formatWateringCause(entry.watering_cause) : "";
  const sourceParts = [relDate, causeLabel].filter(Boolean);
  const mm = asNumber(entry.surface_mm ?? entry.total_mm);
  const mmLabel = mm != null && mm > 0 ? `${formatNumber(mm, 1)} mm` : "—";
  const zones = Array.isArray(entry.zones) ? entry.zones : [];
  const zoneCount = zones.length || (asNumber(entry.zone_count) ?? 0);
  const subLabel = zoneCount > 1 ? `${zoneCount} zones` : (zoneCount === 1 ? "1 zone" : "");
  const badgeHtml = `<span class="gi-hist-badge gi-hist-badge--ok">Fait</span>`;

  let zoneBadgesHtml = "";
  if (zones.length) {
    const shown = zones.slice(0, 3);
    zoneBadgesHtml = `<div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">` +
      shown.map((z, i) => {
        const eid = String(z.entity_id || z.zone || "");
        const lbl = zoneLabel(eid, z.order, i);
        const col = zoneColor(eid, i);
        return `<span class="gi-zone-badge" style="background:${escapeHtml(col)};font-size:8px;padding:1px 5px">${escapeHtml(lbl)}</span>`;
      }).join("") +
      (zones.length > 3 ? `<span class="gi-zone-badge" style="background:#94A3B8;font-size:8px;padding:1px 5px">+${zones.length - 3}</span>` : "") +
      `</div>`;
  }

  return `
    <div class="gi-hist-entry">
      <div class="gi-hist-entry__body">
        <div class="gi-hist-entry__name">Arrosage</div>
        ${zoneBadgesHtml}
        <div class="gi-hist-entry__meta">${escapeHtml(sourceParts.join(" · "))}</div>
      </div>
      <div class="gi-hist-entry__right">
        <div class="gi-hist-entry__val">${escapeHtml(mmLabel)}</div>
        ${subLabel ? `<div class="gi-hist-entry__sub">${escapeHtml(subLabel)}</div>` : ""}
      </div>
      ${badgeHtml}
    </div>`;
}

function renderSkipHistoryEntry(skip) {
  const dateStr = String(skip.date || "").trim();
  const relDate = dateStr ? formatSkipRelativeDate(dateStr) : "";
  const reasonLabel = formatSkipReason(skip.reason);
  const fenetre = String(skip.fenetre || "").trim();
  const metaParts = [relDate, fenetre || null].filter(Boolean);
  const mm = asNumber(skip.objectif_mm);
  const mmLabel = mm != null && mm > 0 ? `${formatNumber(mm, 1)} mm` : "—";
  const isBlocked = ["irrigation_blocked", "auto_not_allowed", "execution_not_allowed"].includes(String(skip.reason || ""));
  const badgeClass = isBlocked ? "gi-hist-badge--block" : "gi-hist-badge--skip";
  const badgeText = isBlocked ? "Bloqué" : "Ignoré";
  return `
    <div class="gi-hist-entry gi-hist-entry--skip">
      <div class="gi-hist-entry__body">
        <div class="gi-hist-entry__name">${fenetre === "soir" ? "Arrosage du soir ignoré" : "Arrosage matin ignoré"}</div>
        <div class="gi-hist-entry__meta">${escapeHtml(metaParts.join(" · "))} · ${escapeHtml(reasonLabel)}</div>
      </div>
      <div class="gi-hist-entry__right">
        <div class="gi-hist-entry__val">${escapeHtml(mmLabel)}</div>
        <div class="gi-hist-entry__sub">objectif</div>
      </div>
      <span class="gi-hist-badge ${escapeHtml(badgeClass)}">${escapeHtml(badgeText)}</span>
    </div>`;
}

export function renderWateringHistorySection(card) {
  const lastWatering = card._lastWateringState();
  const nextWatering = card._nextWateringState();
  const context = card._objectiveContext();
  const derArrosageEntity = card._entity("entity_dernier_arrosage");
  const attrs = derArrosageEntity?.attributes || {};

  const lastMm = lastWatering.value != null ? `${formatNumber(lastWatering.value, 1)} mm` : "—";
  const lastWhen = String(attrs.detected_at || attrs.date_action || "").trim();
  const reserveMm = context.reserveActuelle != null
    ? `${formatNumber(context.reserveActuelle, 1)} mm`
    : "—";
  const reserveMax = context.reserveUsefulMax != null ? `/ ${formatNumber(context.reserveUsefulMax, 1)} mm` : "";

  const statCards = [
    { label: "Dernier arrosage", value: lastMm, sub: lastWhen || "—" },
    { label: "Réserve utile", value: reserveMm, sub: reserveMax || "sol" },
    { label: "Prochain", value: nextWatering.label || "—", sub: "" },
  ];

  const statsHtml = `
    <div class="gi-stat-row">
      ${statCards.map((s) => `
        <div class="gi-stat-card">
          <div class="gi-stat-card__label">${escapeHtml(s.label)}</div>
          <div class="gi-stat-card__value">${escapeHtml(s.value)}</div>
          ${s.sub ? `<div class="gi-stat-card__sub">${escapeHtml(s.sub)}</div>` : ""}
        </div>`).join("")}
    </div>`;

  const lastZones = Array.isArray(attrs.zones) ? attrs.zones : [];
  const zoneBarsHtml = lastZones.length
    ? `<div class="gi-hist-section-label">Zones · dernier cycle</div>${renderZoneBars(lastZones)}`
    : "";

  const wateringEntries = Array.isArray(attrs.derniers_arrosages) ? attrs.derniers_arrosages : [];
  const skipEntries = Array.isArray(attrs.derniers_refus) ? attrs.derniers_refus : [];

  const mergedEntries = [];
  let wi = 0;
  let si = 0;
  while (mergedEntries.length < 8 && (wi < wateringEntries.length || si < skipEntries.length)) {
    const we = wateringEntries[wi];
    const se = skipEntries[si];
    if (!we && !se) break;
    if (!se || (we && String(we.recorded_at || we.date || "") >= String(se.recorded_at || se.date || ""))) {
      mergedEntries.push({ kind: "water", data: we, idx: wi });
      wi++;
    } else {
      mergedEntries.push({ kind: "skip", data: se, idx: si });
      si++;
    }
  }

  if (!mergedEntries.length && !lastZones.length) return "";

  const entriesHtml = mergedEntries.length
    ? `<div class="gi-hist-section-label">Historique récent</div>
       <div class="gi-hist-entries">
         ${mergedEntries.map((e) =>
           e.kind === "water"
             ? renderWateringHistoryEntry(e.data, e.idx)
             : renderSkipHistoryEntry(e.data)
         ).join("")}
       </div>`
    : "";

  return `
    <div class="gi-hist">
      ${statsHtml}
      ${zoneBarsHtml}
      ${entriesHtml}
    </div>`;
}

export function renderWateringTab(card) {
  const windowState = card._windowState();
  const irrigationSignal = card._irrigationSignalState();
  const mowerState = card._mowerState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
  const context = card._objectiveContext();
  const nextWatering = card._nextWateringState();
  const lastWatering = card._lastWateringState();
  const lastWateringTotal = card._lastWateringTotalState();
  const nextActionText = windowState.displayNextAction || windowState.nextActionDisplay || windowState.nextAction;
  const planState = card._planState();
  const objective = windowState.objective;
  const objectiveLabel = formatMm(objective);
  const tone = irrigationSignal.tone || windowState.tone;
  const windowIcon = card._statusIcon(windowState.status);
  const windowStatusIcon = card._config?.show_icons ? windowIcon : null;
  const isBlocked = windowState.isBlocked;
  const isAwaiting = windowState.isAwaiting;
  const noActionText = windowState.isNoActionRequired ? "Non requis" : "";
  const noActionHint = windowState.isNoActionRequired ? windowState.displaySummary || windowState.summary || "Non requis" : "";
  const blockHint = isBlocked
    ? windowState.blockReasonLabel || windowState.displayNextAction || windowState.nextAction || ""
    : isAwaiting
      ? windowState.nextAction || "Attendre le créneau prévu"
      : [
          noActionHint,
          windowState.optimalWindowDisplay ? `Optimal: ${windowState.optimalWindowDisplay}` : "",
          windowState.wateringWindowDisplay ? `Créneau: ${windowState.wateringWindowDisplay}` : "",
        ].filter(Boolean).join(" · ");
  const heroNextText = String(windowState.reasonSummary || nextActionText || "").trim();
  const heroHintText = String(blockHint || "").trim();
  const normalizedHeroNext = heroNextText.toLowerCase();
  const normalizedHeroHint = heroHintText.toLowerCase();
  const shouldShowHeroHint = Boolean(heroHintText)
    && (isBlocked || isAwaiting)
    && normalizedHeroHint !== normalizedHeroNext
    && !normalizedHeroHint.startsWith(`${normalizedHeroNext} ·`)
    && !normalizedHeroNext.startsWith(`${normalizedHeroHint} ·`);
  const planTypeLabel = formatPlanType(planState.planType);
  const wateringCauseLabel = formatWateringCauseLabel(windowState.wateringCause || irrigationSignal.wateringCause || "hydrique");
  const wateringTypeLabel = formatWateringTypeLabel(irrigationSignal.typeArrosage || context.typeArrosage);

  const hydricUx = formatHydricUxState({
    depletionRatio: context.depletionRatio,
    reserveStock: context.reserveStock,
    reserveStockMax: context.reserveStockMax,
    reserveActuelle: context.reserveActuelle,
    reserveUsefulMax: context.reserveUsefulMax,
  });
  const reserveTotalValue = context.reserveStock != null
    ? (context.reserveStockMax != null && context.reserveStockMax > 0
        ? `${formatNumber(context.reserveStock, 1)} / ${formatNumber(context.reserveStockMax, 1)} mm`
        : `${formatNumber(context.reserveStock, 1)} mm`)
    : "Non disponible";
  const reserveUsefulValue = context.reserveActuelle != null
    ? (context.reserveUsefulMax != null && context.reserveUsefulMax > 0
        ? `${formatNumber(context.reserveActuelle, 1)} / ${formatNumber(context.reserveUsefulMax, 1)} mm`
        : `${formatNumber(context.reserveActuelle, 1)} mm`)
    : "Non disponible";
  const surplusHydriqueValue = context.reserveSurplus != null
    ? `${formatNumber(context.reserveSurplus, 1)} mm`
    : "—";
  const depletionUsefulValue = context.depletionRatio != null
    ? `${formatNumber(Math.max(0, context.depletionRatio) * 100, 0)} %`
    : "Non disponible";
  const hydricUsefulWidth = (
    context.reserveStockMax != null && context.reserveStockMax > 0 && context.reserveActuelle != null
      ? Math.max(0, Math.min(100, (context.reserveActuelle / context.reserveStockMax) * 100))
      : 0
  );
  const hydricSurplusWidth = (
    context.reserveStockMax != null && context.reserveStockMax > 0 && context.reserveSurplus != null
      ? Math.max(0, Math.min(100, (context.reserveSurplus / context.reserveStockMax) * 100))
      : 0
  );
  const hydricFillWidth = hydricUsefulWidth + hydricSurplusWidth;
  // Repère MAD : niveau de réserve utile sous lequel l'arrosage se déclenche
  // (déplétion ≥ seuil MAD). Position sur la piste (échelle = réserve totale du sol).
  const madRatio = context.madRatio != null && context.madRatio > 0 && context.madRatio < 1
    ? context.madRatio
    : 0.5;
  const madThresholdMm = context.reserveUsefulMax != null
    ? context.reserveUsefulMax * (1 - madRatio)
    : null;
  const madMarkerPct = (madThresholdMm != null && context.reserveStockMax != null && context.reserveStockMax > 0)
    ? Math.max(0, Math.min(100, (madThresholdMm / context.reserveStockMax) * 100))
    : null;
  const autoBlockage = card._autoBlockageState();
  const showBlockage = autoBlockage.present
    && (windowState.isBlocked
      || windowState.isAwaiting
      || autoBlockage.blocked
      || autoBlockage.safetyLock
      || (objective <= 0 && Boolean(autoBlockage.why)));
  const blockageHtml = showBlockage
    ? `
        <div class="gz2-blockage gz2-blockage--${autoBlockage.tone}">
          <div class="gz2-blockage__head">
            ${renderIconBox(autoBlockage.safetyLock ? "mdi:lock-alert" : "mdi:water-alert", "sm")}
            <span class="gz2-blockage__title">${escapeHtml(autoBlockage.reason || "Arrosage bloqué")}</span>
          </div>
          ${autoBlockage.why ? `<div class="gz2-blockage__why">${escapeHtml(autoBlockage.why)}</div>` : ""}
          ${autoBlockage.howToUnblock
            ? `<div class="gz2-blockage__how">${renderIconBox("mdi:lightbulb-on-outline", "sm")}<span>${escapeHtml(autoBlockage.howToUnblock)}</span></div>`
            : ""}
        </div>`
    : "";
  const reserveHydricFacts = [
    {
      label: "Réserve utile",
      value: reserveUsefulValue,
      secondary: "Part exploitable par le gazon",
      tone: hydricUx.tone,
      icon: "mdi:water-percent",
      entityKey: "entity_reserve_actuelle",
    },
    {
      label: "Surplus",
      value: surplusHydriqueValue,
      secondary: "Au-dessus de la réserve utile",
      tone: context.reserveSurplus != null && context.reserveSurplus > 0 ? "success" : "neutral",
      icon: "mdi:water-plus",
      entityKey: "entity_reserve_actuelle",
    },
    {
      label: "Déplétion",
      value: depletionUsefulValue,
      secondary: context.depletionMm != null ? `${formatNumber(context.depletionMm, 1)} mm consommés` : "Part consommée de la réserve utile",
      tone: context.depletionRatio != null && context.depletionRatio > 0 ? "warning" : "success",
      icon: "mdi:water-minus",
      entityKey: "entity_reserve_actuelle",
    },
  ];

  const wateringProgress = card._wateringProgressState();
  const decisionFacts = [
    {
      label: "Fenêtre",
      value: windowState.statusLabel,
      secondary: windowState.displaySummary || windowState.summary || "",
      tone: windowState.tone,
      icon: "mdi:clock-outline",
    },
    {
      label: "Signal",
      value: irrigationSignal.actionLabel || "Non disponible",
      secondary: irrigationSignal.summary || "",
      tone,
      icon: "mdi:sprinkler",
    },
    {
      label: "Cause",
      value: wateringCauseLabel,
      secondary: windowState.reasonSummary || "",
      tone: windowState.isPostApplication ? "accent" : "neutral",
      icon: "mdi:source-branch",
    },
  ];
  const contextFacts = [
    context.hydricState ? {
      label: "État hydrique",
      value: formatStatusLabel(context.hydricState),
      secondary: context.reserveActuelle !== null ? `${formatNumber(context.reserveActuelle, 1)} mm disponibles` : "",
      tone: context.hydricState === "plein" ? "success" : "warning",
      icon: "mdi:water-percent-alert",
    } : null,
    context.temperature !== null ? {
      label: "Température",
      value: `${formatNumber(context.temperature, 1)} °C`,
      secondary: context.etp !== null ? `ETP ${formatNumber(context.etp, 1)} mm` : "",
      tone: context.temperature >= 24 ? "warning" : "neutral",
      icon: "mdi:thermometer",
    } : null,
    {
      label: "Coordination",
      value: mowerCoordinationState.label,
      secondary: irrigationSignal.wateringBlockedByMower ? (irrigationSignal.wateringBlockReasonLabel || "Blocage robot actif") : (mowerState.reason || ""),
      tone: irrigationSignal.wateringBlockedByMower ? "danger" : mowerCoordinationState.tone,
      icon: "mdi:robot-mower",
    },
    {
      label: "Plan",
      value: planTypeLabel,
      secondary: planState.durationHuman,
      tone: "accent",
      icon: "mdi:timer-outline",
    },
    lastWateringTotal.value !== null ? {
      label: "Arrosage cumulé",
      value: lastWateringTotal.label,
      secondary: lastWateringTotal.detail,
      tone: "neutral",
      icon: "mdi:water-sync",
    } : null,
  ].filter(Boolean);

  const lastSkipEntry = (() => {
    const skips = card._entity("entity_dernier_arrosage")?.attributes?.derniers_refus;
    return Array.isArray(skips) && skips.length ? skips[0] : null;
  })();
  const lastSkipSub = lastSkipEntry
    ? `Refus ${formatSkipRelativeDate(lastSkipEntry.date)} · ${formatSkipReason(lastSkipEntry.reason)}`
    : null;

  const reperes = [
    { label: "Objectif", value: objectiveLabel, entityKey: "entity_objectif_arrosage" },
    { label: "Type", value: wateringTypeLabel, entityKey: "entity_type_arrosage" },
    { label: "Prochain arrosage", value: nextWatering.label, entityKey: "entity_prochain_arrosage" },
    { label: "Dernier arrosage", value: lastWatering.label, sub: lastSkipSub, entityKey: "entity_dernier_arrosage" },
  ];
  const heroTitle = heroNextText || irrigationSignal.summary || windowState.summary || "Irrigation";
  const heroSub = shouldShowHeroHint ? heroHintText : "";
  const renderGz2Cards = (items) => items.map((f) => {
    const eid = card._entityId(f.entityKey);
    const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
    return `
      <button type="button" class="gz2-card"${eid ? ` data-more-info-entity="${escapeHtml(eid)}"` : ""}>
        <div class="gz2-card__label">${escapeHtml(f.label)}</div>
        <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
        ${f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}
      </button>`;
  }).join("");

  // Bandeau « arrosage du soir prévu » : visible dès que le créneau recommandé est le soir
  // (rafraîchissement canicule), pour ne pas avoir à fouiller la fenêtre.
  const eveningPlanned = windowState.publicState === "soir" && !windowState.isBlocked && windowState.objective > 0;
  // Anticipation honnête : tant que le cooling n'est pas encore déclenché (fenêtre du soir),
  // on annonce qu'il est PROBABLE si les conditions réelles sont là (canicule + air sec +
  // marge de séchage). Conditionnel : se retire de lui-même si l'air redevient humide.
  const eveningLikely = !eveningPlanned && Boolean(context.eveningCoolingLikely);
  const eveningBannerHtml = eveningPlanned
    ? `
        <div class="gz2-evening" role="status">
          <span class="gz2-evening__icon" aria-hidden="true">🌙</span>
          <span class="gz2-evening__text">Arrosage du soir prévu${windowState.eveningWindowDisplay ? ` · ${escapeHtml(windowState.eveningWindowDisplay)}` : ""}</span>
        </div>`
    : "";

  // --- Vue ludique (compréhensible par un enfant) ---
  const wateringNow = Boolean(wateringProgress && wateringProgress.active);
  const reserveUsefulKid = (context.reserveUsefulMax && context.reserveUsefulMax > 0) ? context.reserveUsefulMax : 12;
  const reserveActKid = context.reserveActuelle;
  const fillPctKid = reserveActKid != null ? Math.max(4, Math.min(100, (reserveActKid / reserveUsefulKid) * 100)) : 55;
  const madPctKid = madThresholdMm != null ? Math.max(0, Math.min(100, (madThresholdMm / reserveUsefulKid) * 100)) : 50;
  const blockTxtKid = `${windowState.blockReason || ""} ${windowState.blockReasonLabel || ""}`.toLowerCase();
  const rainBlockedKid = isBlocked && /pluie/.test(blockTxtKid);
  const cooldownBlockedKid = isBlocked && /(cooldown|repos)/.test(blockTxtKid);
  const thirstyKid = !wateringNow && context.depletionRatio != null && context.depletionRatio >= madRatio;
  // Application de produit : la mascotte prévient quand un produit vient d'être appliqué et que
  // son arrosage d'incorporation est imminent, puis pendant l'incorporation elle-même.
  const appEntity = card._entity("entity_derniere_application");
  const appAttrs = (appEntity && appEntity.attributes) || {};
  const appProductName = String((appEntity && appEntity.state) || "").trim();
  const appRequiresWatering = appAttrs.application_requires_watering_after === true;
  const appPostPending = appAttrs.application_post_watering_pending === true;
  const appPostRemainingMm = Number(appAttrs.application_post_watering_remaining_mm) || 0;
  const appPostDelayMin = Number(appAttrs.application_post_watering_delay_remaining_minutes) || 0;
  const appPostStatus = String(appAttrs.application_post_watering_status || "").trim().toLowerCase();
  const incorporationNow = wateringNow && wateringProgress.wateringCause === "post_application";
  const eveningCoolingNow = wateringNow && wateringProgress.wateringCause === "rafraichissement_soir";
  const incorporationPending = !wateringNow && appRequiresWatering && appPostPending
    && appPostRemainingMm > 0 && appPostStatus !== "termine";
  const appLabel = appProductName || "le produit";
  let kid;
  if (incorporationNow) {
    kid = { mood: "happy", drinking: true, title: "Elle boit le produit !", sentence: `Elle fait pénétrer ${appLabel} dans la terre.`, pillIcon: "mdi:spray-bottle", pill: `Incorporation · ${formatNumber(wateringProgress.progressPercent || 0, 0)} %` };
  } else if (incorporationPending) {
    const delayTxt = appPostDelayMin > 0 ? ` (dans ~${formatNumber(appPostDelayMin, 0)} min)` : "";
    kid = { mood: "happy", title: "Produit appliqué", sentence: `Tu viens d'appliquer ${appLabel}. Je vais l'arroser pour le faire pénétrer${delayTxt}.`, pillIcon: "mdi:timer-sand", pill: "Arrosage d'incorporation à venir" };
  } else if (eveningCoolingNow) {
    kid = { mood: "happy", drinking: true, title: "Petit rafraîchissement du soir", sentence: "Elle se rafraîchit pour la nuit — l'eau fait baisser la température du sol.", pillIcon: "mdi:weather-night", pill: `Rafraîchissement en cours · ${formatNumber(wateringProgress.progressPercent || 0, 0)} %` };
  } else if (wateringNow) {
    kid = { mood: "happy", drinking: true, title: "Elle boit en ce moment !", sentence: "L'eau arrive dans la terre, le réservoir se remplit.", pillIcon: "mdi:sprinkler", pill: `Arrosage en cours · ${formatNumber(wateringProgress.progressPercent || 0, 0)} %` };
  } else if (rainBlockedKid) {
    kid = { mood: "happy", raining: true, title: "Pas besoin d'arroser", sentence: "La pluie va s'en occuper toute seule.", pillIcon: "mdi:weather-rainy", pill: "Pluie prévue" };
  } else if (cooldownBlockedKid) {
    kid = { mood: "sleep", title: "Elle se repose", sentence: "Elle a déjà bu il y a peu. Elle reboira quand elle aura soif.", pillIcon: "mdi:sleep", pill: "Au repos" };
  } else if (thirstyKid) {
    kid = { mood: "sad", title: "Ma pelouse a soif", sentence: "Le niveau d'eau est bas, elle va bientôt boire.", pillIcon: "mdi:water-alert", pill: "Bientôt un arrosage" };
  } else {
    kid = { mood: "happy", title: "Ma pelouse va bien !", sentence: "Elle a assez d'eau en réserve dans la terre.", pillIcon: "mdi:emoticon-happy-outline", pill: "Tout va bien" };
  }
  // C'est la mascotte qui annonce le rafraîchissement du soir (plutôt qu'un bandeau séparé) :
  // probabilité honnête, qui se retire si l'air redevient humide.
  if (eveningLikely && !wateringNow && !rainBlockedKid && !incorporationPending) {
    kid.sentence = `${kid.sentence} Et un petit rafraîchissement du soir est probable, si l'air reste sec.`;
    kid.pill = "Rafraîchissement probable ce soir";
    kid.pillIcon = "mdi:weather-night";
  }
  const wxWater = card._weatherState();
  const playfulScene = renderPlayfulScene({
    variant: "water",
    entityId: moreInfoId(card, "entity_prochain_arrosage"),
    eyebrow: "Arrosage",
    title: kid.title,
    sentence: kid.sentence,
    pill: kid.pill,
    pillIcon: kid.pillIcon,
    backdrop: gzWeatherBackdrop(wxWater ? wxWater.temperature : null, wxWater ? wxWater.condition : "", gzIsDark(card)),
    mascot: gzWaterMascot({ fillPct: fillPctKid, madPct: madPctKid, mood: kid.mood, raining: Boolean(kid.raining), drinking: Boolean(kid.drinking), temp: wxWater ? wxWater.temperature : null, condition: wxWater ? wxWater.condition : "" }),
    tiles: [
      { icon: "mdi:water", label: "Dernier arrosage", value: lastWatering.label || "—", sub: "ce qu'elle a bu" },
      { icon: "mdi:clock-outline", label: "Prochaine boisson", value: wateringNow ? "maintenant" : (cooldownBlockedKid ? "au repos" : (nextWatering.label || "—")), sub: wateringNow ? "en cours" : "" },
      { icon: "mdi:cup-water", label: "Réservoir d'eau", value: reserveActKid != null ? `${formatNumber(reserveActKid, 0)} / ${formatNumber(reserveUsefulKid, 0)} mm` : "—", sub: thirstyKid ? "il a soif" : (fillPctKid >= 90 ? "bien plein" : "correct") },
    ],
  });

  const historySection = renderWateringHistorySection(card);

  return `
      ${historySection}

      ${playfulScene}

      ${eveningBannerHtml}

      <details class="gz-details"${wateringNow ? " open" : ""}>
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Irrigation (détails)">
        ${renderGz2Hero("Décision eau", heroTitle, heroSub, { icon: card._statusIcon(windowState.status) || "mdi:water", tone: windowState.tone || "accent" })}

        ${blockageHtml}

        ${renderWateringProgressSection(card, wateringProgress)}

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => {
            const eid = moreInfoId(card, r.entityKey);
            const attrs = eid
              ? ` data-more-info-entity="${escapeHtml(eid)}" role="button" tabindex="0" title="Voir le détail"`
              : "";
            return `
            <div class="gz2-rep${eid ? " gz2-rep--clickable" : ""}"${attrs}>
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
              ${r.sub ? `<div class="gz2-rep__sub">${escapeHtml(r.sub)}</div>` : ""}
            </div>
          `;
          }).join("")}
        </div>

        ${
          card._config?.show_secondary_info
            ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Réserve hydrique</div>
        <div class="gz2-meter">
          <div class="gz2-meter__top">
            <div class="gz2-meter__value">${escapeHtml(reserveTotalValue)}</div>
            <div class="gz2-meter__badge gz2-chip gz2-chip--${escapeHtml(hydricUx.tone || "neutral")}">${escapeHtml(hydricUx.label)}</div>
          </div>
          <div class="gz2-meter__track" aria-label="Répartition de la réserve hydrique">
            <span class="gz2-meter__fill" style="width:${escapeHtml(String(hydricUsefulWidth))}%;"></span>
            ${hydricSurplusWidth > 0
              ? `<span class="gz2-meter__surplus" style="left:${escapeHtml(String(hydricUsefulWidth))}%; width:${escapeHtml(String(hydricSurplusWidth))}%;"></span>`
              : ""}
            ${madMarkerPct != null
              ? `<span class="gz2-meter__mad" style="left:${escapeHtml(String(madMarkerPct))}%;" title="Seuil d'arrosage (MAD)" aria-label="Seuil d'arrosage (MAD)"></span>`
              : ""}
          </div>
          <div class="gz2-meter__meta">${escapeHtml(
            `Réserve utile ${reserveUsefulValue} · Surplus ${surplusHydriqueValue} · Déplétion ${depletionUsefulValue}`
            + (madThresholdMm != null ? ` · Seuil MAD ${formatNumber(madThresholdMm, 1)} mm` : "")
          )}</div>
          ${madMarkerPct != null ? `<div class="gz2-meter__legend"><span class="gz2-meter__legend-mark"></span>Sous ce repère, un arrosage se déclenche</div>` : ""}
        </div>
        <div class="gz2-cards">${renderGz2Cards(reserveHydricFacts)}</div>
        <div class="gz2-actions">
          <button type="button" class="gz2-btn gz2-btn--ghost" data-gazon-action="recalibrate-reserve" title="Recaler la réserve hydrique du sol">
            ${renderIconBox("mdi:target", "sm")}<span>Recaler la réserve</span>
          </button>
        </div>

        <div class="gz2-eyebrow gz2-eyebrow--section">Décision</div>
        <div class="gz2-cards">${renderGz2Cards(decisionFacts)}</div>

        <div class="gz2-eyebrow gz2-eyebrow--section">Contexte terrain</div>
        <div class="gz2-cards">${renderGz2Cards(contextFacts)}</div>
            `
            : ""
        }

      </section>
      </details>
    `;
}

export function renderGazonTab(card) {
  const assistant = card._assistantState();
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const risk = card._entityState("entity_risque", null);
  const action = card._entityState("entity_niveau", null);
  const hydricLevel = String(card._entityAttribute("entity_niveau", "niveau_action_hydrique", "") || "").trim();
  const progress = asNumber(card._entity("entity_sous_phase")?.attributes?.sous_phase_progression);
  const progressDetail = card._entity("entity_sous_phase")?.attributes?.sous_phase_detail || "";
  const progressLabel = progress === null ? "Progression non disponible" : `${formatNumber(progress, 0)} %`;
  const progressWidth = progress === null ? 0 : Math.max(0, Math.min(100, progress));
  // Sans sous-phase réelle, le backend renvoie "Normal" : il n'y a alors rien à
  // suivre, on masque la section de progression plutôt que d'afficher une barre.
  const hasSubPhase = !isEmpty(subPhase) && String(subPhase).trim().toLowerCase() !== "normal";
  const gazonStatusIcon = card._config?.show_icons ? "mdi:grass" : null;
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
      label: "Assistant",
      value: assistant.summary || "Non disponible",
      tone: assistant.tone || computeActionTone(action),
      icon: "mdi:account-tie-hat-outline",
      secondary: assistant.reason || "",
      entityKey: "entity_assistant",
    },
    {
      label: "Phase dominante",
      value: formatStatusLabel(phase),
      tone: phaseTone(phase),
      icon: "mdi:grass",
      secondary: "",
      entityKey: "entity_phase",
    },
    ...(hasSubPhase ? [{
      label: "Sous-phase",
      value: formatStatusLabel(subPhase),
      tone: phaseTone(phase),
      icon: "mdi:sprout",
      secondary: progressDetail || "",
      entityKey: "entity_sous_phase",
    }] : []),
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
      secondary: hydricLevel ? `Hydrique: ${formatStatusLabel(hydricLevel)}` : "",
      entityKey: "entity_niveau",
    },
  ];

  // --- Scène ludique Gazon : le brin d'herbe selon la saison ---
  const phaseRaw = String(phase || "").toLowerCase();
  const riskRaw = String(risk || "").toLowerCase();
  let gzMood = "normal";
  let gzTitle = "Le gazon est en forme";
  let gzSentence = "Belle pelouse, rien à signaler.";
  if (/(semis|sursemis|germination|lev)/.test(phaseRaw)) {
    gzMood = "seed"; gzTitle = "Le gazon pousse"; gzSentence = "De jeunes pousses : on les chouchoute.";
  } else if (/(hiver|dormance|repos)/.test(phaseRaw)) {
    gzMood = "winter"; gzTitle = "Le gazon se repose"; gzSentence = "Saison calme : il tourne au ralenti.";
  } else if (/(élev|elev|fort|critique|haut)/.test(riskRaw)) {
    gzMood = "stress"; gzTitle = "Le gazon est un peu stressé"; gzSentence = "Petit coup d'œil : le risque est élevé.";
  }
  const wxGazon = card._weatherState();
  const gazonScene = renderPlayfulScene({
    variant: "gazon",
    entityId: moreInfoId(card, "entity_phase"),
    eyebrow: "Gazon",
    title: gzTitle,
    sentence: gzSentence,
    pillIcon: "mdi:grass",
    pill: phase ? `Phase ${formatStatusLabel(phase)}` : "Phase Normal",
    backdrop: gzWeatherBackdrop(wxGazon ? wxGazon.temperature : null, wxGazon ? wxGazon.condition : "", gzIsDark(card)),
    mascot: gzGazonMascot({ mood: gzMood, temp: wxGazon ? wxGazon.temperature : null, condition: wxGazon ? wxGazon.condition : "" }),
    tiles: [
      { icon: "mdi:grass", label: "Phase", value: formatStatusLabel(phase) || "Normal", sub: "saison" },
      { icon: "mdi:shield-alert-outline", label: "Risque", value: formatStatusLabel(risk) || "—", sub: "" },
      { icon: "mdi:sprout", label: "Sous-phase", value: hasSubPhase ? formatStatusLabel(subPhase) : "—", sub: hasSubPhase ? progressLabel : "" },
    ],
  });

  return `
      ${gazonScene}

      <details class="gz-details">
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Gazon (détails)">
        ${renderGz2Hero("Gazon", formatStatusLabel(phase) || "Gazon", gazonHint, { icon: "mdi:grass", tone: "accent" })}
        <div class="gz2-cards">${renderGz2Cards(card, gazonFacts)}</div>
        ${hasSubPhase ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Progression de la sous-phase</div>
        <div class="gz2-meter">
          <div class="gz2-meter__top"><div class="gz2-meter__value">${escapeHtml(progressLabel)}</div></div>
          <div class="gz2-meter__track" aria-label="${escapeHtml(progressLabel)}"><span class="gz2-meter__fill" style="width:${escapeHtml(String(progressWidth))}%;"></span></div>
          ${progressDetail ? `<div class="gz2-meter__meta">${escapeHtml(progressDetail)}</div>` : ""}
        </div>
        ` : ""}
      </section>
      </details>
    `;
}

export function renderMowingTab(card) {
  const tonte = card._entity("entity_tonte");
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const tonteAutoriseeEntity = card._entity("entity_tonte_autorisee");
  const height = card._entity("entity_hauteur");
  const mowerCutHeightValue = card._renderConfigValue("entity_hauteur_coupe_tondeuse", "mm");
  const windowState = card._windowState();
  const mowerState = card._mowerState();
  const mowingBlock = card._mowingBlockState();
  const tonteAttrs = tonte?.attributes || tonteAutoriseeEntity?.attributes || {};
  const gazonPermetTonte = tonteAttrs.gazon_permet_tonte !== undefined ? Boolean(tonteAttrs.gazon_permet_tonte) : tonteAutorisee === "on";
  const machinePermetTonte = tonteAttrs.machine_permet_tonte !== undefined
    ? Boolean(tonteAttrs.machine_permet_tonte)
    : mowerState.present ? mowerState.ready === true : false;
  const actionPossible = tonteAttrs.action_possible !== undefined
    ? Boolean(tonteAttrs.action_possible)
    : gazonPermetTonte && machinePermetTonte;
  // Coordination tondeuse désactivée : la machine n'est pas surveillée. À distinguer
  // d'une vraie indisponibilité (coordination active mais machine non prête).
  const coordinationDisabled = mowerState.coordinationEnabled === false;
  const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
  const heightValue = height ? formatCm(height.state) : "Non disponible";
  const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
  const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
  const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
  const windowSummary = windowState.entity ? windowState.displaySummary || windowState.summary : "Fenêtre optimale non disponible";
  const nextMowing = card._nextMowingState();
  const mowingStatusIcon = card._config?.show_icons ? "mdi:content-cut" : null;
  const mowingDecisionSummary = actionPossible
    ? "Tonte lançable."
    : mowingBlock.blocked
      ? compactDecisionText(mowingBlock.reasonDetail || mowingBlock.detail || mowerState.reason || "Tonte bloquée par conditions.", { maxLength: 132 })
      : mowerState.present
      ? mowerState.reason || "Machine non prête pour une nouvelle tonte."
      : "Tondeuse non disponible.";
  const mowingDecisionPills = [
    {
      label: "Gazon",
      value: tonteAutorisee === "on" ? "Permet la tonte" : "Bloque la tonte",
      tone: tonteAutorisee === "on" ? "success" : "danger",
      icon: "mdi:grass",
    },
    {
      label: "Machine",
      value: coordinationDisabled ? "Coordination désactivée" : machinePermetTonte ? "Prête" : "Non prête",
      tone: coordinationDisabled ? "neutral" : machinePermetTonte ? "success" : mowerState.present ? "danger" : "neutral",
      icon: mowerState.present ? "mdi:robot-mower" : "mdi:robot-mower-off",
    },
    {
      label: "Action",
      value: actionPossible ? "Possible" : "Impossible",
      tone: actionPossible ? "success" : "warning",
      icon: "mdi:check-circle-outline",
    },
  ];
  const mowingSummaryItems = [
    {
      label: "État de tonte",
      value: tonteValue,
      note: mowerState.present ? mowerState.label : "",
      tone: computeTonteTone(tonteValue),
    },
    {
      label: "Blocage",
      value: mowingBlock.blocked ? mowingBlock.reasonLabel || "Actif" : "Aucun",
      note: mowingBlock.blocked ? compactDecisionText(mowingBlock.reasonDetail || mowingBlock.detail || "", { maxLength: 118 }) : "Aucun frein hydrique ou post-produit.",
      tone: mowingBlock.blocked ? "danger" : "success",
    },
    {
      label: "Fenêtre",
      value: windowSummary,
      note: windowState.reasonSummary || windowState.nextActionDisplay || windowState.nextAction || "",
      tone: windowState.tone,
    },
    {
      label: "Prochaine tonte",
      value: nextMowing.label,
      note: compactDecisionText(nextMowing.detail || "Aucune date de reprise calculée.", { maxLength: 118 }),
      tone: nextMowing.tone,
    },
    {
      label: "Hauteur conseillée",
      value: heightValue,
      note: heightSecondary || "Lecture agronomique stable.",
      tone: card._phaseTone(),
    },
  ];
  if (mowerState.present) {
    mowingSummaryItems.push({
      label: "Batterie tondeuse",
      value: mowerState.battery === null ? "Non disponible" : `${mowerState.battery} %`,
      note: mowerState.nextDeparture || "",
      tone: mowerState.battery === null ? "neutral" : mowerState.battery < 25 ? "danger" : "success",
    });
  }
  if (mowerCutHeightValue.value && mowerCutHeightValue.value !== "Non disponible") {
    mowingSummaryItems.push({
      label: "Hauteur réglée",
      value: mowerCutHeightValue.value,
      note: "Réglage réel de la machine.",
      tone: "accent",
    });
  }

  const mowingCards = mowingSummaryItems.map((item) => ({
    label: item.label,
    value: item.value,
    secondary: item.note,
    tone: item.tone,
    entityKey:
      item.label === "État de tonte" ? "entity_tonte"
        : item.label === "Fenêtre" ? "entity_fenetre_optimale"
          : item.label === "Prochaine tonte" ? "entity_prochaine_tonte"
            : item.label === "Hauteur conseillée" ? "entity_hauteur"
              : item.label === "Hauteur réglée" ? "entity_hauteur_coupe_tondeuse"
                : item.label === "Machine" ? "entity_tonte_autorisee"
                  : null,
  }));

  // --- Scène ludique Tonte : le robot tondeuse ---
  const tonteRaw = `${tonte?.state || ""} ${mowerState.label || ""}`.toLowerCase();
  let mowMood = "rest";
  let mowTitle = "Prêt à tondre";
  let mowSentence = "Tout est ok pour une tonte quand ce sera le bon moment.";
  let mowPill = "Peut tondre";
  let mowPillIcon = "mdi:robot-mower";
  if (/(cours|mowing|tond)/.test(tonteRaw)) {
    mowMood = "mow"; mowTitle = "Le robot tond !"; mowSentence = "Il est en train de couper l'herbe."; mowPill = "Tonte en cours";
  } else if (mowerState.present && mowerState.battery != null && mowerState.battery < 30) {
    mowMood = "charge"; mowTitle = "Il recharge sa batterie"; mowSentence = "Il repartira tondre une fois rechargé."; mowPill = "En charge"; mowPillIcon = "mdi:battery-charging";
  } else if (!actionPossible) {
    mowMood = "blocked"; mowTitle = "Il ne peut pas tondre"; mowSentence = compactDecisionText(mowingDecisionSummary, { maxLength: 96 }); mowPill = "En pause"; mowPillIcon = "mdi:robot-mower-off";
  }
  const wxMow = card._weatherState();
  const mowScene = renderPlayfulScene({
    variant: "mow",
    entityId: moreInfoId(card, "entity_prochaine_tonte"),
    eyebrow: "Tonte",
    title: mowTitle,
    sentence: mowSentence,
    pill: mowPill,
    pillIcon: mowPillIcon,
    backdrop: gzWeatherBackdrop(wxMow ? wxMow.temperature : null, wxMow ? wxMow.condition : "", gzIsDark(card)),
    mascot: gzMowerMascot({ mood: mowMood, temp: wxMow ? wxMow.temperature : null, condition: wxMow ? wxMow.condition : "" }),
    tiles: [
      { icon: "mdi:content-cut", label: "État", value: tonteValue, sub: mowerState.present ? (mowerState.label || "robot") : "robot" },
      { icon: "mdi:calendar-clock", label: "Prochaine tonte", value: nextMowing.label || "—", sub: "" },
      { icon: "mdi:ruler", label: "Hauteur conseillée", value: heightValue || "—", sub: heightSecondary || "" },
    ],
  });

  return `
      ${mowScene}

      <details class="gz-details"${mowMood === "mow" ? " open" : ""}>
        <summary>Voir les détails techniques</summary>
      <section class="gz2-overview" aria-label="Tonte (détails)">
        ${renderGz2Hero("Tonte", tonteValue, mowingDecisionSummary, { icon: "mdi:content-cut", tone: "accent" })}
        <div class="gz2-chips">${renderGz2Chips(mowingDecisionPills)}</div>
        <div class="gz2-eyebrow gz2-eyebrow--section">Lecture rapide</div>
        <div class="gz2-cards">${renderGz2Cards(card, mowingCards)}</div>
      </section>
      </details>
    `;
}

export function renderConfigTab(card) {
  const switchState = card._configSwitchState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
  const afterApplication = card._entity("entity_arrosage_apres_application_autorise");
  const afterApplicationInfo = card._postApplicationState(afterApplication);
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const mode = card._entityState("entity_mode", null);
  const modeTone = phaseTone(mode);
  const heightMin = card._renderConfigValue("entity_hauteur_min_tondeuse", "cm");
  const heightMax = card._renderConfigValue("entity_hauteur_max_tondeuse", "cm");
  const mowingCooldown = card._renderConfigValue("entity_delai_reprise_tonte_apres_arrosage", "min");
  const controlItems = [
    { label: "Irrigation automatique", value: switchState.label, tone: switchState.tone, entityKey: "entity_switch_arrosage_automatique" },
    { label: "Coordination tondeuse", value: mowerCoordinationState.label, tone: mowerCoordinationState.tone, entityKey: "entity_switch_coordination_tondeuse" },
    { label: "Post-application", value: afterApplicationInfo.label, tone: afterApplicationInfo.tone, entityKey: "entity_arrosage_apres_application_autorise" },
    { label: "Gazon permet la tonte", value: formatAuthorizationState(tonteAutorisee), tone: tonteAutorisee === "on" ? "success" : "danger", entityKey: "entity_tonte_autorisee" },
    { label: "Mode du gazon", value: formatApplicationMode(mode), tone: modeTone, entityKey: "entity_mode" },
    { label: "Cooldown tonte après arrosage", value: mowingCooldown.value, tone: mowingCooldown.tone, entityKey: "entity_delai_reprise_tonte_apres_arrosage" },
  ];
  const zoneItems = card._zoneDebitEntries().map((entry) => {
    const config = card._renderConfigValue(entry.key, "mm/h");
    return { label: entry.label, value: config.value, tone: config.tone, entityKey: entry.key };
  });
  const heightItems = [
    { label: "Hauteur min tondeuse", value: heightMin.value, tone: heightMin.tone, entityKey: "entity_hauteur_min_tondeuse" },
    { label: "Hauteur max tondeuse", value: heightMax.value, tone: heightMax.tone, entityKey: "entity_hauteur_max_tondeuse" },
  ];

  // --- Scène ludique Réglages : l'engrenage ---
  const configScene = renderPlayfulScene({
    variant: "config",
    entityId: moreInfoId(card, "entity_switch_arrosage_automatique"),
    eyebrow: "Réglages",
    title: "Les réglages du jardin",
    sentence: "Touche une tuile pour ouvrir le contrôle dans Home Assistant.",
    pillIcon: "mdi:cog-outline",
    pill: switchState.label || "Réglages",
    mascot: gzGearMascot(),
    tiles: [
      { icon: "mdi:water-pump", label: "Arrosage auto", value: switchState.label || "—", sub: "" },
      { icon: "mdi:robot-mower", label: "Coord. tondeuse", value: mowerCoordinationState.label || "—", sub: "" },
      { icon: "mdi:flower-outline", label: "Mode gazon", value: formatApplicationMode(mode) || "—", sub: "" },
    ],
  });

  return `
      ${configScene}

      <details class="gz-details" open>
        <summary>Tous les réglages</summary>
      <section class="gz2-overview" aria-label="Réglages (détails)">
        ${renderGz2Hero("Réglages", "Autorisations & contrôles", "Touchez une tuile pour ouvrir le contrôle Home Assistant.", { icon: "mdi:cog-outline", tone: "neutral" })}
        <div class="gz2-eyebrow gz2-eyebrow--section">Autorisations & coordination</div>
        <div class="gz2-cards">${renderGz2Cards(card, controlItems)}</div>
        ${zoneItems.length ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Débits des zones</div>
        <div class="gz2-cards">${renderGz2Cards(card, zoneItems)}</div>` : ""}
        <div class="gz2-eyebrow gz2-eyebrow--section">Hauteurs de tondeuse</div>
        <div class="gz2-cards">${renderGz2Cards(card, heightItems)}</div>
      </section>
      </details>
    `;
}

export function renderActiveTab(card) {
  // Isolation par onglet : si le rendu d'un onglet échoue (ex. entité
  // momentanément indisponible), on affiche un repli pour CET onglet au lieu
  // de faire tomber toute la carte. Le reste (header, nav) reste fonctionnel.
  try {
    switch (card._activeTab) {
      case "overview":
        return renderOverviewTab(card);
      case "mowing":
        return renderMowingTab(card);
      case "gazon":
        return renderGazonTab(card);
      case "products":
        return renderProductsTab(card);
      case "intervention":
        return renderInterventionTab(card);
      case "config":
        return renderConfigTab(card);
      case "watering":
      default:
        return renderWateringTab(card);
    }
  } catch (error) {
    console.error("[gazon-intelligent-card] tab render failed", card._activeTab, error);
    return `<section class="gz2-overview" aria-label="Onglet indisponible"><div class="gz2-empty">Cet onglet est momentanément indisponible. Il se rechargera à la prochaine mise à jour.</div></section>`;
  }
}

export function renderDecisionLayout(card) {
  return `
      <section class="tabs-layout">
        ${renderTabNav(card)}
        ${renderActiveTab(card)}
        ${
          card._canShowLegacyDetails()
            ? `<section class="decision-advanced">
                ${card._buildDecisionBlocks()}
                ${card._buildContent()}
                ${card._buildFooter()}
              </section>`
            : ""
        }
      </section>
    `;
}
