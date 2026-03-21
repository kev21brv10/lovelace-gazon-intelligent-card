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
          --gi-font-lg: clamp(1.04rem, 0.98rem + 0.28vw, 1.16rem);
          --gi-font-xl: clamp(1.10rem, 1.00rem + 0.38vw, 1.26rem);
          --gi-font-2xl: clamp(1.28rem, 1.14rem + 0.56vw, 1.52rem);
          --gi-motion-fast: 180ms;
          --gi-motion-medium: 260ms;
          --gi-ease-standard: cubic-bezier(0.2, 0, 0, 1);
          --gi-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
          --gi-header-direction: row;
          --gi-header-align: center;
          --gi-header-justify: space-between;
          --gi-header-gap: 10px;
          --gi-header-margin-bottom: 8px;
          --gi-hero-margin: 2px 0 6px;
          --gi-hero-gap: 8px;
          --gi-hero-lead-padding: 11px 12px;
          --gi-hero-lead-gap: 8px;
          --gi-hero-metrics-gap: 6px;
          --gi-inline-direction: row;
          --gi-inline-align: center;
          --gi-inline-justify: space-between;
          --gi-inline-gap: 10px;
          --gi-nav-gap: 6px;
          --gi-nav-margin: 4px 0 8px;
          --gi-nav-item-gap: 6px;
          --gi-nav-item-padding: 8px 12px;
          --gi-grid-template: repeat(2, minmax(0, 1fr));
          --gi-grid-gap: 8px;
          --gi-action-direction: row;
          --gi-action-justify: flex-start;
          --gi-action-width: 100%;
          --gi-action-padding-inline: 18px;
          --gi-action-padding-inline-end: 20px;
          --gi-action-padding-block: 16px;
          --gi-action-min-height: 84px;
          --gi-action-gap: 12px;
          --gi-action-radius: 22px;
          --gi-action-icon-size: 26px;
          --gi-action-icon-glyph-size: 16px;
          --gi-action-icon-bg: rgba(255, 255, 255, 0.2);
          --gi-decision-grid-gap: 8px;
          --gi-tiles-gap: 6px;
          --gi-card-core-gap: 10px;
          --gi-card-core-padding: 12px 14px;
          --gi-card-core-min-height: 78px;
          --gi-card-core-radius: 18px;
          --gi-card-core-icon-size: 20px;
          --gi-card-core-icon-glyph-size: 12px;
          --gi-card-core-secondary-size: 0.72rem;
          --gi-surface-border: color-mix(in srgb, var(--gazon-section-accent) 18%, var(--divider-color));
          --gi-surface-border-strong: color-mix(in srgb, var(--gazon-section-accent) 28%, var(--divider-color));
          --gi-surface-fill:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 88%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, black) 100%);
          --gi-surface-fill-accent:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 10%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, white) 100%);
          --gi-surface-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
          --gi-surface-shadow-strong: 0 14px 28px rgba(0, 0, 0, 0.12);
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

        .decision-layout {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
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

        .tabs-layout {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }

        .gi-card,
        .gi-panel,
        .gi-tab,
        .gi-primary-action,
        .gi-progress__bar,
        .gi-status-pill {
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
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex: none;
          flex-shrink: 0;
          line-height: 0;
          overflow: visible;
          --mdc-icon-size: 16px;
        }

        .gi-icon--sm {
          width: 18px;
          height: 18px;
          --mdc-icon-size: 13px;
        }

        .gi-icon--pill {
          width: 16px;
          height: 16px;
          --mdc-icon-size: 12px;
        }

        .gi-icon ha-icon,
        .gi-icon svg {
          display: block;
          width: 16px;
          height: 16px;
          transform: none;
        }

        .gi-icon--sm ha-icon,
        .gi-icon--sm svg {
          width: 13px;
          height: 13px;
          transform: none;
        }

        .gi-icon--pill ha-icon,
        .gi-icon--pill svg {
          width: 12px;
          height: 12px;
          transform: none;
        }

        .gi-tabs,
        .tab-nav,
        .section-nav {
          display: flex;
          gap: var(--gi-nav-gap);
          flex-wrap: nowrap;
          overflow-x: auto;
          max-width: 100%;
          scrollbar-width: none;
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
        .tab-nav__item {
          display: flex;
          align-items: center;
          gap: var(--gi-nav-item-gap);
          min-width: 0;
          border: 1px solid var(--gi-surface-border);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 12%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, white) 100%);
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
        }

        .gi-tab:hover,
        .tab-nav__item:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--secondary-background-color) 62%, var(--gazon-section-accent) 38%);
          border-color: var(--gi-surface-border-strong);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .gi-tab .gi-icon,
        .tab-nav__item .gi-icon {
          width: 18px;
          height: 18px;
        }

        .gi-tab--active,
        .tab-nav__item--active {
          color: var(--primary-text-color);
          border-color: var(--gi-surface-border-strong);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 26%, transparent) 0%, transparent 100%),
            color-mix(in srgb, var(--secondary-background-color) 96%, white);
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.11),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transform: translateY(-1px);
        }

        .tab-panel,
        .gi-panel {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: gi-fade-up var(--gi-motion-fast) var(--gi-ease-soft);
          will-change: transform, opacity;
        }

        .tab-panel__hero,
        .tab-panel__section,
        .tab-panel__block {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--gi-surface-border);
          border-radius: 20px;
          background:
            radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 14%, transparent) 0%, transparent 28%),
            radial-gradient(circle at 10% 92%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 16%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 9%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          padding: 12px 14px;
          box-shadow: var(--gi-surface-shadow);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .tab-panel__hero {
          gap: 7px;
          border-color: var(--gi-surface-border-strong);
          background:
            radial-gradient(circle at 82% 0%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 18%, transparent) 0%, transparent 32%),
            radial-gradient(circle at 12% 88%, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 22%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 14%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill-accent);
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
          font-size: var(--gi-font-lg);
          font-weight: 800;
          line-height: 1.24;
        }

        .tab-panel__hero-next,
        .tab-panel__hero-hint,
        .tab-panel__block-hint,
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
        .tab-panel__header-hint,
        .tab-panel__stat-secondary,
        .tab-panel__empty {
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: var(--gi-surface-border);
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
          font-weight: 700;
          line-height: 1.3;
        }

        .tab-panel__grid {
          display: grid;
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
          align-items: stretch;
          grid-auto-rows: 1fr;
          align-content: start;
        }

        .tab-panel__grid--config {
          grid-template-columns: var(--gi-grid-template);
          gap: var(--gi-grid-gap);
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

        .tab-panel__action-content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          overflow-wrap: anywhere;
        }

        .tab-panel__action-title {
          font-size: var(--gi-font-lg);
          font-weight: 900;
          line-height: 1.18;
        }

        .tab-panel__action-subtitle {
          color: color-mix(in srgb, white 86%, transparent);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
        }

        .gi-action--primary,
        .gi-primary-action {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gi-action-gap);
          width: var(--gi-action-width);
          min-height: var(--gi-action-min-height);
          padding-inline: var(--gi-action-padding-inline) var(--gi-action-padding-inline-end);
          padding-block: var(--gi-action-padding-block);
          border: 1px solid var(--gi-surface-border-strong);
          border-radius: 26px;
          cursor: pointer;
          color: white;
          font: inherit;
          font-weight: 900;
          font-size: var(--gi-font-lg);
          letter-spacing: 0.01em;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-card-accent) 94%, white) 0%, color-mix(in srgb, var(--gazon-section-accent) 86%, black) 100%);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.18),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent),
            0 0 24px color-mix(in srgb, var(--gazon-water-color, #44c8ea) 16%, transparent);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
        }

        .gi-primary-action::after {
          content: "›";
          margin-left: auto;
          font-size: var(--gi-font-2xl);
          line-height: 1;
          opacity: 0.94;
          transform: translateY(-1px);
          flex: none;
        }

        .gi-action--primary .gi-icon,
        .gi-primary-action .gi-icon {
          width: var(--gi-action-icon-size);
          height: var(--gi-action-icon-size);
          border-radius: 999px;
          background: var(--gi-action-icon-bg);
        }

        .gi-action--primary .gi-icon ha-icon,
        .gi-action--primary .gi-icon svg,
        .gi-primary-action .gi-icon ha-icon,
        .gi-primary-action .gi-icon svg {
          width: var(--gi-action-icon-glyph-size);
          height: var(--gi-action-icon-glyph-size);
        }

        @media (hover: hover) {
          .gi-action--primary:hover,
          .gi-primary-action:hover {
            transform: translateY(-1px);
            border-color: color-mix(in srgb, var(--gazon-card-accent) 52%, var(--divider-color));
            box-shadow:
              0 18px 34px rgba(0, 0, 0, 0.22),
              0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 18%, transparent);
          }
        }

        .gi-primary-action--active {
          box-shadow:
            0 22px 46px rgba(0, 0, 0, 0.28),
            0 0 0 1px color-mix(in srgb, var(--gazon-card-accent) 40%, transparent),
            0 0 34px color-mix(in srgb, var(--gazon-card-accent) 30%, transparent);
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
            transform: translateY(-1px);
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
            transform: translateY(-1px);
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
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 12%, transparent) 0%, transparent 32%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 7%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, white) 100%);
          box-shadow: var(--gi-surface-shadow);
        }

        .gi-info--main {
          border-color: var(--gi-surface-border);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 14%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 13%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 97%, white) 100%);
          box-shadow: var(--gi-surface-shadow-strong);
        }

        .gi-info--secondary {
          border-color: color-mix(in srgb, var(--gazon-section-accent) 10%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 34%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 4%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 100%, white) 100%);
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
          border-radius: 18px;
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          padding: 12px 14px;
          box-shadow: var(--gi-surface-shadow);
        }

        .decision-hero {
          display: flex;
          flex-direction: column;
          gap: 7px;
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
          font-size: var(--gi-font-lg);
          font-weight: 800;
          line-height: 1.24;
          min-width: 0;
          overflow-wrap: anywhere;
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
          gap: 8px;
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
          font-weight: 700;
          line-height: 1.3;
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

        .gi-pill,
        .gi-status-pill,
        .pill,
        .context-pill {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
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

        .gi-pill__icon {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          flex: none;
          overflow: visible;
          line-height: 0;
          border-radius: 999px;
          background: color-mix(in srgb, var(--gazon-card-accent) 14%, transparent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .gi-pill__icon .gi-icon {
          overflow: visible;
        }

        .gi-pill__icon .gi-icon--pill {
          width: 12px;
          height: 12px;
          flex: none;
          overflow: visible;
          transform: none;
          color: inherit;
        }

        .gi-pill__icon .gi-icon--pill ha-icon,
        .gi-pill__icon .gi-icon--pill svg {
          width: 12px;
          height: 12px;
          transform: none;
        }

        .gi-pill__icon .gi-icon,
        .gi-status-pill .gi-icon,
        .pill .gi-icon,
        .context-pill .gi-icon {
          flex: none;
        }

        .pill__label,
        .context-pill__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
        }

        .pill__value,
        .context-pill__value {
          font-size: var(--gi-font-xs);
          font-weight: 700;
          line-height: 1.12;
          overflow-wrap: anywhere;
        }

        .gi-pill__text {
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--gi-font-xs);
          font-weight: 700;
          line-height: 1.12;
        }

        .gi-pill--danger,
        .pill--danger,
        .context-pill--danger {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-danger-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-danger-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-danger-color) 24%, transparent);
        }

        .gi-pill--critical,
        .pill--critical,
        .context-pill--critical {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-critical-color) 18%, transparent) 0%, color-mix(in srgb, var(--gazon-critical-color) 10%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-critical-color) 28%, transparent);
        }

        .gi-pill--warning,
        .pill--warning,
        .context-pill--warning {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-warning-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-warning-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-warning-color) 24%, transparent);
        }

        .gi-pill--success,
        .pill--success,
        .context-pill--success {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-success-color) 16%, transparent) 0%, color-mix(in srgb, var(--gazon-success-color) 8%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-success-color) 24%, transparent);
        }

        .gi-pill--accent,
        .pill--accent,
        .context-pill--accent {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-accent-tone-color) 14%, transparent) 0%, color-mix(in srgb, var(--gazon-accent-tone-color) 7%, transparent) 100%);
          border-color: color-mix(in srgb, var(--gazon-accent-tone-color) 24%, transparent);
        }

        .gi-pill--neutral,
        .pill--neutral,
        .context-pill--neutral {
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 98%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 94%, black) 100%);
          border-color: color-mix(in srgb, var(--divider-color) 70%, var(--gazon-section-accent) 10%);
        }

        .decision-context {
          display: flex;
          flex-direction: column;
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
          gap: 8px;
          margin-top: 2px;
        }

        * {
          box-sizing: border-box;
        }

        .card {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: var(--gazon-card-height);
          border-radius: var(--gazon-border-radius);
          color: var(--primary-text-color);
          background: var(--gi-theme-base, var(--secondary-background-color));
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
          background: linear-gradient(90deg, transparent 0%, var(--gazon-water-color, #44c8ea) 12%, var(--gazon-lawn-color, #80da67) 44%, var(--gazon-section-accent) 68%, transparent 100%);
          opacity: 0.9;
          z-index: 0;
        }

        .card--gradient::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 140px;
          pointer-events: none;
          background: transparent;
          opacity: 0;
          z-index: 0;
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
        .gi-status-pill,
        .gi-panel,
        .gi-primary-action,
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
            transform: translateY(-1px);
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
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          min-width: 0;
          margin-left: auto;
        }

        .header__weather {
          max-width: min(240px, 100%);
        }

        .header__weather .gi-pill__text {
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
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(145deg, color-mix(in srgb, var(--gazon-card-tone-color) 84%, white), color-mix(in srgb, var(--gazon-card-tone-color) 88%, var(--gazon-water-color, #44c8ea)));
          box-shadow:
            0 10px 24px color-mix(in srgb, var(--gazon-card-tone-color) 28%, transparent),
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
          font-size: var(--gi-font-lg);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .header__subtitle {
          color: var(--secondary-text-color);
          font-size: var(--gi-font-sm);
          line-height: 1.3;
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
          display: flex;
          flex-wrap: wrap;
          min-width: 0;
          gap: var(--gi-hero-gap);
          align-items: stretch;
          margin: var(--gi-hero-margin);
        }

        .hero__lead {
          min-width: 0;
          border-radius: 20px;
          padding: 13px 14px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 32%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 14%, transparent) 0%, transparent 34%),
            radial-gradient(circle at bottom left, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 18%, transparent) 0%, transparent 34%),
            linear-gradient(135deg, color-mix(in srgb, var(--gazon-section-accent) 20%, transparent) 0%, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 100%),
            color-mix(in srgb, var(--secondary-background-color) 84%, transparent);
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.10),
            0 0 0 1px color-mix(in srgb, var(--gazon-section-accent) 12%, transparent);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--gi-hero-lead-gap);
          flex: 1 1 260px;
        }

        .hero__metrics {
          display: flex;
          flex-wrap: wrap;
          min-width: 0;
          gap: var(--gi-hero-metrics-gap);
          align-content: start;
        }

        .hero__metrics .gi-card-core {
          flex: 1 1 110px;
        }

        .hero__lead-icon {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
          color: var(--gazon-section-accent);
          background: color-mix(in srgb, var(--gazon-section-accent) 20%, transparent);
        }

        .hero__lead-icon .gi-icon {
          width: 12px;
          height: 12px;
        }

        .hero__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .hero__value {
          font-size: var(--gi-font-md);
          font-weight: 700;
          line-height: 1.28;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 2;
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
          border-radius: 18px;
          min-height: var(--gi-card-core-min-height);
          height: 100%;
          padding: var(--gi-card-core-padding);
          position: relative;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 12%, var(--divider-color));
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 28%),
            radial-gradient(circle at bottom left, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 12%, transparent) 0%, transparent 32%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 6%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 8px 18px rgba(0, 0, 0, 0.06);
          transition:
            transform var(--gi-motion-fast) var(--gi-ease-standard),
            border-color var(--gi-motion-fast) var(--gi-ease-standard),
            background-color var(--gi-motion-fast) var(--gi-ease-standard),
            box-shadow var(--gi-motion-fast) var(--gi-ease-standard);
        }

        .gi-card-core--stat,
        .gi-card-core--tile,
        .gi-card-core--metric {
          min-height: 76px;
        }

        .gi-card-core--metric {
          min-height: 66px;
          padding: 12px 13px;
        }

        .gi-card-core--interactive {
          padding-right: 42px;
        }

        .gi-card-core--tile {
          border: 1px solid color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 26%, transparent);
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 8%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 16%, transparent) 0%, transparent 100%),
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-tile-accent, var(--gazon-section-accent)) 14%, var(--secondary-background-color)) 0%, color-mix(in srgb, var(--secondary-background-color) 96%, white) 100%);
        }

        .gi-card-core__icon {
          width: var(--gi-card-core-icon-size);
          height: var(--gi-card-core-icon-size);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
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
          display: block;
          transform: none;
        }

        .gi-card-core__icon .gi-icon ha-icon,
        .gi-card-core__icon .gi-icon svg {
          width: var(--gi-card-core-icon-glyph-size);
          height: var(--gi-card-core-icon-glyph-size);
        }

        .gi-card-core--metric .gi-card-core__icon {
          width: 18px;
          height: 18px;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon {
          width: 11px;
          height: 11px;
        }

        .gi-card-core--metric .gi-card-core__icon .gi-icon ha-icon,
        .gi-card-core--metric .gi-card-core__icon .gi-icon svg {
          width: 11px;
          height: 11px;
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
        }

        .gi-card-core__label {
          font-size: var(--gi-font-xxs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--secondary-text-color);
          line-height: 1.1;
          min-height: 1.1em;
        }

        .gi-card-core__value {
          font-weight: 700;
          min-width: 0;
          overflow-wrap: anywhere;
          hyphens: auto;
          font-size: var(--gi-font-sm);
          line-height: 1.24;
        }

        .gi-card-core--metric .gi-card-core__value {
          font-size: var(--gi-font-sm);
          line-height: 1.24;
        }

        .gi-card-core__secondary {
          font-size: var(--gi-font-xs);
          line-height: 1.3;
          color: var(--secondary-text-color);
          min-height: 1.15em;
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
        .card--editor-preview .gi-status-pill,
        .card--editor-preview .gi-action,
        .card--editor-preview .gi-info,
        .card--editor-preview .gi-primary-action,
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
          height: 140px;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 0%, transparent 100%);
          opacity: 0;
          z-index: 0;
        }

        .card--theme-light :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 16%, rgba(0, 0, 0, 0.08));
          box-shadow: var(--gi-theme-shadow-override);
        }

        .card--theme-dark :is(.tab-panel__hero, .tab-panel__section, .tab-panel__block, .gi-info, .gi-info--main, .gi-info--secondary, .decision-hero, .decision-plan, .decision-context, .decision-block, .decision-footer, .gi-card-core, .gi-tab, .tab-nav__item, .hero__lead, .decision) {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 16%, rgba(255, 255, 255, 0.08));
          box-shadow: var(--gi-theme-shadow-override);
        }

        .card--theme-light :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background: #ffffff;
        }

        .card--theme-dark :is(.gi-card-core--tile, .gi-card-core--metric, .gi-card-core--stat) {
          background: #000000;
        }

        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .tab-panel__hero-next,
        .card--theme-light .tab-panel__hero-hint,
        .card--theme-light .tab-panel__block-hint,
        .card--theme-light .tab-panel__section-meta,
        .card--theme-light .tab-panel__section-title,
        .card--theme-light .tab-panel__eyebrow,
        .card--theme-light .tab-panel__stat-secondary,
        .card--theme-light .tab-panel__empty,
        .card--theme-light .tab-panel__header-hint,
        .card--theme-light .decision-hero__next,
        .card--theme-light .decision-hero__hint,
        .card--theme-light .decision-plan__meta,
        .card--theme-light .pill__label,
        .card--theme-light .context-pill__label,
        .card--theme-light .gi-card-core__label,
        .card--theme-light .gi-card-core__secondary,
        .card--theme-light .header__subtitle,
        .card--theme-light .footer {
          color: color-mix(in srgb, #000000 55%, var(--secondary-text-color));
        }

        .card--theme-light :is(.gi-pill--neutral, .pill--neutral, .context-pill--neutral) {
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
        .card--theme-dark .tab-panel__section-meta,
        .card--theme-dark .tab-panel__section-title,
        .card--theme-dark .tab-panel__eyebrow,
        .card--theme-dark .tab-panel__stat-secondary,
        .card--theme-dark .tab-panel__empty,
        .card--theme-dark .tab-panel__header-hint,
        .card--theme-dark .decision-hero__next,
        .card--theme-dark .decision-hero__hint,
        .card--theme-dark .decision-plan__meta,
        .card--theme-dark .pill__label,
        .card--theme-dark .context-pill__label,
        .card--theme-dark .gi-card-core__label,
        .card--theme-dark .gi-card-core__secondary,
        .card--theme-dark .header__subtitle,
        .card--theme-dark .footer {
          color: color-mix(in srgb, #ffffff 72%, var(--secondary-text-color));
        }

        .card--theme-dark :is(.gi-pill--neutral, .pill--neutral, .context-pill--neutral) {
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
          .gi-panel,
          .gi-tab,
          .tab-nav__item,
          .pill,
          .context-pill,
          .gi-status-pill,
          .gi-action,
          .gi-info,
          .gi-primary-action,
          .gi-progress__bar,
          .tab-progress__bar,
          .card--pulse-critical,
          .gi-alert--critical {
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
        }
`;
