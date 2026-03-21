import { escapeHtml, isEmpty } from "../utils/formatters.js";

export function renderIconBox(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "14px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

export function renderPillIcon(icon) {
  if (!icon) {
    return "";
  }
  return `<span class="gi-pill__icon">${renderIconBox(icon, "pill")}</span>`;
}

export function renderPillContent({ label = "", value = "", compact = false }) {
  if (compact) {
    return `<span class="gi-pill__value">${escapeHtml(value)}</span>`;
  }
  return `
    <span class="gi-pill__label">${escapeHtml(label)}</span>
    <span class="gi-pill__value">${escapeHtml(value)}</span>
  `;
}

export function renderPill({
  label = "",
  value = "",
  tone = "neutral",
  icon = null,
  compact = false,
  extraClass = "",
}) {
  const classes = ["gi-pill", compact ? "gi-pill--status" : "gi-pill--context", `gi-pill--${tone}`];
  if (extraClass) {
    classes.push(extraClass);
  }
  return `
    <div class="${classes.join(" ")}">
      ${renderPillIcon(icon)}
      <div class="gi-pill__content">
        ${renderPillContent({ label, value, compact })}
      </div>
    </div>
  `;
}

export function renderCardCore({
  kind,
  label,
  value,
  tone = "neutral",
  icon = null,
  iconSize = "md",
  secondary = "",
  interactive = false,
  style = "",
}) {
  const classes = ["gi-card-core", `gi-card-core--${kind}`];
  if (tone) {
    classes.push(`gi-card-core--${tone}`);
  }
  if (interactive) {
    classes.push("gi-card-core--interactive");
  }
  const iconHtml = icon ? renderIconBox(icon, iconSize) : "";
  const secondaryValue = isEmpty(secondary) ? "&nbsp;" : escapeHtml(secondary);
  const affordanceHtml = interactive
    ? `<div class="gi-card-core__affordance" aria-hidden="true">${renderIconBox("mdi:chevron-right", "sm")}</div>`
    : "";
  return `
    <section class="${classes.join(" ")}"${style ? ` style="${escapeHtml(style)}"` : ""}>
      <div class="gi-card-core__icon ${iconHtml ? "" : "gi-card-core__icon--empty"}">
        ${iconHtml || ""}
      </div>
      <div class="gi-card-core__content">
        <div class="gi-card-core__label">${escapeHtml(label)}</div>
        <div class="gi-card-core__value">${escapeHtml(value)}</div>
        <div class="gi-card-core__secondary ${isEmpty(secondary) ? "gi-card-core__secondary--empty" : ""}">${secondaryValue}</div>
      </div>
      ${affordanceHtml}
    </section>
  `;
}

export function renderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  return renderPill({ value: text, tone, icon, compact: true, extraClass });
}
