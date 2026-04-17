import { ENTITY_KEYS, STATUS_COLORS, STATUS_LABELS, WEATHER_LABELS } from "../constants.js";

export function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

export function isUnavailableState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "" || normalized === "unknown" || normalized === "unavailable" || normalized === "none";
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value, digits = 1) {
  const number = asNumber(value);
  if (number === null) {
    return null;
  }
  const maximumFractionDigits = Math.max(0, Number.isFinite(digits) ? Math.floor(digits) : 0);
  const minimumFractionDigits = Math.min(maximumFractionDigits, Number.isInteger(number) ? 0 : 1);
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(number);
}

export function formatCm(value) {
  const formatted = formatNumber(value, 1);
  return formatted === null ? "—" : `${formatted} cm`;
}

export function formatMm(value) {
  const number = asNumber(value);
  if (number === null) {
    return "—";
  }
  if (number <= 0) {
    return "Non requis";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

export function formatRecommendationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Recommandée";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non requise";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

export function formatAuthorizationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non autorisé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

export function formatStateLabel(value) {
  if (isEmpty(value)) {
    return "Non disponible";
  }
  const normalized = String(value).trim().toLowerCase();
  const labels = typeof STATUS_LABELS !== "undefined" && STATUS_LABELS ? STATUS_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Non disponible";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function formatWeatherConditionLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Météo";
  }
  const labels = typeof WEATHER_LABELS !== "undefined" && WEATHER_LABELS ? WEATHER_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Météo";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function weatherIconForState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "mdi:weather-partly-cloudy";
  }
  if (normalized.includes("lightning")) {
    return "mdi:weather-lightning-rainy";
  }
  if (normalized.includes("pour")) {
    return "mdi:weather-pouring";
  }
  if (normalized.includes("rain")) {
    return "mdi:weather-rainy";
  }
  if (normalized.includes("snow")) {
    return "mdi:weather-snowy";
  }
  if (normalized.includes("fog")) {
    return "mdi:weather-fog";
  }
  if (normalized.includes("wind")) {
    return "mdi:weather-windy";
  }
  if (normalized.includes("cloud")) {
    return normalized.includes("partly") ? "mdi:weather-partly-cloudy" : "mdi:weather-cloudy";
  }
  if (normalized.includes("clear") || normalized.includes("sun")) {
    return "mdi:weather-sunny";
  }
  return "mdi:weather-partly-cloudy";
}

export function weatherToneForState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "neutral";
  }
  if (normalized.includes("lightning") || normalized.includes("pour") || normalized.includes("rain") || normalized.includes("snow")) {
    return "warning";
  }
  if (normalized.includes("sun") || normalized.includes("clear")) {
    return "success";
  }
  return "neutral";
}

export function normalizeDisplayValue(value) {
  if (isUnavailableState(value)) {
    return "Non disponible";
  }
  return String(value);
}

export function computeTonteTone(value) {
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

export function computeRisqueTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("crit")) {
    return "critical";
  }
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

