import { STATUS_COLORS, STATUS_LABELS, WEATHER_LABELS } from "../constants.js";

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
    return "Aucune irrigation nécessaire";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

export function formatRecommendationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Recommandé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non recommandé";
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
  if (STATUS_LABELS[normalized]) {
    return STATUS_LABELS[normalized];
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
  if (WEATHER_LABELS[normalized]) {
    return WEATHER_LABELS[normalized];
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
  return STATUS_COLORS[tone] || STATUS_COLORS.neutral;
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

export function formatStatusLabel(status) {
  return formatStateLabel(status);
}

const INTERVENTION_STATUS_PRESENTATIONS = {
  recommended: {
    title: "Intervention recommandée",
    badge: "Recommandé",
    tone: "success",
    icon: "mdi:spray-bottle",
    summary: "Intervention recommandée",
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
    title: "Intervention à préparer",
    badge: "À préparer",
    tone: "warning",
    icon: "mdi:spray-bottle",
    summary: "Intervention à préparer",
    hint: "La prochaine intervention est disponible, mais pas encore prête.",
    actionLabel: "Préparer",
    selectionSummary: "Produit sélectionné",
    selectionHint: "Le produit sélectionné alimente la déclaration.",
    declarationSummary: "À préparer",
    declarationHint: "La déclaration n’est pas encore prête.",
    historySummary: "Dernière application",
    historyHint: "Historique local des applications enregistrées.",
  },
  ready: {
    title: "Intervention prête",
    badge: "Prêt à déclarer",
    tone: "success",
    icon: "mdi:spray-bottle",
    summary: "Déclaration possible",
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
    title: "Intervention bloquée",
    badge: "Bloqué",
    tone: "danger",
    icon: "mdi:cancel",
    summary: "Intervention bloquée",
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
    title: "Intervention indisponible",
    badge: "Non disponible",
    tone: "neutral",
    icon: "mdi:package-variant-closed",
    summary: "Intervention indisponible",
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
