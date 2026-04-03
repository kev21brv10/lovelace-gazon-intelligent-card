import { CARD_NAME, CARD_VERSION, SECTION_DEFS, TAB_DEFS } from "../constants.js";
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
  formatRecommendationState,
  formatStatusLabel,
  formatNumber,
  formatDurationHuman,
  formatInterventionStatusPresentation,
  formatWateringBlockReason,
  safeFormatMonthLabel as formatMonthLabel,
  safeRenderIconBox as renderIconBox,
  safeRenderStatusPill as renderStatusPill,
  humanDateTimeText,
  isEmpty,
  isUnavailableState,
  phaseTone,
} from "../utils/formatters.js";

export function renderTabNav(card) {
  return `
      <nav class="gi-tabs tab-nav" aria-label="Domaines de la carte">
        ${TAB_DEFS.map((tab) => {
          const active = tab.key === card._activeTab;
          const iconHtml = card._config?.show_icons ? renderIconBox(tab.icon, "sm") : "";
          return `
            <button
              type="button"
              class="gi-row gi-action tab-nav__item ${active ? "tab-nav__item--active" : ""}"
              data-tab="${escapeHtml(tab.key)}"
              aria-pressed="${active ? "true" : "false"}"
            >
              ${iconHtml}
              <span>${escapeHtml(tab.label)}</span>
            </button>
          `;
        }).join("")}
      </nav>
    `;
}