export function computeActionTone(value) {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("crit")) {
    return "critical";
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

export function phaseTone(value) {
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

export function toneToColor(tone) {
  const colors = typeof STATUS_COLORS !== "undefined" && STATUS_COLORS ? STATUS_COLORS : { neutral: "#7a8c9d" };
  return colors[tone] || colors.neutral;
}

export function sectionToAccent(section) {
  return (
    {
      overview: "#58c27d",
      watering: "#31b8d4",
      mowing: "#97c84b",
      details: "#7b8da0",
    }[section] || "#58c27d"
  );
}

export function splitServiceName(service) {
  const parts = String(service ?? "").split(".");
  if (parts.length !== 2) {
    return null;
  }
  return { domain: parts[0], service: parts[1] };
}

export function mergeConfig(base, update) {
  return { ...base, ...update };
}

export function normalizeConfig(config) {
  return { ...config };
}

export function domainMatches(entity, acceptedDomains) {
  if (!acceptedDomains || acceptedDomains.length === 0) {
    return true;
  }
  const domain = String(entity?.entity_id ?? "").split(".")[0];
  return acceptedDomains.includes(domain);
}

export function formatDurationHuman(totalMinutes) {
  const number = asNumber(totalMinutes);
  if (number === null || number <= 0) {
    return "0 min";
  }
  const totalSeconds = Math.max(0, Math.round(number * 60));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${String(seconds).padStart(2, "0")}`;
}

export function humanDateTimeText(value) {
  if (isEmpty(value)) {
    return "";
  }
  const parsed = Date.parse(String(value).trim());
  if (!Number.isFinite(parsed)) {
    return String(value).trim();
  }
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(parsed));
  } catch (_error) {
    return String(value).trim();
  }
}

export function formatPlanType(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized || normalized === "no_plan") {
    return "Aucun plan";
  }
  if (normalized === "single_zone") {
    return "Zone unique";
  }
  if (normalized === "multi_zone") {
    return "Multi-zone";
  }
  return String(value);
}

export function formatApplicationMode(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "auto") {
    return "Auto";
  }
  if (normalized === "manuel" || normalized === "manual") {
    return "Manuel";
  }
  if (normalized === "suggestion") {
    return "Suggestion";
  }
  return formatStateLabel(value);
}

export function formatWateringCauseLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Cause non disponible";
  }
  if (normalized === "post_application") {
    return "Post-produit";
  }
  if (normalized === "hydrique") {
    return "Hydrique";
  }
  return formatStateLabel(value);
}

export function formatWateringTypeLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Non disponible";
  }
  if (normalized === "application_technique_auto") {
    return "Arrosage post-produit auto";
  }
  if (normalized === "application_technique") {
    return "Arrosage post-produit";
  }
  return formatStateLabel(value);
}

export function formatIrrigationSignalLabel({ actionLabel, summary, reasonKind } = {}) {
  const normalizedAction = String(actionLabel ?? "").trim();
  if (normalizedAction) {
    return normalizedAction;
  }
  const normalizedSummary = String(summary ?? "").trim();
  if (normalizedSummary) {
    return normalizedSummary;
  }
  const normalizedReason = String(reasonKind ?? "").trim().toLowerCase();
  if (normalizedReason === "blocked") {
    return "Irrigation bloquée";
  }
  if (normalizedReason === "waiting") {
    return "Attendre";
  }
  if (["post_application", "hydric_need"].includes(normalizedReason)) {
    return "Irrigation prête";
  }
  return "Signal irrigation";
}

export function formatIrrigationSignalTone({ reasonKind, triggerKind } = {}) {
  const normalizedReason = String(reasonKind ?? "").trim().toLowerCase();
  const normalizedTrigger = String(triggerKind ?? "").trim().toLowerCase();
  if (normalizedReason === "blocked") {
    return "danger";
  }
  if (normalizedReason === "waiting") {
    return "warning";
  }
  if (["post_application", "hydric_need"].includes(normalizedReason)) {
    return "success";
  }
  if (["recommended", "ready", "post_application", "hydrique"].includes(normalizedTrigger)) {
    return "success";
  }
  if (normalizedTrigger === "soft") {
    return "warning";
  }
  return "neutral";
}

const MOWER_REASON_LABELS = {
  mower_mowing: "Tondeuse en cours de tonte",
  mowing: "Tondeuse en cours de tonte",
  mower_returning: "Tondeuse en retour station",
  returning: "Tondeuse en retour station",
  mower_not_stowed: "Tondeuse non rangée",
  not_stowed: "Tondeuse non rangée",
  mower_unreliable: "Coordination tondeuse indisponible",
  unreliable: "Coordination tondeuse indisponible",
  ambiguous: "Tondeuse ambiguë: plusieurs robots détectés, configuration requise",
  mower_ambiguous: "Tondeuse ambiguë: plusieurs robots détectés, configuration requise",
  missing: "Tondeuse manquante",
  mower_missing: "Tondeuse manquante",
  configured_missing: "Tondeuse configurée introuvable",
  mower_configured_missing: "Tondeuse configurée introuvable",
  error: "Tondeuse en erreur",
  disconnected: "Tondeuse indisponible",
};

export function formatMowerReasonLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucune contrainte tondeuse";
  }
  if (MOWER_REASON_LABELS[normalized]) {
    return MOWER_REASON_LABELS[normalized];
  }
  return formatStateLabel(value);
}

const MOWING_BLOCK_REASON_LABELS = {
  post_application_active: "Post-produit actif",
  watering_in_progress: "Arrosage en cours",
  watering_cooldown: "Cooldown tonte après arrosage",
};

export function formatMowingBlockReason(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucun blocage";
  }
  if (MOWING_BLOCK_REASON_LABELS[normalized]) {
    return MOWING_BLOCK_REASON_LABELS[normalized];
  }
  return formatStateLabel(value);
}

export function formatStatusLabel(status) {
  return formatStateLabel(status);
}

export function iconForField(field) {
  if (!field) {
    return "mdi:information-outline";
  }
  if (typeof field === "object") {
    if (field.icon) {
      return String(field.icon);
    }
    if (field.key) {
      return iconForField(field.key);
    }
  }
  const key = String(field ?? "").trim();
  if (!key) {
    return "mdi:information-outline";
  }
  const keys = typeof ENTITY_KEYS !== "undefined" && Array.isArray(ENTITY_KEYS) ? ENTITY_KEYS : [];
  const match = keys.find((entry) => entry.key === key);
  return String(match?.icon || "mdi:information-outline");
}

const PRODUCT_USAGE_MODE_LABELS = {
  preventif: "Préventif",
  curatif: "Curatif",
  entretien: "Entretien",
  rattrapage: "Rattrapage",
};

export function formatProductUsageMode(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return PRODUCT_USAGE_MODE_LABELS[normalized] || formatStateLabel(value);
}

export function formatProductAnnualLimit(value) {
  const number = asNumber(value);
  if (number === null || number <= 0) {
    return null;
  }
  const limit = Math.max(1, Math.floor(number));
  return `${limit}/an`;
}

const MONTH_LABELS = {
  1: "Janvier",
  2: "Février",
  3: "Mars",
  4: "Avril",
  5: "Mai",
  6: "Juin",
  7: "Juillet",
  8: "Août",
  9: "Septembre",
  10: "Octobre",
  11: "Novembre",
  12: "Décembre",
};

export function formatMonthLabel(value) {
  const number = asNumber(value);
  if (number === null) {
    return isUnavailableState(value) ? "Non disponible" : String(value ?? "").trim() || "Non disponible";
  }
  const month = Math.trunc(number);
  return MONTH_LABELS[month] || String(month);
}

function renderIconBoxFallback(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "14px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderStatusPillFallback(text, tone = "neutral", icon = null, extraClass = "") {
  const classes = ["gi-pill", "gi-pill--status", `gi-pill--${tone}`];
  if (extraClass) {
    classes.push(extraClass);
  }
  const iconHtml = icon ? `<span class="gi-pill__icon">${renderIconBoxFallback(icon, "pill")}</span>` : "";
  return `
    <div class="${classes.join(" ")}">
      ${iconHtml}
      <div class="gi-pill__content">
        <span class="gi-pill__value">${escapeHtml(text)}</span>
      </div>
    </div>
  `;
}

function monthLabelFallback(value) {
  const number = asNumber(value);
  if (number === null) {
    return isUnavailableState(value) ? "Non disponible" : String(value ?? "").trim() || "Non disponible";
  }
  const month = Math.trunc(number);
  return MONTH_LABELS[month] || String(month);
}

function weatherConditionLabelFallback(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Météo";
  }
  const labels = typeof WEATHER_LABELS !== "undefined" && WEATHER_LABELS ? WEATHER_LABELS : {};
  if (labels[normalized]) {
    return labels[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Météo";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function safeRenderIconBox(icon, size = "md") {
  if (typeof renderIconBox === "function") {
    return renderIconBox(icon, size);
  }
  return renderIconBoxFallback(icon, size);
}

export function safeRenderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  if (typeof renderStatusPill === "function") {
    return renderStatusPill(text, tone, icon, extraClass);
  }
  return renderStatusPillFallback(text, tone, icon, extraClass);
}

export function safeFormatMonthLabel(value) {
  if (typeof formatMonthLabel === "function") {
    return formatMonthLabel(value);
  }
  return monthLabelFallback(value);
}

export function safeFormatWeatherConditionLabel(value) {
  if (typeof formatWeatherConditionLabel === "function") {
    return formatWeatherConditionLabel(value);
  }
  return weatherConditionLabelFallback(value);
}

const INTERVENTION_STATUS_PRESENTATIONS = {
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

export function formatInterventionStatusPresentation(status) {
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
  return { status: normalized || "unavailable", ...INTERVENTION_STATUS_PRESENTATIONS.unavailable };
}

const POST_APPLICATION_STATUS_PRESENTATIONS = {
  autorise: { label: "Autorisé", tone: "success", active: true, kind: "autorise" },
  en_attente: { label: "En attente", tone: "warning", active: false, kind: "en_attente" },
  bloque: { label: "Bloqué", tone: "danger", active: false, kind: "bloque" },
  non_requis: { label: "Non requis", tone: "neutral", active: false, kind: "non_requis" },
  non_autorise: { label: "Non autorisé", tone: "danger", active: false, kind: "non_autorise" },
  indisponible: { label: "Non disponible", tone: "neutral", active: false, kind: "unavailable" },
  non_disponible: { label: "Non disponible", tone: "neutral", active: false, kind: "unavailable" },
};

export function formatPostApplicationStatusPresentation(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  return POST_APPLICATION_STATUS_PRESENTATIONS[normalized] || POST_APPLICATION_STATUS_PRESENTATIONS.indisponible;
}

const WATERING_BLOCK_REASON_LABELS = {
  sol_deja_humide: "Sol déjà humide",
  cooldown_24h: "Délai de 24 h",
  pluie_proche: "Pluie proche",
  pluie_significative: "Pluie significative",
  pluie: "Pluie",
  application: "Bloc application",
  post_application: "Bloc post-application",
  temperature: "Température",
  meteorologie: "Météo",
  meteo: "Météo",
  weather: "Météo",
  mower_mowing: "Tondeuse en cours de tonte",
  mower_returning: "Tondeuse en retour station",
  mower_not_stowed: "Tondeuse non rangée",
  mower_unreliable: "Coordination tondeuse indisponible",
};

export function formatWateringBlockReason(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Blocage";
  }
  if (WATERING_BLOCK_REASON_LABELS[normalized]) {
    return WATERING_BLOCK_REASON_LABELS[normalized];
  }
  const cleaned = normalized.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "Blocage";
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function formatSwitchState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Désactivé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

export function statusTone(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  if (normalized === "bloque") {
    return "danger";
  }
  if (normalized === "en_attente") {
    return "warning";
  }
  if (normalized === "auto") {
    return "success";
  }
  return "neutral";
}
