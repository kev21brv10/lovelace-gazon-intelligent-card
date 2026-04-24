const CARD_STYLES = String.raw`
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
          --gi-action-min-height: 84px;
          --gi-action-gap: 12px;
          --gi-action-radius: 22px;
          --gi-action-icon-size: 26px;
          --gi-action-icon-glyph-size: 16px;
          --gi-action-icon-bg: rgba(255, 255, 255, 0.2);
          --gi-decision-grid-gap: 10px;
          --gi-tiles-gap: 6px;
          --gi-card-core-gap: 12px;
          --gi-card-core-padding: 15px 16px;
          --gi-card-core-min-height: 88px;
          --gi-card-core-radius: 24px;
          --gi-card-core-icon-size: 22px;
          --gi-card-core-icon-glyph-size: 13px;
          --gi-card-core-secondary-size: 0.74rem;
          --gi-surface-border: color-mix(in srgb, var(--gazon-section-accent) 16%, rgba(255, 255, 255, 0.08));
          --gi-surface-border-strong: color-mix(in srgb, var(--gazon-section-accent) 30%, rgba(255, 255, 255, 0.16));
          --gi-surface-fill:
            linear-gradient(180deg, color-mix(in srgb, #1a2028 96%, var(--gazon-section-accent) 4%) 0%, color-mix(in srgb, #0f1217 98%, black) 100%);
          --gi-surface-fill-accent:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 18%, #1a2028) 0%, color-mix(in srgb, #0f1217 98%, black) 100%);
          --gi-surface-shadow: 0 12px 26px rgba(0, 0, 0, 0.28);
          --gi-surface-shadow-strong: 0 22px 46px rgba(0, 0, 0, 0.42);
          --gi-tab-accent: var(--gazon-section-accent);
          --gi-tab-companion: var(--gazon-water-color, #44c8ea);
          --gi-tab-glow-color: var(--gazon-section-accent);
          --gi-tab-mist-color: var(--gazon-lawn-color, #80da67);
          --gi-tab-shadow: 0 18px 36px color-mix(in srgb, var(--gi-tab-glow-color) 14%, transparent);
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
        .gi-panel,
        .gi-tab,
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

        .gi-row {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
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

        .gi-tabs,
        .tab-nav,
        .section-nav {
          display: flex;
          gap: var(--gi-nav-gap);
          flex-wrap: nowrap;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-padding-inline: 10px;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
          max-width: 100%;
          scrollbar-width: none;
          padding-inline: 10px;
          padding-bottom: 2px;
          margin: var(--gi-nav-margin);
          scroll-snap-type: x proximity;
        }

        .gi-tabs::-webkit-scrollbar,
        .tab-nav::-webkit-scrollbar,
        .section-nav::-webkit-scrollbar {
          display: none;
        }

        .gi-tab,
        .tab-nav__item,
        .section-nav__item {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--gi-nav-item-gap);
          flex: 0 0 auto;
          min-width: 0;
          border: 1px solid var(--gi-surface-border);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 12%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
          color: var(--secondary-text-color);
          border-radius: 12px;
          padding: var(--gi-nav-item-padding);
          font-size: var(--gi-font-xxs);
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          box-shadow: var(--gi-surface-shadow);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
          scroll-snap-align: start;
          overflow: hidden;
        }

        .gi-tab::before,
        .tab-nav__item::before,
        .section-nav__item::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--gi-tab-companion) 16%, transparent) 0%, transparent 28%),
            linear-gradient(135deg, color-mix(in srgb, var(--gi-tab-accent) 10%, transparent) 0%, transparent 100%);
          opacity: 0;
          transition: opacity var(--gi-motion-fast) var(--gi-ease-standard);
          pointer-events: none;
        }

        .gi-tab:hover,
        .tab-nav__item:hover,
        .section-nav__item:hover {
          background: color-mix(in srgb, var(--secondary-background-color) 62%, var(--gi-tab-accent) 38%);
          border-color: var(--gi-surface-border-strong);
          box-shadow: var(--gi-surface-shadow-strong);
          transform: translateY(-1px);
        }

        .gi-tab:hover::before,
        .tab-nav__item:hover::before,
        .section-nav__item:hover::before {
          opacity: 1;
        }

        .gi-tab .gi-icon,
        .tab-nav__item .gi-icon,
        .section-nav__item .gi-icon {
          width: 18px;
          height: 18px;
        }

        .gi-tab--active,
        .tab-nav__item--active,
        .section-nav__item--active {
          color: var(--primary-text-color);
          border-color: var(--gi-surface-border-strong);
          background:
            radial-gradient(circle at 16% 18%, color-mix(in srgb, var(--gi-tab-companion) 18%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 26%, transparent) 0%, transparent 100%),
            color-mix(in srgb, var(--secondary-background-color) 96%, white);
          box-shadow:
            0 10px 26px rgba(0, 0, 0, 0.12),
            0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 16%, transparent),
            0 0 28px color-mix(in srgb, var(--gi-tab-glow-color) 12%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transform: translateY(-1px);
        }

        .gi-tab--active::before,
        .tab-nav__item--active::before,
        .section-nav__item--active::before {
          opacity: 1;
        }

        .tab-panel,
        .gi-panel {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: gi-fade-up var(--gi-motion-fast) var(--gi-ease-soft);
          will-change: transform, opacity;
        }

        .tab-panel > * {
          animation: gi-panel-reveal 420ms var(--gi-ease-soft) both;
        }

        .tab-panel > *:nth-child(1) { animation-delay: 0ms; }
        .tab-panel > *:nth-child(2) { animation-delay: 40ms; }
        .tab-panel > *:nth-child(3) { animation-delay: 80ms; }
        .tab-panel > *:nth-child(4) { animation-delay: 120ms; }
        .tab-panel > *:nth-child(5) { animation-delay: 160ms; }

        .tab-panel__hero,
        .tab-panel__section,
        .tab-panel__block {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--gi-surface-border);
          border-radius: 24px;
          background:
            radial-gradient(circle at 92% 8%, color-mix(in srgb, var(--gi-tab-companion) 10%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 6%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          padding: 15px 16px;
          box-shadow: var(--gi-surface-shadow);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tab-panel__hero {
          gap: 10px;
          border-color: var(--gi-surface-border-strong);
          background:
            radial-gradient(circle at 82% 0%, color-mix(in srgb, var(--gi-tab-companion) 14%, transparent) 0%, transparent 28%),
            radial-gradient(circle at 12% 88%, color-mix(in srgb, var(--gi-tab-mist-color) 16%, transparent) 0%, transparent 32%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 10%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill-accent);
          box-shadow:
            var(--gi-surface-shadow-strong),
            0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 12%, transparent),
            0 14px 34px color-mix(in srgb, var(--gi-tab-glow-color) 10%, transparent);
        }

        .tab-panel--intervention .tab-panel__hero {
          gap: 10px;
        }

        .tab-panel--intervention .tab-panel__hero-next {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.18;
        }

        .tab-panel--intervention .tab-panel__hero-hint {
          max-width: 68ch;
        }

        .tab-panel__hero--pulse {
          animation: gazonPulseSoft 2.8s ease-in-out infinite;
        }

        .tab-panel__hero-top,
        .tab-panel__header,
        .tab-panel__section-head {
          display: flex;
          flex-direction: var(--gi-inline-direction);
          align-items: var(--gi-inline-align);
          justify-content: var(--gi-inline-justify);
          gap: var(--gi-inline-gap);
          min-width: 0;
        }

        .tab-panel__hero-summary,
        .tab-panel__title,
        .tab-panel__section-summary,
        .tab-panel__block-value {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .tab-panel__hero-summary {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 800;
          line-height: 1.2;
          color: var(--secondary-text-color);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__section-hint,
        .tab-panel__section-meta,
        .tab-panel__section-title,
        .tab-panel__eyebrow,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          color: var(--secondary-text-color);
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
        .tab-panel__section-hint,
        .tab-panel__header-hint,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .tab-panel__hero-next {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.18;
          color: var(--primary-text-color);
          letter-spacing: -0.01em;
        }

        .tab-panel__hero-hint {
          max-width: 72ch;
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-color: var(--gi-surface-border);
        }

        .tab-panel__section--overview-facts,
        .tab-panel__section--mowing-summary,
        .tab-panel__section--intervention-overview,
        .tab-panel__section--intervention-technical {
          gap: 8px;
        }

        .tab-panel__section-title {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .tab-panel__header-hint {
          margin-top: 4px;
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xxs);
          line-height: 1.3;
        }

        .tab-panel__section-summary {
          font-size: var(--gi-font-md);
          font-weight: 750;
          line-height: 1.28;
          letter-spacing: -0.01em;
        }

        .tab-panel__summary-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: 0;
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
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--secondary-text-color);
          line-height: 1.15;
        }

        .tab-panel__summary-value {
          min-width: 0;
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--tab-panel-summary-value-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__summary-note {
          min-width: 0;
          font-size: var(--gi-font-xs);
          line-height: 1.35;
          color: var(--secondary-text-color);
          overflow-wrap: anywhere;
        }

        .tab-panel__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .tab-panel__field-label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
        }

        .tab-panel__workflow {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
        }

        .tab-panel__workflow-step {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 6px 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--gi-surface-border));
          border-radius: 14px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 12%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, black) 100%);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.10);
          color: var(--secondary-text-color);
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .tab-panel__workflow-step--active {
          color: var(--primary-text-color);
          border-color: var(--gi-surface-border-strong);
        }

        .tab-panel__workflow-step--done {
          color: var(--primary-text-color);
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 30%, var(--gi-surface-border-strong));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 15%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 95%, black) 100%);
        }

        .tab-panel__workflow-index {
          display: inline-grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
          color: var(--primary-text-color);
          font-size: 10px;
          font-weight: 900;
          flex: none;
        }

        .tab-panel__workflow-connector {
          flex: 1 1 auto;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--gazon-section-accent) 38%, transparent), color-mix(in srgb, var(--gazon-section-accent) 8%, transparent));
          min-width: 12px;
        }

        .tab-panel__workflow-label {
          white-space: nowrap;
        }

        .tab-panel__intervention-workflow {
          gap: 10px;
        }

        .tab-panel__decision-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 2px;
        }

        .tab-panel__intervention-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 12px;
          align-items: stretch;
        }

        .tab-panel__intervention-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          padding: 14px 15px;
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 96%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 12px 26px rgba(0, 0, 0, 0.12);
        }

        .tab-panel__intervention-card--picker {
          border-color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 10% 12%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 6%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
        }

        .tab-panel__intervention-card--action {
          justify-content: center;
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 8% 12%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 10%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 5%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 91%, black) 100%);
        }

        .tab-panel__intervention-card .tab-panel__section-head {
          margin-bottom: 0;
        }

        .tab-panel__intervention-card .tab-panel__section-summary {
          font-size: var(--gi-font-sm);
        }

        .tab-panel__intervention-card .tab-panel__section-hint {
          font-size: var(--gi-font-xs);
        }

        .tab-panel__intervention-card--picker .tab-panel__section-summary,
        .tab-panel__intervention-card--picker .tab-panel__section-hint {
          color: color-mix(in srgb, var(--primary-text-color) 88%, var(--gazon-water-color, #44c8ea));
        }

        .tab-panel__intervention-card--action .tab-panel__section-summary,
        .tab-panel__intervention-card--action .tab-panel__section-hint {
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
          border: 1px solid var(--gi-surface-border);
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 96%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
        }

        .tab-panel__temperature-constraint--success {
          border-color: color-mix(in srgb, var(--gazon-success-color, #4fc38c) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color, #4fc38c) 6%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__temperature-constraint--warning {
          border-color: color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color, #d6a34f) 6%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
        }

        .tab-panel__temperature-constraint--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color, #e16b73) 18%, var(--divider-color));
          background:
            radial-gradient(circle at 12% 50%, color-mix(in srgb, var(--gazon-danger-color, #e16b73) 10%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-danger-color, #e16b73) 6%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
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

        .tab-panel__intervention-card--action .tab-panel__cta {
          width: 100%;
          min-height: 76px;
          border-radius: 14px;
        }

        .tab-panel__select-shell {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 0;
          border: 1px solid color-mix(in srgb, var(--gazon-water-color, #44c8ea) 16%, var(--gi-surface-border-strong));
          border-radius: 16px;
          padding: 7px 12px 7px 10px;
          background:
            radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent) 0%, transparent 18%),
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 97%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 90%, black) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
          gap: 10px;
          min-height: 52px;
        }

        .tab-panel__select-prefix {
          display: inline-grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent);
          color: var(--primary-text-color);
          flex: none;
        }

        .tab-panel__select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 100%;
          min-width: 0;
          min-height: 32px;
          border: 0;
          border-radius: 0;
          padding: 4px 34px 4px 0;
          background: transparent;
          color: var(--primary-text-color);
          box-shadow: none;
          font: inherit;
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.2;
          cursor: pointer;
          outline: none;
        }

        .tab-panel__select:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .tab-panel__select:focus-visible {
          border-color: color-mix(in srgb, var(--gazon-water-color, #44c8ea) 42%, var(--gi-surface-border-strong));
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 24%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .tab-panel__intervention-card--action .tab-panel__cta {
          letter-spacing: 0.015em;
        }

        .tab-panel__select-chevron {
          position: absolute;
          inset-inline-end: 12px;
          pointer-events: none;
          color: var(--secondary-text-color);
          opacity: 0.88;
        }

        .tab-panel__section--intervention-picker,
        .tab-panel__section--application-history {
          gap: 10px;
        }

        .tab-panel__debug-foldout {
          display: block;
          margin-top: 10px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          border-radius: 18px;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
          box-shadow: var(--gi-surface-shadow);
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

        .tab-panel__grid {
          display: grid;
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
          align-items: stretch;
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--priority,
        .tab-panel__grid--featured,
        .tab-panel__grid--decision-board {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-flow: dense;
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

        .tab-panel__grid--config {
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
        }

        .tab-panel__grid--products {
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .tab-panel__grid--featured {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .tab-panel__grid--config-top,
        .tab-panel__grid--config-debits {
          grid-template-columns: var(--gi-grid-template);
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--config-top {
          gap: var(--gi-grid-gap);
        }

        .tab-panel__grid--config-debits {
          gap: var(--gi-grid-gap);
        }

        .tab-panel__section--config-debits {
          gap: 10px;
        }

        .tab-panel__section--config-quick {
          gap: 10px;
        }

        .tab-panel__section--products {
          gap: 7px;
        }

        .tab-panel__section--products .gi-card-core--stat {
          min-height: 72px;
        }

        .tab-panel__section--application-history {
          min-height: 100%;
        }

        .tab-panel__chips {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: flex-start;
          gap: 8px;
          margin-top: 2px;
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

        .gi-progress__bar--critical {
          background: linear-gradient(90deg, color-mix(in srgb, #ff5a5f 70%, white), #ff5a5f);
          box-shadow: 0 0 12px rgba(255, 90, 95, 0.28);
        }

        .tab-progress__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
        }

        .gi-action--primary {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gi-action-gap);
          width: var(--gi-action-width);
          min-height: 72px;
          padding-inline: var(--gi-action-padding-inline) var(--gi-action-padding-inline-end);
          padding-block: var(--gi-action-padding-block);
          border: 1px solid var(--gi-surface-border-strong);
          border-radius: 20px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: var(--gi-font-lg);
          letter-spacing: 0.01em;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-card-accent) 95%, white) 0%, color-mix(in srgb, var(--gazon-section-accent) 88%, black) 100%);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent),
            0 0 24px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 16%, transparent);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          overflow: hidden;
        }

        .gi-action--primary::after {
          content: "›";
          margin-left: auto;
          font-size: var(--gi-font-2xl);
          line-height: 1;
          opacity: 0.94;
          flex: none;
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

        .gi-action--primary:disabled {
          cursor: not-allowed;
          color: var(--secondary-text-color);
          text-shadow: none;
          background:
            linear-gradient(
              135deg,
              color-mix(in srgb, var(--card-background-color, #ffffff) 96%, var(--gazon-card-accent) 4%) 0%,
              color-mix(in srgb, var(--card-background-color, #ffffff) 88%, var(--divider-color, #d8dde3) 12%) 100%
            );
          border-color: color-mix(in srgb, var(--divider-color, #d8dde3) 78%, transparent);
          box-shadow: none;
          filter: grayscale(0.15);
          opacity: 0.84;
        }

        .gi-action--primary:disabled .gi-icon {
          background: color-mix(in srgb, var(--divider-color, #d8dde3) 48%, transparent);
        }

        .gi-action--danger {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gi-action-gap);
          width: var(--gi-action-width);
          min-height: 72px;
          padding-inline: var(--gi-action-padding-inline) var(--gi-action-padding-inline-end);
          padding-block: var(--gi-action-padding-block);
          border: 1px solid color-mix(in srgb, var(--gazon-danger-color, #f15f69) 54%, var(--gi-surface-border-strong));
          border-radius: 20px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: var(--gi-font-lg);
          letter-spacing: 0.01em;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-danger-color, #f15f69) 97%, white) 0%, color-mix(in srgb, var(--gazon-danger-color, #c62828) 86%, black) 100%);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 18%, transparent),
            0 0 24px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 14%, transparent);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          overflow: hidden;
        }

        .gi-action--danger::after {
          content: "›";
          margin-left: auto;
          font-size: var(--gi-font-2xl);
          line-height: 1;
          opacity: 0.94;
          flex: none;
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

        .gi-action--danger:disabled {
          cursor: not-allowed;
          opacity: 0.62;
          filter: grayscale(0.2);
          box-shadow: none;
        }

        @media (hover: hover) {
          .gi-action--primary:hover {
              border-color: color-mix(in srgb, var(--gazon-card-accent) 52%, var(--divider-color));
            box-shadow:
              0 18px 34px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
          .gi-action--danger:hover:not(:disabled) {
            border-color: color-mix(in srgb, var(--gazon-danger-color, #f15f69) 60%, var(--divider-color));
            box-shadow:
              0 18px 34px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-danger-color, #f15f69) 18%, transparent);
          }
        }

        .gi-action {
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .gi-config-action {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          text-align: inherit;
        }

        .gi-config-action .gi-card-core {
          width: 100%;
        }

        @media (hover: hover) {
          .gi-config-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-config-action:focus-visible {
          outline: none;
        }

        .gi-config-action:focus-visible .gi-card-core {
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--gazon-card-accent) 38%, transparent),
            var(--gi-surface-shadow-strong);
        }

        .gi-overview-action {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          border: 0;
          padding: 0;
          margin: 0;
          background: transparent;
          text-align: inherit;
        }

        .gi-overview-action .gi-card-core {
          width: 100%;
        }

        @media (hover: hover) {
          .gi-overview-action:hover .gi-card-core {
              box-shadow: var(--gi-surface-shadow-strong);
          }
        }

        .gi-overview-action:focus-visible {
          outline: none;
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

        .gi-info--main {
          border-color: var(--gi-surface-border);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 10%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 9%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .gi-info--secondary {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 6%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 3%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
        }

        .gi-alert--critical {
          animation: gi-pulse 1.8s ease-out infinite;
        }

        .tab-panel__block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tab-panel__block--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent);
        }

        .tab-panel__block--neutral {
          border-color: rgba(127, 127, 127, 0.15);
        }

        .decision-hero,
        .decision-plan,
        .decision-context,
        .decision-block,
        .decision-footer {
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

        .decision-hero--pulse {
          animation: gazonPulseSoft 2.8s ease-in-out infinite;
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

        .decision-plan__label,
        .decision-context__label,
        .decision-block__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
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
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }

        .decision-plan__meta {
          font-size: var(--gi-font-xs);
          color: var(--secondary-text-color);
          white-space: nowrap;
        }

        .decision-plan__summary {
          font-size: var(--gi-font-md);
          font-weight: 800;
          line-height: 1.26;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .decision-plan__chips,
        .decision-context__grid {
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
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 96%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 92%, black) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 5px 12px rgba(0, 0, 0, 0.05);
          min-width: 0;
          box-sizing: border-box;
        }

        .gi-pill--status {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 18%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 8%, transparent) 100%);
          color: var(--primary-text-color);
        }

        .gi-pill--context {
          gap: 8px;
          min-height: 32px;
          padding: 4px 12px 4px 8px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-card-accent) 18%, transparent) 0%, color-mix(in srgb, var(--gazon-card-accent) 8%, transparent) 100%);
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
          background: color-mix(in srgb, var(--gazon-card-accent) 14%, transparent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
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
          font-weight: 700;
          line-height: 1.12;
          overflow-wrap: anywhere;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gi-pill--danger {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-danger-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-danger-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-danger-color) 24%, transparent);
        }

        .gi-pill--critical {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-critical-color) 18%, transparent) 0%, color-mix(in srgb, var(--gazon-critical-color) 10%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-critical-color) 28%, transparent);
        }

        .gi-pill--warning {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-warning-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-warning-color) 24%, transparent);
        }

        .gi-pill--success {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-success-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-success-color) 24%, transparent);
        }

        .gi-pill--accent {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-accent-tone-color) 14%, transparent) 0%, color-mix(in srgb, var(--gazon-accent-tone-color) 7%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 24%, transparent);
        }

        .gi-pill--neutral {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 98%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
          border-color: color-mix(in srgb, var(--divider-color) 70%, var(--gazon-section-accent) 10%);
        }

        .decision-context {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tab-panel__section--debug-intervention {
          gap: 12px;
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

        .decision-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .decision-block--danger {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 22%, transparent);
        }

        .decision-block__value {
          font-size: var(--gi-font-sm);
          font-weight: 700;
          line-height: 1.32;
          overflow-wrap: anywhere;
        }

        .decision-block__hint {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .decision-footer {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .decision-advanced {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }

        .advanced-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 14px;
          border-radius: calc(var(--gazon-border-radius) - 8px);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, var(--divider-color));
          background:
            radial-gradient(circle at 92% 10%, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 28%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 8%, transparent), transparent 36%),
            color-mix(in srgb, var(--card-background-color) 86%, var(--gi-tab-accent) 4%);
        }

        .advanced-group__head {
          display: grid;
          gap: 4px;
        }

        .advanced-group__eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        .advanced-group__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary-text-color);
        }

        .advanced-group__meta {
          font-size: var(--gi-font-sm);
          line-height: 1.4;
          color: var(--secondary-text-color);
          max-width: 72ch;
        }

        .advanced-group__grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
          background:
            radial-gradient(circle at 10% 8%, color-mix(in srgb, var(--gi-tab-companion) 10%, transparent) 0%, transparent 24%),
            radial-gradient(circle at 90% 0%, color-mix(in srgb, var(--gi-tab-mist-color) 12%, transparent) 0%, transparent 28%),
            var(--gi-theme-base, var(--secondary-background-color));
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 18%, var(--divider-color));
          box-shadow:
            0 14px 34px rgba(0, 0, 0, 0.14),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 8%, transparent),
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            var(--ha-card-box-shadow, none);
          overflow: hidden;
          padding: var(--gazon-card-padding);
          position: relative;
          isolation: isolate;
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
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--gi-tab-companion) 12%, var(--gi-tab-mist-color) 44%, var(--gi-tab-accent) 68%, transparent 100%);
          opacity: 0.9;
          z-index: 0;
        }

        .card--gradient::after {
          content: "";
          position: absolute;
          inset: -8% -12% auto auto;
          width: 46%;
          height: 46%;
          border-radius: 999px;
          pointer-events: none;
          background:
            radial-gradient(circle, color-mix(in srgb, var(--gi-tab-companion) 18%, transparent) 0%, color-mix(in srgb, var(--gi-tab-accent) 8%, transparent) 38%, transparent 72%);
          opacity: 0.68;
          z-index: 0;
          filter: blur(14px);
          animation: gi-card-ambient 10s ease-in-out infinite;
        }

        .card--solid {
          background: transparent;
        }

        .card--glass {
          backdrop-filter: blur(12px);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 26%),
            color-mix(in srgb, var(--card-background-color, #1f1f1f) 84%, var(--secondary-background-color) 16%);
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

        .header--clickable,
        .hero__lead[data-action-target="primary"] {
          cursor: pointer;
        }

        .card,
        .gi-card,
        .header,
        .gi-action,
        .hero__lead,
        .gi-tab,
        .tab-nav__item,
        .gi-info,
        .gi-pill--status,
        .gi-pill--context,
        .gi-panel,
        .gi-progress__bar {
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard),
            color var(--gi-motion-fast) var(--gi-ease-standard);
        }

        @media (hover: hover) {
          .hero__lead:hover,
          .gi-action:hover,
          .gi-tab:hover,
          .tab-nav__item:hover {
          }

          .tab-panel__hero:hover,
          .tab-panel__section:hover,
          .advanced-group:hover,
          .gi-card-core:hover,
          .hero__lead:hover {
            transform: translateY(-2px);
            box-shadow:
              var(--gi-surface-shadow-strong),
              0 0 0 1px color-mix(in srgb, var(--gi-tab-glow-color) 10%, transparent);
          }
        }

        .header__title-wrap {
          display: flex;
          gap: 10px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }

        .header__meta {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 6px;
          min-width: 0;
          margin-left: auto;
        }

        .header__weather {
          max-width: min(240px, 100%);
          width: 100%;
        }

        .header__weather .gi-pill__value {
          font-size: var(--gi-font-xxs);
          font-weight: 650;
        }

        .header__action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 30px;
          padding: 4px 11px;
          border-radius: 999px;
          border: 1px solid #1e8f55;
          background:
            linear-gradient(135deg, #2ec86f 0%, #19a3ff 100%) !important;
          color: #ffffff !important;
          box-shadow:
            0 12px 24px rgba(30, 143, 85, 0.28),
            0 0 0 1px rgba(30, 143, 85, 0.18);
          font-size: var(--gi-font-xxs);
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
          width: auto;
          flex: 0 0 auto;
          width: 100%;
          max-width: 184px;
          overflow: hidden;
          text-shadow: none;
        }

        .header__action .gi-icon {
          width: 11px;
          height: 11px;
          flex: none;
          background: rgba(255, 255, 255, 0.20);
        }

        .header__action::after {
          content: none;
        }

        .header__action span:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .card--theme-light .header__action {
          background:
            linear-gradient(135deg, #34cf73 0%, #23b2ff 100%) !important;
          border-color: #1e8f55 !important;
          box-shadow:
            0 12px 24px rgba(30, 143, 85, 0.24),
            0 0 0 1px rgba(30, 143, 85, 0.16);
          color: #ffffff !important;
        }

        .card--theme-dark .header__action {
          background:
            linear-gradient(135deg, #1e8f55 0%, #0d6fb3 100%) !important;
          border-color: #0f6a3b !important;
          box-shadow:
            0 12px 24px rgba(0, 0, 0, 0.24),
            0 0 0 1px rgba(30, 143, 85, 0.22);
          color: #f7fff7 !important;
        }

        @media (max-width: 600px) {
          .header__action {
            max-width: 144px;
            padding: 4px 8px;
            font-size: var(--gi-font-xxs);
          }
        }

        .card--theme-light .header__weather {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(0, 0, 0, 0.08));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
        }

        .card--theme-dark .header__weather {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(255, 255, 255, 0.10));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
        }

        .header__icon {
          width: calc(var(--gazon-icon-size) * 1.2);
          height: calc(var(--gazon-icon-size) * 1.2);
          border-radius: 999px;
          display: grid;
          place-items: center;
          color: white;
          background: linear-gradient(145deg, color-mix(in srgb, var(--gi-tab-accent) 84%, white), color-mix(in srgb, var(--gi-tab-companion) 88%, var(--gi-tab-mist-color)));
          box-shadow:
            0 10px 24px color-mix(in srgb, var(--gi-tab-glow-color) 28%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
          flex: none;
        }

        .header__icon--warning { background: var(--gazon-warning-color, #7e9a3c); }
        .header__icon--danger { background: var(--gazon-danger-color, #c62828); }
        .header__icon--success { background: var(--gazon-success-color, #4f8f3a); }
        .header__icon--neutral { background: var(--gazon-neutral-color, #607d8b); }
        .header__icon--accent { background: var(--gazon-accent-tone-color, #2b8c7c); }
        .header__icon--critical { background: var(--gazon-critical-color, #ff1744); }

        .header__icon .gi-icon {
          width: 14px;
          height: 14px;
        }

        .header__titles {
          min-width: 0;
        }

        .header__title {
          font-size: var(--gi-font-xl);
          font-weight: 900;
          line-height: 1.14;
          letter-spacing: -0.01em;
        }

        .header__subtitle {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-xs);
          line-height: 1.28;
        }

        .header__subtitle::before {
          content: "";
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          margin-right: 6px;
          vertical-align: middle;
          background: var(--gazon-card-tone-color);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--gazon-card-tone-color) 14%, transparent);
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(280px, 1.05fr) minmax(0, 1.5fr);
          min-width: 0;
          gap: var(--gi-hero-gap);
          align-items: stretch;
          margin: var(--gi-hero-margin);
        }

        .hero__lead {
          min-width: 0;
          border-radius: 24px;
          padding: var(--gi-hero-lead-padding);
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 26%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 30%),
            linear-gradient(135deg, color-mix(in srgb, var(--gi-tab-accent) 14%, transparent) 0%, color-mix(in srgb, var(--gi-tab-companion) 10%, transparent) 100%),
            color-mix(in srgb, var(--secondary-background-color) 76%, transparent);
          box-shadow:
            0 14px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gi-tab-accent) 10%, transparent);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--gi-hero-lead-gap);
          flex: 1 1 260px;
        }

        .hero__metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          min-width: 0;
          gap: var(--gi-hero-metrics-gap);
          align-content: start;
        }

        .hero__metrics .gi-card-core {
          min-height: 88px;
        }

        .hero__metrics .gi-card-core:first-child {
          grid-column: 1 / -1;
          min-height: 108px;
        }

        .hero__lead-icon {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          flex: none;
          color: var(--gazon-section-accent);
          background: color-mix(in srgb, var(--gazon-section-accent) 20%, transparent);
        }

        .hero__lead-icon .gi-icon {
          width: 12px;
          height: 12px;
        }

        .hero__label {
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          font-weight: 800;
          color: var(--secondary-text-color);
          margin-bottom: 6px;
        }

        .hero__value {
          font-size: var(--gi-font-lg);
          font-weight: 900;
          line-height: 1.18;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero__lead--danger {
          color: var(--gazon-danger-color, #c62828);
        }

        .lead--empty {
          color: var(--secondary-text-color);
          font-weight: 500;
        }

        .lead--danger {
          color: var(--gazon-danger-color, #c62828);
        }

        .decision-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          gap: 8px;
          margin: 4px 0 10px;
        }

        .decision {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 1 150px;
          border-radius: 18px;
          padding: 11px 12px;
          border: 1px solid rgba(127, 127, 127, 0.15);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 92%, white) 0%, var(--secondary-background-color) 100%);
          box-shadow: none;
        }

        .decision--action {
          border-color: color-mix(in srgb, var(--gazon-success-color) 20%, transparent);
        }

        .decision--avoid {
          border-color: color-mix(in srgb, var(--gazon-danger-color) 18%, transparent);
        }

        .decision__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .decision__value {
          font-weight: 600;
          line-height: 1.28;
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
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 14%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 24%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 5%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 10px 22px rgba(0, 0, 0, 0.14);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .gi-card-core--stat,
        .gi-card-core--tile,
        .gi-card-core--metric {
          min-height: 88px;
        }

        .gi-card-core--metric {
          min-height: 82px;
          padding: 13px 14px;
        }

        .gi-card-core--interactive {
          padding-right: 42px;
        }

        .gi-card-core--tile {
          border: 1px solid color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 26%, transparent);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 6%, transparent) 0%, transparent 22%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 12%, transparent) 0%, transparent 100%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 10%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 95%, white) 100%);
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
          background: color-mix(in srgb, var(--gazon-section-accent) 18%, transparent);
          color: var(--gazon-section-accent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
          font-weight: 700;
          min-width: 0;
          overflow-wrap: break-word;
          word-break: normal;
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
          font-weight: 900;
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
          -webkit-line-clamp: 2;
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

        .card--editor-preview .gi-panel,
        .card--editor-preview .gi-tab,
        .card--editor-preview .gi-pill--status,
        .card--editor-preview .gi-pill--context,
        .card--editor-preview .gi-action,
        .card--editor-preview .gi-info,
        .card--editor-preview .gi-progress__bar {
          animation: none !important;
        }

        .card--editor-preview {
          box-shadow:
            0 14px 28px rgba(0, 0, 0, 0.20),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 16%, transparent),
            var(--ha-card-box-shadow, none);
        }

        .card--theme-light {
          --gi-theme-base: #ffffff;
          --gi-theme-base-strong: #ffffff;
          --gi-theme-base-soft: #ffffff;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(0, 0, 0, 0.10));
          --gi-theme-shadow-override: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .card--theme-dark {
          --gi-theme-base: #000000;
          --gi-theme-base-strong: #000000;
          --gi-theme-base-soft: #080808;
          --gi-theme-border-override: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.10));
          --gi-theme-shadow-override: 0 18px 34px rgba(0, 0, 0, 0.34);
        }

        .card.card--theme-light {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
        }

        .card.card--theme-dark {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(255, 255, 255, 0.08));
        }

        .card.card--theme-light.card--solid,
        .card.card--theme-dark.card--solid {
          background: transparent;
        }

        .card.card--theme-light::before {
          background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.045) 48%, transparent 100%);
        }

        .card.card--theme-dark::before {
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 48%, transparent 100%);
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
        }

        .card--theme-light :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 4%, #ffffff) 0%, #ffffff 100%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 16%, rgba(0, 0, 0, 0.08));
          box-shadow: var(--gi-theme-shadow-override);
        }

        .card--theme-dark :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background:
            radial-gradient(circle at 84% 0%, color-mix(in srgb, var(--gi-tab-companion) 12%, transparent) 0%, transparent 28%),
            radial-gradient(circle at 10% 94%, color-mix(in srgb, var(--gi-tab-mist-color) 10%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gi-tab-accent) 8%, #13171d) 0%, #0a0d11 100%);
          border-color: color-mix(in srgb, var(--gazon-section-accent) 18%, rgba(255, 255, 255, 0.10));
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.34);
        }

        .card--theme-light :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background: #ffffff;
        }

        .card--theme-dark :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 28%),
            linear-gradient(180deg, #151a21 0%, #0a0d11 100%);
        }

        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .tab-panel__hero-next,
        .card--theme-light .tab-panel__hero-hint,
        .card--theme-light .tab-panel__block-hint,
        .card--theme-light .tab-panel__section-hint,
        .card--theme-light .tab-panel__section-meta,
        .card--theme-light .tab-panel__section-title,
        .card--theme-light .tab-panel__eyebrow,
        .card--theme-light .tab-panel__stat-secondary,
        .card--theme-light .tab-panel__empty,
        .card--theme-light .tab-panel__header-hint,
        .card--theme-light .decision-hero__next,
        .card--theme-light .decision-hero__hint,
        .card--theme-light .decision-plan__meta,
        .card--theme-light .gi-pill__label,
        .card--theme-light .gi-pill__value,
        .card--theme-light .gi-card-core__label,
        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .header__subtitle,
        .card--theme-light .footer {
          color: color-mix(in srgb, #000000 55%, var(--secondary-text-color));
        }

        .card--theme-light :is(.gi-pill--neutral) {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(0, 0, 0, 0.08));
        }

        .card--theme-light .header__icon--warning { background: color-mix(in srgb, var(--gazon-warning-color) 74%, white); }
        .card--theme-light .header__icon--danger { background: color-mix(in srgb, var(--gazon-danger-color) 74%, white); }
        .card--theme-light .header__icon--success { background: color-mix(in srgb, var(--gazon-success-color) 74%, white); }
        .card--theme-light .header__icon--neutral { background: color-mix(in srgb, var(--gazon-neutral-color) 74%, white); }
        .card--theme-light .header__icon--accent { background: color-mix(in srgb, var(--gazon-accent-tone-color) 74%, white); }
        .card--theme-light .header__icon--critical { background: color-mix(in srgb, var(--gazon-critical-color) 74%, white); }

        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .tab-panel__hero-next,
        .card--theme-dark .tab-panel__hero-hint,
        .card--theme-dark .tab-panel__block-hint,
        .card--theme-dark .tab-panel__section-hint,
        .card--theme-dark .tab-panel__section-meta,
        .card--theme-dark .tab-panel__section-title,
        .card--theme-dark .tab-panel__eyebrow,
        .card--theme-dark .tab-panel__stat-secondary,
        .card--theme-dark .tab-panel__empty,
        .card--theme-dark .tab-panel__header-hint,
        .card--theme-dark .decision-hero__next,
        .card--theme-dark .decision-hero__hint,
        .card--theme-dark .decision-plan__meta,
        .card--theme-dark .gi-pill__label,
        .card--theme-dark .gi-pill__value,
        .card--theme-dark .gi-card-core__label,
        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .header__subtitle,
        .card--theme-dark .footer {
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }

        .card--theme-dark :is(.gi-pill--neutral) {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(255, 255, 255, 0.10));
        }

        .card--theme-dark .header__icon--warning { background: color-mix(in srgb, var(--gazon-warning-color) 74%, black); }
        .card--theme-dark .header__icon--danger { background: color-mix(in srgb, var(--gazon-danger-color) 74%, black); }
        .card--theme-dark .header__icon--success { background: color-mix(in srgb, var(--gazon-success-color) 74%, black); }
        .card--theme-dark .header__icon--neutral { background: color-mix(in srgb, var(--gazon-neutral-color) 74%, black); }
        .card--theme-dark .header__icon--accent { background: color-mix(in srgb, var(--gazon-accent-tone-color) 74%, black); }
        .card--theme-dark .header__icon--critical { background: color-mix(in srgb, var(--gazon-critical-color) 74%, black); }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .gi-card,
          .tab-panel,
          .tab-panel > *,
          .gi-panel,
          .gi-tab,
          .tab-nav__item,
          .gi-pill,
          .gi-action,
          .gi-info,
          .gi-progress__bar,
          .tab-progress__bar,
          .card--pulse-critical,
          .gi-alert--critical,
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

          .hero {
            grid-template-columns: 1fr;
          }

          .tab-panel__section--products {
            gap: 6px;
          }

          .tab-panel__section--products .tab-panel__section-summary {
            font-size: var(--gi-font-sm);
            line-height: 1.25;
          }

          .tab-panel__section--products .gi-card-core--stat {
            min-height: 68px;
          }

          .tab-panel__intervention-layout {
            grid-template-columns: 1fr;
          }

          .tab-panel__intervention-card {
            padding: 11px 12px;
          }

          .tab-panel__workflow {
            gap: 6px;
          }

          .tab-panel__workflow-step {
            padding: 6px 8px;
          }

          .tab-panel__select-shell {
            min-height: 48px;
          }

          .tab-panel__intervention-card--action .tab-panel__cta {
            min-height: 70px;
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

          .header__title-wrap {
            width: 100%;
            gap: 8px;
          }

          .header__meta {
            width: 100%;
            gap: 6px;
            margin-left: 0;
          }

          .header__weather {
            align-self: flex-end;
          }

          .header__icon {
            width: calc(var(--gazon-icon-size) * 1.02);
            height: calc(var(--gazon-icon-size) * 1.02);
          }

          .header__icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .header__title {
            font-size: var(--gi-font-md);
            line-height: 1.12;
          }

          .header__subtitle {
            font-size: var(--gi-font-xxs);
            line-height: 1.18;
          }

          .header__action {
            align-self: flex-end;
          }

          .hero {
            gap: 6px;
            margin: 1px 0 4px;
          }

          .hero__lead {
            padding: 9px 10px;
            gap: 6px;
            flex-basis: 220px;
          }

          .hero__lead-icon {
            width: 18px;
            height: 18px;
          }

          .hero__lead-icon .gi-icon {
            width: 11px;
            height: 11px;
          }

          .hero__label {
            margin-bottom: 2px;
          }

          .hero__value {
            font-size: var(--gi-font-sm);
            line-height: 1.16;
            -webkit-line-clamp: 1;
          }

          .hero__metrics {
            gap: 4px;
          }

          .hero__metrics {
            grid-template-columns: repeat(auto-fit, minmax(122px, 1fr));
          }

          .hero__metrics .gi-card-core {
            flex-basis: 100px;
            min-height: 70px;
          }

          .tab-panel--products .tab-panel__hero-top,
          .tab-panel--products .tab-panel__section-head,
          .tab-panel--intervention .tab-panel__hero-top,
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

          .tab-panel--products .tab-panel__grid--products {
            grid-template-columns: 1fr;
          }

          .tab-panel__grid--priority,
          .tab-panel__grid--featured,
          .tab-panel__grid--decision-board {
            grid-template-columns: 1fr;
          }

          .tab-panel__hero {
            padding: 11px 12px;
          }

          .tab-panel__hero-summary {
            font-size: var(--gi-font-md);
            line-height: 1.18;
          }

          .tab-panel__hero-next,
          .tab-panel__hero-hint {
            font-size: var(--gi-font-xs);
            line-height: 1.18;
          }

          .tab-panel--products .gi-card-core--stat {
            min-height: 64px;
          }

          .tab-panel__grid--priority > *:first-child .gi-card-core,
          .tab-panel__grid--featured > *:first-child .gi-card-core,
          .tab-panel__grid--decision-board > *:first-child .gi-card-core {
            min-height: 78px;
          }

          .tab-panel--products .tab-panel__section-summary,
          .tab-panel--products .tab-panel__section-hint {
            font-size: var(--gi-font-sm);
            line-height: 1.22;
          }

          .tab-panel--intervention .tab-panel__decision-strip {
            flex-direction: column;
            align-items: stretch;
          }

          .tab-panel--intervention .tab-panel__intervention-layout {
            gap: 8px;
          }

          .tab-panel--intervention .tab-panel__intervention-card {
            padding: 10px 11px;
            gap: 8px;
          }

          .tab-panel--intervention .tab-panel__intervention-card .tab-panel__section-summary,
          .tab-panel--intervention .tab-panel__intervention-card .tab-panel__section-hint {
            font-size: var(--gi-font-xs);
            line-height: 1.22;
          }

          .tab-panel--intervention .tab-panel__select-shell {
            min-height: 44px;
            padding: 6px 10px 6px 8px;
            gap: 8px;
          }

          .tab-panel--intervention .tab-panel__select {
            padding-right: 30px;
          }

          .tab-panel--intervention .tab-panel__select-prefix {
            width: 26px;
            height: 26px;
          }

          .tab-panel--intervention .tab-panel__select-chevron {
            inset-inline-end: 10px;
          }

          .tab-panel--intervention .tab-panel__intervention-card--action .tab-panel__cta {
            min-height: 64px;
            border-radius: 12px;
          }
        }
`;
const EDITOR_STYLES = String.raw`
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
          --editor-focus: color-mix(in srgb, var(--primary-color) 26%, transparent);
          --editor-focus-ring: color-mix(in srgb, var(--primary-color) 18%, transparent);
          --editor-surface: linear-gradient(
            180deg,
            color-mix(in srgb, var(--card-background-color) 98%, white) 0%,
            color-mix(in srgb, var(--card-background-color) 95%, black) 100%
          );
          --editor-surface-soft: linear-gradient(
            180deg,
            color-mix(in srgb, var(--secondary-background-color) 97%, white) 0%,
            color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%
          );
          --editor-surface-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
          --editor-surface-shadow-strong: 0 12px 28px rgba(0, 0, 0, 0.10);
        }
        .editor {
          padding: 16px;
          display: grid;
          gap: 16px;
          color: var(--primary-text-color);
        }
        .section {
          display: grid;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--editor-border);
          border-radius: 16px;
          background: var(--editor-surface);
          box-shadow:
            var(--editor-surface-shadow),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            border-color 160ms ease,
            background-color 160ms ease;
        }

        .section--sub {
          padding: 12px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--secondary-background-color) 96%, transparent);
          box-shadow: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .section:hover {
            border-color: color-mix(in srgb, var(--primary-color) 14%, var(--editor-border));
            box-shadow:
              var(--editor-surface-shadow-strong),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
            transform: translateY(-1px);
          }
        }
        .section h3 {
          margin: 0 0 4px 0;
          font-size: 1rem;
        }
        .section p {
          margin: 0;
          color: var(--secondary-text-color);
          font-size: 0.88rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }
        .field {
          display: grid;
          gap: 6px;
          font-size: 0.9rem;
        }

        .field > span,
        .field--checkbox > span {
          color: var(--secondary-text-color);
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.15;
          transition:
            color 160ms ease,
            transform 160ms ease,
            letter-spacing 160ms ease;
        }

        .field:focus-within > span,
        .field--checkbox:focus-within > span {
          color: var(--primary-text-color);
          letter-spacing: 0.015em;
          transform: translateY(-0.5px);
        }

        .field input,
        .field select {
          width: 100%;
          box-sizing: border-box;
          min-height: 44px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--editor-surface-soft);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.03);
          color: var(--primary-text-color);
          line-height: 1.2;
          font: inherit;
          outline: none;
          transition:
            transform 160ms ease,
            border-color 140ms ease,
            box-shadow 140ms ease,
            background-color 140ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .field input:hover,
          .field select:hover {
            border-color: color-mix(in srgb, var(--primary-color) 18%, var(--editor-border));
            background:
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--secondary-background-color) 99%, white) 0%,
                color-mix(in srgb, var(--secondary-background-color) 96%, black) 100%
              );
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.06),
              0 4px 10px rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
          }
        }

        .field input:focus,
        .field select:focus {
          border-color: color-mix(in srgb, var(--primary-color) 44%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring),
            0 8px 18px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .field input:focus-visible,
        .field select:focus-visible {
          border-color: color-mix(in srgb, var(--primary-color) 50%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring),
            0 8px 18px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .field input::placeholder {
          color: color-mix(in srgb, var(--secondary-text-color) 72%, transparent);
        }

        .field--checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .field--checkbox input {
          width: auto;
        }
        .hint {
          font-size: 0.84rem;
          color: var(--secondary-text-color);
        }
        .row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        @media (max-width: 540px) {
          .row {
            grid-template-columns: 1fr;
          }
        }

        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
        }`;