export function renderSectionNav(card) {
  if (card._isMinimalMode()) {
    return "";
  }
  return `
      <nav class="gi-tabs section-nav" aria-label="Sections de la carte">
        ${SECTION_DEFS.map((section) => {
          const active = section.key === card._activeSection;
          const iconHtml = card._config?.show_icons ? renderIconBox(section.icon, "sm") : "";
          return `
            <button
              type="button"
              class="gi-row gi-action gi-tab section-nav__item ${active ? "section-nav__item--active gi-tab--active" : ""}"
              data-section="${escapeHtml(section.key)}"
              aria-pressed="${active ? "true" : "false"}"
            >
              ${iconHtml}
              <span>${escapeHtml(section.label)}</span>
            </button>
          `;
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
      : debug.status === "possible"
        ? "Produit candidat"
        : "Produit proposé";
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
          <div class="tab-panel__eyebrow">Debug métier</div>
          <div class="tab-panel__section-meta">${escapeHtml(summary)}</div>
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
            <div class="decision-plan__label">Raisons</div>
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
            <div class="decision-plan__label">Manquants</div>
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
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--watering-progress">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Irrigation en cours</div>
            <div class="tab-panel__section-meta">${escapeHtml(`${Math.round(percent)} %`)}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(summary)}</div>
          <div class="tab-progress" aria-label="${escapeHtml(summary)}">
            <div class="tab-progress__bar gi-progress">
              <span class="gi-progress__bar ${progressState.critical ? "gi-progress__bar--critical" : ""}" style="width:${escapeHtml(String(percent))}%;"></span>
            </div>
            <div class="tab-progress__meta">${escapeHtml(metaParts.join(" · ") || "Session active")}</div>
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

function formatDerivedTriggerLabel(triggerKind) {
  const normalized = String(triggerKind ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucun";
  }
  if (normalized === "soft") {
    return "Signal faible";
  }
  if (normalized === "recommended") {
    return "Recommandé";
  }
  if (normalized === "ready") {
    return "Prêt à déclarer";
  }
  if (normalized === "post_application") {
    return "Post-application";
  }
  if (normalized === "hydrique") {
    return "Hydrique";
  }
  return formatStatusLabel(normalized);
}

function getDerivedPertinencePresentation(entity) {
  if (!entity) {
    return null;
  }
  const score = asNumber(entity.attributes?.score);
  const state = String(entity.state ?? "").trim();
  const summary = String(entity.attributes?.summary || "").trim();
  const tone = String(entity.attributes?.tone || "").trim().toLowerCase();
  return {
    label: "Niveau de pertinence",
    value: formatStatusLabel(state),
    tone: tone === "success" || tone === "warning" || tone === "neutral" ? tone : state === "élevé" ? "success" : state === "moyen" ? "warning" : "neutral",
    icon: "mdi:signal",
    secondary: [summary, score !== null ? `Score: ${formatNumber(score, 0)}/100` : ""].filter(Boolean).join(" · "),
  };
}

function getDerivedWindowPresentation(entity) {
  if (!entity) {
    return null;
  }
  const state = String(entity.state ?? "").trim();
  const summary = String(entity.attributes?.summary || "").trim();
  const blockReason = String(entity.attributes?.block_reason || "").trim();
  const blockLabel = String(entity.attributes?.block_label || "").trim();
  const tone = state === "attendre" ? "warning" : ["maintenant", "ce_matin"].includes(state) ? "success" : ["demain_matin", "apres_pluie", "soir"].includes(state) ? "accent" : "neutral";
  return {
    label: "Prochaine fenêtre optimale",
    value: formatStatusLabel(state),
    tone,
    icon: "mdi:clock-outline",
    secondary: [summary, blockLabel || formatStatusLabel(blockReason)].filter(Boolean).join(" · "),
  };
}

function getDerivedBlockPresentation(entity) {
  if (!entity) {
    return null;
  }
  const state = String(entity.state ?? "").trim();
  const summary = String(entity.attributes?.summary || "").trim();
  const blockLabel = String(entity.attributes?.block_label || "").trim();
  const blockReason = String(entity.attributes?.block_reason || "").trim();
  return {
    label: "Prochain blocage attendu",
    value: blockLabel || formatStatusLabel(state),
    tone: state ? "danger" : "neutral",
    icon: "mdi:alert-circle-outline",
    secondary: [summary, blockReason && blockReason !== state ? `Cause: ${formatDerivedTriggerLabel(blockReason)}` : ""].filter(Boolean).join(" · "),
  };
}

function getDerivedSignalPresentation(entity, label, icon = "mdi:information-outline") {
  if (!entity) {
    return null;
  }
  const summary = String(entity.attributes?.summary || "").trim();
  const triggerKind = String(entity.attributes?.trigger_kind || "").trim().toLowerCase();
  const sourceStatus = String(entity.attributes?.source_status || "").trim();
  const state = String(entity.state ?? "").trim().toLowerCase();
  const tone = triggerKind === "soft"
    ? "warning"
    : ["recommended", "ready", "post_application", "hydrique"].includes(triggerKind)
      ? "success"
      : state === "on"
        ? "success"
        : "neutral";
  const secondaryParts = [];
  if (triggerKind) {
    secondaryParts.push(`Déclencheur: ${formatDerivedTriggerLabel(triggerKind)}`);
  }
  if (sourceStatus && sourceStatus !== triggerKind) {
    secondaryParts.push(`Statut source: ${formatStatusLabel(sourceStatus)}`);
  }
  return {
    label,
    value: summary || formatStatusLabel(entity.state),
    tone,
    icon,
    secondary: secondaryParts.join(" · "),
  };
}

export function renderProductSummarySection(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const application = card._applicationEntity();
  const hasProductData = Boolean(
    selection.selectedProductId || selection.selectedProductName || catalogue.hasProducts || application,
  );
  const emptyStateMessage = "Aucune donnée produit disponible";
  const catalogueLabel = catalogue.count === 1 ? "1 produit" : `${catalogue.count || 0} produits`;
  const selectionDetailsParts = [];
  if (selection.selectedProductId) {
    selectionDetailsParts.push(`ID: ${selection.selectedProductId}`);
  }
  if (selection.selectedProductMonthsLabel) {
    selectionDetailsParts.push(`Période: ${selection.selectedProductMonthsLabel}`);
  }
  if (selection.usageModeLabel) {
    selectionDetailsParts.push(`Mode: ${selection.usageModeLabel}`);
  }
  if (selection.maxApplicationsPerYearLabel) {
    selectionDetailsParts.push(`Max/an: ${selection.maxApplicationsPerYearLabel}`);
  }
  const selectionDetails = selectionDetailsParts.join(" · ") || selection.summary || "Sélection active";
  const selectionValue = selection.selectedProductName || (catalogue.hasProducts ? "Sélection à faire" : "Aucun produit");
  const catalogueDetails =
    catalogue.count > 0
      ? catalogue.productNames || catalogue.productIds || "Catalogue local"
      : "Aucun produit enregistré";
  const applicationState = application && !isUnavailableState(application.state) ? formatStatusLabel(application.state) : "Aucune application";
  const applicationWhen = String(application?.attributes?.last_application_when || "").trim()
    || (application?.attributes?.date_action ? humanDateTimeText(application.attributes.date_action) : "")
    || (application?.attributes?.declared_at ? humanDateTimeText(application.attributes.declared_at) : "");
  const applicationSecondaryParts = [];
  if (applicationWhen) {
    applicationSecondaryParts.push(applicationWhen);
  }
  if (application?.attributes?.application_type) {
    applicationSecondaryParts.push(`Type: ${formatStatusLabel(application.attributes.application_type)}`);
  }
  if (application?.attributes?.application_irrigation_mode) {
    applicationSecondaryParts.push(`Mode: ${formatStatusLabel(application.attributes.application_irrigation_mode)}`);
  }
  const applicationSecondary =
    applicationSecondaryParts.join(" · ") || "Dernière application enregistrée";

  if (!hasProductData) {
    return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--products">
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Vue produit</div>
          ${renderStatusPill(emptyStateMessage, "neutral", "mdi:package-variant-closed", "tab-panel__status")}
        </div>
        <div class="tab-panel__section-summary">${escapeHtml(emptyStateMessage)}</div>
      </section>
    `;
  }

  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--products">
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Vue produit</div>
          ${renderStatusPill(catalogue.summary, catalogue.hasProducts ? "success" : "neutral", "mdi:package-variant-closed", "tab-panel__status")}
        </div>
        <div class="tab-panel__grid tab-panel__grid--products">
          ${card._renderStatCard(
            "Produit actif",
            selectionValue,
            selection.selectedProductName ? "accent" : catalogue.hasProducts ? "neutral" : "neutral",
            "mdi:package-variant",
            selectionDetails,
          )}
          ${card._renderStatCard(
            "Catalogue",
            catalogueLabel,
            catalogue.hasProducts ? "success" : "neutral",
            "mdi:package-variant-closed",
            catalogueDetails,
          )}
          ${card._renderStatCard(
            "Dernière intervention",
            applicationState,
            application && !["unknown", "unavailable", "none", "aucune application"].includes(String(application.state || "").trim().toLowerCase()) ? "success" : "neutral",
            "mdi:spray-bottle",
            applicationSecondary,
          )}
        </div>
      </section>
    `;
}

export function renderProductsTab(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const application = card._applicationEntity();
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

  return `
      <section class="tab-panel gi-panel tab-panel--products">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${productsTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Référentiel produit</div>
            ${renderStatusPill(hasProductData ? catalogue.summary : emptyStateMessage, productsTone, "mdi:package-variant-closed", `tab-panel__status tab-panel__status--${productsTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(productsSummary)}</div>
          <div class="tab-panel__hero-hint">${escapeHtml(productsHint || "Le référentiel produit sert de base à la recommandation et à la déclaration.")}</div>
        </div>

        ${renderProductSummarySection(card)}
      </section>
    `;
}

export function renderInterventionTab(card) {
  const recommendation = card._interventionRecommendationState();
  const debug = getDebugInterventionState(card);
  const quickAction = card._selectedProductInterventionState();
  const lastApplication = card._lastApplicationState();
  const productOptions = card._catalogueProductOptions();
  const ui = recommendation.ui || {};
  const selectedProductOptionLabel = quickAction.optionLabel || (productOptions.length === 1 ? productOptions[0].label : "");
  const hasProductOptions = productOptions.length > 0;
  const canDeclare = Boolean(recommendation.readyToDeclare && quickAction.record && !quickAction.disabled);
  const hasSelection = Boolean(quickAction.record && !quickAction.disabled);
  const catalogue = card._catalogueState();
  const hasApplication = Boolean(lastApplication.hasApplication);
  const lastApplicationSummary = hasApplication ? lastApplication.summary : "Aucune application enregistrée.";
  const lastApplicationHint = hasApplication
    ? lastApplication.detail || "Dernière application détectée."
    : "Le bouton restera désactivé tant qu'aucune application n'est présente dans l'historique.";
  const recommendationTone = ui.tone || "neutral";
  const recommendationIcon = ui.icon || "mdi:spray-bottle";
  const selectionMeta = quickAction.record
    ? "Sélection active"
    : hasProductOptions
      ? "Produit à sélectionner"
      : "Aucun produit disponible";
  const declarationMeta = ui.badge || formatStatusLabel(recommendation.status) || "Non disponible";
  const decisionSummary = [selectionMeta, declarationMeta].filter(Boolean).join(" · ");
  const pickerSummary = ui.selectionSummary || (quickAction.record ? "Sélection active." : hasProductOptions ? "Sélectionne un produit dans la liste." : "Aucun produit disponible.");
  const pickerHint = ui.selectionHint || "La sélection met à jour le produit actif.";
  const actionSummary = ui.declarationSummary || "Déclaration indisponible.";
  const actionHint = ui.declarationHint || "La déclaration suit le produit sélectionné.";
  const temperatureConstraint = (Array.isArray(recommendation.constraints)
    ? recommendation.constraints.find((constraint) => constraint?.code === "temperature_range")
    : null);
  const temperatureConstraintState = formatTemperatureRangeConstraint(temperatureConstraint);

  return `
      <section class="tab-panel gi-panel tab-panel--intervention">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${recommendationTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(ui.title || "Non disponible")}</div>
            ${renderStatusPill(ui.badge || "Non disponible", recommendationTone, recommendationIcon, `tab-panel__status tab-panel__status--${recommendationTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(ui.summary || "Non disponible")}</div>
          <div class="tab-panel__hero-hint">${escapeHtml(ui.hint || "Aucune recommandation disponible.")}</div>
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
        </div>

        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--intervention-decision">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Assistant de décision</div>
            <div class="tab-panel__section-meta">${escapeHtml(catalogue.summary || "Catalogue local")}</div>
          </div>
          <div class="tab-panel__decision-strip" aria-hidden="true">
            ${card._renderTabPill("Sélection", selectionMeta, quickAction.record ? "success" : hasProductOptions ? "warning" : "neutral", "mdi:package-variant")}
            ${card._renderTabPill("Déclaration", declarationMeta, canDeclare ? "success" : recommendationTone, recommendationIcon)}
          </div>
          <div class="tab-panel__intervention-layout">
            <div class="tab-panel__intervention-card tab-panel__intervention-card--picker">
              <div class="tab-panel__section-head">
                <div class="tab-panel__eyebrow">Sélection</div>
                <div class="tab-panel__section-meta">${escapeHtml(selectionMeta)}</div>
              </div>
              <label class="tab-panel__field">
                <span class="tab-panel__field-label">Produit à déclarer</span>
                <div class="tab-panel__select-shell">
                  <span class="tab-panel__select-prefix" aria-hidden="true">
                    ${renderIconBox("mdi:package-variant-closed", "sm")}
                  </span>
                  <select
                    class="tab-panel__select"
                    data-gazon-action="select-intervention-product"
                    aria-label="Choisir le produit d'intervention"
                    ${hasProductOptions ? "" : "disabled"}
                  >
                    <option value="">${escapeHtml(hasProductOptions ? "Choisir un produit" : "Aucun produit disponible")}</option>
                    ${productOptions
                      .map(
                        (option) => `
                          <option value="${escapeHtml(option.label)}" ${option.label === selectedProductOptionLabel ? "selected" : ""}>
                            ${escapeHtml(option.label)}
                          </option>
                        `,
                      )
                      .join("")}
                  </select>
                  <span class="tab-panel__select-chevron" aria-hidden="true">${renderIconBox("mdi:chevron-down", "sm")}</span>
                </div>
              </label>
              <div class="tab-panel__section-summary">
                ${escapeHtml(pickerSummary)}
              </div>
              <div class="tab-panel__section-hint">
                ${escapeHtml(pickerHint)}
              </div>
            </div>

            <div class="tab-panel__intervention-card tab-panel__intervention-card--action">
              <div class="tab-panel__section-head">
                <div class="tab-panel__eyebrow">Déclaration</div>
                <div class="tab-panel__section-meta">${escapeHtml(declarationMeta)}</div>
              </div>
              <button
                type="button"
                class="gi-action gi-action--primary tab-panel__cta"
                data-gazon-action="declare-product-intervention"
                ${canDeclare ? "" : "disabled"}
                aria-label="${escapeHtml(ui.actionLabel || "Déclarer l'intervention")}"
              >
                ${renderIconBox("mdi:spray-bottle", "sm")}
                <span>${escapeHtml(ui.actionLabel || "Déclarer")}</span>
              </button>
              <div class="tab-panel__section-summary">
                ${escapeHtml(actionSummary)}
              </div>
              <div class="tab-panel__section-hint">
                ${escapeHtml(actionHint)}
              </div>
            </div>
          </div>
        </section>

        <details class="tab-panel__debug-foldout">
          <summary class="tab-panel__debug-foldout-summary">
            <span class="tab-panel__eyebrow">Debug métier</span>
            <span class="tab-panel__debug-foldout-meta">${escapeHtml(debug ? `Score ${formatNumber(debug.score ?? 0, 0)} · ${debug.statusLabel || debug.summary || "Analyse moteur"}` : decisionSummary || "Analyse moteur")}</span>
          </summary>
          ${renderDebugInterventionSection(card, debug, false)}
        </details>

        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--application-history">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Dernière application</div>
            <div class="tab-panel__section-meta">${escapeHtml(ui.historySummary || (hasApplication ? "Peut être supprimée" : "Aucune action possible"))}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(lastApplicationSummary)}</div>
          <div class="tab-panel__section-hint">${escapeHtml(ui.historyHint || lastApplicationHint)}</div>
          <button
            type="button"
            class="gi-action gi-action--danger tab-panel__cta"
            data-gazon-action="remove-last-application"
            ${hasApplication ? "" : "disabled"}
            aria-label="Supprimer la dernière application"
          >
            ${renderIconBox("mdi:delete-outline", "sm")}
            <span>Supprimer la dernière application</span>
          </button>
        </section>
      </section>
    `;
}

export function renderHeader(card) {
  if (!card._config?.show_header) {
    return "";
  }
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const weather = card._weatherState();
  const manualActionLabel = card._manualActionLabel();
  const tone = card._cardTone();
  return `
      <header class="gi-row header">
        <div class="gi-row header__title-wrap">
          <div class="header__icon header__icon--${tone}">
            ${card._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}
          </div>
          <div class="header__titles">
            <div class="header__title-row">
              <div class="header__title">${escapeHtml(card._config.title || "Gazon Intelligent")}</div>
              <div class="header__badge">
                ${renderStatusPill(`Version ${CARD_VERSION}`, "neutral", "mdi:tag", "header__badge-pill")}
              </div>
            </div>
            <div class="header__subtitle">
              ${phase ? escapeHtml(phase) : "Phase non disponible"}
              ${subPhase ? ` · ${escapeHtml(subPhase)}` : ""}
            </div>
          </div>
        </div>
        <div class="header__meta">
          ${
            weather
              ? `${renderStatusPill(weather.summary, "neutral", weather.icon, "header__weather")}`
              : ""
          }
          <button
            type="button"
            class="header__action gi-action"
            data-gazon-action="manual-irrigation"
            style="${card._manualActionStyle()}"
            aria-label="${escapeHtml(manualActionLabel)}"
          >
            ${card._config?.show_icons ? renderIconBox("mdi:water-pump", "sm") : ""}
            <span>${escapeHtml(manualActionLabel)}</span>
          </button>
        </div>

      </header>
    `;
}

export function renderOverviewTab(card) {
  const windowState = card._windowState();
  const planState = card._planState();
  const proposal = card._overviewProposal();
  const overviewTone = proposal.tone;
  const overviewIcon = card._config?.show_icons ? proposal.icon : null;
  const facts = card._overviewFacts();
  const wateringProgress = card._wateringProgressState();
  const derivedFacts = [
    { key: "entity_niveau_pertinence", fact: getDerivedPertinencePresentation(card._entity("entity_niveau_pertinence")) },
    { key: "entity_prochaine_fenetre_optimale", fact: getDerivedWindowPresentation(card._entity("entity_prochaine_fenetre_optimale")) },
    { key: "entity_prochain_blocage_attendu", fact: getDerivedBlockPresentation(card._entity("entity_prochain_blocage_attendu")) },
  ].filter(({ fact }) => Boolean(fact));

  return `
      <section class="tab-panel gi-panel tab-panel--overview">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${overviewTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Synthèse recommandée</div>
            ${renderStatusPill(proposal.title, overviewTone, overviewIcon, `tab-panel__status tab-panel__status--${overviewTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(windowState.displaySummary || windowState.summary || planState.summary || "Vue d’ensemble de la carte.")}</div>
          <div class="tab-panel__hero-hint">${escapeHtml("Le résumé s’adapte automatiquement à la situation réelle et remonte les informations utiles en premier.")}</div>
        </div>

        ${renderWateringProgressSection(card, wateringProgress)}

        <div class="tab-panel__grid tab-panel__grid--overview">
          ${facts
            .map((fact) => card._renderLinkedStatCard(fact))
            .join("")}
        </div>

        ${
          derivedFacts.length
            ? `
              <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--derived-insights">
                <div class="tab-panel__section-head">
                  <div class="tab-panel__eyebrow">Lecture dérivée</div>
                  <div class="tab-panel__section-meta">Raccourci lisible</div>
                </div>
                <div class="tab-panel__grid">
                  ${derivedFacts
                    .map(({ key, fact }) =>
                      card._renderLinkedStatCard({
                        label: fact.label,
                        value: fact.value,
                        tone: fact.tone,
                        icon: fact.icon,
                        secondary: fact.secondary,
                        entityKey: key,
                      }),
                    )
                    .join("")}
                </div>
              </section>
            `
            : ""
        }

      </section>
    `;
}

export function renderWateringTab(card) {
  const windowState = card._windowState();
  const nextActionText = windowState.displayNextAction || windowState.nextActionDisplay || windowState.nextAction;
  const planState = card._planState();
  const objective = windowState.objective;
  const objectiveLabel = formatMm(objective);
  const tone = windowState.tone;
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
      : noActionHint;
  const planTypeLabel = formatPlanType(planState.planType);

  const planChips = [
    card._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
    card._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
    card._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
    card._renderTabPill("Type de plan", planTypeLabel, card._planTypeTone(planState.planType), "mdi:shape"),
    card._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
  ];
  const wateringProgress = card._wateringProgressState();

  return `
      <section class="tab-panel gi-panel tab-panel--watering">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${tone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(windowState.displaySummary || windowState.summary || "Irrigation")}</div>
            ${renderStatusPill(windowState.statusLabel, tone, windowStatusIcon, `tab-panel__hero-status tab-panel__hero-status--${tone}`)}
          </div>
          ${
            nextActionText
              ? `<div class="tab-panel__hero-next">${escapeHtml(nextActionText)}</div>`
              : ""
          }
          ${
            isBlocked && blockHint
              ? `<div class="tab-panel__hero-hint">${escapeHtml(blockHint)}</div>`
              : ""
          }
        </div>

        ${renderWateringProgressSection(card, wateringProgress)}

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Plan d'irrigation</div>
            <div class="tab-panel__section-meta">${escapeHtml(planState.durationHuman)} · ${escapeHtml(planTypeLabel)}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(planState.summary)}</div>
          ${
            card._config?.show_secondary_info
              ? `<div class="tab-panel__chips">${planChips.join("")}</div>`
              : ""
          }
        </section>
      </section>
    `;
}

export function renderGazonTab(card) {
  const phase = card._entityState("entity_phase", null);
  const subPhase = card._entityState("entity_sous_phase", null);
  const risk = card._entityState("entity_risque", null);
  const action = card._entityState("entity_niveau", null);
  const progress = asNumber(card._entity("entity_sous_phase")?.attributes?.sous_phase_progression);
  const progressDetail = card._entity("entity_sous_phase")?.attributes?.sous_phase_detail || "";
  const progressLabel = progress === null ? "Progression non disponible" : `${formatNumber(progress, 0)} %`;
  const progressWidth = progress === null ? 0 : Math.max(0, Math.min(100, progress));
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
          ${gazonFacts.map((fact) => card._renderLinkedStatCard(fact)).join("")}
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

export function renderMowingTab(card) {
  const tonte = card._entity("entity_tonte");
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const height = card._entity("entity_hauteur");
  const windowState = card._windowState();
  const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
  const heightValue = height ? formatCm(height.state) : "Non disponible";
  const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
  const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
  const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
  const windowSummary = windowState.entity ? windowState.displaySummary || windowState.summary : "Fenêtre optimale non disponible";
  const mowingStatusIcon = card._config?.show_icons ? "mdi:content-cut" : null;
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
      tone: card._phaseTone(),
      icon: "mdi:ruler-square",
      secondary: heightSecondary,
      entityKey: "entity_hauteur",
    },
      {
        label: "Fenêtre optimale",
        value: windowSummary,
        tone: windowState.tone,
        icon: "mdi:clock-outline",
        secondary: windowState.nextActionDisplay || windowState.nextAction || "",
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
          ${mowingFacts.map((fact) => card._renderLinkedStatCard(fact)).join("")}
        </div>
      </section>
    `;
}

export function renderConfigTab(card) {
  const switchState = card._configSwitchState();
  const afterApplication = card._entity("entity_arrosage_apres_application_autorise");
  const afterApplicationInfo = card._postApplicationState(afterApplication);
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const mode = card._entityState("entity_mode", null);
  const modeTone = phaseTone(mode);
  const switchIcon = card._config?.show_icons ? "mdi:switch" : null;
  const zoneCards = card._zoneDebitEntries()
    .map((entry) => {
      const config = card._renderConfigValue(entry.key, "mm/h");
      return card._renderConfigActionCard(entry.label, entry.key, config.value, config.tone, "mdi:sprinkler");
    })
    .join("");
  const heightMin = card._renderConfigValue("entity_hauteur_min_tondeuse", "cm");
  const heightMax = card._renderConfigValue("entity_hauteur_max_tondeuse", "cm");

  return `
      <section class="tab-panel gi-panel tab-panel--config">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Réglages</div>
            <div class="tab-panel__title">Autorisations, débits et hauteurs</div>
            <div class="tab-panel__header-hint">Touchez une tuile pour ouvrir le contrôle Home Assistant correspondant.</div>
          </div>
          ${renderStatusPill(switchState.label, switchState.tone, switchIcon, "tab-panel__status")}
        </div>

        <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-top">
          ${card._renderConfigActionCard("Irrigation automatique", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
          ${card._renderConfigActionCard("Post-application", "entity_arrosage_apres_application_autorise", afterApplicationInfo.label, afterApplicationInfo.tone, "mdi:water-off")}
          ${card._renderConfigActionCard("Tonte autorisée", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          ${card._renderConfigActionCard("Mode du gazon", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
        </div>

        <div class="tab-panel__section tab-panel__section--config-debits">
          <div class="tab-panel__section-title">Débits des zones</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${zoneCards || `<div class="tab-panel__empty">Débits non configurés.</div>`}
          </div>
          <div class="tab-panel__section-title">Hauteurs de tondeuse</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${card._renderConfigActionCard("Hauteur min tondeuse", "entity_hauteur_min_tondeuse", heightMin.value, heightMin.tone, "mdi:ruler-square")}
            ${card._renderConfigActionCard("Hauteur max tondeuse", "entity_hauteur_max_tondeuse", heightMax.value, heightMax.tone, "mdi:ruler-square")}
          </div>
        </div>
      </section>
    `;
}

export function renderActiveTab(card) {
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
