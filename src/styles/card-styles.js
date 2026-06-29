export const CARD_STYLES = String.raw`
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          --gi-font-xxs: clamp(0.64rem, 0.60rem + 0.12vw, 0.72rem);
          --gi-font-xs: clamp(0.72rem, 0.68rem + 0.16vw, 0.80rem);
          --gi-font-sm: clamp(0.80rem, 0.76rem + 0.18vw, 0.92rem);
          --gi-font-md: clamp(0.92rem, 0.86rem + 0.22vw, 1.04rem);
          --gi-font-lg: clamp(1.06rem, 0.98rem + 0.32vw, 1.20rem);
          --gi-font-xl: clamp(1.14rem, 1.02rem + 0.44vw, 1.36rem);
          --gi-font-2xl: clamp(1.34rem, 1.18rem + 0.62vw, 1.62rem);
          --gi-label-size: var(--gi-font-xxs);
          --gi-label-spacing: 0.08em;
          --gi-body-line: 1.34;
          --gi-tight-line: 1.18;
          --gi-motion-fast: 180ms;
          --gi-motion-medium: 260ms;
          --gi-ease-standard: cubic-bezier(0.2, 0, 0, 1);
          --gi-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
          --gi-header-direction: row;
          --gi-header-align: center;
          --gi-header-justify: space-between;
          --gi-header-gap: 10px;
          --gi-header-margin-bottom: 10px;
          --gi-hero-margin: 4px 0 10px;
          --gi-hero-gap: 12px;
          --gi-hero-lead-padding: 16px 18px;
          --gi-hero-lead-gap: 12px;
          --gi-hero-metrics-gap: 10px;
          --gi-inline-direction: row;
          --gi-inline-align: center;
          --gi-inline-justify: space-between;
          --gi-inline-gap: 10px;
          --gi-nav-gap: 8px;
          --gi-nav-margin: 6px 0 10px;
          --gi-nav-item-gap: 7px;
          --gi-nav-item-padding: 9px 13px;
          --gi-grid-template: repeat(2, minmax(0, 1fr));
          --gi-grid-gap: 10px;
          --gi-action-direction: row;
          --gi-action-justify: flex-start;
          --gi-action-width: 100%;
          --gi-action-padding-inline: 18px;
          --gi-action-padding-inline-end: 22px;
          --gi-action-padding-block: 15px;
          --gi-action-min-height: 78px;
          --gi-action-gap: 12px;
          --gi-action-radius: 22px;
          --gi-action-icon-size: 26px;
          --gi-action-icon-glyph-size: 16px;
          --gi-action-icon-bg: rgba(255, 255, 255, 0.2);
          --gi-decision-grid-gap: 10px;
          --gi-tiles-gap: 6px;
          --gi-card-core-gap: 12px;
          --gi-card-core-padding: 13px 15px;
          --gi-card-core-min-height: 82px;
          --gi-card-core-radius: 24px;
          --gi-card-core-icon-size: 22px;
          --gi-card-core-icon-glyph-size: 13px;
          --gi-card-core-secondary-size: 0.74rem;
          /* ── Design tokens v2 (modernisation : à plat, 1 accent, plus d'air) ── */
          /* Échelle d'espacement, base 4px */
          --gi-space-1: 4px;
          --gi-space-2: 8px;
          --gi-space-3: 12px;
          --gi-space-4: 16px;
          --gi-space-5: 24px;
          --gi-space-6: 32px;
          /* Rayons normalisés */
          --gi-radius-sm: 10px;
          --gi-radius-md: 14px;
          --gi-radius-lg: 18px;
          /* Poids typographiques (deux seulement) */
          --gi-weight-regular: 400;
          --gi-weight-medium: 500;
          /* Accent unique, surchargeable (config accent_color → --gazon-brand-accent) */
          --gi-accent: var(--gazon-brand-accent, var(--gazon-section-accent, #58c27d));
          --gi-accent-text: var(--gi-accent);
          --gi-accent-soft: color-mix(in srgb, var(--gi-accent) 14%, transparent);
          /* Surfaces neutres branchées sur le thème HA (clair/sombre automatique) */
          --gi-bg: var(--ha-card-background, var(--card-background-color, var(--secondary-background-color)));
          --gi-surface: color-mix(in srgb, var(--primary-text-color) 4%, var(--gi-bg));
          --gi-surface-2: color-mix(in srgb, var(--primary-text-color) 8%, var(--gi-bg));
          --gi-border: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
          --gi-border-strong: color-mix(in srgb, var(--primary-text-color) 22%, transparent);
          /* Texte : alias du thème HA */
          --gi-text: var(--primary-text-color);
          --gi-text-muted: var(--secondary-text-color);
          --gi-text-faint: color-mix(in srgb, var(--secondary-text-color) 70%, transparent);
          /* Statuts : la couleur ne porte que le sens */
          --gi-status-success: var(--success-color, #4caf50);
          --gi-status-warning: var(--warning-color, #ff9800);
          --gi-status-danger: var(--error-color, #f44336);
          --gi-status-neutral: var(--secondary-text-color);
          /* Élévation : une seule ombre douce */
          --gi-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 1px rgba(0, 0, 0, 0.04);
          /* ── Tokens hérités, ré-câblés à plat sur la base v2 ── */
          --gi-surface-border: var(--gi-border);
          --gi-surface-border-strong: var(--gi-border-strong);
          --gi-surface-fill: var(--gi-surface);
          --gi-surface-fill-accent: var(--gi-surface-2);
          --gi-surface-shadow: var(--gi-shadow-sm);
          --gi-surface-shadow-strong: var(--gi-shadow-sm);
          --gi-tab-accent: var(--gazon-section-accent);
          --gi-tab-companion: var(--gazon-water-color, #5f97a3);
          --gi-tab-glow-color: var(--gazon-section-accent);
          --gi-tab-mist-color: var(--gazon-lawn-color, #8aa06d);
          --gi-tab-shadow: 0 14px 28px color-mix(in srgb, var(--gi-tab-glow-color) 14%, transparent);
        }

        @keyframes gazonPulseSoft {
          0% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
          70% {
            box-shadow: 0 0 0 10px color-mix(in srgb, var(--gazon-card-accent) 0%, transparent);
          }
          100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--gazon-card-accent) 0%, transparent);
          }
        }

        @keyframes gi-fade-up {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gi-card-ambient {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.72;
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.04);
            opacity: 0.92;
          }
        }

        @keyframes gi-panel-reveal {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.988);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tabs-layout {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 10px;
        }

        .gi-card,
        .gi-progress__bar {
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            opacity var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard),
            filter var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .gi-icon {
          display: grid;
          place-items: center;
          width: 20px;
          height: 20px;
          flex: none;
          flex-shrink: 0;
          line-height: 1;
          overflow: visible;
          --mdc-icon-size: 16px;
        }

        .gi-icon--sm {
          width: 18px;
          height: 18px;
          --mdc-icon-size: 13px;
        }

        .gi-icon--pill {
          width: 14px;
          height: 14px;
          --mdc-icon-size: 14px;
        }

        .gi-icon ha-icon {
          display: block;
          width: 16px;
          height: 16px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
        }

        .gi-icon--sm ha-icon {
          display: block;
          width: 13px;
          height: 13px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
        }

        .gi-icon--pill ha-icon {
          display: block;
          width: 14px;
          height: 14px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
          transform: none;
        }

        .gi-tab .gi-icon,
        .tab-nav__item .gi-icon,
        .section-nav__item .gi-icon {
          width: 18px;
          height: 18px;
        }

        /* Onglets « ludiques » — pastilles douces vertes{
          gap: 8px;
          border-bottom: none;
          padding: 6px;
          padding-bottom: 6px;
          margin: 2px 0 18px;
          align-items: center;
          background: #EAF6EF;
          border: 1px solid #D7EEE0;
          border-radius: 999px;
        }

        .tab-nav .tab-nav__item .gi-icon {
          display: none;
        }

        .tab-panel > * {
          animation: gi-panel-reveal 420ms var(--gi-ease-soft) both;
        }

        .tab-panel > *:nth-child(1) { animation-delay: 0ms; }
        .tab-panel > *:nth-child(2) { animation-delay: 40ms; }
        .tab-panel > *:nth-child(3) { animation-delay: 80ms; }
        .tab-panel > *:nth-child(4) { animation-delay: 120ms; }
        .tab-panel > *:nth-child(5) { animation-delay: 160ms; }
        .tab-panel__section{
          display: flex;
          flex-direction: column;
          border: 1px solid var(--gi-surface-border);
          border-radius: 24px;
          background: var(--gi-surface-fill);
          padding: 20px 22px;
          box-shadow: none;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .tab-panel__section-head {
          display: flex;
          flex-direction: var(--gi-inline-direction);
          align-items: var(--gi-inline-align);
          justify-content: var(--gi-inline-justify);
          gap: var(--gi-inline-gap);
          min-width: 0;
          padding-bottom: 4px;
          margin-bottom: 2px;
          border-bottom: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          position: relative;
        }
        .tab-panel__section-head::before {
          content: "";
          position: absolute;
          inset-inline-start: 0;
          inset-block-start: -1px;
          width: 42px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--gi-tab-companion), var(--gi-tab-mist-color), var(--gi-tab-accent));
          opacity: 0.92;
          pointer-events: none;
        }
        .tab-panel__section-summary{
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .tab-panel__section-meta,
        .tab-panel__eyebrow,
        .tab-panel__empty {
          color: var(--secondary-text-color);
        }
        .tab-panel__empty {
          font-size: var(--gi-font-sm);
          line-height: var(--gi-body-line);
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-color: var(--gi-surface-border);
        }

        .tab-panel--overview .tab-panel__summary-row {
          padding: 12px 12px 13px;
          border: 1px solid var(--gi-border);
          border-radius: 18px;
          background: var(--gi-surface);
          box-shadow: none;
        }

        .tab-panel--overview .tab-panel__summary-row--action:hover {
          background: var(--gi-surface-2);
          border-color: var(--gi-border-strong);
        }

        .tab-panel--overview .tab-panel__summary-row--action:focus-visible {
          border-color: color-mix(in srgb, var(--gi-surface-border) 86%, transparent);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
        }

        .tab-panel--overview .tab-panel__summary-row:first-child {
          padding-top: 12px;
        }

        .tab-panel__history-inline {
          margin-top: 8px;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 74%, transparent);
          padding-top: 8px;
        }

        .tab-panel__history-inline-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
        }

        .tab-panel__history-inline-meta {
          font-size: var(--gi-font-xxs);
          line-height: 1.25;
          color: var(--secondary-text-color);
          text-align: right;
        }

        .tab-panel__history-rail-body {
          max-height: 320px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 14px 14px;
          scrollbar-width: thin;
          scrollbar-color: #C9E9D6 transparent;
        }

        .tab-panel__history-rail-body::-webkit-scrollbar {
          width: 7px;
        }

        .tab-panel__history-rail-body::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: #C9E9D6;
        }

        .tab-panel__history-rail-body--inline {
          max-height: 160px;
          padding: 0 4px 0 0;
        }

        .tab-panel__history-rail-track {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tab-panel__history-rail-item {
          padding: 6px 0;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 82%, transparent);
          background: transparent;
        }

        .tab-panel__history-rail-item:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .tab-panel__history-inline .tab-panel__summary-label {
          font-size: var(--gi-font-xxs);
          line-height: 1.15;
          margin-bottom: 1px;
        }

        .tab-panel__history-inline .tab-panel__summary-value {
          font-size: var(--gi-font-xs);
          line-height: 1.08;
        }

        .tab-panel__history-inline .tab-panel__summary-note {
          font-size: var(--gi-font-xxs);
          line-height: 1.18;
          margin-top: 1px;
        }

        .tab-panel__decision-strip--overview .gi-pill {
          width: 100%;
          min-width: 0;
          background: transparent;
          border: none;
          padding: 0;
          min-height: 0;
        }

        .tab-panel__decision-strip--overview .gi-pill__icon {
          display: none;
        }

        .tab-panel__decision-strip--overview .gi-pill__label {
          margin-bottom: 5px;
        }

        .tab-panel__decision-strip--overview .gi-pill__value {
          font-size: var(--gi-font-lg);
          color: var(--primary-text-color);
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-row {
          padding: 10px 11px 11px;
          border: 1px solid color-mix(in srgb, var(--gi-surface-border) 84%, transparent);
          border-radius: 16px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 98%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 93%, black) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-label {
          font-size: var(--gi-font-xxs);
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-value {
          font-size: var(--gi-font-sm);
          line-height: 1.15;
        }

        .tab-panel__history-foldout-preview .tab-panel__summary-note {
          font-size: var(--gi-font-xxs);
          line-height: 1.28;
        }

        .tab-panel__section-summary {
          font-size: var(--gi-font-md);
          font-weight: 750;
          line-height: 1.28;
          letter-spacing: -0.01em;
        }

        .tab-panel__summary-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          width: 100%;
          min-width: 0;
          padding: 12px 0;
          border: 0;
          border-top: 1px solid color-mix(in srgb, var(--gi-surface-border) 82%, transparent);
          background: transparent;
          text-align: left;
          box-sizing: border-box;
          --tab-panel-summary-value-color: var(--primary-text-color);
        }

        .tab-panel__summary-row:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .tab-panel__summary-row--action {
          cursor: pointer;
          font: inherit;
          color: inherit;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 14px;
        }

        .tab-panel__summary-row--action:hover {
          background: color-mix(in srgb, var(--gazon-card-accent) 6%, transparent);
        }

        .tab-panel__summary-row--action:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 28%, transparent);
          border-radius: 14px;
        }

        .tab-panel__summary-row--success {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--warning {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-warning-color, #f2c94c) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--danger {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-danger-color, #f15f69) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--accent {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gazon-accent-tone-color, #6fb3ff) 88%, var(--primary-text-color));
        }

        .tab-panel__summary-row--neutral {
          --tab-panel-summary-value-color: var(--primary-text-color);
        }

        .tab-panel__summary-label {
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          color: var(--secondary-text-color);
          line-height: 1.15;
        }

        .tab-panel__summary-value {
          min-width: 0;
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.22;
          letter-spacing: -0.01em;
          color: var(--tab-panel-summary-value-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__summary-note {
          min-width: 0;
          font-size: var(--gi-font-xs);
          line-height: var(--gi-body-line);
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__intervention-card .tab-panel__section-head {
          margin-bottom: 0;
        }

        .tab-panel__intervention-card .tab-panel__section-summary {
          font-size: var(--gi-font-sm);
        }

        .tab-panel__intervention-card--picker .tab-panel__section-summary{
          color: color-mix(in srgb, var(--primary-text-color) 88%, var(--gazon-water-color, #44c8ea));
        }

        .tab-panel__intervention-card--action .tab-panel__section-summary{
          color: color-mix(in srgb, var(--primary-text-color) 88%, var(--gazon-success-color, #4fc38c));
        }

        .tab-panel__intervention-card--picker .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 42%, var(--secondary-text-color));
        }

        .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 42%, var(--secondary-text-color));
        }

        .tab-panel__temperature-constraint {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px 10px;
          margin-top: 4px;
          padding: 12px 14px;
          border: 1px solid #D7EEE0;
          border-radius: 18px;
          background: #F2FAF5;
        }

        .tab-panel__temperature-constraint--success {
          border-color: #BFE6CE;
          background: #EAF6EF;
        }

        .tab-panel__temperature-constraint--warning {
          border-color: #ECD7A6;
          background: linear-gradient(180deg, #FCF4E1 0%, #FAEFD2 100%);
        }

        .tab-panel__temperature-constraint--danger {
          border-color: #F1CEC9;
          background: #FCEEEC;
        }

        .tab-panel__temperature-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1 1 220px;
        }

        .tab-panel__temperature-detail {
          font-size: var(--gi-font-xs);
          line-height: 1.35;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__temperature-hint {
          font-size: var(--gi-font-xxs);
          line-height: 1.32;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__debug-foldout[open] {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 16%, var(--divider-color));
        }

        .tab-panel__debug-foldout-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          list-style: none;
          user-select: none;
        }

        .tab-panel__debug-foldout-summary::-webkit-details-marker {
          display: none;
        }

        .tab-panel__debug-foldout-meta {
          min-width: 0;
          text-align: right;
          font-size: var(--gi-font-xs);
          line-height: 1.3;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__debug-foldout-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0 14px 14px;
        }

        .tab-panel__grid--priority > *,
        .tab-panel__grid--featured > *,
        .tab-panel__grid--decision-board > * {
          min-width: 0;
        }

        .tab-panel__grid--priority > *:first-child,
        .tab-panel__grid--featured > *:first-child,
        .tab-panel__grid--decision-board > *:first-child {
          grid-column: 1 / -1;
        }

        .tab-panel__grid--priority > *:first-child .gi-card-core,
        .tab-panel__grid--featured > *:first-child .gi-card-core,
        .tab-panel__grid--decision-board > *:first-child .gi-card-core {
          min-height: 106px;
        }

        .tab-panel__grid--priority > *:first-child .gi-card-core__value,
        .tab-panel__grid--featured > *:first-child .gi-card-core__value,
        .tab-panel__grid--decision-board > *:first-child .gi-card-core__value {
          font-size: var(--gi-font-xl);
        }

        .tab-panel__facts-grid > * {
          min-width: 0;
        }

        .tab-panel__facts-grid .gi-card-core {
          min-height: 92px;
        }

        .tab-panel__facts-grid--overview .gi-card-core,
        .tab-panel__facts-grid--watering .gi-card-core,
        .tab-panel__facts-grid--mowing .gi-card-core {
          min-height: 96px;
        }

        .tab-panel__card-slider-item > * {
          height: 100%;
        }

        .tab-panel__card-slider--config .gi-card-core--stat {
          min-height: 96px;
          padding: 12px 14px;
        }

        .tab-panel__card-slider--config .gi-card-core__label {
          -webkit-line-clamp: 1;
        }

        .tab-panel__card-slider--config .gi-card-core__value {
          font-size: var(--gi-font-lg);
          -webkit-line-clamp: 3;
        }

        .tab-panel__card-slider--config .gi-card-core__secondary {
          -webkit-line-clamp: 2;
        }

        .tab-panel__products-layout > .tab-panel__section {
          min-width: 0;
        }

        .tab-panel--products .tab-panel__section--catalogue-reference .tab-panel__section-summary,
        .tab-panel--products .tab-panel__section--application-history .tab-panel__section-summary {
          font-size: var(--gi-font-md);
          line-height: 1.16;
        }

        .tab-panel--products .tab-panel__section--catalogue-reference .tab-panel__section-head,
        .tab-panel--products .tab-panel__section--application-history .tab-panel__section-head {
          margin-bottom: 2px;
        }

        .tab-panel--config .tab-panel__section {
          background:
            radial-gradient(circle at 84% 6%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 26%),
            radial-gradient(circle at 10% 88%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 8%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 28%, var(--divider-color));
        }

        .tab-panel--config .tab-panel__section-head{
          border-bottom-color: color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
        }

        .tab-panel__section--products .gi-card-core--stat {
          min-height: 58px;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core--stat {
          padding: 10px 12px;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__label {
          font-size: var(--gi-font-xxs);
          line-height: 1.12;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__value {
          font-size: var(--gi-font-sm);
          line-height: 1.1;
        }

        .tab-panel--products .tab-panel__card-slider--catalogue .gi-card-core__secondary {
          font-size: var(--gi-font-xxs);
          line-height: 1.2;
        }

        .tab-panel__intervention-card--proposed .tab-panel__section-summary{
          color: color-mix(in srgb, var(--primary-text-color) 90%, var(--gazon-warning-color, #d6a34f));
        }

        .tab-panel__intervention-card--proposed .tab-panel__section-meta {
          color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 42%, var(--secondary-text-color));
        }

        .tab-progress {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tab-panel__watering-zone {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          max-width: 100%;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.2;
          color: color-mix(in srgb, var(--primary-text-color) 92%, var(--gazon-water-color, #44c8ea));
          background: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--gazon-water-color, #44c8ea) 22%, transparent);
          box-shadow: inset 0 1px 0 color-mix(in srgb, white 32%, transparent);
          overflow-wrap: anywhere;
        }

        .tab-progress__bar,
        .gi-progress {
          height: 9px;
          border-radius: 999px;
          overflow: hidden;
          background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
        }

        .tab-progress__bar span,
        .gi-progress__bar {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 88%, white), var(--gazon-section-accent), color-mix(in srgb, var(--gazon-lawn-color, #80da67) 90%, white));
          transition:
            width var(--gi-motion-medium) var(--gi-ease-soft),
            background var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          box-shadow: 0 0 12px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, transparent);
        }

        .tab-panel--gazon .tab-progress {
          padding: 8px 10px 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 26%, var(--gi-surface-border));
          border-radius: 18px;
          background:
            radial-gradient(circle at 88% 14%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, black) 100%);
        }

        .tab-panel--gazon .tab-progress__bar,
        .tab-panel--gazon .gi-progress {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, #f7f9f3) 0%, color-mix(in srgb, #f1f5ea 92%, var(--gazon-lawn-color, #80da67) 8%) 100%);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, transparent);
          box-shadow: inset 0 1px 2px rgba(80, 104, 62, 0.05);
        }

        .tab-panel--gazon .tab-progress__meta {
          color: color-mix(in srgb, #000000 64%, var(--secondary-text-color));
        }

        .gi-progress__bar--critical {
          background: linear-gradient(90deg, color-mix(in srgb, #ff5a5f 70%, white), #ff5a5f);
          box-shadow: 0 0 12px rgba(255, 90, 95, 0.28);
        }

        .tab-progress__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
        }

        .gi-action--primary .gi-icon {
          width: var(--gi-action-icon-size);
          height: var(--gi-action-icon-size);
          border-radius: 999px;
          background: var(--gi-action-icon-bg);
        }

        .gi-action--primary .gi-icon ha-icon {
          width: var(--gi-action-icon-glyph-size);
          height: var(--gi-action-icon-glyph-size);
        }

        .gi-action--primary:disabled .gi-icon {
          background: color-mix(in srgb, var(--divider-color, #d8dde3) 48%, transparent);
        }

        .gi-action--danger .gi-icon {
          width: var(--gi-action-icon-size);
          height: var(--gi-action-icon-size);
          border-radius: 999px;
          background: var(--gi-action-icon-bg);
        }

        .gi-action--danger .gi-icon ha-icon {
          width: var(--gi-action-icon-glyph-size);
          height: var(--gi-action-icon-glyph-size);
        }

        .gi-config-action .gi-card-core {
          width: 100%;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 24%, var(--divider-color));
          background:
            radial-gradient(circle at 85% 10%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 9%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 9%, transparent) 0%, transparent 100%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, white) 100%);
        }

        @media (hover: hover) {
          .gi-config-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-config-action:focus-visible .gi-card-core {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 38%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .gi-overview-action .gi-card-core {
          width: 100%;
        }

        @media (hover: hover) {
          .gi-overview-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-overview-action:focus-visible .gi-card-core {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 32%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .gi-action .gi-icon {
          width: 20px;
          height: 20px;
        }

        .gi-info {
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          background:
            radial-gradient(circle at 94% 8%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
          box-shadow: var(--gi-surface-shadow);
        }

        .gi-info--secondary {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 6%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 3%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
        }

        .decision-hero,
        .decision-plan,
        .decision-context{
          border: 1px solid var(--gi-surface-border);
          border-radius: 22px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          padding: 14px 16px;
          box-shadow: var(--gi-surface-shadow);
        }

        .decision-hero {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: var(--gi-surface-border-strong);
        }

        .decision-hero__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .decision-hero__summary {
          font-size: var(--gi-font-sm);
          text-transform: uppercase;
          letter-spacing: 0.10em;
          font-weight: 800;
          line-height: 1.2;
          min-width: 0;
          overflow-wrap: anywhere;
          color: var(--secondary-text-color);
        }

        .decision-hero__next {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.18;
          color: var(--primary-text-color);
          letter-spacing: -0.01em;
        }

        .decision-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: var(--gi-font-xs);
          font-weight: 700;
          white-space: nowrap;
          background: color-mix(in srgb, var(--gazon-card-accent) 14%, transparent);
          color: var(--primary-text-color);
        }

        .decision-status .gi-icon {
          width: 14px;
          height: 14px;
        }

        .decision-status--danger {
          background: color-mix(in srgb, var(--gazon-danger-color) 14%, transparent);
        }

        .decision-status--warning {
          background: color-mix(in srgb, var(--gazon-warning-color) 16%, transparent);
        }

        .decision-status--success {
          background: color-mix(in srgb, var(--gazon-success-color) 16%, transparent);
        }

        .decision-status--neutral {
          background: color-mix(in srgb, var(--gazon-neutral-color) 12%, transparent);
        }

        .decision-hero__next,
        .decision-hero__hint {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .decision-plan__label{
          font-size: var(--gi-label-size);
          text-transform: uppercase;
          letter-spacing: var(--gi-label-spacing);
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision-plan {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-color: var(--gi-surface-border);
        }

        .decision-plan__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          min-width: 0;
        }

        .decision-plan__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
          white-space: normal;
          overflow-wrap: anywhere;
          min-width: 0;
          flex: 1 1 320px;
          text-align: left;
        }

        .decision-plan__summary {
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.24;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .decision-plan__chips{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: flex-start;
          gap: 8px;
        }

        .gi-pill {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          vertical-align: middle;
          min-height: 28px;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid var(--gi-border);
          background: var(--gi-surface-2);
          min-width: 0;
          box-sizing: border-box;
        }

        .gi-pill--status {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 15%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 7%, transparent) 100%);
          color: var(--primary-text-color);
        }

        .gi-pill--context {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 15%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 7%, transparent) 100%);
          color: var(--primary-text-color);
        }

        .gi-pill__icon {
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: visible;
          line-height: 0;
          border-radius: 999px;
          background: transparent;
        }

        .gi-pill__icon .gi-icon--pill {
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          overflow: visible;
          color: inherit;
          line-height: 0;
        }

        .gi-pill__icon .gi-icon--pill ha-icon {
          display: block;
          width: 14px;
          height: 14px;
          margin: 0;
          padding: 0;
          line-height: 0;
          vertical-align: middle;
          --mdc-icon-size: 14px;
        }

        .gi-pill__content {
          min-width: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 4px;
          line-height: 1.12;
          overflow: hidden;
        }

        .gi-pill--context .gi-pill__content {
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .gi-pill__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
        }

        .gi-pill__value {
          font-size: var(--gi-font-xs);
          font-weight: var(--gi-weight-medium);
          line-height: 1.12;
          overflow-wrap: anywhere;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gi-pill--danger {
          background: color-mix(in srgb, var(--gi-status-danger) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-danger) 30%, transparent);
          color: var(--gi-status-danger);
        }

        .gi-pill--critical {
          background: color-mix(in srgb, var(--gi-status-danger) 18%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-danger) 38%, transparent);
          color: var(--gi-status-danger);
        }

        .gi-pill--warning {
          background: color-mix(in srgb, var(--gi-status-warning) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-warning) 30%, transparent);
          color: var(--gi-status-warning);
        }

        .gi-pill--success {
          background: color-mix(in srgb, var(--gi-status-success) 14%, transparent);
          border-color: color-mix(in srgb, var(--gi-status-success) 30%, transparent);
          color: var(--gi-status-success);
        }

        .gi-pill--accent {
          background: var(--gi-accent-soft);
          border-color: color-mix(in srgb, var(--gi-accent) 30%, transparent);
          color: var(--gi-accent);
        }

        .gi-pill--neutral {
          background: var(--gi-surface-2);
          border-color: var(--gi-border);
          color: var(--gi-text-muted);
        }

        .decision-context {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tab-panel__section--debug-intervention {
          gap: 12px;
        }

        .tab-panel__debug-foldout {
          margin-top: 12px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          border-radius: 20px;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .tab-panel__debug-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 10px;
        }

        .tab-panel__debug-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 8px;
        }

        .decision-advanced {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }

        * {
          box-sizing: border-box;
        }

        .card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          border-radius: var(--gazon-border-radius);
          color: var(--primary-text-color);
          background: var(--gi-bg, var(--secondary-background-color));
          border: 1px solid var(--gi-border);
          box-shadow: var(--gi-shadow-sm);
          overflow: hidden;
          padding: var(--gazon-card-padding);
          position: relative;
          isolation: isolate;
          container-type: inline-size;
        }

        ha-card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
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
          height: 4px;
          background: var(--gi-accent);
          opacity: 0.5;
          z-index: 0;
        }

        .card--gradient::after {
          content: none;
        }

        .card--solid {
          background: transparent;
        }

        .card--glass {
          background: var(--gi-bg, var(--secondary-background-color));
        }

        .card--minimal {
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .card--pulse-critical {
          animation: gazonCriticalPulse 1.8s ease-in-out infinite;
        }

        @keyframes gazonCriticalPulse {
          0% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 0 color-mix(in srgb, var(--gazon-critical-color) 0%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
          70% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 10px color-mix(in srgb, var(--gazon-critical-color) 18%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
          100% {
            box-shadow:
              0 12px 30px rgba(0, 0, 0, 0.10),
              0 0 0 0 color-mix(in srgb, var(--gazon-critical-color) 0%, transparent),
              0 1px 0 rgba(255, 255, 255, 0.04) inset,
              var(--ha-card-box-shadow, none);
          }
        }

        @keyframes gi-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 90, 95, 0.34);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 90, 95, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 90, 95, 0);
          }
        }

        .header {
          display: flex;
          flex-direction: var(--gi-header-direction);
          justify-content: var(--gi-header-justify);
          align-items: var(--gi-header-align);
          gap: var(--gi-header-gap);
          margin-bottom: var(--gi-header-margin-bottom);
        }

        .card,
        .gi-card,
        .header,
        .gi-info,
        .gi-pill--status,
        .gi-pill--context,
        .gi-progress__bar {
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard);
        }

        @media (hover: hover) {
          .tab-panel__section:hover,
          .gi-card-core:hover{
            transform: translateY(-2px);
            box-shadow:
              var(--gi-surface-shadow-strong),
              0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 10%, transparent);
          }
        }

        .header__weather .gi-pill__value {
          font-size: var(--gi-font-xxs);
          font-weight: 650;
        }

        .header__action .gi-icon {
          width: 11px;
          height: 11px;
          flex: none;
          background: color-mix(in srgb, var(--gazon-success-color) 10%, transparent);
        }

        .header__action span:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .header__icon .gi-icon {
          width: 14px;
          height: 14px;
        }

        .hero__metrics .gi-card-core {
          min-height: 88px;
        }

        .hero__metrics .gi-card-core:first-child {
          grid-column: 1 / -1;
          min-height: 108px;
        }

        .hero__lead-icon .gi-icon {
          width: 12px;
          height: 12px;
        }

        .tiles {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          min-width: 0;
          gap: var(--gi-tiles-gap);
          margin-top: 4px;
        }

        .gi-card-core {
          display: flex;
          align-items: stretch;
          gap: var(--gi-card-core-gap);
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          border-radius: var(--gi-card-core-radius);
          min-height: var(--gi-card-core-min-height);
          height: 100%;
          padding: var(--gi-card-core-padding);
          position: relative;
          border: 1px solid var(--gi-border);
          background: var(--gi-surface);
          box-shadow: none;
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .tab-panel--overview .tab-panel__section{
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .gi-card-core--stat,
        .gi-card-core--tile,
        .gi-card-core--metric {
          min-height: 80px;
        }

        .gi-card-core--metric {
          min-height: 76px;
          padding: 12px 13px;
        }

        .gi-card-core--interactive {
          padding-right: 42px;
        }

        .gi-card-core--tile {
          border: 1px solid var(--gi-border);
          background: var(--gi-surface);
        }

        .gi-card-core__icon {
          width: var(--gi-card-core-icon-size);
          height: var(--gi-card-core-icon-size);
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          flex: none;
          overflow: visible;
          line-height: 0;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
        }

        .gi-card-core--tile .gi-card-core__icon {
          background: color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 12%, transparent);
          color: var(--gazon-tile-accent, var(--gazon-section-accent));
        }

        .gi-card-core__icon .gi-icon {
          width: var(--gi-card-core-icon-glyph-size);
          height: var(--gi-card-core-icon-glyph-size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          transform: none;
          line-height: 0;
        }

        .gi-card-core__icon .gi-icon ha-icon {
          width: var(--gi-card-core-icon-glyph-size);
          height: var(--gi-card-core-icon-glyph-size);
          display: block;
          margin: 0;
          transform: none;
        }

        .gi-card-core--metric .gi-card-core__icon {
          width: 18px;
          height: 18px;
          align-self: center;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon {
          width: 11px;
          height: 11px;
          transform: none;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon ha-icon {
          width: 11px;
          height: 11px;
          transform: none;
        }

        .tiles .gi-card-core {
          flex: 1 1 118px;
        }

        .gi-card-core__icon--empty {
          background: transparent;
        }

        .gi-card-core__content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          overflow: hidden;
        }

        .gi-card-core__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--secondary-text-color);
          line-height: 1.1;
          min-height: 1.1em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .gi-card-core__value {
          font-weight: var(--gi-weight-medium);
          min-width: 0;
          overflow-wrap: break-word;
          word-break: normal;
          hyphens: auto;
          font-size: var(--gi-font-md);
          line-height: 1.18;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .gi-card-core--metric .gi-card-core__value {
          order: 1;
          font-size: clamp(1.18rem, 1.08rem + 0.44vw, 1.42rem);
          line-height: 1.02;
          font-weight: var(--gi-weight-medium);
        }

        .gi-card-core--metric .gi-card-core__label {
          order: 2;
          margin-top: 2px;
        }

        .gi-card-core--metric .gi-card-core__secondary {
          order: 3;
        }

        .gi-card-core--metric .gi-card-core__content {
          gap: 1px;
        }

        .gi-card-core--success .gi-card-core__value {
          color: var(--gazon-success-color, #4fc38c);
        }

        .gi-card-core--warning .gi-card-core__value {
          color: var(--gazon-warning-color, #d6a34f);
        }

        .gi-card-core--danger .gi-card-core__value {
          color: var(--gazon-danger-color, #f15f69);
        }

        .gi-card-core--accent .gi-card-core__value {
          color: var(--gazon-accent-tone-color, #31b8d4);
        }

        .gi-card-core--critical .gi-card-core__value {
          color: var(--gazon-critical-color, #ff5a5f);
        }

        .gi-card-core--neutral .gi-card-core__value {
          color: var(--primary-text-color);
        }

        .gi-card-core__secondary {
          font-size: var(--gi-font-xs);
          line-height: 1.3;
          color: var(--secondary-text-color);
          min-height: 1.15em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .gi-card-core__secondary--empty {
          visibility: hidden;
        }

        .gi-card-core__affordance {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          color: color-mix(in srgb, var(--gazon-section-accent) 90%, var(--secondary-text-color));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
          opacity: 0.9;
          pointer-events: none;
        }

        .gi-card-core--interactive:hover .gi-card-core__affordance {
          background: color-mix(in srgb, var(--gazon-section-accent) 16%, transparent);
          opacity: 1;
        }

        .footer {
          margin-top: 8px;
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xs);
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
          border: 1px dashed var(--divider-color);
          border-radius: 16px;
        }
        .card--editor-preview .gi-pill--status,
        .card--editor-preview .gi-pill--context,
        .card--editor-preview .gi-info,
        .card--editor-preview .gi-progress__bar {
          animation: none !important;
        }

        .card--editor-preview {
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.16),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 16%, transparent),
            var(--ha-card-box-shadow, none);
        }

        .card--theme-light {
          --gi-theme-base: #ffffff;
          --gi-theme-base-strong: #ffffff;
          --gi-theme-base-soft: #fbfcf8;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(0, 0, 0, 0.10));
          --gi-theme-shadow-override: 0 10px 24px rgba(28, 38, 28, 0.08);
        }

        .card--theme-dark {
          --gi-theme-base: #0f1418;
          --gi-theme-base-strong: #0b1014;
          --gi-theme-base-soft: #151c21;
          --gi-warning-ink: #c7d0d7;
          --gi-warning-border: color-mix(in srgb, var(--gi-uniform-tone) 24%, rgba(255, 255, 255, 0.14));
          --gi-warning-surface: #171c20;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 24%, rgba(255, 255, 255, 0.12));
          --gi-theme-shadow-override: 0 16px 28px rgba(0, 0, 0, 0.34);
          --gi-surface-fill: #12181d;
          --gi-surface-fill-accent: #151d23;
          --gi-surface-border: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(255, 255, 255, 0.09));
          --gi-surface-border-strong: color-mix(in srgb, var(--gazon-section-accent) 34%, rgba(255, 255, 255, 0.16));
          --gi-surface-shadow: 0 10px 20px rgba(0, 0, 0, 0.28);
          --gi-surface-shadow-strong: 0 16px 30px rgba(0, 0, 0, 0.38);
        }

        .card.card--theme-light {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
        }

        .card.card--theme-dark {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(255, 255, 255, 0.08));
        }

        .card.card--theme-dark {
          background: var(--gi-theme-base);
        }

        .card.card--theme-light.card--solid,
        .card.card--theme-dark.card--solid {
          background: transparent;
        }

        .card.card--theme-light::before {
          background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.045) 48%, transparent 100%);
        }

        .card.card--theme-dark::before {
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 48%, transparent 100%);
        }

        .card.card--theme-light.card--gradient::after,
        .card.card--theme-dark.card--gradient::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, transparent 100%);
          opacity: 0;
          z-index: 0;
        } .tab-panel__section, .gi-info, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .gi-card-core{
          background:
            radial-gradient(circle at 84% 0%, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 20%),
            radial-gradient(circle at 8% 94%, color-mix(in srgb, var(--gi-tab-mist-color) 14%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 6%, #ffffff) 0%, color-mix(in srgb, #ffffff 92%, var(--gazon-lawn-color) 8%) 100%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
          box-shadow: var(--gi-theme-shadow-override);
        } .tab-panel__section, .gi-info, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .gi-card-core{
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.005) 100%),
            var(--gi-surface-fill);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 24%, rgba(255, 255, 255, 0.12));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            0 14px 24px rgba(0, 0, 0, 0.32);
        }

        .card--theme-light :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background:
            radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 18%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 3%, #ffffff) 0%, color-mix(in srgb, #ffffff 96%, var(--gazon-lawn-color) 4%) 100%);
        }

        .card--theme-dark :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.014) 0%, rgba(255, 255, 255, 0.004) 100%),
            #151d23;
        }

        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .tab-panel__section-meta,
        .card--theme-light .tab-panel__eyebrow,
        .card--theme-light .tab-panel__empty,
        .card--theme-light .decision-hero__next,
        .card--theme-light .decision-hero__hint,
        .card--theme-light .decision-plan__meta,
        .card--theme-light .gi-pill__label,
        .card--theme-light .gi-pill__value,
        .card--theme-light .gi-card-core__label,
        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .footer {
          color: color-mix(in srgb, #000000 68%, var(--secondary-text-color));
        }

        .card--theme-light :is(.gi-pill--neutral) {
          background: color-mix(in srgb, #ffffff 94%, var(--gazon-section-accent) 6%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(0, 0, 0, 0.08));
        }

        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .tab-panel__section-meta,
        .card--theme-dark .tab-panel__eyebrow,
        .card--theme-dark .tab-panel__empty,
        .card--theme-dark .decision-hero__hint,
        .card--theme-dark .decision-plan__meta,
        .card--theme-dark .gi-pill__label,
        .card--theme-dark .gi-pill__value,
        .card--theme-dark .gi-card-core__label,
        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .footer {
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }
        .card--theme-dark .decision-hero__next,
        .card--theme-dark .decision-plan__summary,
        .card--theme-dark .tab-panel__section-summary,
        .card--theme-dark .tab-panel__summary-value{
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }
        .card--theme-dark .tab-panel__summary-label,
        .card--theme-dark .decision-plan__label,
        .card--theme-dark .tab-panel__eyebrow {
          color: color-mix(in srgb, #ffffff 58%, var(--secondary-text-color));
        }

        .card--theme-dark :is(.gi-pill--neutral) {
          background: #141b20;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.12));
        }

        .card--theme-dark .gi-pill--warning,
        .card--theme-dark .decision-status--warning {
          background: transparent;
          border-color: var(--gi-warning-border);
          color: var(--gi-warning-ink);
        }

        .card--theme-dark .gi-pill--warning .gi-pill__value,
        .card--theme-dark .gi-pill--warning .gi-pill__label,
        .card--theme-dark .decision-status--warning {
          color: var(--gi-warning-ink);
        }

        .card--theme-dark .gi-pill--success .gi-pill__label,
        .card--theme-dark .gi-pill--success .gi-pill__value,
        .card--theme-dark .gi-pill--accent .gi-pill__label,
        .card--theme-dark .gi-pill--accent .gi-pill__value {
          color: color-mix(in srgb, #ffffff 90%, var(--primary-text-color));
        }
        .card--theme-dark .tab-panel__temperature-constraint--warning {
          border-color: var(--gi-warning-border);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0.003) 100%),
            #12181d;
        }

        .card--theme-dark .tab-panel__intervention-card--proposed .tab-panel__section-summary,
        .card--theme-dark .tab-panel__temperature-constraint--warning .tab-panel__temperature-detail {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--proposed .tab-panel__section-meta,
        .card--theme-dark .tab-panel__temperature-constraint--warning .tab-panel__temperature-hint{
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }

        .card--theme-dark .tab-panel__summary-row--warning {
          --tab-panel-summary-value-color: color-mix(in srgb, var(--gi-warning-ink) 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .card--theme-dark .tab-panel__intervention-card--picker .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel__intervention-card--action .tab-panel__section-summary,
        .card--theme-dark .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 88%, var(--primary-text-color));
        }
        .card--theme-dark .tab-panel--intervention .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .gi-action--primary span{
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel--intervention .gi-pill--context,
        .card--theme-dark .tab-panel--intervention .gi-pill--context .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--context .gi-pill__value {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color));
        }

        .card--theme-dark .tab-panel--intervention .gi-pill--warning,
        .card--theme-dark .tab-panel--intervention .gi-pill--warning .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--warning .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .gi-pill--success,
        .card--theme-dark .tab-panel--intervention .gi-pill--success .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--success .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent .gi-pill__label,
        .card--theme-dark .tab-panel--intervention .gi-pill--accent .gi-pill__value,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--proposed .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--proposed .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--picker .tab-panel__section-meta,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__section-summary,
        .card--theme-dark .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__section-meta {
          color: color-mix(in srgb, #ffffff 92%, var(--primary-text-color)) !important;
        }
        .card--theme-dark .tab-panel--intervention .gi-action--primary:disabled span{
          color: color-mix(in srgb, #ffffff 82%, var(--secondary-text-color));
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .gi-card,
          .tab-panel > *,
          .gi-pill,
          .gi-info,
          .gi-progress__bar,
          .tab-progress__bar,
          .card--pulse-critical,
          .card--gradient::after {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 600px) {
          :host {
            --gi-header-gap: 8px;
            --gi-header-margin-bottom: 8px;
            --gi-hero-margin: 2px 0 6px;
            --gi-hero-gap: 8px;
            --gi-hero-lead-padding: 10px 11px;
            --gi-hero-lead-gap: 6px;
            --gi-hero-metrics-gap: 6px;
            --gi-inline-gap: 8px;
            --gi-nav-gap: 5px;
            --gi-nav-margin: 4px 0 6px;
            --gi-nav-item-padding: 6px 9px;
            --gi-grid-gap: 6px;
            --gi-grid-template: 1fr;
            --gi-action-padding-inline: 16px;
            --gi-action-padding-block: 14px;
            --gi-action-padding-inline-end: 18px;
            --gi-action-gap: 10px;
            --gi-action-min-height: 78px;
            --gi-action-icon-size: 24px;
            --gi-action-icon-glyph-size: 15px;
            --gi-card-core-gap: 8px;
            --gi-card-core-padding: 11px 13px;
            --gi-card-core-min-height: 72px;
            --gi-card-core-radius: 14px;
            --gi-card-core-icon-size: 18px;
            --gi-card-core-icon-glyph-size: 11px;
            --gi-decision-grid-gap: 6px;
            --gi-tiles-gap: 6px;
            --gi-surface-shadow: 0 8px 18px rgba(0, 0, 0, 0.07);
            --gi-surface-shadow-strong: 0 12px 24px rgba(0, 0, 0, 0.12);
          }

          .tab-panel__section--products .tab-panel__section-summary {
            font-size: var(--gi-font-sm);
            line-height: 1.25;
          }

          .tab-panel__section--products .gi-card-core--stat {
            min-height: 68px;
          }

          .tab-panel__history-inline-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .tab-panel__history-inline-meta {
            text-align: left;
          }
        }

        @media (max-width: 400px) {
          :host {
            --gi-header-gap: 6px;
            --gi-header-margin-bottom: 8px;
            --gi-hero-margin: 1px 0 4px;
            --gi-hero-gap: 6px;
            --gi-hero-lead-padding: 9px 10px;
            --gi-hero-lead-gap: 6px;
            --gi-hero-metrics-gap: 4px;
            --gi-card-core-gap: 8px;
            --gi-card-core-padding: 10px 12px;
            --gi-card-core-min-height: 70px;
            --gi-card-core-icon-size: 18px;
            --gi-card-core-icon-glyph-size: 11px;
          }

          .header {
            align-items: stretch;
          }

          .header__icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .hero__lead-icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .hero__metrics .gi-card-core {
            flex-basis: 100px;
            min-height: 70px;
          }
          .tab-panel--products .tab-panel__section-head,
          .tab-panel--intervention .tab-panel__section-head,
          .tab-panel--intervention .tab-panel__debug-foldout-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .tab-panel--products .tab-panel__status,
          .tab-panel--intervention .tab-panel__status,
          .tab-panel--intervention .tab-panel__debug-foldout-meta {
            width: 100%;
            text-align: left;
            max-width: 100%;
          }

          .tab-panel--products .gi-card-core--stat {
            min-height: 64px;
          }

          .tab-panel__grid--priority > *:first-child .gi-card-core,
          .tab-panel__grid--featured > *:first-child .gi-card-core,
          .tab-panel__grid--decision-board > *:first-child .gi-card-core {
            min-height: 78px;
          }

          .tab-panel--products .tab-panel__section-summary{
            font-size: var(--gi-font-sm);
            line-height: 1.22;
          }

          .tab-panel--intervention .tab-panel__intervention-card .tab-panel__section-summary{
            font-size: var(--gi-font-xs);
            line-height: 1.22;
          }
        }

        /* ===== Refonte v0.4 (gz2) — header + nav + Synthèse, à plat & aéré ===== */
        .gz2-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }
        .gz2-header__id { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .gz2-header__titles { min-width: 0; }
        .gz2-header__name { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .gz2-title-dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
        .gz2-header__title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
        .gz2-header__icon {
          width: 40px; height: 40px; flex: 0 0 auto;
          border-radius: 12px;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
          display: flex; align-items: center; justify-content: center;
        }
        .gz2-header__title {
          font-size: var(--gi-font-lg);
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text);
          line-height: 1.2;
        }
        .gz2-header__sub {
          display: flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-sm);
          color: var(--gi-text-muted);
        }
        .gz2-header__meta { display: flex; align-items: center; gap: 12px; flex: 0 0 auto; }
        .gz2-weather {
          display: flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-sm); color: var(--gi-text-muted); white-space: nowrap;
        }
        .gz2-btn {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid transparent;
          background: var(--gi-accent-soft);
          color: var(--gi-accent);
          border-radius: 999px;
          padding: 8px 14px;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: var(--gi-weight-medium);
          cursor: pointer; white-space: nowrap;
          transition: background-color var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-btn:hover { background: color-mix(in srgb, var(--gi-accent) 24%, transparent); }

        /* Navigation en contrôle segmenté (pilules) : look moderne. */
        .gz2-nav {
          display: flex; gap: 6px;
          margin-bottom: 20px;
          padding: 6px;
          background: #EAF6EF;
          border: 1px solid #D7EEE0;
          border-radius: 999px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gz2-nav::-webkit-scrollbar { display: none; }
        .gz2-nav__item {
          appearance: none; -webkit-appearance: none;
          background: transparent; border: 1px solid transparent;
          color: #4f7a64;
          padding: 9px 17px;
          border-radius: 999px;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: 700;
          cursor: pointer; white-space: nowrap; flex: 0 0 auto;
          transition: color var(--gi-motion-fast) var(--gi-ease-standard), background-color var(--gi-motion-fast) var(--gi-ease-standard), border-color var(--gi-motion-fast) var(--gi-ease-standard), box-shadow var(--gi-motion-fast) var(--gi-ease-standard), transform var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-nav__item:hover {
          color: #2E8B57;
          background: #FFFFFF;
          border-color: #D7EEE0;
        }
        .gz2-nav__item--active,
        .gz2-nav__item--active:hover {
          color: #1D6B3A;
          background: #FFFFFF;
          border-color: #BFE6CE;
          box-shadow: 0 4px 12px rgba(46, 139, 87, 0.18);
          transform: translateY(-1px);
        }

        .gz2-overview { display: flex; flex-direction: column; }
        /* Amorces de section en pastille d'accent : repère visuel fort et moderne. */
        .gz2-eyebrow {
          display: inline-flex; align-items: center;
          align-self: flex-start; width: fit-content;
          font-size: var(--gi-font-xxs);
          text-transform: uppercase; letter-spacing: 0.1em;
          font-weight: var(--gi-weight-medium);
          color: var(--gi-accent);
          background: var(--gi-accent-soft);
          padding: 4px 11px; border-radius: 999px;
          margin-bottom: 12px;
        }
        .gz2-hero { margin-bottom: 22px; }
        .gz2-hero__title {
          font-size: var(--gi-font-2xl);
          font-weight: var(--gi-weight-medium);
          color: var(--gi-text);
          line-height: 1.18; margin-top: 4px;
          letter-spacing: -0.01em;
        }
        .gz2-hero__sub { font-size: var(--gi-font-sm); color: var(--gi-text-muted); line-height: 1.5; margin-top: 10px; }
        /* Héro avec pastille d'icône d'état à gauche. */
        .gz2-hero--withicon { display: flex; align-items: flex-start; gap: 14px; }
        .gz2-hero__body { flex: 1; min-width: 0; }
        .gz2-hero__badge {
          flex: 0 0 auto; width: 42px; height: 42px; margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          border-radius: var(--gi-radius-md);
          color: var(--gi-accent); background: var(--gi-accent-soft);
        }
        .gz2-hero__badge--success { color: var(--gi-status-success); background: color-mix(in srgb, var(--gi-status-success) 14%, transparent); }
        .gz2-hero__badge--warning { color: var(--gi-status-warning); background: color-mix(in srgb, var(--gi-status-warning) 14%, transparent); }
        .gz2-hero__badge--danger,
        .gz2-hero__badge--critical { color: var(--gi-status-danger); background: color-mix(in srgb, var(--gi-status-danger) 16%, transparent); }
        .gz2-hero__badge--neutral { color: var(--gi-text-muted); background: var(--gi-surface-2); }

        .gz2-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: var(--gi-font-xs); font-weight: var(--gi-weight-medium);
          padding: 5px 11px; border-radius: 999px; white-space: nowrap; flex: 0 0 auto;
        }
        .gz2-chip--success { background: color-mix(in srgb, var(--gi-status-success) 14%, transparent); color: var(--gi-status-success); }
        .gz2-chip--warning { background: color-mix(in srgb, var(--gi-status-warning) 14%, transparent); color: var(--gi-status-warning); }
        .gz2-chip--danger  { background: color-mix(in srgb, var(--gi-status-danger) 14%, transparent); color: var(--gi-status-danger); }
        .gz2-chip--critical{ background: color-mix(in srgb, var(--gi-status-danger) 18%, transparent); color: var(--gi-status-danger); }
        .gz2-chip--accent  { background: var(--gi-accent-soft); color: var(--gi-accent); }
        .gz2-chip--neutral { background: var(--gi-surface-2); color: var(--gi-text-muted); }

        .gz2-reperes { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 22px; margin-bottom: 22px; }
        .gz2-rep__label { font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 7px; }
        .gz2-rep__value { font-size: var(--gi-font-lg); font-weight: var(--gi-weight-medium); color: var(--gi-text); overflow-wrap: anywhere; }

        .gz2-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .gz2-card {
          appearance: none; -webkit-appearance: none;
          text-align: left; font: inherit; color: inherit;
          background: var(--gi-surface-2);
          border: 1px solid var(--gi-border);
          border-radius: var(--gi-radius-lg);
          padding: 16px 18px;
          cursor: pointer; min-width: 0;
          transition: border-color var(--gi-motion-fast) var(--gi-ease-standard), background-color var(--gi-motion-fast) var(--gi-ease-standard), transform var(--gi-motion-fast) var(--gi-ease-soft), box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }
        .gz2-card:hover { border-color: var(--gi-border-strong); background: var(--gi-surface-2); transform: translateY(-1px); box-shadow: var(--gi-shadow-sm); }
        .gz2-card:active { transform: translateY(0); }
        .gz2-card__label { font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 8px; }
        .gz2-card__value { font-size: var(--gi-font-lg); font-weight: var(--gi-weight-medium); color: var(--gi-text); line-height: 1.15; overflow-wrap: anywhere; }
        .gz2-card__value--success { color: var(--gi-status-success); }
        .gz2-card__value--warning { color: var(--gi-status-warning); }
        .gz2-card__value--danger  { color: var(--gi-status-danger); }
        .gz2-card__value--critical{ color: var(--gi-status-danger); }
        .gz2-card__sub { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 6px; line-height: 1.4; }

        .gz2-eyebrow--section { margin-top: 26px; }
        .gz2-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .gz2-card--static { cursor: default; }
        .gz2-empty { font-size: var(--gi-font-sm); color: var(--gi-text-muted); padding: 8px 0; }
        .gz2-field { margin-bottom: 16px; }
        .gz2-field__label { display: block; font-size: var(--gi-font-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--gi-text-faint); margin-bottom: 7px; }
        .gz2-select {
          appearance: none; -webkit-appearance: none;
          width: 100%;
          background: var(--gi-surface); color: var(--gi-text);
          border: 1px solid var(--gi-border); border-radius: var(--gi-radius-sm);
          padding: 10px 12px; font: inherit; font-size: var(--gi-font-sm); cursor: pointer;
        }
        .gz2-select:hover { border-color: var(--gi-border-strong); }
        .gz2-btn--block { width: 100%; justify-content: center; }
        .gz2-btn:disabled { opacity: 0.5; cursor: default; }
        .gz2-meter { margin-bottom: 18px; }
        .gz2-meter__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 9px; }
        .gz2-meter__value { font-size: var(--gi-font-xl); font-weight: var(--gi-weight-medium); color: var(--gi-text); }
        .gz2-meter__badge { font-size: var(--gi-font-xs); color: var(--gi-text-muted); white-space: nowrap; }
        .gz2-meter__track { position: relative; height: 8px; border-radius: 999px; background: var(--gi-surface-2); overflow: hidden; }
        .gz2-meter__fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 999px; background: var(--gi-accent); }
        .gz2-meter__surplus { position: absolute; top: 0; height: 100%; border-radius: 999px; background: color-mix(in srgb, var(--gi-status-success) 55%, transparent); }
        .gz2-meter__meta { font-size: var(--gi-font-xs); color: var(--gi-text-muted); margin-top: 9px; line-height: 1.4; }
        /* Repère MAD : niveau de réserve sous lequel l'arrosage se déclenche. */
        .gz2-meter__mad { position: absolute; top: 0; height: 100%; width: 2px; transform: translateX(-1px); background: var(--gi-text); opacity: 0.72; pointer-events: none; }
        .gz2-meter__legend { display: flex; align-items: center; gap: var(--gi-space-2); font-size: var(--gi-font-xxs); color: var(--gi-text-muted); margin-top: 6px; }
        .gz2-meter__legend-mark { display: inline-block; width: 2px; height: 11px; background: var(--gi-text); opacity: 0.72; border-radius: 999px; flex: 0 0 auto; }

        /* Actions secondaires (ex. recaler la réserve). */
        .gz2-actions { display: flex; flex-wrap: wrap; gap: var(--gi-space-2); margin-top: var(--gi-space-3); }

        /* Bandeau « pourquoi l'arrosage est bloqué ». */
        .gz2-blockage { display: flex; flex-direction: column; gap: var(--gi-space-1); margin: var(--gi-space-3) 0; padding: var(--gi-space-3); border-radius: var(--gi-radius-md); border: 1px solid color-mix(in srgb, var(--gi-status-warning) 30%, transparent); background: color-mix(in srgb, var(--gi-status-warning) 12%, transparent); }
        .gz2-blockage--danger { border-color: color-mix(in srgb, var(--gi-status-danger) 32%, transparent); background: color-mix(in srgb, var(--gi-status-danger) 13%, transparent); }
        .gz2-blockage--success { border-color: color-mix(in srgb, var(--gi-status-success) 30%, transparent); background: color-mix(in srgb, var(--gi-status-success) 12%, transparent); }
        .gz2-blockage__head { display: flex; align-items: center; gap: var(--gi-space-2); font-weight: 600; font-size: var(--gi-font-sm); color: var(--gi-text); }
        .gz2-blockage__why { font-size: var(--gi-font-xs); color: var(--gi-text); line-height: 1.45; }
        .gz2-blockage__how { display: flex; align-items: flex-start; gap: var(--gi-space-2); font-size: var(--gi-font-xs); color: var(--gi-text-muted); line-height: 1.45; }
        .gz2-evening { display: flex; align-items: center; gap: var(--gi-space-2); margin: var(--gi-space-3) 0; padding: var(--gi-space-2) var(--gi-space-3); border-radius: var(--gi-radius-md); border: 1px solid color-mix(in srgb, var(--gi-accent) 32%, transparent); background: var(--gi-accent-soft); font-weight: 600; font-size: var(--gi-font-sm); color: var(--gi-text); }
        .gz2-evening__icon { font-size: 1.15em; line-height: 1; }
        .gz2-evening__text { line-height: 1.4; }
        .gz-scene { display: flex; gap: 18px; align-items: center; background: #E9F7EF; border: 1px solid #C9E9D6; border-radius: 18px; padding: 18px 20px; }
        /* Zones cliquables (more-info par entité) : indices visuels discrets. */
        .gz-scene--clickable { cursor: pointer; transition: transform .12s ease, box-shadow .12s ease; }
        .gz-scene--clickable:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(31,107,58,0.10); }
        .gz-scene--clickable:focus-visible { outline: 2px solid var(--gi-accent); outline-offset: 3px; }
        .gz2-rep__sub { font-size: 11px; color: var(--gi-text-muted, #6B7F74); margin-top: 3px; line-height: 1.3; }
        .gz2-rep--clickable { cursor: pointer; transition: background .12s ease, border-color .12s ease; }
        .gz2-rep--clickable:hover { border-color: color-mix(in srgb, var(--gi-accent) 45%, transparent); background: var(--gi-accent-soft); }
        .gz2-rep--clickable:focus-visible { outline: 2px solid var(--gi-accent); outline-offset: 2px; }
        .gz-scene__art { flex: 0 0 132px; max-width: 132px; }
        .gz-scene__stage { position: relative; border-radius: 16px; overflow: hidden; --gz-sky-edge: #E9F7EF; }
        .gz-scene__sky { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; display: block; }
        .gz-scene__stage > svg:not(.gz-scene__sky) { position: relative; z-index: 1; }
        .gz-scene__art svg { display: block; width: 100%; height: auto; }
        .gz-scene__msg { flex: 1; min-width: 0; }
        .gz-scene__eyebrow { font-size: 12px; font-weight: 600; color: #2E8B57; margin-bottom: 3px; }
        .gz-scene__title { font-size: 23px; font-weight: 600; line-height: 1.15; color: #1D6B3A; margin-bottom: 6px; }
        .gz-scene__text { font-size: 15px; line-height: 1.5; color: #2F5A4B; }
        .gz-scene__pill { display: inline-flex; align-items: center; gap: 7px; margin-top: 11px; background: #fff; border: 1px solid #C9E9D6; border-radius: 999px; padding: 6px 13px; font-size: 13.5px; color: #2F5A4B; }
        .gz-kidtiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
        .gz-kidtile { background: #F2FAF5; border: 1px solid #D7EEE0; border-radius: 14px; padding: 12px 13px; }
        .gz-kidtile__h { display: flex; align-items: center; gap: 6px; color: #2E8B57; font-size: 12px; margin-bottom: 5px; }
        .gz-kidtile__v { font-size: 18px; font-weight: 600; color: #1D6B3A; line-height: 1.15; }
        .gz-kidtile__s { font-size: 12px; color: #5B7A6D; margin-top: 2px; }
        .gz-details { margin-top: 14px; --gi-surface: #F2FAF5; --gi-surface-2: #EAF6EF; --gi-surface-fill: #F2FAF5; --gi-surface-fill-accent: #EAF6EF; --gi-border: #D7EEE0; --gi-border-strong: #B7D8C6; --gi-surface-border: #D7EEE0; --gi-surface-border-strong: #B7D8C6; }
        .gz-details > summary { cursor: pointer; font-size: 13px; color: var(--gi-text-muted, #6b7280); list-style: none; padding: 9px 2px; user-select: none; }
        .gz-details > summary::-webkit-details-marker { display: none; }
        .gz-details > summary::before { content: "›"; display: inline-block; margin-right: 8px; transition: transform .2s ease; }
        .gz-details[open] > summary::before { transform: rotate(90deg); }
        @media (max-width: 480px) { .gz-kidtiles { grid-template-columns: 1fr; } .gz-scene { flex-direction: column; text-align: center; } .gz-scene__art { flex-basis: auto; } }
        @keyframes gz-sway { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes gz-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
        @keyframes gz-rise { 0% { transform: translateY(6px); opacity: 0; } 25% { opacity: .6; } 100% { transform: translateY(-50px); opacity: 0; } }
        @keyframes gz-wave { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-11px); } }
        @keyframes gz-blink { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(.12); } }
        @keyframes gz-drop { 0% { transform: translateY(-6px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(34px); opacity: 0; } }
        .gz-grass { transform-box: fill-box; transform-origin: center bottom; animation: gz-sway 3.4s ease-in-out infinite; }
        .gz-face { transform-box: fill-box; transform-origin: center; animation: gz-bob 3.4s ease-in-out infinite; }
        .gz-eyes { transform-box: fill-box; transform-origin: center; animation: gz-blink 4.6s ease-in-out infinite; }
        .gz-wv { transform-box: fill-box; animation: gz-wave 3.8s ease-in-out infinite; }
        .gz-b { transform-box: fill-box; animation: gz-rise 3.6s ease-in infinite; }
        .gz-b.b2 { animation-delay: 1.2s; }
        .gz-b.b3 { animation-delay: 2.3s; }
        .gz-drop { transform-box: fill-box; animation: gz-drop 1.4s ease-in infinite; }
        .gz-drop.d2 { animation-delay: .5s; }
        .gz-drop.d3 { animation-delay: .9s; }
        @media (prefers-reduced-motion: reduce) { .gz-grass, .gz-face, .gz-eyes, .gz-wv, .gz-b, .gz-drop { animation: none; } }
        .gz-adv { margin-top: 12px; }
        .gz-adv__title { font-size: 12px; font-weight: 600; color: #2E8B57; margin: 12px 0 8px; }
        .gz-advtiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
        .gz-advtile { display: block; width: 100%; text-align: left; background: #F2FAF5; border: 1px solid #D7EEE0; border-radius: 14px; padding: 12px 13px; cursor: pointer; font: inherit; color: inherit; transition: border-color .15s ease; }
        .gz-advtile:hover { border-color: #9FCBB4; }
        .gz-advtile__label { font-size: 12px; color: #2E8B57; margin-bottom: 4px; }
        .gz-advtile__value { font-size: 18px; font-weight: 600; color: #1D6B3A; line-height: 1.2; }
        .gz-advtile__sub { font-size: 11.5px; color: #6E8C7F; margin-top: 4px; line-height: 1.45; }
        @keyframes gz-spin { to { transform: rotate(360deg); } }
        .gz-spin { transform-box: fill-box; transform-origin: center; animation: gz-spin 16s linear infinite; }
        @keyframes gz-mow { 0%,100% { transform: translateX(-1px) rotate(-0.9deg); } 50% { transform: translateX(1.3px) rotate(0.9deg); } }
        .gz-mow { transform-box: view-box; transform-origin: 75px 132px; animation: gz-mow 0.55s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .gz-spin, .gz-mow { animation: none; } }
        /* Décor météo animé (derrière la mascotte) */
        @keyframes gz-drift { 0% { transform: translateX(-10px); } 100% { transform: translateX(12px); } }
        @keyframes gz-rainfall { 0% { transform: translate(3px, -14px); opacity: 0; } 25% { opacity: .9; } 100% { transform: translate(-3px, 18px); opacity: 0; } }
        @keyframes gz-snowfall { 0% { transform: translate(-2px, -10px); opacity: 0; } 25% { opacity: 1; } 100% { transform: translate(3px, 22px); opacity: 0; } }
        @keyframes gz-twinkle { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
        @keyframes gz-shimmer { 0%,100% { transform: translateY(0); opacity: .35; } 50% { transform: translateY(-3px); opacity: .55; } }
        .gz-drift { transform-box: view-box; animation: gz-drift 9s ease-in-out infinite alternate; }
        .gz-drift--2 { animation-duration: 13s; animation-delay: -4s; }
        .gz-rain line { transform-box: view-box; animation: gz-rainfall 1s linear infinite; }
        .gz-snow circle { transform-box: view-box; animation: gz-snowfall 2.6s linear infinite; }
        .gz-twinkle { transform-box: fill-box; animation: gz-twinkle 2.4s ease-in-out infinite; }
        .gz-shimmer { transform-box: view-box; animation: gz-shimmer 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .gz-drift, .gz-rain line, .gz-snow circle, .gz-twinkle, .gz-shimmer { animation: none; } }
        .gz-details .gz2-card, .gz-details .gz2-rep { background: #F2FAF5 !important; border: 1px solid #D7EEE0 !important; border-radius: 14px !important; }
        .gz-details .gz2-card:hover { border-color: #9FCBB4 !important; }
        .gz-details .gz2-card__label, .gz-details .gz2-rep__label, .gz-details .gz2-eyebrow, .gz-details .gz2-eyebrow--section { color: #2E8B57 !important; }
        .gz-details .gz2-rep__value { color: #1D6B3A !important; }
        .gz-details .gz2-rep { padding: 16px 18px !important; }
        .gz-details .gz2-reperes { gap: 12px !important; }
        .gz-details .gz2-meter { background: #F2FAF5 !important; border: 1px solid #D7EEE0 !important; border-radius: 14px !important; }
        .gz2-card--static { background: #F2FAF5 !important; border: 1px solid #D7EEE0 !important; border-radius: 14px !important; }
        .gz2-card--static .gz2-card__label { color: #2E8B57 !important; }
        footer.footer { background: #F7FBF9 !important; border: 1px solid #D7EEE0 !important; border-radius: 12px !important; color: #6E8C7F !important; padding: 10px 14px !important; }

        /* === Mode sombre de la refonte ludique (sinon plaques claires sur fond noir) === */
        .card--theme-dark .gz-scene__stage { --gz-sky-edge: #11231B; }
        .card--theme-dark .gz-scene { background: #14241C; border-color: #2B4A39; }
        .card--theme-dark .gz-scene__eyebrow { color: #74D3A0; }
        .card--theme-dark .gz-scene__title { color: #A9E9C6; }
        .card--theme-dark .gz-scene__text { color: #BFD7CC; }
        .card--theme-dark .gz-scene__pill { background: #1C3328; border-color: #2F5141; color: #CFE6DA; }
        .card--theme-dark .gz-kidtile { background: #15271E; border-color: #2A4838; }
        .card--theme-dark .gz-kidtile__h { color: #74D3A0; }
        .card--theme-dark .gz-kidtile__v { color: #A9E9C6; }
        .card--theme-dark .gz-kidtile__s { color: #8FB0A1; }
        .card--theme-dark .gz2-nav { background: #14241C; border-color: #2B4A39; }
        .card--theme-dark .gz2-nav__item { color: #8FB6A1; }
        .card--theme-dark .gz2-nav__item:hover { background: #1C3328; color: #A9E9C6; border-color: #2F5141; }
        .card--theme-dark .gz2-nav__item--active,
        .card--theme-dark .gz2-nav__item--active:hover { background: #22402F; color: #CFF2DD; border-color: #3C6A52; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
        .card--theme-dark .gz-details { --gi-surface: #14241C; --gi-surface-2: #182C22; --gi-surface-fill: #14241C; --gi-surface-fill-accent: #182C22; --gi-border: #2B4A39; --gi-border-strong: #386B52; --gi-surface-border: #2B4A39; --gi-surface-border-strong: #386B52; }
        .card--theme-dark .gz-details > summary { color: #8FB6A1; }
        .card--theme-dark .gz-details .gz2-card,
        .card--theme-dark .gz-details .gz2-rep,
        .card--theme-dark .gz-details .gz2-meter,
        .card--theme-dark .gz2-card--static { background: #15271E !important; border-color: #2A4838 !important; }
        .card--theme-dark .gz-details .gz2-card:hover { border-color: #3C6A52 !important; }
        .card--theme-dark .gz-details .gz2-card__label,
        .card--theme-dark .gz-details .gz2-rep__label,
        .card--theme-dark .gz-details .gz2-eyebrow,
        .card--theme-dark .gz-details .gz2-eyebrow--section,
        .card--theme-dark .gz2-card--static .gz2-card__label { color: #74D3A0 !important; }
        .card--theme-dark .gz-details .gz2-rep__value { color: #A9E9C6 !important; }
        .card--theme-dark .gz-advtile { background: #15271E; border-color: #2A4838; }
        .card--theme-dark .gz-advtile:hover { border-color: #3C6A52; }
        .card--theme-dark .gz-advtile__label { color: #74D3A0; }
        .card--theme-dark .gz-advtile__value { color: #A9E9C6; }
        .card--theme-dark .gz-advtile__sub { color: #8FB0A1; }
        .card--theme-dark footer.footer { background: #15271E !important; border-color: #2A4838 !important; color: #8FB0A1 !important; }
        .card--theme-dark .tab-panel__temperature-constraint { background: #16271E; border-color: #2B4A39; }
        .card--theme-dark .tab-panel__temperature-constraint--success { background: #14271D; border-color: #2E5A40; }
        .card--theme-dark .tab-panel__temperature-constraint--warning { background: #2A2415; border-color: #5A4A24; }
        .card--theme-dark .tab-panel__temperature-constraint--danger { background: #2A1A18; border-color: #5A2F2C; }
        .card--theme-dark .tab-panel__history-rail-body { scrollbar-color: #386B52 transparent; }
        .card--theme-dark .tab-panel__history-rail-body::-webkit-scrollbar-thumb { background: #386B52; }

        /* Basé sur la largeur de la CARTE (pas du navigateur) : header lisible
           même quand la carte est étroite dans un dashboard large. */
        @container (max-width: 560px) {
          .gz2-header { flex-wrap: wrap; }
          .gz2-header__meta { width: 100%; justify-content: space-between; }
        }

        /* ── Historique ──────────────────────────────────────────────────── */

        .gi-hist { display: flex; flex-direction: column; gap: 14px; margin-top: 4px; }

        .gi-stat-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .gi-stat-card {
          background: var(--gi-bg);
          border: 0.5px solid var(--gi-border);
          border-radius: var(--gi-radius-md);
          padding: 10px 12px;
        }

        .gi-stat-card__label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .07em;
          font-weight: 600;
          color: var(--gi-text-muted);
          margin-bottom: 4px;
        }

        .gi-stat-card__value {
          font-size: var(--gi-font-lg);
          font-weight: 500;
          color: var(--gi-text);
          line-height: 1.1;
        }

        .gi-stat-card__sub {
          font-size: 10px;
          color: var(--gi-text-muted);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gi-zone-bars { display: flex; flex-direction: column; gap: 5px; }

        .gi-zone-bar-row {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 20px;
        }

        .gi-zone-badge {
          font-size: 9px;
          font-family: monospace;
          font-weight: 700;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
          min-width: 26px;
          text-align: center;
          line-height: 1.4;
        }

        .gi-zone-track {
          flex: 1;
          height: 10px;
          border-radius: 5px;
          background: var(--gi-surface-2);
          position: relative;
          overflow: hidden;
        }

        .gi-zone-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: 5px;
          opacity: .85;
          transition: width .4s ease;
        }

        .gi-zone-bar-meta {
          font-size: 10px;
          color: var(--gi-text-muted);
          min-width: 36px;
          text-align: right;
          flex-shrink: 0;
        }

        .gi-zone-bar-axis {
          display: flex;
          justify-content: flex-end;
          padding-left: 34px;
          font-size: 9px;
          color: var(--gi-text-muted);
          margin-top: 1px;
        }

        .gi-hist-entries { display: flex; flex-direction: column; gap: 6px; }

        .gi-hist-section-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: var(--gi-text-muted);
          margin-bottom: 2px;
        }

        .gi-hist-entry {
          background: var(--gi-bg);
          border: 0.5px solid var(--gi-border);
          border-radius: var(--gi-radius-md);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gi-hist-entry--skip {
          background: transparent;
          border-style: dashed;
          opacity: .72;
        }

        .gi-hist-entry__body { flex: 1; min-width: 0; }

        .gi-hist-entry__name {
          font-size: 12px;
          font-weight: 500;
          color: var(--gi-text);
          line-height: 1.2;
        }

        .gi-hist-entry--skip .gi-hist-entry__name { color: var(--gi-text-muted); }

        .gi-hist-entry__meta {
          font-size: 10px;
          color: var(--gi-text-muted);
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .gi-hist-entry__right { text-align: right; flex-shrink: 0; }

        .gi-hist-entry__val {
          font-size: 12px;
          font-weight: 500;
          color: var(--gi-text);
          line-height: 1.2;
        }

        .gi-hist-entry--skip .gi-hist-entry__val { color: var(--gi-text-muted); }

        .gi-hist-entry__sub {
          font-size: 10px;
          color: var(--gi-text-muted);
          margin-top: 1px;
        }

        .gi-hist-badge {
          font-size: 9px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 99px;
          border: 0.5px solid;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .gi-hist-badge--ok {
          background: color-mix(in srgb, var(--gi-status-success) 12%, transparent);
          color: var(--gi-status-success);
          border-color: color-mix(in srgb, var(--gi-status-success) 30%, transparent);
        }

        .gi-hist-badge--skip {
          background: var(--gi-surface-2);
          color: var(--gi-text-muted);
          border-color: var(--gi-border);
        }

        .gi-hist-badge--block {
          background: color-mix(in srgb, var(--gi-status-warning) 12%, transparent);
          color: var(--gi-status-warning);
          border-color: color-mix(in srgb, var(--gi-status-warning) 30%, transparent);
        }

        .card--theme-dark .gi-stat-card { background: #14241C; border-color: #2B4A39; }
        .card--theme-dark .gi-hist-entry { background: #14241C; border-color: #2B4A39; }
        .card--theme-dark .gi-hist-entry--skip { background: transparent; }
        .card--theme-dark .gi-zone-track { background: #1C3328; }
`;