const CARD_TYPE = "gazon-intelligent-card";
const CARD_NAME = "Gazon Intelligent Card";
const CARD_VERSION = "0.1.76";

const DEFAULT_CONFIG = {
  title: "Gazon Intelligent",
  show_icons: true,
  show_header: true,
  show_background: true,
  compact: false,
  minimal_mode: false,
  show_advanced_details: false,
  theme_mode: "auto",
  accent_color: "",
  icon_size: 24,
  border_radius: 24,
  background_style: "solid",
  use_gradient: true,
  show_secondary_info: true,
  entity_assistant: "sensor.gazon_intelligent_assistant",
  entity_fenetre_optimale: "sensor.gazon_intelligent_fenetre_optimale",
  entity_weather: "weather.forecast_home",
  entity_plan_arrosage: "sensor.gazon_intelligent_plan_d_arrosage",
  entity_dernier_arrosage: "sensor.gazon_intelligent_dernier_arrosage_detecte",
  entity_derniere_application: "sensor.gazon_intelligent_derniere_application",
  entity_catalogue_produits: "sensor.gazon_intelligent_catalogue_produits",
  entity_produit_intervention: "select.gazon_intelligent_produit_d_intervention",
  entity_debug_intervention: "sensor.gazon_intelligent_debug_intervention",
  entity_niveau_pertinence: "sensor.gazon_intelligent_niveau_de_pertinence",
  entity_prochaine_fenetre_optimale: "sensor.gazon_intelligent_prochaine_fenetre_optimale",
  entity_prochain_blocage_attendu: "sensor.gazon_intelligent_prochain_blocage_attendu",
  entity_signal_intervention: "binary_sensor.gazon_intelligent_signal_intervention",
  entity_signal_irrigation: "binary_sensor.gazon_intelligent_signal_irrigation",
  entity_prochaine_intervention: "sensor.gazon_intelligent_prochaine_intervention",
  entity_conseil: "sensor.gazon_intelligent_conseil_principal",
  entity_action: "sensor.gazon_intelligent_action_recommandee",
  entity_avoid: "sensor.gazon_intelligent_action_a_eviter",
  entity_mode: "select.gazon_intelligent_mode_du_gazon",
  entity_switch_arrosage_automatique: "switch.gazon_intelligent_arrosage_automatique_autorise",
  entity_switch_coordination_tondeuse: "switch.gazon_intelligent_coordination_tondeuse",
  entity_arrosage_recommande: "binary_sensor.gazon_intelligent_arrosage_recommande",
  entity_arrosage_apres_application_autorise: "binary_sensor.gazon_intelligent_arrosage_apres_application_autorise",
  entity_tonte_autorisee: "binary_sensor.gazon_intelligent_tonte_autorisee",
  entity_objectif_arrosage: "sensor.gazon_intelligent_objectif_d_arrosage",
  entity_objectif_legacy: "sensor.gazon_intelligent_objectif_legacy",
  entity_objectif_depletion: "sensor.gazon_intelligent_objectif_depletion",
  entity_reserve_actuelle: "sensor.gazon_intelligent_reserve_actuelle",
  entity_depletion_ratio: "sensor.gazon_intelligent_depletion_ratio",
  entity_etat_hydrique: "sensor.gazon_intelligent_etat_hydrique",
  entity_et0: "sensor.gazon_intelligent_et0",
  entity_etc: "sensor.gazon_intelligent_etc",
  entity_type_arrosage: "sensor.gazon_intelligent_type_d_arrosage",
  entity_risque: "sensor.gazon_intelligent_risque_gazon",
  entity_phase: "sensor.gazon_intelligent_phase_dominante",
  entity_sous_phase: "sensor.gazon_intelligent_sous_phase",
  entity_niveau: "sensor.gazon_intelligent_niveau_d_action",
  entity_tonte: "sensor.gazon_intelligent_etat_de_tonte",
  entity_hauteur: "sensor.gazon_intelligent_hauteur_de_tonte_conseillee",
  entity_arrosage_en_cours: "sensor.gazon_intelligent_arrosage_en_cours",
  entity_debit_zone_1: "number.gazon_intelligent_debit_zone_1",
  entity_debit_zone_2: "number.gazon_intelligent_debit_zone_2",
  entity_debit_zone_3: "number.gazon_intelligent_debit_zone_3",
  entity_debit_zone_4: "number.gazon_intelligent_debit_zone_4",
  entity_debit_zone_5: "number.gazon_intelligent_debit_zone_5",
  entity_hauteur_min_tondeuse: "number.gazon_intelligent_hauteur_min_tondeuse",
  entity_hauteur_max_tondeuse: "number.gazon_intelligent_hauteur_max_tondeuse",
  entity_delai_reprise_tonte_apres_arrosage: "number.gazon_intelligent_delai_reprise_tonte_apres_arrosage",
  manual_action_service: "gazon_intelligent.start_manual_irrigation",
  manual_action_label: "Irrigation manuelle",
  tap_action: { action: "more-info" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
};

function createStubConfig() {
  return {
    type: `custom:${CARD_TYPE}`,
    ...DEFAULT_CONFIG,
  };
}

const TAB_DEFS = [
  { key: "overview", label: "Synthèse", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Irrigation", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "gazon", label: "Gazon", icon: "mdi:grass" },
  { key: "products", label: "Produits", icon: "mdi:package-variant-closed" },
  { key: "intervention", label: "Intervention", icon: "mdi:spray-bottle" },
  { key: "config", label: "Réglages", icon: "mdi:cog-outline" },
];

const ENTITY_KEYS = [
  { key: "entity_assistant", label: "Assistant", icon: "mdi:account-tie-hat-outline", domain: ["sensor"] },
  { key: "entity_fenetre_optimale", label: "Fenêtre d'action", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_plan_arrosage", label: "Plan d'irrigation", icon: "mdi:timer-outline", domain: ["sensor"] },
  { key: "entity_arrosage_en_cours", label: "Irrigation en cours", icon: "mdi:progress-clock", domain: ["sensor"] },
  { key: "entity_dernier_arrosage", label: "Dernier arrosage", icon: "mdi:water-check", domain: ["sensor"] },
  { key: "entity_derniere_application", label: "Dernière application", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_catalogue_produits", label: "Référentiel produits", icon: "mdi:package-variant-closed", domain: ["sensor"] },
  { key: "entity_produit_intervention", label: "Produit sélectionné", icon: "mdi:package-variant", domain: ["select"] },
  { key: "entity_debug_intervention", label: "Debug métier", icon: "mdi:bug-outline", domain: ["sensor"] },
  { key: "entity_niveau_pertinence", label: "Niveau de pertinence", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_prochaine_fenetre_optimale", label: "Prochaine fenêtre optimale", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_prochain_blocage_attendu", label: "Prochain blocage attendu", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_prochaine_intervention", label: "À préparer", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_conseil", label: "Conseil principal", icon: "mdi:message-text-outline", domain: ["sensor"] },
  { key: "entity_action", label: "Action recommandée", icon: "mdi:check-circle-outline", domain: ["sensor"] },
  { key: "entity_avoid", label: "Action à éviter", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_mode", label: "Mode du gazon", icon: "mdi:grass", domain: ["select"] },
  { key: "entity_switch_arrosage_automatique", label: "Irrigation automatique", icon: "mdi:switch", domain: ["switch"] },
  { key: "entity_switch_coordination_tondeuse", label: "Coordination tondeuse", icon: "mdi:robot-mower", domain: ["switch"] },
  { key: "entity_arrosage_apres_application_autorise", label: "Post-application", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_signal_irrigation", label: "Signal irrigation", icon: "mdi:sprinkler", domain: ["binary_sensor"] },
  { key: "entity_tonte_autorisee", label: "Gazon permet la tonte", icon: "mdi:content-cut", domain: ["binary_sensor"] },
  { key: "entity_signal_intervention", label: "Signal intervention", icon: "mdi:spray-bottle", domain: ["binary_sensor"] },
  { key: "entity_phase", label: "Phase dominante", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_sous_phase", label: "Sous-phase", icon: "mdi:sprout", domain: ["sensor"] },
  { key: "entity_niveau", label: "Niveau d'action", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_tonte", label: "État de tonte", icon: "mdi:content-cut", domain: ["sensor"] },
  { key: "entity_hauteur", label: "Hauteur de tonte conseillée", icon: "mdi:ruler-square", domain: ["sensor"] },
  { key: "entity_arrosage_recommande", label: "Irrigation", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_objectif_arrosage", label: "Objectif d'irrigation", icon: "mdi:water-percent", domain: ["sensor"] },
  { key: "entity_objectif_legacy", label: "Objectif legacy", icon: "mdi:water-minus", domain: ["sensor"] },
  { key: "entity_objectif_depletion", label: "Objectif déplétion", icon: "mdi:water-sync", domain: ["sensor"] },
  { key: "entity_reserve_actuelle", label: "Réserve actuelle", icon: "mdi:cup-water", domain: ["sensor"] },
  { key: "entity_depletion_ratio", label: "Déplétion", icon: "mdi:gauge", domain: ["sensor"] },
  { key: "entity_etat_hydrique", label: "État hydrique", icon: "mdi:water-percent-alert", domain: ["sensor"] },
  { key: "entity_et0", label: "ET0", icon: "mdi:weather-sunny", domain: ["sensor"] },
  { key: "entity_etc", label: "ETc", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_type_arrosage", label: "Profil d'irrigation", icon: "mdi:sprinkler", domain: ["sensor"] },
  { key: "entity_risque", label: "Risque gazon", icon: "mdi:shield-alert-outline", domain: ["sensor"] },
  { key: "entity_debit_zone_1", label: "Débit zone 1", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_2", label: "Débit zone 2", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_3", label: "Débit zone 3", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_4", label: "Débit zone 4", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_5", label: "Débit zone 5", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_hauteur_min_tondeuse", label: "Hauteur min tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_hauteur_max_tondeuse", label: "Hauteur max tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_delai_reprise_tonte_apres_arrosage", label: "Cooldown tonte après arrosage", icon: "mdi:timer-cog-outline", domain: ["number"] },
];

const SECTION_DEFS = [
  { key: "overview", label: "Synthèse", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Irrigation", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "details", label: "Avancé", icon: "mdi:dots-horizontal" },
];

const SECTION_FIELDS = {
  overview: [
    "entity_assistant",
    "entity_conseil",
    "entity_action",
    "entity_avoid",
    "entity_hauteur",
    "entity_niveau_pertinence",
    "entity_prochaine_fenetre_optimale",
    "entity_prochain_blocage_attendu",
    "entity_arrosage_recommande",
    "entity_arrosage_apres_application_autorise",
    "entity_tonte_autorisee",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_mode",
    "entity_fenetre_optimale",
    "entity_plan_arrosage",
  "entity_dernier_arrosage",
  "entity_derniere_application",
  "entity_debug_intervention",
  "entity_prochaine_intervention",
  "entity_switch_arrosage_automatique",
  "entity_switch_coordination_tondeuse",
  ],
  watering: [
    "entity_fenetre_optimale",
    "entity_arrosage_recommande",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_arrosage_apres_application_autorise",
    "entity_signal_irrigation",
  ],
  mowing: [
    "entity_tonte",
    "entity_hauteur",
    "entity_tonte_autorisee",
  ],
  details: ENTITY_KEYS.map((field) => field.key),
};

const SECTION_ACCENTS = {
  overview: "#58c27d",
  watering: "#31b8d4",
  mowing: "#97c84b",
  products: "#58c27d",
  details: "#7b8da0",
};

const LEGACY_ENTITY_KEYS = [
  "entity_assistant",
  "entity_conseil",
  "entity_action",
  "entity_avoid",
  "entity_tonte",
  "entity_hauteur",
];

const OVERVIEW_ENTITY_KEYS = new Set([
  ...LEGACY_ENTITY_KEYS,
  "entity_niveau_pertinence",
  "entity_prochaine_fenetre_optimale",
  "entity_prochain_blocage_attendu",
  "entity_arrosage_recommande",
  "entity_arrosage_apres_application_autorise",
  "entity_tonte_autorisee",
  "entity_objectif_arrosage",
  "entity_type_arrosage",
  "entity_mode",
  "entity_fenetre_optimale",
  "entity_plan_arrosage",
  "entity_dernier_arrosage",
  "entity_derniere_application",
  "entity_switch_arrosage_automatique",
  "entity_switch_coordination_tondeuse",
]);

const RENDER_SIGNATURE_ATTRS = {
  entity_assistant: ["action", "moment", "quantity_mm", "status", "reason"],
  entity_fenetre_optimale: [
    "status",
    "summary",
    "watering_cause",
    "next_action",
    "auto_irrigation_enabled",
    "window_reason_summary",
    "watering_window_display",
    "optimal_window_display",
    "evening_window_display",
    "watering_evening_allowed",
    "confidence_score",
    "application_post_watering_status",
    "watering_window_profile",
    "heat_stress_level",
  ],
  entity_niveau_pertinence: ["score", "score_level", "summary", "tone", "source_entity"],
  entity_prochaine_fenetre_optimale: ["source_entity", "source_state", "block_reason", "confidence_score", "phase", "month", "temperature", "summary"],
  entity_prochain_blocage_attendu: ["source_entity", "source_status", "block_reason", "block_label", "confidence_score", "phase", "month", "temperature", "summary"],
  entity_plan_arrosage: ["summary", "duration_human", "zone_count", "objective_mm", "plan_type", "passages", "fractionation", "total_duration_min"],
  entity_arrosage_en_cours: ["active", "started_at_utc", "last_activity_at_utc", "active_zone_count", "zone_count", "progress_percent", "active_zones", "active_zone_labels", "current_passage", "passage_count", "source", "watering_cause"],
  entity_dernier_arrosage: ["source", "date_action", "detected_at", "zone_count", "summary", "watering_cause", "total_mm"],
  entity_derniere_application: ["source", "application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm", "application_post_watering_status"],
  entity_catalogue_produits: ["products_count", "product_ids", "product_names", "products_summary", "summary"],
  entity_produit_intervention: ["selected_product_id", "selected_product_name", "summary", "products_count"],
  entity_debug_intervention: ["score", "status", "recommended_action", "product_id", "product_name", "summary", "reason", "why_now", "reasons", "constraints", "blocking_constraints", "non_blocking_constraints", "missing_requirements", "context", "ready_to_declare", "selected_product_ready", "ui_summary", "ui_hint"],
  entity_signal_intervention: ["source_entity", "source_status", "recommended_action", "product_id", "product_name", "ready_to_declare", "selected_product_ready", "trigger_kind", "summary"],
  entity_signal_irrigation: ["source_entities", "source_status", "application_post_watering_status", "watering_cause", "type_arrosage", "trigger_kind", "reason_kind", "action_label", "summary", "watering_blocked_by_mower", "watering_block_reason_code", "watering_block_reason_label"],
  entity_prochaine_intervention: [
    "recommended_action",
    "priority",
    "score",
    "reason",
    "why_now",
    "product_id",
    "product_name",
    "ready_to_declare",
    "selected_product_ready",
    "month_match",
    "current_phase",
    "current_month",
    "opportunity_level",
    "summary",
    "hint",
    "action_label",
  ],
  entity_conseil: ["action_recommandee", "action_a_eviter", "niveau_action", "niveau_action_hydrique", "fenetre_optimale", "risque_gazon", "objectif_mm", "type_arrosage", "watering_cause", "summary"],
  entity_objectif_arrosage: [
    "temperature",
    "etp",
    "phase_active",
    "phase_dominante",
    "sous_phase",
    "hydric_balance_level",
    "hydric_strategy",
    "hydric_state",
    "reserve_actuelle_mm",
    "reserve_stock_mm",
    "reserve_stock_max_mm",
    "reserve_surplus_mm",
    "reserve_fill_ratio",
    "reserve_available_ratio",
    "reserve_minimale_mm",
    "depletion_mm",
    "depletion_ratio",
    "depletion_allowed_mm",
    "mad_ratio",
    "et0_mm",
    "et0_source",
    "kc_gazon",
    "etc_mm",
  ],
  entity_arrosage_recommande: ["objectif_mm", "type_arrosage", "watering_cause", "watering_blocked_by_mower", "watering_block_reason_code", "watering_block_reason_label"],
  entity_arrosage_apres_application_autorise: ["application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm", "application_post_watering_status"],
  entity_tonte: ["tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_prete", "tondeuse_batterie", "tondeuse_prochain_depart_display", "tondeuse_hauteur_coupe_mm", "mower_coordination_enabled", "mower_coordination_ready", "mower_presence_state", "mower_presence_label", "mower_operation_state", "mower_operation_label", "mower_is_docked", "mower_is_outside", "mower_is_safe_for_watering", "mower_reason_code", "mower_reason_label", "mowing_blocked_by_watering", "mowing_block_reason_code", "mowing_block_reason_label", "mowing_cooldown_remaining_minutes", "mowing_post_application_active", "gazon_permet_tonte", "machine_permet_tonte", "action_possible"],
  entity_tonte_autorisee: ["phase_active", "tonte_statut", "niveau_action", "fenetre_optimale", "risque_gazon", "hauteur_tonte_recommandee_cm", "hauteur_tonte_min_cm", "hauteur_tonte_max_cm", "tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_prete", "tondeuse_batterie", "tondeuse_prochain_depart_display", "tondeuse_hauteur_coupe_mm", "mower_coordination_enabled", "mower_coordination_ready", "mower_presence_state", "mower_presence_label", "mower_operation_state", "mower_operation_label", "mower_is_docked", "mower_is_outside", "mower_is_safe_for_watering", "mower_reason_code", "mower_reason_label", "mowing_blocked_by_watering", "mowing_block_reason_code", "mowing_block_reason_label", "mowing_cooldown_remaining_minutes", "mowing_post_application_active", "gazon_permet_tonte", "machine_permet_tonte", "action_possible"],
  entity_niveau: ["niveau_action_hydrique"],
  entity_sous_phase: ["sous_phase_progression", "sous_phase_detail"],
  entity_phase: ["phase_dominante_source", "pluie_demain_source"],
  entity_et0: ["et0_source", "temperature", "forecast_temperature_today", "temperature_reference_hydrique"],
  entity_etc: ["et0_mm", "kc_gazon", "phase_dominante", "sous_phase"],
  entity_reserve_actuelle: ["reserve_utile_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "hydric_state"],
  entity_depletion_ratio: ["depletion_ratio_raw", "hydric_state"],
  entity_etat_hydrique: ["reserve_actuelle_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "hydric_state"],
  entity_objectif_legacy: ["objectif_mm", "mm_final_recommande", "use_depletion_logic", "type_arrosage", "comparison_mode"],
  entity_objectif_depletion: ["reserve_actuelle_mm", "reserve_stock_mm", "reserve_stock_max_mm", "reserve_surplus_mm", "reserve_fill_ratio", "reserve_available_ratio", "reserve_minimale_mm", "depletion_mm", "depletion_ratio", "use_depletion_logic", "comparison_mode"],
  entity_weather: ["temperature", "dew_point", "humidity", "uv_index", "pressure", "wind_speed", "wind_bearing", "precipitation"],
  entity_hauteur: ["hauteur_tonte_min_cm", "hauteur_tonte_max_cm", "tondeuse_statut", "tondeuse_statut_libelle", "tondeuse_hauteur_coupe_mm"],
  entity_switch_coordination_tondeuse: [],
  entity_delai_reprise_tonte_apres_arrosage: [],
};

const STATUS_COLORS = {
  danger: "#f15f69",
  warning: "#f3ba4b",
  success: "#4fc38c",
  neutral: "#7a8c9d",
  accent: "#49cfd0",
  critical: "#ff4d78",
};

const STATUS_LABELS = {
  auto: "Auto",
  hydrique: "Hydrique",
  recommended: "Recommandé",
  possible: "À préparer",
  ready: "Prêt à déclarer",
  blocked: "Bloqué",
  unavailable: "Non disponible",
  en_attente: "En attente",
  action_required: "Action requise",
  bloque: "Bloqué",
  attendre: "Attendre",
  maintenant: "Maintenant",
  ce_matin: "Ce matin",
  demain_matin: "Demain matin",
  apres_pluie: "Après la pluie",
  no_need: "Aucun besoin",
  waiting: "Attendre",
  blocked: "Bloqué",
  post_application: "Post-produit",
  application_technique: "Arrosage post-produit",
  application_technique_auto: "Arrosage post-produit auto",
  aucune_action: "Aucune action",
  hydric_need: "Besoin hydrique",
  plein: "Plein",
  excédentaire: "Excédentaire",
  a_faire: "À faire",
  a_surveiller: "À surveiller",
  autorisee: "Autorisée",
  autorise: "Autorisé",
  autorisee_avec_precaution: "Autorisée avec précaution",
  interdite: "Interdite",
  deconseillee: "Déconseillée",
  non_requis: "Non requis",
  non_autorise: "Non autorisé",
  indisponible: "Non disponible",
  critique: "Critique",
  modere: "Modéré",
  faible: "Faible",
  normal: "Normal",
  enracinement: "Enracinement",
  demain_matin: "Demain matin",
  apres_pluie: "Après pluie",
  manuel_frequent: "Manuel fréquent",
};

const WEATHER_LABELS = {
  "clear-night": "Nuit claire",
  cloudy: "Nuageux",
  exceptional: "Exceptionnel",
  fog: "Brumeux",
  hail: "Grêle",
  lightning: "Orageux",
  "lightning-rainy": "Orageux",
  partlycloudy: "Partiellement nuageux",
  pouring: "Averses",
  rainy: "Pluvieux",
  snowy: "Neigeux",
  "snowy-rainy": "Neige et pluie",
  sunny: "Ensoleillé",
  windy: "Venteux",
  "windy-variant": "Venteux",
};



function isEmpty(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function isUnavailableState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "" || normalized === "unknown" || normalized === "unavailable" || normalized === "none";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value, digits = 1) {
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

function formatCm(value) {
  const formatted = formatNumber(value, 1);
  return formatted === null ? "—" : `${formatted} cm`;
}

function formatMm(value) {
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

function formatRecommendationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Recommandée";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non requise";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatAuthorizationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non autorisé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatStateLabel(value) {
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

function formatWeatherConditionLabel(value) {
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

function weatherIconForState(value) {
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

function weatherToneForState(value) {
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

function normalizeDisplayValue(value) {
  if (isUnavailableState(value)) {
    return "Non disponible";
  }
  return String(value);
}

function computeTonteTone(value) {
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

function computeRisqueTone(value) {
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

function computeActionTone(value) {
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

function phaseTone(value) {
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

function toneToColor(tone) {
  const colors = typeof STATUS_COLORS !== "undefined" && STATUS_COLORS ? STATUS_COLORS : { neutral: "#7a8c9d" };
  return colors[tone] || colors.neutral;
}

function sectionToAccent(section) {
  return (
    {
      overview: "#58c27d",
      watering: "#31b8d4",
      mowing: "#97c84b",
      details: "#7b8da0",
    }[section] || "#58c27d"
  );
}

function splitServiceName(service) {
  const parts = String(service ?? "").split(".");
  if (parts.length !== 2) {
    return null;
  }
  return { domain: parts[0], service: parts[1] };
}

function mergeConfig(base, update) {
  return { ...base, ...update };
}

function normalizeConfig(config) {
  return { ...config };
}

function domainMatches(entity, acceptedDomains) {
  if (!acceptedDomains || acceptedDomains.length === 0) {
    return true;
  }
  const domain = String(entity?.entity_id ?? "").split(".")[0];
  return acceptedDomains.includes(domain);
}

function formatDurationHuman(totalMinutes) {
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

function humanDateTimeText(value) {
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

function formatPlanType(value) {
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

function formatApplicationMode(value) {
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

function formatWateringCauseLabel(value) {
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

function formatWateringTypeLabel(value) {
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

function formatIrrigationSignalLabel({ actionLabel, summary, reasonKind } = {}) {
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

function formatIrrigationSignalTone({ reasonKind, triggerKind } = {}) {
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

function formatMowerReasonLabel(value) {
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

function formatMowingBlockReason(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "Aucun blocage";
  }
  if (MOWING_BLOCK_REASON_LABELS[normalized]) {
    return MOWING_BLOCK_REASON_LABELS[normalized];
  }
  return formatStateLabel(value);
}

function formatStatusLabel(status) {
  return formatStateLabel(status);
}

function iconForField(field) {
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

function formatProductUsageMode(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return PRODUCT_USAGE_MODE_LABELS[normalized] || formatStateLabel(value);
}

function formatProductAnnualLimit(value) {
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

function formatMonthLabel(value) {
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

function safeRenderIconBox(icon, size = "md") {
  if (typeof renderIconBox === "function") {
    return renderIconBox(icon, size);
  }
  return renderIconBoxFallback(icon, size);
}

function safeRenderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  if (typeof renderStatusPill === "function") {
    return renderStatusPill(text, tone, icon, extraClass);
  }
  return renderStatusPillFallback(text, tone, icon, extraClass);
}

function safeFormatMonthLabel(value) {
  if (typeof formatMonthLabel === "function") {
    return formatMonthLabel(value);
  }
  return monthLabelFallback(value);
}

function safeFormatWeatherConditionLabel(value) {
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

function formatInterventionStatusPresentation(status) {
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

function formatPostApplicationStatusPresentation(status) {
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

function formatWateringBlockReason(value) {
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

function formatSwitchState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Désactivé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function statusTone(status) {
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



function renderIconBox(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "14px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderPillIcon(icon) {
  if (!icon) {
    return "";
  }
  return `<span class="gi-pill__icon">${safeRenderIconBox(icon, "pill")}</span>`;
}

function renderPillContent({ label = "", value = "", compact = false }) {
  if (compact) {
    return `<span class="gi-pill__value">${escapeHtml(value)}</span>`;
  }
  return `
    <span class="gi-pill__label">${escapeHtml(label)}</span>
    <span class="gi-pill__value">${escapeHtml(value)}</span>
  `;
}

function renderPill({
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

function renderCardCore({
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
  const iconHtml = icon ? safeRenderIconBox(icon, iconSize) : "";
  const secondaryValue = isEmpty(secondary) ? "&nbsp;" : escapeHtml(secondary);
  const affordanceHtml = interactive
    ? `<div class="gi-card-core__affordance" aria-hidden="true">${safeRenderIconBox("mdi:chevron-right", "sm")}</div>`
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

function renderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  return renderPill({ value: text, tone, icon, compact: true, extraClass });
}



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
        { name: "compact", selector: { boolean: {} } },
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
        { name: "use_gradient", selector: { boolean: {} } },
        { name: "entity_assistant", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_weather", selector: { entity: { domain: ["weather"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_catalogue_produits", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_produit_intervention", selector: { entity: { domain: ["select"] } } },
        { name: "entity_prochaine_intervention", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_niveau_pertinence", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochaine_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_prochain_blocage_attendu", selector: { entity: { domain: ["sensor"] } } },
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

  _serviceTargetEntityId() {
    return (
      this._entityId("entity_derniere_application") ||
      this._entityId("entity_produit_intervention") ||
      this._entityId("entity_catalogue_produits") ||
      null
    );
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
    const isPassiveState = action === "aucune_action" && moment === "attendre";
    const isBlockedMowing = status === "blocked" && action === "tonte" && (
      normalizedReason.includes("déjà en cours")
      || normalizedReason.includes("en cours")
      || normalizedReason.includes("mower_mowing")
    );
    const summary = isPassiveState
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
    if (hardBlockReason || ["error", "erreur", "indisponible", "pluie", "unknown"].includes(status) || coordinationReady === false) {
      tone = "danger";
    } else if (["charging", "en_charge", "retour_station", "retour", "transit", "paused", "pause"].includes(status) || presenceState === "retour") {
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
    const tonteEntity = this._entity("entity_tonte");
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const tonteAttrs = tonteEntity?.attributes || {};
    const fallbackAttrs = tonteAutoriseeEntity?.attributes || {};
    const attrs = tonteAttrs.mowing_block_reason_code
      || tonteAttrs.mowing_block_reason_label
      || tonteAttrs.mowing_blocked_by_watering
      || tonteAttrs.mowing_cooldown_remaining_minutes !== undefined
      ? tonteAttrs
      : fallbackAttrs;
    const blocked = attrs.mowing_blocked_by_watering === true || Boolean(attrs.mowing_block_reason_code || attrs.mowing_block_reason_label);
    const reasonCode = String(attrs.mowing_block_reason_code || "").trim().toLowerCase();
    const reasonLabel = String(
      attrs.mowing_block_reason_label
      || formatMowingBlockReason(reasonCode),
    ).trim();
    const cooldownRemainingMinutes = asNumber(attrs.mowing_cooldown_remaining_minutes);
    const postApplicationActive = attrs.mowing_post_application_active === true;
    const detail = [
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
    const blockReasonLabel = formatWateringBlockReason(blockReason);
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
    const displayNextAction = isBlocked
      ? blockReasonLabel || nextActionDisplay || nextAction || "Attendre la fin du bloc"
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
    const depletionRatio = asNumber(entity?.attributes?.depletion_ratio);
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
      depletionRatio,
      et0,
      etc,
      kc,
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

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize, tabPalette }) {
    if (!this.style) {
      return;
    }
    const palette = tabPalette || this._tabPalette(this._activeTab);
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
      "entity_assistant",
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
        label: "Fenêtre optimale",
        value: windowState.statusLabel,
        tone: windowState.tone,
        icon: "mdi:clock-outline",
        secondary: [
          windowState.reasonSummary || windowState.summary,
          windowState.optimalWindowDisplay ? `Optimal: ${windowState.optimalWindowDisplay}` : "",
          windowState.wateringWindowDisplay ? `Créneau: ${windowState.wateringWindowDisplay}` : "",
        ].filter(Boolean).join(" · "),
        entityKey: "entity_fenetre_optimale",
      },
      {
        label: "Objectif d'irrigation",
        value: objectiveLabel,
        tone: objective > 0 ? "success" : "neutral",
        icon: "mdi:water-percent",
        secondary: [
          typeArrosage ? `Type: ${formatWateringTypeLabel(typeArrosage)}` : "",
          wateringCause ? `Cause: ${formatWateringCauseLabel(wateringCause)}` : "",
          niveauHydrique ? `Hydrique: ${formatStatusLabel(niveauHydrique)}` : "",
        ].filter(Boolean).join(" · "),
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

    pushGroup(priorityGroup);

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
    const tonteAttrs = tonteEntity?.attributes || {};
    const tonteReason = String(
      tonteEntity?.attributes?.raison_blocage_tonte
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
    const interventionSignal = this._entity("entity_signal_intervention");
    const actionTone = this._actionTone();

    let title = "Vue d’ensemble";
    let hint = conseil || planState.summary || windowState.summary || "Les paramètres restent cohérents.";
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

    if (wateringCause === "post_application" && irrigationSignal.reasonKind === "blocked") {
      title = "Post-produit bloqué";
      hint = irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage post-produit.";
      tone = "danger";
      icon = "mdi:cancel";
    } else if (wateringCause === "post_application" && irrigationSignal.reasonKind === "waiting") {
      title = "Post-produit en attente";
      hint = irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage reste en attente.";
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (wateringCause === "post_application" && ["post_application", "hydric_need"].includes(irrigationSignal.reasonKind)) {
      title = irrigationSignal.actionLabel || "Post-produit prêt";
      hint = irrigationSignal.summary || windowState.displaySummary || "Le post-arrosage est prêt.";
      tone = "success";
      icon = "mdi:sprinkler";
    } else if (assistant.entity && assistant.status === "action_required") {
      title = assistant.summary || assistant.actionLabel;
      hint = conseil || assistant.reason || irrigationSignal.summary || planState.summary || windowState.displaySummary;
      tone = assistant.tone || "success";
      icon = assistant.action.includes("arros") ? "mdi:sprinkler" : assistant.action.includes("tonte") ? "mdi:content-cut" : "mdi:account-tie-hat-outline";
    } else if (irrigationSignal.reasonKind === "blocked") {
      title = irrigationSignal.actionLabel || "Irrigation bloquée";
      hint = irrigationSignal.summary || windowState.displaySummary || "Un blocage empêche l’arrosage.";
      tone = "danger";
      icon = "mdi:cancel";
    } else if (irrigationSignal.reasonKind === "waiting" && objective > 0) {
      title = irrigationSignal.actionLabel || "Attendre";
      hint = irrigationSignal.summary || windowState.displaySummary || "Le prochain créneau n’est pas encore ouvert.";
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.isAwaiting && objective > 0) {
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
    } else if (mowingBusy) {
      title = "Tonte en cours";
      hint = assistant.reason || tonteReason || "La tondeuse est déjà en train de tondre.";
      tone = "warning";
      icon = "mdi:content-cut";
    } else if (assistant.status === "blocked" && assistant.action === "tonte") {
      title = assistant.reason || assistant.summary || "Tonte différée";
      hint = assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary;
      tone = assistant.tone === "danger" ? "danger" : "warning";
      icon = "mdi:content-cut";
    } else if (mowingActionPossible) {
      title = "Tonte possible";
      hint = assistant.reason || tonteReason || conseil || planState.summary || windowState.displaySummary;
      tone = "success";
      icon = "mdi:content-cut";
    } else if (tonteTone === "danger" || tonteTone === "critical") {
      title = tonteStatusLabel || "Tonte interdite";
      hint = tonteReason || avoid || "Tonte déconseillée dans les conditions actuelles.";
      tone = tonteTone === "critical" ? "critical" : "danger";
      icon = "mdi:content-cut";
    } else if (tonteTone === "warning") {
      title = tonteStatusLabel || "Tonte à surveiller";
      const mowerHint = mowerState.present && mowerState.nextDeparture
        ? `Prochain départ programmé le ${mowerState.nextDeparture}.`
        : "";
      hint = [
        tonteReason,
        mowerHint || (tonteNextMowing ? `Prochaine tonte estimée le ${tonteNextMowing}.` : ""),
      ].filter(Boolean).join(" ") || conseil || "Attendre une meilleure fenêtre de tonte.";
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
    const tonteAutoriseeEntity = this._entity("entity_tonte_autorisee");
    const assistant = this._assistantState();
    const height = this._entity("entity_hauteur");
    const windowState = this._windowState();
    const mowerState = this._mowerState();
    const mowingBlock = this._mowingBlockState();
    const tonteAttrs = tonte?.attributes || tonteAutoriseeEntity?.attributes || {};
    const gazonPermetTonte = tonteAttrs.gazon_permet_tonte !== undefined ? Boolean(tonteAttrs.gazon_permet_tonte) : tonteAutorisee === "on";
    const machinePermetTonte = tonteAttrs.machine_permet_tonte !== undefined
      ? Boolean(tonteAttrs.machine_permet_tonte)
      : mowerState.present ? mowerState.ready === true : false;
    const actionPossible = tonteAttrs.action_possible !== undefined
      ? Boolean(tonteAttrs.action_possible)
      : gazonPermetTonte && machinePermetTonte;
    const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
    const mowingBusy = assistant.status === "blocked" && assistant.action === "tonte" && (
      String(assistant.reason || "").toLowerCase().includes("déjà en cours")
      || String(assistant.reason || "").toLowerCase().includes("en cours")
      || String(tonteAttrs.mower_operation_label || "").toLowerCase().includes("en cours")
      || String(tonteAttrs.mower_reason_label || "").toLowerCase().includes("en cours")
    );
    const mowingImpossibleReason = assistant.status === "blocked" && assistant.action === "tonte"
      ? assistant.reason || assistant.summary || "Tonte impossible"
      : mowerState.present
        ? mowerState.ready === false
          ? mowerState.reason || mowerState.label || "Machine non prête"
          : mowerState.label || "Tonte impossible"
        : "Tonte impossible";
    const mowingHeaderValue = mowingBusy
      ? "Tonte en cours"
      : actionPossible
        ? "Tonte possible"
        : "Tonte impossible";
    const mowingHeaderTone = mowingBusy
      ? "warning"
      : actionPossible
        ? "success"
        : assistant.status === "blocked" && assistant.action === "tonte"
          ? "warning"
          : mowerState.present && mowerState.ready === false
            ? "danger"
            : "danger";
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
    const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
    const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
    const windowSummary = windowState.entity ? windowState.summary : "Fenêtre optimale non disponible";
    const mowingStatusIcon = this._config?.show_icons ? "mdi:content-cut" : null;
    const mowerIsMowing = ["mowing", "tonte", "tonte_en_cours"].includes(String(mowerState.status || "").trim().toLowerCase())
      || String(mowerState.operationLabel || "").toLowerCase().includes("tonte");
    const machineStateLabel = mowingBusy || mowerIsMowing
      ? "Tonte en cours"
      : mowerState.present
        ? mowerState.ready === true
          ? "Prête"
          : mowerState.reason || mowerState.operationLabel || "Non prête"
        : "Indisponible";
    const machineStateSecondary = mowingBusy || mowerIsMowing
      ? assistant.reason || mowerState.reason || mowerState.operationLabel || "Tondeuse en cours de tonte."
      : mowerState.present
        ? mowerState.reason || mowerState.operationLabel || mowerState.label
        : "Tondeuse non disponible";
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
        label: "Gazon permet la tonte",
        value: formatAuthorizationState(tonteAutorisee),
        tone: tonteAutorisee === "on" ? "success" : "danger",
        icon: "mdi:content-cut",
        secondary: mowingBlock.blocked ? mowingBlock.detail || mowingBlock.reasonLabel : "",
        entityKey: "entity_tonte_autorisee",
      },
      {
        label: "Machine",
        value: machineStateLabel,
        tone: mowingBusy || mowerIsMowing ? "warning" : machinePermetTonte ? "success" : mowerState.present ? "danger" : "neutral",
        icon: "mdi:robot-mower",
        secondary: machineStateSecondary,
        entityKey: "entity_tonte",
      },
      {
        label: "Action possible",
        value: actionPossible ? "Oui" : "Non",
        tone: actionPossible ? "success" : "danger",
        icon: "mdi:check-circle-outline",
        secondary: actionPossible ? "Terrain et machine alignés" : "Terrain ou machine non prêt",
        entityKey: "entity_tonte",
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
    if (mowingBlock.blocked || mowingBlock.postApplicationActive) {
      mowingFacts.splice(
        1,
        0,
        {
          label: "Blocage tonte",
          value: mowingBlock.reasonLabel || "Blocage actif",
          tone: mowingBlock.tone || "danger",
          icon: "mdi:cancel",
          secondary: mowingBlock.detail || "",
          entityKey: "entity_tonte_autorisee",
        },
      );
    }
    if (mowerState.present) {
      const mowerCoordinationState = this._mowerCoordinationSwitchState();
      const mowerOperationLabel = normalizeOptionalDisplayValue(mowerState.operationLabel);
      const mowerReasonLabel = normalizeOptionalDisplayValue(mowerState.reason);
      const mowerNextDeparture = normalizeOptionalDisplayValue(mowerState.nextDeparture);
      const mowerSecondary = [
        mowerState.label !== mowerState.operationLabel && mowerOperationLabel ? `État: ${mowerOperationLabel}` : "",
        mowerReasonLabel,
      ].filter(Boolean).join(" · ");
      const coordinationSecondary = [
        mowerState.safeForWatering === undefined ? "" : `Arrosage sûr: ${mowerState.safeForWatering ? "Oui" : "Non"}`,
        mowerState.sourceEntity || "",
      ].filter(Boolean).join(" · ");
      mowingFacts.splice(
        mowingBlock.blocked || mowingBlock.postApplicationActive ? 2 : 1,
        0,
        {
          label: mowerState.name ? `Robot · ${mowerState.name}` : "Robot tondeuse",
          value: mowerState.label,
          tone: mowerState.tone,
          icon: "mdi:robot-mower",
          secondary: mowerSecondary,
          entityKey: "entity_tonte",
        },
        {
          label: "Coordination tondeuse",
          value: mowerCoordinationState.label,
          tone: mowerCoordinationState.tone,
          icon: "mdi:robot-mower",
          secondary: coordinationSecondary,
          entityKey: "entity_tonte",
        },
        {
          label: "Batterie tondeuse",
          value: mowerState.battery === null ? "Non disponible" : `${mowerState.battery} %`,
          tone: mowerState.battery !== null && mowerState.battery <= 20 ? "warning" : "neutral",
          icon: "mdi:battery",
          secondary: mowerNextDeparture,
          entityKey: "entity_tonte",
        },
        {
          label: "Présence robot",
          value: mowerState.presenceLabel,
          tone: mowerState.presenceState === "dockee" ? "success" : mowerState.presenceState === "inconnue" ? "warning" : mowerState.tone,
          icon: "mdi:garage",
          secondary: mowerState.operationLabel,
          entityKey: "entity_tonte",
        },
      );
      if (mowerNextDeparture) {
        mowingFacts.push({
          label: "Prochain départ",
          value: mowerNextDeparture,
          tone: "neutral",
          icon: "mdi:calendar-clock",
          secondary: "",
          entityKey: "entity_tonte",
        });
      }
      if (mowerState.cuttingHeightMm !== null) {
        mowingFacts.push({
          label: "Hauteur de coupe",
          value: `${mowerState.cuttingHeightMm} mm`,
          tone: "neutral",
          icon: "mdi:grass",
          secondary: "",
        });
      }
    }

    return `
      <section class="tab-panel gi-panel tab-panel--mowing">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Tonte</div>
            <div class="tab-panel__title">État, hauteur et créneau</div>
            ${!actionPossible && !mowingBusy ? `<div class="tab-panel__header-hint">${escapeHtml(mowingImpossibleReason)}</div>` : ""}
          </div>
          ${renderStatusPill(mowingHeaderValue, mowingHeaderTone, mowingStatusIcon, "tab-panel__status")}
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
    const mowerState = this._mowerState();
    const mowerCoordinationState = this._mowerCoordinationSwitchState();
    const irrigationSignal = this._irrigationSignalState();
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
      this._renderTabPill("Profil d'irrigation", formatWateringTypeLabel(context.typeArrosage), isEmpty(context.typeArrosage) ? "neutral" : "accent", "mdi:sprinkler"),
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
      this._renderTabPill("Coordination tondeuse", mowerCoordinationState.label, mowerCoordinationState.tone, "mdi:robot-mower"),
      (irrigationSignal.wateringBlockedByMower || ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(mowerState.reasonCode))
        ? this._renderTabPill("Blocage tondeuse", irrigationSignal.wateringBlockReasonLabel || mowerState.reason || "Tondeuse à vérifier", "danger", "mdi:robot-mower-alert")
        : "",
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
    const tiles = keys
      .map((key) => ENTITY_KEYS.find((field) => field.key === key))
      .filter(Boolean)
      .map((field) => this._renderTile(field))
      .filter(Boolean);
    if (!tiles.length) {
      return "";
    }
    return `
      <section class="gi-info gi-info--secondary advanced-group">
        <div class="advanced-group__head">
          <div class="advanced-group__eyebrow">${escapeHtml(eyebrow)}</div>
          <div class="advanced-group__title">${escapeHtml(title)}</div>
          <div class="advanced-group__meta">${escapeHtml(meta)}</div>
        </div>
        <div class="advanced-group__grid">
          ${tiles.join("")}
        </div>
      </section>
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
    const mowerState = this._mowerState();
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
          ${this._renderMetric("Profil d'irrigation", formatWateringTypeLabel(typeArrosage), isEmpty(typeArrosage) ? "neutral" : "accent", "mdi:sprinkler")}
          ${this._renderMetric("Tonte", tonte, computeTonteTone(tonte), this._heroMetricIcon("entity_tonte", tonte))}
          ${mowerState.present ? this._renderMetric("Robot", mowerState.label, mowerState.tone, "mdi:robot-mower") : ""}
          ${this._renderMetric("Irrigation", formatRecommendationState(arrosage), arrosage === "on" ? "success" : "neutral", this._heroMetricIcon("entity_arrosage_recommande", arrosage))}
          ${this._renderMetric("Gazon permet la tonte", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", this._heroMetricIcon("entity_tonte_autorisee", tonteAutorisee))}
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
    if (this._canShowLegacyDetails()) {
      return this._buildAdvancedContent(this._activeTab);
    }
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
    this._hass.callService(service.domain, service.service, {});
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



function renderTabNav(card) {
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

function renderSectionNav(card) {
  if (card._isMinimalMode() || card._canShowLegacyDetails()) {
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
  const selectionValue = quickAction.record ? quickAction.label : "Aucun produit sélectionné";
  const selectionSecondary = [
    quickAction.summary || "",
    hasProductOptions && !quickAction.record ? "Sélection nécessaire avant déclaration." : "",
  ].filter(Boolean).join(" · ");
  const declarationValue = canDeclare ? "Déclaration possible" : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const declarationSecondary = [
    ui.declarationSummary || "",
    ui.declarationHint || "",
  ].filter(Boolean).join(" · ");
  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--intervention-overview">
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Pilotage intervention</div>
          <div class="tab-panel__section-meta">${escapeHtml(ui.badge || "Analyse active")}</div>
        </div>
        <div class="decision-plan tab-panel__decision-plan tab-panel__decision-plan--intervention">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Produit proposé</div>
            <div class="decision-plan__meta">${escapeHtml(ui.actionLabel || "Choisir le produit")}</div>
          </div>
          <div class="decision-plan__summary">${escapeHtml(proposedProductValue)}</div>
          <div class="decision-plan__chips">
            ${ui.badge ? renderStatusPill(ui.badge, recommendationTone, recommendationIcon, "debug-chip") : ""}
            ${recommendation.product.type ? renderStatusPill(formatStatusLabel(recommendation.product.type), "neutral", "mdi:package-variant", "debug-chip") : ""}
            ${
              recommendation.product.monthsLabel
                ? renderStatusPill(recommendation.product.monthsLabel, "neutral", "mdi:calendar-month", "debug-chip")
                : ""
            }
            ${
              recommendation.score !== null && recommendation.score !== undefined
                ? renderStatusPill(`Score ${formatNumber(recommendation.score, 0)}/100`, recommendationTone, "mdi:signal", "debug-chip")
                : ""
            }
          </div>
        </div>
        <div class="tab-panel__section-summary-list">
          ${renderCompactSummaryList([
            {
              label: "Produit sélectionné",
              value: selectionValue,
              note: selectionSecondary,
              tone: quickAction.record ? "success" : hasProductOptions ? "warning" : "neutral",
              entityKey: quickAction.record ? null : "entity_prochaine_intervention",
            },
            {
              label: "Déclaration",
              value: declarationValue,
              note: declarationSecondary,
              tone: canDeclare ? "success" : recommendationTone,
              entityKey: canDeclare ? null : "entity_prochaine_intervention",
            },
          ])}
        </div>
      </section>
    `;
}

function renderInterventionTechnicalSummary(card, recommendation, debug) {
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
  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--intervention-technical">
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Repères techniques</div>
          <div class="tab-panel__section-meta">${escapeHtml(debug?.statusLabel || "Analyse moteur")}</div>
        </div>
        <div class="decision-plan tab-panel__decision-plan tab-panel__decision-plan--technical">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Score</div>
            <div class="decision-plan__meta">${escapeHtml(scoreValue)}</div>
          </div>
          <div class="decision-plan__summary">${escapeHtml(recommendation.ui?.summary || debug?.summary || "Analyse moteur")}</div>
          <div class="decision-plan__chips">
            ${renderStatusPill(`Niveau ${formatStatusLabel(recommendation.scoreLevel || "neutral")}`, scoreTone, "mdi:signal", "debug-chip")}
            ${renderStatusPill(`${blockingConstraints} bloquante${blockingConstraints > 1 ? "s" : ""}`, blockingConstraints > 0 ? "danger" : "success", blockingConstraints > 0 ? "mdi:alert-circle-outline" : "mdi:check-circle-outline", "debug-chip")}
            ${renderStatusPill(`${nonBlockingConstraints} signal${nonBlockingConstraints > 1 ? "s" : ""}`, nonBlockingConstraints > 0 ? "warning" : "neutral", "mdi:shield-alert-outline", "debug-chip")}
            ${renderStatusPill(`${missingRequirements} manquant${missingRequirements > 1 ? "s" : ""}`, missingRequirements > 0 ? "warning" : "success", missingRequirements > 0 ? "mdi:clipboard-alert-outline" : "mdi:check-circle-outline", "debug-chip")}
          </div>
        </div>
        <div class="tab-panel__section-summary-list">
          ${renderCompactSummaryList([
            {
              label: "Bloquantes",
              value: String(blockingConstraints),
              note: blockingConstraints > 0 ? "Une ou plusieurs contraintes bloquent la déclaration." : "Aucune contrainte bloquante.",
              tone: blockingConstraints > 0 ? "danger" : "success",
            },
            {
              label: "Non bloquantes",
              value: String(nonBlockingConstraints),
              note: nonBlockingConstraints > 0 ? "Signaux dégradants ou neutres pris en compte." : "Aucun signal secondaire détaillé.",
              tone: nonBlockingConstraints > 0 ? "warning" : "neutral",
            },
            {
              label: "Manquants",
              value: String(missingRequirements),
              note: missingRequirements > 0 ? "Des étapes restent à compléter avant déclaration." : "Aucun pré-requis manquant.",
              tone: missingRequirements > 0 ? "warning" : "success",
            },
          ])}
        </div>
      </section>
    `;
}

function renderWateringProgressSection(card, progressState) {
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
  const status = String(entity.attributes?.status || state).trim().toLowerCase();
  const summary = String(entity.attributes?.summary || "").trim();
  const blockReason = String(entity.attributes?.block_reason || "").trim();
  const blockLabel = String(entity.attributes?.block_label || "").trim();
  const wateringCause = String(entity.attributes?.watering_cause || "").trim().toLowerCase();
  const isPostApplication = wateringCause === "post_application";
  let tone = state === "attendre" ? "warning" : ["maintenant", "ce_matin"].includes(state) ? "success" : ["demain_matin", "apres_pluie", "soir"].includes(state) ? "accent" : "neutral";
  let value = formatStatusLabel(state);
  if (isPostApplication) {
    if (status === "auto") {
      value = "Post-produit auto";
      tone = "success";
    } else if (status === "autorise") {
      value = "Post-produit autorisé";
      tone = "success";
    } else if (status === "en_attente") {
      value = "Post-produit en attente";
      tone = "warning";
    } else if (status === "bloque") {
      value = "Post-produit bloqué";
      tone = "danger";
    } else {
      value = formatWateringCauseLabel(wateringCause);
    }
  }
  return {
    label: "Prochaine fenêtre optimale",
    value,
    tone,
    icon: "mdi:clock-outline",
    secondary: [summary, isPostApplication ? `Cause: ${formatWateringCauseLabel(wateringCause)}` : "", blockLabel || formatStatusLabel(blockReason)].filter(Boolean).join(" · "),
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
  const actionLabel = String(entity.attributes?.action_label || "").trim();
  const reasonKind = String(entity.attributes?.reason_kind || "").trim().toLowerCase();
  const triggerKind = String(entity.attributes?.trigger_kind || "").trim().toLowerCase();
  const sourceStatus = String(entity.attributes?.source_status || "").trim();
  const wateringCause = String(entity.attributes?.watering_cause || "").trim().toLowerCase();
  const tone = formatIrrigationSignalTone({ reasonKind, triggerKind });
  const secondaryParts = [];
  if (actionLabel && actionLabel !== summary) {
    secondaryParts.push(actionLabel);
  }
  if (wateringCause) {
    secondaryParts.push(`Cause: ${formatWateringCauseLabel(wateringCause)}`);
  }
  if (reasonKind) {
    secondaryParts.push(`Raison: ${formatStatusLabel(reasonKind)}`);
  }
  if (triggerKind) {
    secondaryParts.push(`Déclencheur: ${formatDerivedTriggerLabel(triggerKind)}`);
  }
  if (sourceStatus && sourceStatus !== triggerKind) {
    secondaryParts.push(`Statut source: ${formatStatusLabel(sourceStatus)}`);
  }
  return {
    label,
    value: formatIrrigationSignalLabel({ actionLabel, summary, reasonKind }),
    tone,
    icon,
    secondary: secondaryParts.join(" · "),
  };
}

function renderCatalogueProductCards(card) {
  const products = card._catalogueProducts();
  const selection = card._productSelectionState();
  const selectedProductId = String(selection.selectedProductId || "").trim().toLowerCase();
  if (!products.length) {
    return `<div class="tab-panel__empty">Aucun produit enregistré.</div>`;
  }
  return renderCompactSummaryList(
    products.map((product) => {
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
        note: secondaryParts.join(" · "),
        tone: isSelected ? "success" : "neutral",
      };
    }),
  );
}

function renderProductsScopeSection() {
  return `
      <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--products-scope">
        <div class="tab-panel__section-head">
          <div class="tab-panel__eyebrow">Repère</div>
        </div>
        <div class="tab-panel__section-summary">Catalogue, sélection active et dernière application</div>
        <div class="tab-panel__section-hint">L’analyse de pertinence détaillée reste dans l’onglet Intervention.</div>
      </section>
    `;
}

function renderProductSummarySection(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const hasProductData = Boolean(
    selection.selectedProductId || selection.selectedProductName || catalogue.hasProducts,
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
        </div>
        <div class="decision-plan tab-panel__decision-plan tab-panel__decision-plan--products">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Produit sélectionné</div>
            <div class="decision-plan__meta">${escapeHtml(catalogueLabel)}</div>
          </div>
          <div class="decision-plan__summary">${escapeHtml(selectionValue)}</div>
          <div class="decision-plan__chips">
            ${selection.selectedProductName ? renderStatusPill("Sélection active", "success", "mdi:package-variant", "debug-chip") : renderStatusPill("Sélection à faire", "neutral", "mdi:package-variant-closed", "debug-chip")}
            ${catalogue.hasProducts ? renderStatusPill(catalogue.summary || "Catalogue local", "success", "mdi:package-variant-closed", "debug-chip") : renderStatusPill("Aucun produit enregistré", "neutral", "mdi:package-variant-closed", "debug-chip")}
          </div>
        </div>
        <div class="tab-panel__section-summary-list">
          ${renderCompactSummaryList([
            {
              label: "Sélection active",
              value: selectionValue,
              note: selectionDetails,
              tone: selection.selectedProductName ? "success" : "neutral",
              entityKey: selection.selectedProductName ? null : "entity_produit_intervention",
            },
            {
              label: "Catalogue local",
              value: catalogueLabel,
              note: catalogue.hasProducts ? "Le référentiel local alimente le choix du produit et l’historique." : "Aucun produit enregistré",
              tone: catalogue.hasProducts ? "success" : "neutral",
            },
          ])}
        </div>
      </section>
    `;
}

function renderProductsTab(card) {
  const selection = card._productSelectionState();
  const catalogue = card._catalogueState();
  const application = card._applicationEntity();
  const lastApplication = card._lastApplicationState();
  const hasApplication = Boolean(lastApplication.hasApplication);
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

  return `
      <section class="tab-panel gi-panel tab-panel--products">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${productsTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Référentiel produit</div>
            ${renderStatusPill(hasProductData ? catalogue.summary : emptyStateMessage, productsTone, "mdi:package-variant-closed", `tab-panel__status tab-panel__status--${productsTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(productsSummary)}</div>
          <div class="tab-panel__hero-hint">${escapeHtml(productsHint || "Le référentiel produit sert de base à la recommandation et à la déclaration.")} · ${escapeHtml("L’analyse détaillée reste dans Intervention.")}</div>
        </div>

        ${renderProductSummarySection(card)}
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--catalogue-reference">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Catalogue</div>
            <div class="tab-panel__section-meta">${escapeHtml(catalogue.summary || "Catalogue local")}</div>
          </div>
          <div class="tab-panel__section-summary">Produits disponibles dans le référentiel local</div>
          <div class="tab-panel__section-hint">Le catalogue sert au choix du produit et à l’historique, sans reprendre l’analyse métier détaillée.</div>
          <div class="tab-panel__grid tab-panel__grid--products">
            ${renderCatalogueProductCards(card)}
          </div>
        </section>
        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--application-history">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Dernière application</div>
            <div class="tab-panel__section-meta">${escapeHtml(hasApplication ? "Historique local" : "Aucune application")}</div>
          </div>
          <div class="tab-panel__section-summary">${escapeHtml(lastApplicationSummary)}</div>
          <div class="tab-panel__section-hint">${escapeHtml(lastApplicationHint)}</div>
        </section>
        ${renderProductsScopeSection()}
      </section>
    `;
}

function renderInterventionTab(card) {
  const recommendation = card._interventionRecommendationState();
  const debug = getDebugInterventionState(card);
  const quickAction = card._selectedProductInterventionState();
  const lastApplication = card._lastApplicationState();
  const productOptions = card._catalogueProductOptions();
  const ui = recommendation.ui || {};
  const selectedProductOptionLabel = quickAction.optionLabel || (productOptions.length === 1 ? productOptions[0].label : "");
  const hasProductOptions = productOptions.length > 0;
  const canDeclare = Boolean(quickAction.record && !quickAction.disabled);
  const hasSelection = Boolean(quickAction.record && !quickAction.disabled);
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
  const declarationActionLabel = canDeclare
    ? quickAction.actionLabel || "Déclarer le produit"
    : `Action : ${ui.actionLabel || "Choisir le produit"}`;
  const pickerSummary = ui.selectionSummary || (quickAction.record ? "Sélection active." : hasProductOptions ? "Sélectionne un produit dans la liste." : "Aucun produit disponible.");
  const pickerHint = ui.selectionHint || "La sélection met à jour le produit actif.";
  const actionSummary = canDeclare
    ? "Déclaration manuelle disponible."
    : ui.declarationSummary || "Déclaration indisponible.";
  const actionHint = canDeclare
    ? "Le produit sélectionné peut maintenant être déclaré depuis la carte."
    : ui.declarationHint || "La déclaration suit le produit sélectionné.";
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

        ${renderInterventionOverviewSection(card, recommendation, {
          quickAction,
          hasProductOptions,
          canDeclare,
          ui,
          recommendationTone,
          recommendationIcon,
        })}

        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--intervention-decision">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Actions</div>
            <div class="tab-panel__section-meta">${escapeHtml(declarationMeta)}</div>
          </div>
          <div class="tab-panel__decision-strip" aria-hidden="true">
            ${card._renderTabPill("Recommandation", ui.badge || "Non disponible", recommendationTone, recommendationIcon)}
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
                aria-label="${escapeHtml(canDeclare ? (quickAction.actionLabel || "Déclarer le produit") : (ui.actionLabel || "Choisir le produit"))}"
              >
                ${renderIconBox("mdi:spray-bottle", "sm")}
                <span>${escapeHtml(declarationActionLabel)}</span>
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

function renderHeader(card) {
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
  return `
      <header class="gi-row header">
        <div class="gi-row header__title-wrap">
          <div class="header__icon header__icon--${tone}">
            ${card._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}
          </div>
          <div class="header__titles">
            <div class="header__title">${escapeHtml(card._config.title || "Gazon Intelligent")}</div>
            <div class="header__subtitle">${subtitleParts.join(" · ")}</div>
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

function renderOverviewTab(card) {
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
    { key: "entity_signal_irrigation", fact: getDerivedSignalPresentation(card._entity("entity_signal_irrigation"), "Signal irrigation", "mdi:sprinkler") },
  ].filter(({ fact }) => Boolean(fact));

  return `
      <section class="tab-panel gi-panel tab-panel--overview">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${overviewTone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">Vue prioritaire</div>
            ${renderStatusPill(proposal.title, overviewTone, overviewIcon, `tab-panel__status tab-panel__status--${overviewTone}`)}
          </div>
          <div class="tab-panel__hero-next">${escapeHtml(proposal.hint || windowState.displaySummary || windowState.summary || planState.summary || "Vue d’ensemble de la carte.")}</div>
          <div class="tab-panel__hero-hint">${escapeHtml("Le résumé s’adapte automatiquement à la situation réelle et remonte les informations utiles en premier.")}</div>
        </div>

        ${renderWateringProgressSection(card, wateringProgress)}

        <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--overview-facts">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Essentiel</div>
            <div class="tab-panel__section-meta">${escapeHtml(`${facts.length} repère${facts.length > 1 ? "s" : ""}`)}</div>
          </div>
          ${renderCompactSummaryList(
            facts.map((fact) => ({
              label: fact.label,
              value: fact.value,
              note: fact.secondary,
              tone: fact.tone,
              entityKey: fact.entityKey,
            })),
          )}
        </section>

        ${
          derivedFacts.length
            ? `
              <section class="gi-info gi-info--secondary tab-panel__section tab-panel__section--derived-insights">
                <div class="tab-panel__section-head">
                  <div class="tab-panel__eyebrow">Lecture dérivée</div>
                  <div class="tab-panel__section-meta">Raccourci lisible</div>
                </div>
                ${renderCompactSummaryList(
                  derivedFacts.map(({ fact }) => ({
                    label: fact.label,
                    value: fact.value,
                    note: fact.secondary,
                  })),
                )}
              </section>
            `
            : ""
        }

      </section>
    `;
}

function renderWateringTab(card) {
  const windowState = card._windowState();
  const irrigationSignal = card._irrigationSignalState();
  const mowerState = card._mowerState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
  const context = card._objectiveContext();
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

  const planChips = [
    card._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
    card._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
    card._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
    card._renderTabPill("Type de plan", planTypeLabel, card._planTypeTone(planState.planType), "mdi:shape"),
    card._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
    card._renderTabPill("Cause", wateringCauseLabel, windowState.isPostApplication ? "accent" : "neutral", "mdi:source-branch"),
    card._renderTabPill("Type", wateringTypeLabel, isEmpty(irrigationSignal.typeArrosage || context.typeArrosage) ? "neutral" : "accent", "mdi:sprinkler"),
    card._renderTabPill("Signal", irrigationSignal.actionLabel || "Non disponible", tone, "mdi:sprinkler"),
    card._renderTabPill("Raison", formatStatusLabel(irrigationSignal.reasonKind), tone, "mdi:information-outline"),
    card._renderTabPill("Coordination tondeuse", mowerCoordinationState.label, mowerCoordinationState.tone, "mdi:robot-mower"),
    (irrigationSignal.wateringBlockedByMower || ["ambiguous", "mower_ambiguous", "missing", "mower_missing", "configured_missing", "mower_configured_missing"].includes(mowerState.reasonCode))
      ? card._renderTabPill("Blocage tondeuse", irrigationSignal.wateringBlockReasonLabel || mowerState.reason || "Tondeuse à vérifier", "danger", "mdi:robot-mower-alert")
      : "",
    card._renderTabPill("Fenêtre", windowState.statusLabel, windowState.tone, "mdi:clock-outline"),
    windowState.optimalWindowDisplay ? card._renderTabPill("Optimal", windowState.optimalWindowDisplay, "neutral", "mdi:clock-time-eight-outline") : "",
    windowState.wateringWindowDisplay ? card._renderTabPill("Créneau", windowState.wateringWindowDisplay, "neutral", "mdi:timeline-clock-outline") : "",
    context.hydricState ? card._renderTabPill("État hydrique", formatStatusLabel(context.hydricState), context.hydricState === "plein" ? "success" : "warning", "mdi:water-percent-alert") : "",
    context.reserveActuelle !== null ? card._renderTabPill("Réserve", `${formatNumber(context.reserveActuelle, 1)} mm`, "neutral", "mdi:cup-water") : "",
    context.depletionRatio !== null ? card._renderTabPill("Déplétion", formatNumber(context.depletionRatio, 3), "neutral", "mdi:gauge") : "",
  ];
  const wateringProgress = card._wateringProgressState();

  return `
      <section class="tab-panel gi-panel tab-panel--watering">
        <div class="gi-info gi-info--main tab-panel__hero tab-panel__hero--${tone}">
          <div class="tab-panel__hero-top">
            <div class="tab-panel__hero-summary">${escapeHtml(irrigationSignal.summary || windowState.displaySummary || windowState.summary || "Irrigation")}</div>
            ${renderStatusPill(irrigationSignal.actionLabel || windowState.statusLabel, tone, windowStatusIcon, `tab-panel__hero-status tab-panel__hero-status--${tone}`)}
          </div>
          ${
            heroNextText
              ? `<div class="tab-panel__hero-next">${escapeHtml(heroNextText)}</div>`
              : ""
          }
          ${
            shouldShowHeroHint
              ? `<div class="tab-panel__hero-hint">${escapeHtml(heroHintText)}</div>`
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

function renderGazonTab(card) {
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
      secondary: hydricLevel ? `Hydrique: ${formatStatusLabel(hydricLevel)}` : "",
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

function renderMowingTab(card) {
  const tonte = card._entity("entity_tonte");
  const tonteAutorisee = card._entityState("entity_tonte_autorisee", null);
  const tonteAutoriseeEntity = card._entity("entity_tonte_autorisee");
  const height = card._entity("entity_hauteur");
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
  const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
  const heightValue = height ? formatCm(height.state) : "Non disponible";
  const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
  const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
  const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
  const windowSummary = windowState.entity ? windowState.displaySummary || windowState.summary : "Fenêtre optimale non disponible";
  const mowingStatusIcon = card._config?.show_icons ? "mdi:content-cut" : null;
  const mowingDecisionSummary = actionPossible
    ? "Terrain et machine alignés."
    : mowingBlock.blocked
      ? mowingBlock.reasonLabel || mowingBlock.detail || mowerState.reason || "Tonte bloquée par conditions."
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
      value: machinePermetTonte ? "Prête" : "Non prête",
      tone: machinePermetTonte ? "success" : mowerState.present ? "danger" : "neutral",
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
      value: mowerState.present ? (machinePermetTonte ? "Prête" : "Indisponible") : "Absente",
      note: mowerState.present ? mowerState.reason || "" : "Tondeuse non disponible",
      tone: machinePermetTonte ? "success" : mowerState.present ? "danger" : "neutral",
    },
    {
      label: "Blocage",
      value: mowingBlock.blocked ? mowingBlock.reasonLabel || "Actif" : "Aucun",
      note: mowingBlock.blocked ? mowingBlock.detail || "" : "Aucun frein hydrique ou post-produit.",
      tone: mowingBlock.blocked ? "danger" : "success",
    },
    {
      label: "Fenêtre optimale",
      value: windowSummary,
      note: windowState.nextActionDisplay || windowState.nextAction || "",
      tone: windowState.tone,
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

  return `
      <section class="tab-panel gi-panel tab-panel--mowing">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Tonte</div>
            <div class="tab-panel__title">Tableau de décision, hauteur et créneau</div>
          </div>
          ${renderStatusPill(tonteValue, computeTonteTone(tonteValue), mowingStatusIcon, "tab-panel__status")}
        </div>

        <div class="decision-plan tab-panel__decision-plan tab-panel__decision-plan--mowing">
          <div class="decision-plan__header">
            <div class="decision-plan__label">Lecture rapide</div>
            <div class="decision-plan__meta">${escapeHtml(mowingDecisionSummary)}</div>
          </div>
          <div class="decision-plan__chips">
            ${renderStatusPill(mowingDecisionPills[0].value, mowingDecisionPills[0].tone, mowingDecisionPills[0].icon, "debug-chip")}
            ${renderStatusPill(mowingDecisionPills[1].value, mowingDecisionPills[1].tone, mowingDecisionPills[1].icon, "debug-chip")}
            ${renderStatusPill(mowingDecisionPills[2].value, mowingDecisionPills[2].tone, mowingDecisionPills[2].icon, "debug-chip")}
          </div>
        </div>

        <section class="tab-panel__section tab-panel__section--mowing-summary">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Lecture rapide</div>
            <div class="tab-panel__section-meta">${escapeHtml(mowingBlock.blocked ? mowingBlock.reasonLabel || "Blocage actif" : "Aucun blocage")}</div>
          </div>
          ${renderCompactSummaryList(mowingSummaryItems)}
        </section>
      </section>
    `;
}

function renderConfigTab(card) {
  const switchState = card._configSwitchState();
  const mowerCoordinationState = card._mowerCoordinationSwitchState();
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
  const mowingCooldown = card._renderConfigValue("entity_delai_reprise_tonte_apres_arrosage", "min");

  return `
      <section class="tab-panel gi-panel tab-panel--config">
        <div class="tab-panel__header">
          <div>
            <div class="tab-panel__eyebrow">Réglages</div>
            <div class="tab-panel__title">Autorisations, coordination, débits et hauteurs</div>
            <div class="tab-panel__header-hint">Touchez une tuile pour ouvrir le contrôle Home Assistant correspondant.</div>
          </div>
          ${renderStatusPill(switchState.label, switchState.tone, switchIcon, "tab-panel__status")}
        </div>

        <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-top">
          ${card._renderConfigActionCard("Irrigation automatique", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
          ${card._renderConfigActionCard("Coordination tondeuse", "entity_switch_coordination_tondeuse", mowerCoordinationState.label, mowerCoordinationState.tone, "mdi:robot-mower")}
          ${card._renderConfigActionCard("Post-application", "entity_arrosage_apres_application_autorise", afterApplicationInfo.label, afterApplicationInfo.tone, "mdi:water-off")}
          ${card._renderConfigActionCard("Gazon permet la tonte", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          ${card._renderConfigActionCard("Mode du gazon", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
          ${card._renderConfigActionCard("Cooldown tonte après arrosage", "entity_delai_reprise_tonte_apres_arrosage", mowingCooldown.value, mowingCooldown.tone, "mdi:timer-cog-outline")}
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

function renderActiveTab(card) {
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

function renderDecisionLayout(card) {
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



const ENTITY_FIELD_DOMAINS = {
  entity_weather: ["weather"],
  ...Object.fromEntries(
    ENTITY_KEYS.map((field) => [field.key, field.domain || null]),
  ),
};

const ACTION_OPTIONS = [
  { value: "none", label: "Aucune action" },
  { value: "more-info", label: "More-info" },
  { value: "toggle", label: "Basculer" },
  { value: "perform-action", label: "Exécuter une action" },
  { value: "navigate", label: "Naviguer" },
  { value: "url", label: "Ouvrir une URL" },
  { value: "assist", label: "Assist" },
];

class GazonIntelligentCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._handleInput = this._handleInput.bind(this);
  }

  setConfig(config) {
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, config || {}));
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  connectedCallback() {
    this._render();
  }

  getStubConfig() {
    return createStubConfig();
  }

  _entityOptions(domainFilter = null) {
    return Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  }

  _getConfigValue(key) {
    return String(key || "")
      .split(".")
      .filter(Boolean)
      .reduce((value, segment) => value?.[segment], this._config);
  }

  _cloneBranch(value) {
    if (Array.isArray(value)) {
      return [...value];
    }
    if (value && typeof value === "object") {
      return { ...value };
    }
    return {};
  }

  _pruneEmptyObjects(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && typeof value === "object") {
      const next = {};
      Object.entries(value).forEach(([key, child]) => {
        const prunedChild = this._pruneEmptyObjects(child);
        if (prunedChild !== undefined) {
          next[key] = prunedChild;
        }
      });
      return Object.keys(next).length ? next : undefined;
    }
    return value === undefined ? undefined : value;
  }

  _setConfigValue(config, key, value) {
    const path = String(key || "").split(".").filter(Boolean);
    if (!path.length) {
      return config;
    }
    const next = { ...config };
    let cursor = next;
    let sourceCursor = config;
    for (let index = 0; index < path.length - 1; index += 1) {
      const segment = path[index];
      const sourceValue = sourceCursor?.[segment];
      cursor[segment] = this._cloneBranch(sourceValue);
      cursor = cursor[segment];
      sourceCursor = sourceValue;
    }
    const leaf = path[path.length - 1];
    if (value === undefined) {
      delete cursor[leaf];
    } else {
      cursor[leaf] = value;
    }
    return this._pruneEmptyObjects(next) || {};
  }

  _handleInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const key = target.dataset.configKey;
    if (!key || !this._config) {
      return;
    }

    let value;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    const shouldDelete = value === "" && !["title"].includes(key);
    const next = this._setConfigValue(this._config, key, shouldDelete ? undefined : value);
    this._config = normalizeConfig(mergeConfig(DEFAULT_CONFIG, next));
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _bindInputs() {
    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._getConfigValue(field));
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderTextInput(field, label, placeholder = "") {
    const value = this._getConfigValue(field) ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
      </label>
    `;
  }

  _renderNumberInput(field, label, min = 0) {
    const value = this._getConfigValue(field);
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="number"
          min="${escapeHtml(String(min))}"
          step="1"
          value="${escapeHtml(value ?? "")}"
        />
      </label>
    `;
  }

  _renderSelect(field, label, options) {
    const value = String(this._getConfigValue(field) ?? "");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <select data-config-key="${escapeHtml(field)}">
          ${options
            .map(
              (option) => `
                <option value="${escapeHtml(option.value)}" ${option.value === value ? "selected" : ""}>
                  ${escapeHtml(option.label)}
                </option>
              `,
            )
            .join("")}
        </select>
      </label>
    `;
  }

  _renderEntityInput(field, label, placeholder = "sensor.gazon_intelligent_...", domainFilter = undefined, hint = "") {
    const value = this._getConfigValue(field) ?? "";
    const domains = domainFilter === undefined ? ENTITY_FIELD_DOMAINS[field] || null : domainFilter;
    const listId = `gazon-intelligent-card-entities-${field.replaceAll(".", "-")}`;
    const options = this._entityOptions(domains)
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${escapeHtml(listId)}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
        />
        <datalist id="${escapeHtml(listId)}">${options}</datalist>
        ${hint ? `<small class="hint">${escapeHtml(hint)}</small>` : ""}
      </label>
    `;
  }

  _renderActionEditor(actionKey, title) {
    const actionType = String(this._getConfigValue(`${actionKey}.action`) || DEFAULT_CONFIG[actionKey]?.action || "none");
    const rows = [
      this._renderSelect(`${actionKey}.action`, title, ACTION_OPTIONS),
      this._renderEntityInput(`${actionKey}.entity`, "Entité", "sensor.exemple", null),
    ];

    if (actionType === "perform-action") {
      rows.push(this._renderTextInput(`${actionKey}.perform_action`, "Action Home Assistant", "light.turn_on"));
    }
    if (actionType === "navigate") {
      rows.push(this._renderTextInput(`${actionKey}.navigation_path`, "Chemin de navigation", "/lovelace/gazon"));
    }
    if (actionType === "url") {
      rows.push(this._renderTextInput(`${actionKey}.url_path`, "URL", "https://www.home-assistant.io"));
    }
    if (actionType === "assist") {
      rows.push(this._renderTextInput(`${actionKey}.pipeline_id`, "Pipeline Assist", "preferred"));
      rows.push(this._renderCheckbox(`${actionKey}.start_listening`, "Démarrer l'écoute"));
    }

    return `
      <div class="section section--sub">
        <h3>${escapeHtml(title)}</h3>
        <div class="grid">
          ${rows.join("")}
        </div>
      </div>
    `;
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    if (!this._config) {
      this.shadowRoot.innerHTML = `<div class="editor empty">Chargement de l'éditeur…</div>`;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
${EDITOR_STYLES}
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            ${this._renderTextInput("title", "Titre", "Gazon Intelligent")}
            ${this._renderSelect("background_style", "Mode de fond", [
              { value: "solid", label: "solid" },
              { value: "glass", label: "glass" },
              { value: "minimal", label: "minimal" },
            ])}
            ${this._renderTextInput("accent_color", "Couleur d'accent", "var(--primary-color)")}
            ${this._renderSelect("theme_mode", "Mode thème", [
              { value: "auto", label: "auto" },
              { value: "light", label: "light" },
              { value: "dark", label: "dark" },
            ])}
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("compact", "Mode compact")}
            ${this._renderCheckbox("minimal_mode", "Mode minimal")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("use_gradient", "Utiliser un dégradé")}
            ${this._renderCheckbox("show_advanced_details", "Afficher les détails avancés")}
          </div>
          <div class="row">
            ${this._renderNumberInput("icon_size", "Taille des icônes (px)", 16)}
            ${this._renderNumberInput("border_radius", "Rayon des bords (px)", 0)}
          </div>
          <div class="row">
            ${this._renderTextInput("manual_action_service", "Service du bouton manuel", "gazon_intelligent.start_manual_irrigation")}
            ${this._renderTextInput("manual_action_label", "Libellé du bouton manuel", "Irrigation manuelle")}
          </div>
          <div class="hint">L’éditeur filtre les entités par domaine quand la carte connaît le type attendu.</div>
        </section>

        <section class="section">
          <h3>Actions de la carte</h3>
          <p>Ces actions s’appliquent au fond de la carte, hors boutons internes et sélecteurs dédiés.</p>
          ${this._renderActionEditor("tap_action", "Tap")}
          ${this._renderActionEditor("hold_action", "Hold")}
          ${this._renderActionEditor("double_tap_action", "Double tap")}
        </section>

        <section class="section">
          <h3>Synthèse et irrigation</h3>
          <p>Ces entités alimentent la synthèse principale et l'onglet Irrigation.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_assistant", "Assistant")}
            ${this._renderEntityInput("entity_fenetre_optimale", "Fenêtre optimale")}
            ${this._renderEntityInput("entity_weather", "Météo")}
            ${this._renderEntityInput("entity_plan_arrosage", "Plan d'irrigation")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'irrigation")}
            ${this._renderEntityInput("entity_niveau_pertinence", "Niveau de pertinence")}
            ${this._renderEntityInput("entity_prochaine_fenetre_optimale", "Prochaine fenêtre optimale")}
            ${this._renderEntityInput("entity_prochain_blocage_attendu", "Prochain blocage attendu")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Irrigation")}
            ${this._renderEntityInput("entity_arrosage_apres_application_autorise", "Post-application")}
            ${this._renderEntityInput("entity_signal_irrigation", "Signal irrigation")}
            ${this._renderEntityInput("entity_dernier_arrosage", "Dernier arrosage")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
          </div>
        </section>

        <section class="section">
          <h3>Référentiel produit</h3>
          <p>Ces entités séparent la recommandation, le catalogue et l’historique local. Pour le produit courant, branche l’entité Home Assistant visible comme “Produit sélectionné”.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_catalogue_produits", "Référentiel produits")}
            ${this._renderEntityInput(
              "entity_produit_intervention",
              "Produit sélectionné",
              "select.gazon_intelligent_produit_d_intervention",
              undefined,
              "Entité attendue dans Home Assistant: Produit sélectionné (select.gazon_intelligent_produit_d_intervention).",
            )}
            ${this._renderEntityInput("entity_prochaine_intervention", "Prochaine intervention")}
            ${this._renderEntityInput("entity_derniere_application", "Dernière intervention")}
            ${this._renderEntityInput("entity_signal_intervention", "Signal intervention")}
          </div>
        </section>

        <section class="section">
          <h3>Gazon et tonte</h3>
          <p>Ces entités alimentent les onglets Gazon et Tonte.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_mode", "Mode du gazon")}
            ${this._renderEntityInput("entity_type_arrosage", "Profil d'irrigation")}
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_tonte_autorisee", "Gazon permet la tonte")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
          </div>
        </section>

        <section class="section">
          <h3>Réglages</h3>
          <p>Ces entités alimentent l'onglet Réglages pour l'autorisation, la coordination tondeuse, les débits et les hauteurs.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_switch_arrosage_automatique", "Irrigation automatique")}
            ${this._renderEntityInput("entity_switch_coordination_tondeuse", "Coordination tondeuse")}
            ${this._renderEntityInput("entity_delai_reprise_tonte_apres_arrosage", "Cooldown tonte après arrosage")}
            ${this._renderEntityInput("entity_debit_zone_1", "Débit zone 1")}
            ${this._renderEntityInput("entity_debit_zone_2", "Débit zone 2")}
            ${this._renderEntityInput("entity_debit_zone_3", "Débit zone 3")}
            ${this._renderEntityInput("entity_debit_zone_4", "Débit zone 4")}
            ${this._renderEntityInput("entity_debit_zone_5", "Débit zone 5")}
            ${this._renderEntityInput("entity_hauteur_min_tondeuse", "Hauteur min tondeuse")}
            ${this._renderEntityInput("entity_hauteur_max_tondeuse", "Hauteur max tondeuse")}
          </div>
        </section>

        <section class="section">
          <h3>Détails avancés</h3>
          <p>Ces champs alimentent les vues détaillées et les écrans de diagnostic.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_debug_intervention", "Debug métier")}
            ${this._renderEntityInput("entity_arrosage_en_cours", "Irrigation en cours")}
            ${this._renderEntityInput("entity_etat_hydrique", "État hydrique")}
            ${this._renderEntityInput("entity_reserve_actuelle", "Réserve actuelle")}
            ${this._renderEntityInput("entity_depletion_ratio", "Déplétion")}
            ${this._renderEntityInput("entity_et0", "ET0")}
            ${this._renderEntityInput("entity_etc", "ETc")}
            ${this._renderEntityInput("entity_objectif_legacy", "Objectif legacy")}
            ${this._renderEntityInput("entity_objectif_depletion", "Objectif déplétion")}
          </div>
        </section>
      </div>
    `;

    this._bindInputs();
  }
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
}
