import { SECTION_DEFS, TAB_DEFS } from "../constants.js";
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
  formatRecommendationState,
  formatIrrigationSignalLabel,
  formatStatusLabel,
  formatNumber,
  formatDurationHuman,
  formatInterventionStatusPresentation,
  formatWateringCauseLabel,
  formatWateringBlockReason,
  formatWateringTypeLabel,
  compactDecisionText,
  safeFormatMonthLabel as formatMonthLabel,
  safeRenderIconBox as renderIconBox,
  safeRenderStatusPill as renderStatusPill,
  humanDateTimeText,
  isEmpty,
  isUnavailableState,
  phaseTone,
  formatHydricUxState,
} from "../utils/formatters.js";

function renderGz2Hero(eyebrow, title, sub = "") {
  return `
        <div class="gz2-hero">
          <div class="gz2-eyebrow">${escapeHtml(eyebrow)}</div>
          <div class="gz2-hero__title">${escapeHtml(title)}</div>
          ${sub ? `<div class="gz2-hero__sub">${escapeHtml(sub)}</div>` : ""}
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

function renderCompactSummaryList(items, emptyText = "Aucune information supplémentaire.") {
  const rows = Array.isArray(items)
    ? items.filter(Boolean).map((item) => {
        if (typeof item === "string") {
          return { label: "", value: item, note: "", tone: "neutral", entityKey: null };
        }
        if (!item || typeof item !== "object") {
          return null;
        }
        return {
          label: String(item.label || "").trim(),
          value: String(item.value || "").trim(),
          note: String(item.note || "").trim(),
          tone: String(item.tone || "neutral").trim().toLowerCase() || "neutral",
          entityKey: String(item.entityKey || "").trim() || null,
        };
      }).filter(Boolean)
    : [];
  if (!rows.length) {
    return `<div class="tab-panel__empty">${escapeHtml(emptyText)}</div>`;
  }
  return `
    <div class="tab-panel__summary-list">
      ${rows
        .map(
          (row) => `
            ${
              row.entityKey
                ? `
                  <button
                    type="button"
                    class="tab-panel__summary-row tab-panel__summary-row--action tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}"
                    data-more-info-entity="${escapeHtml(row.entityKey)}"
                    aria-label="${escapeHtml(row.label ? `Ouvrir ${row.label}` : row.value || "Ouvrir le détail")}"
                  >
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </button>
                `
                : `
                  <div class="tab-panel__summary-row tab-panel__summary-row--${escapeHtml(row.tone || "neutral")}">
                    ${row.label ? `<div class="tab-panel__summary-label">${escapeHtml(row.label)}</div>` : ""}
                    <div class="tab-panel__summary-value">${escapeHtml(row.value || "Non disponible")}</div>
                    ${row.note ? `<div class="tab-panel__summary-note">${escapeHtml(row.note)}</div>` : ""}
                  </div>
                `
            }
          `,
        )
        .join("")}
    </div>
  `;
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

function renderApplicationHistoryItems(items) {
  const rows = buildApplicationHistoryRows(items);
  if (!rows.length) {
    return `<div class="tab-panel__empty">Aucune application enregistrée dans l’historique local.</div>`;
  }
  return renderCompactSummaryList(rows, "Aucune application enregistrée dans l’historique local.");
}

function renderApplicationHistoryPreview(items, limit = 2) {
  const rows = buildApplicationHistoryRows(items).slice(0, Math.max(0, limit));
  if (!rows.length) {
    return "";
  }
  return `
    <div class="tab-panel__history-foldout-preview">
      ${renderCompactSummaryList(rows, "Aucune application enregistrée dans l’historique local.")}
    </div>
  `;
}

function renderApplicationHistoryFoldout(items) {
  const history = Array.isArray(items) ? items.filter((item) => item && typeof item === "object") : [];
  if (!history.length) {
    return "";
  }
  const countLabel = history.length > 1 ? `${history.length} applications enregistrées` : "1 application enregistrée";
  const rows = buildApplicationHistoryRows(history);
  return `
      <section class="tab-panel__history-rail gi-info gi-info--secondary">
        <div class="tab-panel__section-head tab-panel__history-foldout-head">
          <div class="tab-panel__eyebrow">Historique complet</div>
          <div class="tab-panel__section-meta">${escapeHtml(countLabel)}</div>
        </div>
        <div class="tab-panel__section-hint">Défilement vertical, de la plus récente à la plus ancienne.</div>
        <div class="tab-panel__history-rail-body">
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
      </section>
    `;
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

  return `
      <section class="gz2-overview" aria-label="Produits">
        ${renderGz2Hero("Référentiel produit", productsSummary, productsHint)}
        <div class="gz2-eyebrow gz2-eyebrow--section">Catalogue</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(catalogue.summary || "Catalogue local")}</div>
        ${renderCatalogueProductCards(card)}
        <div class="gz2-eyebrow gz2-eyebrow--section">Dernière application</div>
        <div class="gz2-card__sub" style="margin:0 0 12px;">${escapeHtml(hasApplication ? lastApplicationSummary : lastApplicationHint)}</div>
        ${renderApplicationHistoryInline(applicationHistory)}
      </section>
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

  return `
      <section class="gz2-overview" aria-label="Intervention">
        ${renderGz2Hero(ui.title || "Intervention", ui.summary || "Non disponible", ui.hint || "")}
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
                : `${declarationMeta} · Analyse moteur`,
            )}</span>
          </summary>
          ${renderDebugInterventionSection(card, debug, false)}
        </details>
      </section>
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
    { label: "Fenêtre", value: windowState.statusLabel },
    { label: "Prochain arrosage", value: nextWatering.label },
    { label: "Prochaine tonte", value: nextMowing.label },
    { label: "Dernier arrosage", value: lastWatering.label },
  ];

  return `
      <section class="gz2-overview" aria-label="Synthèse">
        <div class="gz2-hero">
          <div class="gz2-eyebrow">Conseil du jour</div>
          <div class="gz2-hero__title">${escapeHtml(titleText)}</div>
          ${heroSub ? `<div class="gz2-hero__sub">${escapeHtml(heroSub)}</div>` : ""}
        </div>

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => `
            <div class="gz2-rep">
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
            </div>
          `).join("")}
        </div>

        <div class="gz2-eyebrow">Essentiel</div>
        <div class="gz2-cards">
          ${facts.map((f) => {
            const eid = card._entityId(f.entityKey);
            const vTone = ["success", "warning", "danger", "critical"].includes(f.tone) ? ` gz2-card__value--${f.tone}` : "";
            return `
              <button type="button" class="gz2-card"${eid ? ` data-more-info-entity="${escapeHtml(eid)}"` : ""}>
                <div class="gz2-card__label">${escapeHtml(f.label)}</div>
                <div class="gz2-card__value${vTone}">${escapeHtml(f.value)}</div>
                ${f.secondary ? `<div class="gz2-card__sub">${escapeHtml(f.secondary)}</div>` : ""}
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
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
    {
      label: "Type",
      value: wateringTypeLabel,
      secondary: planState.summary || "",
      tone: isEmpty(irrigationSignal.typeArrosage || context.typeArrosage) ? "neutral" : "accent",
      icon: "mdi:water-sync",
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
    {
      label: "Prochain arrosage",
      value: nextWatering.label,
      secondary: nextWatering.detail,
      tone: nextWatering.tone,
      icon: "mdi:clock-water-outline",
    },
    {
      label: "Dernier arrosage",
      value: lastWatering.label,
      secondary: lastWatering.detail,
      tone: lastWatering.value !== null ? "success" : "neutral",
      icon: "mdi:water-check",
    },
    lastWateringTotal.value !== null ? {
      label: "Arrosage cumulé",
      value: lastWateringTotal.label,
      secondary: lastWateringTotal.detail,
      tone: "neutral",
      icon: "mdi:water-sync",
    } : null,
  ].filter(Boolean);

  const reperes = [
    { label: "Objectif", value: objectiveLabel },
    { label: "Type", value: wateringTypeLabel },
    { label: "Prochain arrosage", value: nextWatering.label },
    { label: "Dernier arrosage", value: lastWatering.label },
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

  return `
      <section class="gz2-overview" aria-label="Irrigation">
        <div class="gz2-hero">
          <div class="gz2-eyebrow">Décision eau</div>
          <div class="gz2-hero__title">${escapeHtml(heroTitle)}</div>
          ${heroSub ? `<div class="gz2-hero__sub">${escapeHtml(heroSub)}</div>` : ""}
        </div>

        ${blockageHtml}

        ${renderWateringProgressSection(card, wateringProgress)}

        <div class="gz2-reperes" aria-label="Repères">
          ${reperes.map((r) => `
            <div class="gz2-rep">
              <div class="gz2-rep__label">${escapeHtml(r.label)}</div>
              <div class="gz2-rep__value">${escapeHtml(r.value || "—")}</div>
            </div>
          `).join("")}
        </div>

        ${
          card._config?.show_secondary_info
            ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Réserve hydrique</div>
        <div class="gz2-meter">
          <div class="gz2-meter__top">
            <div class="gz2-meter__value">${escapeHtml(reserveTotalValue)}</div>
            <div class="gz2-meter__badge">${escapeHtml(hydricUx.label)}</div>
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

  return `
      <section class="gz2-overview" aria-label="Gazon">
        ${renderGz2Hero("Gazon", formatStatusLabel(phase) || "Gazon", gazonHint)}
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
      label: "Machine",
      value: !mowerState.present
        ? "Absente"
        : coordinationDisabled
        ? "Coordination désactivée"
        : machinePermetTonte
        ? "Prête"
        : "Indisponible",
      // Note vide quand la coordination est désactivée : la valeur le dit déjà.
      note: !mowerState.present ? "Tondeuse non disponible" : coordinationDisabled ? "" : mowerState.reason || "",
      tone: !mowerState.present ? "neutral" : coordinationDisabled ? "neutral" : machinePermetTonte ? "success" : "danger",
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

  return `
      <section class="gz2-overview" aria-label="Tonte">
        ${renderGz2Hero("Tonte", tonteValue, mowingDecisionSummary)}
        <div class="gz2-chips">${renderGz2Chips(mowingDecisionPills)}</div>
        <div class="gz2-eyebrow gz2-eyebrow--section">Lecture rapide</div>
        <div class="gz2-cards">${renderGz2Cards(card, mowingCards)}</div>
      </section>
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

  return `
      <section class="gz2-overview" aria-label="Réglages">
        ${renderGz2Hero("Réglages", "Autorisations & contrôles", "Touchez une tuile pour ouvrir le contrôle Home Assistant.")}
        <div class="gz2-eyebrow gz2-eyebrow--section">Autorisations & coordination</div>
        <div class="gz2-cards">${renderGz2Cards(card, controlItems)}</div>
        ${zoneItems.length ? `
        <div class="gz2-eyebrow gz2-eyebrow--section">Débits des zones</div>
        <div class="gz2-cards">${renderGz2Cards(card, zoneItems)}</div>` : ""}
        <div class="gz2-eyebrow gz2-eyebrow--section">Hauteurs de tondeuse</div>
        <div class="gz2-cards">${renderGz2Cards(card, heightItems)}</div>
      </section>
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
