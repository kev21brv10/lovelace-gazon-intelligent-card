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
  formatRecommendationState,
  formatStatusLabel,
  formatNumber,
  formatDurationHuman,
  isEmpty,
  phaseTone,
} from "../utils/formatters.js";
import { renderIconBox, renderStatusPill } from "./primitives.js";

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
    const summary = String(progressState.summary || "Arrosage en cours").trim();
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
            <div class="tab-panel__eyebrow">Arrosage en cours</div>
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
            <div class="tab-panel__eyebrow">Arrosage en cours</div>
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
            <div class="header__title">${escapeHtml(card._config.title || "Gazon Intelligent")}</div>
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

  return `
      <section class="tab-panel gi-panel tab-panel--overview">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${overviewTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Résumé proposé</div>
            ${renderStatusPill(proposal.title, overviewTone, overviewIcon, `tab-panel__status tab-panel__status--${overviewTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(windowState.summary || planState.summary || "Vue d’ensemble de la carte.")}</div>
          <div class="tab-panel__hero-hint">${escapeHtml("Le résumé s’adapte automatiquement à la situation réelle et remonte les informations utiles en premier.")}</div>
        </div>

        ${renderWateringProgressSection(card, wateringProgress)}

        <div class="tab-panel__grid tab-panel__grid--overview">
          ${facts
            .map((fact) => card._renderLinkedStatCard(fact))
            .join("")}
        </div>

        ${
          `<section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--overview-brief">
            <div class="tab-panel__eyebrow">À retenir</div>
            <div class="tab-panel__section-summary">${escapeHtml(proposal.title)}</div>
            <div class="tab-panel__block-hint">${escapeHtml(proposal.hint)}</div>
          </section>`
        }
      </section>
    `;
}

export function renderWateringTab(card) {
  const windowState = card._windowState();
  const planState = card._planState();
  const objective = windowState.objective;
  const objectiveLabel = formatMm(objective);
  const context = card._objectiveContext();
  const lastWatering = card._lastWateringState();
  const arrosageRecommande = card._entityState("entity_arrosage_recommande", null);
  const afterApplication = card._entityState("entity_arrosage_apres_application_autorise", null);
  const tone = windowState.tone;
  const windowIcon = card._statusIcon(windowState.status);
  const windowStatusIcon = card._config?.show_icons ? windowIcon : null;
  const isBlocked = windowState.isBlocked;
  const isAwaiting = windowState.isAwaiting;
  const noActionText = windowState.isNoActionRequired ? "Aucune irrigation nécessaire" : "";
  const noActionHint = windowState.isNoActionRequired ? windowState.summary || "Le plan actuel ne demande pas d'arrosage." : "";
  const blockText = isBlocked
    ? windowState.summary || "Arrosage bloqué"
    : isAwaiting
      ? windowState.summary || "Arrosage prévu"
      : noActionText;
  const blockHint = isBlocked
    ? windowState.nextAction || ""
    : isAwaiting
      ? windowState.nextAction || "Attendre le créneau prévu"
      : noActionHint;
  const planTypeLabel = formatPlanType(planState.planType);

  const contextPills = [
    card._renderTabPill("Arrosage recommandé", formatRecommendationState(arrosageRecommande), arrosageRecommande === "on" ? "success" : "neutral", "mdi:water-check"),
    card._renderTabPill("Après application", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off"),
    card._renderTabPill("Type", formatStatusLabel(context.typeArrosage), isEmpty(context.typeArrosage) ? "neutral" : "accent", "mdi:sprinkler"),
    card._renderTabPill("Dernier arrosage", lastWatering.label, lastWatering.value !== null ? "success" : "neutral", "mdi:water-check"),
    card._renderTabPill("Risque gazon", context.risk, computeRisqueTone(context.risk), "mdi:shield-alert-outline"),
    card._renderTabPill(
      "Température",
      context.temperature === null ? "Non disponible" : `${formatNumber(context.temperature, 1)} °C`,
      context.temperature !== null && context.temperature >= 24 ? "warning" : "neutral",
      "mdi:thermometer",
    ),
    card._renderTabPill(
      "ETP",
      context.etp === null ? "Non disponible" : `${formatNumber(context.etp, 1)} mm`,
      context.etp !== null && context.etp >= 4 ? "warning" : "neutral",
      "mdi:weather-sunny",
    ),
  ];

  const planChips = [
    card._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
    card._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
    card._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
    card._renderTabPill("Type", planTypeLabel, card._planTypeTone(planState.planType), "mdi:shape"),
    card._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
  ];
  const wateringProgress = card._wateringProgressState();

  return `
      <section class="tab-panel gi-panel tab-panel--watering">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${tone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(windowState.summary || "Arrosage prévu")}</div>
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

        ${renderWateringProgressSection(card, wateringProgress)}

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Résumé du plan</div>
            <div class="tab-panel__section-meta">${escapeHtml(planState.durationHuman)} · ${escapeHtml(planTypeLabel)}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(planState.summary)}</div>
          ${
            card._config?.show_secondary_info
              ? `<div class="tab-panel__chips">${planChips.join("")}</div>`
              : ""
          }
        </section>

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__eyebrow">Contexte</div>
          <div class="tab-panel__grid">
            ${contextPills.join("")}
          </div>
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
  const windowSummary = windowState.entity ? windowState.summary : "Fenêtre optimale non disponible";
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
          ${mowingFacts.map((fact) => card._renderLinkedStatCard(fact)).join("")}
        </div>
      </section>
    `;
}

export function renderConfigTab(card) {
  const switchState = card._configSwitchState();
  const afterApplication = card._entityState("entity_arrosage_apres_application_autorise", null);
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
            <div class="tab-panel__eyebrow">Configuration</div>
            <div class="tab-panel__title">Autorisation, débits et hauteurs</div>
            <div class="tab-panel__header-hint">Touchez une tuile pour ouvrir le contrôle Home Assistant correspondant.</div>
          </div>
          ${renderStatusPill(switchState.label, switchState.tone, switchIcon, "tab-panel__status")}
        </div>

        <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-top">
          ${card._renderConfigActionCard("Arrosage automatique", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
          ${card._renderConfigActionCard("Après application", "entity_arrosage_apres_application_autorise", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off")}
          ${card._renderConfigActionCard("Tonte autorisée", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          ${card._renderConfigActionCard("Mode du gazon", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
          ${card._renderConfigActionCard("Hauteur min tondeuse", "entity_hauteur_min_tondeuse", heightMin.value, heightMin.tone, "mdi:ruler-square")}
          ${card._renderConfigActionCard("Hauteur max tondeuse", "entity_hauteur_max_tondeuse", heightMax.value, heightMax.tone, "mdi:ruler-square")}
        </div>

        <div class="tab-panel__section tab-panel__section--config-quick">
          <div class="tab-panel__section-title">Accès rapide</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${card._renderConfigActionCard("Arrosage auto", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
            ${card._renderConfigActionCard("Mode", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
            ${card._renderConfigActionCard("Après application", "entity_arrosage_apres_application_autorise", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off")}
            ${card._renderConfigActionCard("Tonte", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          </div>
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
                ${renderSectionNav(card)}
                ${card._buildDecisionBlocks()}
                ${card._buildContent()}
                ${card._buildFooter()}
              </section>`
            : ""
        }
      </section>
    `;
}
