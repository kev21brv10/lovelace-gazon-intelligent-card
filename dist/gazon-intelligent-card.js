const CARD_STYLES = String.raw`
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
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
          font-size: 0.78rem;
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
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 800;
          line-height: 1.22;
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
          font-size: 0.82rem;
          line-height: 1.22;
        }

        .tab-panel__section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-color: var(--gi-surface-border);
        }

        .tab-panel__section-title {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .tab-panel__header-hint {
          margin-top: 4px;
          color: var(--secondary-text-color);
          font-size: 0.78rem;
          line-height: 1.22;
        }

        .tab-panel__section-summary {
          font-size: 0.94rem;
          font-weight: 700;
          line-height: 1.28;
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
          font-size: 0.72rem;
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
          font-size: 1.04rem;
          font-weight: 900;
          line-height: 1.16;
        }

        .tab-panel__action-subtitle {
          color: color-mix(in srgb, white 86%, transparent);
          font-size: 0.84rem;
          line-height: 1.24;
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
          font-size: 1.04rem;
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
          font-size: 2rem;
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
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 800;
          line-height: 1.22;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .decision-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 0.76rem;
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
          font-size: 0.86rem;
          line-height: 1.22;
        }

        .decision-plan__label,
        .decision-context__label,
        .decision-block__label {
          font-size: 0.68rem;
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
          font-size: 0.76rem;
          color: var(--secondary-text-color);
          white-space: nowrap;
        }

        .decision-plan__summary {
          font-size: 0.94rem;
          font-weight: 700;
          line-height: 1.28;
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
          font-size: 0.61rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--secondary-text-color);
          line-height: 1.1;
        }

        .pill__value,
        .context-pill__value {
          font-size: 0.8rem;
          font-weight: 700;
          line-height: 1.12;
          overflow-wrap: anywhere;
        }

        .gi-pill__text {
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.8rem;
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
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .decision-block__hint {
          color: var(--secondary-text-color);
          font-size: 0.82rem;
          line-height: 1.22;
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
          background:
            radial-gradient(circle at top right, color-mix(in srgb, var(--gazon-lawn-color, #80da67) 16%, transparent) 0%, transparent 34%),
            radial-gradient(circle at bottom left, color-mix(in srgb, var(--gazon-water-color, #44c8ea) 10%, transparent) 0%, transparent 26%),
            linear-gradient(180deg, color-mix(in srgb, var(--secondary-background-color) 90%, white) 0%, color-mix(in srgb, var(--secondary-background-color) 98%, black) 100%);
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
          font-size: 0.76rem;
          font-weight: 650;
        }

        .header__action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--gazon-section-accent) 16%, var(--divider-color));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--gazon-section-accent) 10%, transparent) 0%, transparent 100%),
            var(--gi-surface-fill);
          color: var(--primary-text-color);
          box-shadow: var(--gi-surface-shadow);
          font-size: 0.76rem;
          font-weight: 750;
          cursor: pointer;
          white-space: nowrap;
        }

        .header__action .gi-icon {
          width: 12px;
          height: 12px;
        }

        .card--theme-light .header__action {
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(0, 0, 0, 0.08));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
        }

        .card--theme-dark .header__action {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 14%, rgba(255, 255, 255, 0.10));
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
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
          font-size: 1.08rem;
          font-weight: 800;
          line-height: 1.16;
          margin-bottom: 2px;
        }

        .header__subtitle {
          color: var(--secondary-text-color);
          font-size: 0.81rem;
          line-height: 1.22;
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
          font-size: 0.64rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }

        .hero__value {
          font-size: clamp(0.9rem, 1.3vw, 1.02rem);
          font-weight: 700;
          line-height: 1.22;
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
          font-size: 0.7rem;
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
          font-size: 0.63rem;
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
          font-size: 0.84rem;
          line-height: 1.16;
        }

        .gi-card-core--metric .gi-card-core__value {
          font-size: 0.82rem;
          line-height: 1.14;
        }

        .gi-card-core__secondary {
          font-size: 0.72rem;
          line-height: 1.15;
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
          font-size: 0.72rem;
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
          background: #ffffff;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 22%, rgba(0, 0, 0, 0.08));
        }

        .card.card--theme-dark {
          background: #000000;
          border-color: color-mix(in srgb, var(--gazon-section-accent) 20%, rgba(255, 255, 255, 0.08));
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
const EDITOR_STYLES = String.raw`
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
          --editor-focus: color-mix(in srgb, var(--primary-color) 26%, transparent);
          --editor-focus-ring: color-mix(in srgb, var(--primary-color) 18%, transparent);
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
          background: var(--card-background-color);
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
        }

        .field input,
        .field select {
          width: 100%;
          box-sizing: border-box;
          min-height: 44px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--secondary-background-color);
          color: var(--primary-text-color);
          line-height: 1.2;
          font: inherit;
          outline: none;
          transition:
            border-color 140ms ease,
            box-shadow 140ms ease,
            background-color 140ms ease;
        }

        .field input:hover,
        .field select:hover {
          border-color: color-mix(in srgb, var(--primary-color) 18%, var(--editor-border));
        }

        .field input:focus,
        .field select:focus {
          border-color: color-mix(in srgb, var(--primary-color) 44%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring);
        }

        .field input:focus-visible,
        .field select:focus-visible {
          border-color: color-mix(in srgb, var(--primary-color) 50%, var(--editor-border));
          box-shadow:
            0 0 0 1px var(--editor-focus),
            0 0 0 4px var(--editor-focus-ring);
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
const CARD_VERSION = "0.1.14";

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
  card_height: "",
  icon_size: 24,
  border_radius: 24,
  background_style: "solid",
  use_gradient: true,
  show_secondary_info: true,
  entity_fenetre_optimale: "sensor.gazon_intelligent_fenetre_optimale",
  entity_weather: "weather.forecast_home",
  entity_plan_arrosage: "sensor.gazon_intelligent_plan_d_arrosage",
  entity_dernier_arrosage: "sensor.gazon_intelligent_dernier_arrosage_detecte",
  entity_derniere_application: "sensor.gazon_intelligent_derniere_application",
  entity_conseil: "sensor.gazon_intelligent_conseil_principal",
  entity_action: "sensor.gazon_intelligent_action_recommandee",
  entity_avoid: "sensor.gazon_intelligent_action_a_eviter",
  entity_mode: "select.gazon_intelligent_mode_du_gazon",
  entity_switch_arrosage_automatique: "switch.gazon_intelligent_arrosage_automatique_autorise",
  entity_arrosage_recommande: "binary_sensor.gazon_intelligent_arrosage_recommande",
  entity_arrosage_apres_application_autorise: "binary_sensor.gazon_intelligent_arrosage_apres_application_autorise",
  entity_tonte_autorisee: "binary_sensor.gazon_intelligent_tonte_autorisee",
  entity_objectif_arrosage: "sensor.gazon_intelligent_objectif_d_arrosage",
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
  manual_action_service: "gazon_intelligent.start_manual_irrigation",
  manual_action_label: "Lancer l'arrosage manuel",
  tap_action: { action: "more-info" },
  hold_action: { action: "none" },
  double_tap_action: { action: "none" },
};

const TAB_DEFS = [
  { key: "overview", label: "Résumé", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Arrosage", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "gazon", label: "Gazon", icon: "mdi:grass" },
  { key: "config", label: "Config", icon: "mdi:cog-outline" },
];

const ENTITY_KEYS = [
  { key: "entity_fenetre_optimale", label: "Fenêtre optimale", icon: "mdi:clock-outline", domain: ["sensor"] },
  { key: "entity_plan_arrosage", label: "Plan d'arrosage", icon: "mdi:timer-outline", domain: ["sensor"] },
  { key: "entity_arrosage_en_cours", label: "Arrosage en cours", icon: "mdi:progress-clock", domain: ["sensor"] },
  { key: "entity_dernier_arrosage", label: "Dernier arrosage détecté", icon: "mdi:water-check", domain: ["sensor"] },
  { key: "entity_derniere_application", label: "Dernière application", icon: "mdi:spray-bottle", domain: ["sensor"] },
  { key: "entity_conseil", label: "Conseil principal", icon: "mdi:message-text-outline", domain: ["sensor"] },
  { key: "entity_action", label: "Action recommandée", icon: "mdi:check-circle-outline", domain: ["sensor"] },
  { key: "entity_avoid", label: "Action à éviter", icon: "mdi:alert-circle-outline", domain: ["sensor"] },
  { key: "entity_mode", label: "Mode du gazon", icon: "mdi:grass", domain: ["select"] },
  { key: "entity_switch_arrosage_automatique", label: "Arrosage automatique", icon: "mdi:switch", domain: ["switch"] },
  { key: "entity_arrosage_apres_application_autorise", label: "Arrosage après application autorisé", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_tonte_autorisee", label: "Tonte autorisée", icon: "mdi:content-cut", domain: ["binary_sensor"] },
  { key: "entity_phase", label: "Phase dominante", icon: "mdi:grass", domain: ["sensor"] },
  { key: "entity_sous_phase", label: "Sous-phase", icon: "mdi:sprout", domain: ["sensor"] },
  { key: "entity_niveau", label: "Niveau d'action", icon: "mdi:signal", domain: ["sensor"] },
  { key: "entity_tonte", label: "État de tonte", icon: "mdi:content-cut", domain: ["sensor"] },
  { key: "entity_hauteur", label: "Hauteur de tonte conseillée", icon: "mdi:ruler-square", domain: ["sensor"] },
  { key: "entity_arrosage_recommande", label: "Arrosage recommandé", icon: "mdi:water-check", domain: ["binary_sensor"] },
  { key: "entity_objectif_arrosage", label: "Objectif d'arrosage", icon: "mdi:water-percent", domain: ["sensor"] },
  { key: "entity_type_arrosage", label: "Type d'arrosage", icon: "mdi:sprinkler", domain: ["sensor"] },
  { key: "entity_risque", label: "Risque gazon", icon: "mdi:shield-alert-outline", domain: ["sensor"] },
  { key: "entity_debit_zone_1", label: "Débit zone 1", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_2", label: "Débit zone 2", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_3", label: "Débit zone 3", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_4", label: "Débit zone 4", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_debit_zone_5", label: "Débit zone 5", icon: "mdi:sprinkler", domain: ["number"] },
  { key: "entity_hauteur_min_tondeuse", label: "Hauteur min tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
  { key: "entity_hauteur_max_tondeuse", label: "Hauteur max tondeuse", icon: "mdi:ruler-square", domain: ["number"] },
];

const SECTION_DEFS = [
  { key: "overview", label: "Résumé", icon: "mdi:view-dashboard" },
  { key: "watering", label: "Arrosage", icon: "mdi:water" },
  { key: "mowing", label: "Tonte", icon: "mdi:content-cut" },
  { key: "details", label: "Détails", icon: "mdi:dots-horizontal" },
];

const SECTION_FIELDS = {
  overview: [
    "entity_conseil",
    "entity_action",
    "entity_avoid",
    "entity_hauteur",
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
  ],
  watering: [
    "entity_arrosage_recommande",
    "entity_objectif_arrosage",
    "entity_type_arrosage",
    "entity_arrosage_apres_application_autorise",
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
  details: "#7b8da0",
};

const LEGACY_ENTITY_KEYS = [
  "entity_conseil",
  "entity_action",
  "entity_avoid",
  "entity_tonte",
  "entity_hauteur",
];

const OVERVIEW_ENTITY_KEYS = new Set([
  ...LEGACY_ENTITY_KEYS,
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
]);

const RENDER_SIGNATURE_ATTRS = {
  entity_fenetre_optimale: ["status", "summary", "next_action", "auto_irrigation_enabled"],
  entity_plan_arrosage: ["summary", "duration_human", "zone_count", "objective_mm", "plan_type", "passages", "fractionation", "total_duration_min"],
  entity_arrosage_en_cours: ["active", "started_at_utc", "last_activity_at_utc", "active_zone_count", "zone_count", "progress_percent"],
  entity_dernier_arrosage: ["source", "date_action", "detected_at", "zone_count"],
  entity_derniere_application: ["source", "application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm"],
  entity_objectif_arrosage: ["temperature", "etp", "phase_active"],
  entity_arrosage_recommande: ["objectif_mm", "type_arrosage"],
  entity_arrosage_apres_application_autorise: ["application_requires_watering_after", "application_post_watering_mm", "application_irrigation_block_hours", "application_irrigation_delay_minutes", "application_block_active", "application_block_remaining_minutes", "application_post_watering_pending", "application_post_watering_delay_remaining_minutes", "application_post_watering_ready", "application_post_watering_remaining_mm"],
  entity_tonte_autorisee: ["phase_active", "tonte_statut", "niveau_action", "fenetre_optimale", "risque_gazon", "hauteur_tonte_recommandee_cm", "hauteur_tonte_min_cm", "hauteur_tonte_max_cm"],
  entity_sous_phase: ["sous_phase_progression", "sous_phase_detail"],
  entity_phase: ["phase_dominante_source", "pluie_demain_source"],
  entity_weather: ["temperature", "dew_point", "humidity", "uv_index", "pressure", "wind_speed", "wind_bearing", "precipitation"],
  entity_hauteur: ["hauteur_tonte_min_cm", "hauteur_tonte_max_cm"],
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
  en_attente: "En attente",
  bloque: "Bloqué",
  a_faire: "À faire",
  a_surveiller: "À surveiller",
  autorisee: "Autorisée",
  autorisee_avec_precaution: "Autorisée avec précaution",
  interdite: "Interdite",
  deconseillee: "Déconseillée",
  critique: "Critique",
  modere: "Modéré",
  faible: "Faible",
  normal: "Normal",
  enracinement: "Enracinement",
  demain_matin: "Demain matin",
  apres_pluie: "Après pluie",
  manuel_frequent: "Manuel fréquent",
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

function renderIconBox(icon, size = "md") {
  if (!icon) {
    return "";
  }
  const sizeClass = size === "sm" ? "gi-icon--sm" : size === "pill" ? "gi-icon--pill" : "";
  const iconSize = size === "sm" ? "13px" : size === "pill" ? "12px" : "16px";
  return `<span class="gi-icon ${sizeClass}"><ha-icon style="--mdc-icon-size:${iconSize};" icon="${escapeHtml(icon)}"></ha-icon></span>`;
}

function renderPillIcon(icon) {
  if (!icon) {
    return "";
  }
  return `<span class="gi-pill__icon">${renderIconBox(icon, "pill")}</span>`;
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

function renderStatusPill(text, tone = "neutral", icon = null, extraClass = "") {
  const classes = ["gi-pill", "gi-pill--status", `gi-pill--${tone}`];
  if (extraClass) {
    classes.push(extraClass);
  }
  return `
    <div class="${classes.join(" ")}">
      ${renderPillIcon(icon)}
      <span class="gi-pill__text">${escapeHtml(text)}</span>
    </div>
  `;
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
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: Number.isInteger(number) ? 0 : 1,
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
    return "Aucun arrosage nécessaire";
  }
  const formatted = formatNumber(number, 1);
  return `${formatted} mm`;
}

function formatBoolState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Oui";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatRecommendationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Recommandé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Non recommandé";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatAuthorizationState(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["on", "true", "yes", "1", "oui"].includes(normalized)) {
    return "Autorisé";
  }
  if (["off", "false", "no", "0", "non"].includes(normalized)) {
    return "Interdit";
  }
  return isUnavailableState(value) ? "Non disponible" : String(value);
}

function formatStateLabel(value) {
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

function formatWeatherConditionLabel(value) {
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
  return STATUS_COLORS[tone] || STATUS_COLORS.neutral;
}

function sectionToAccent(section) {
  return SECTION_ACCENTS[section] || SECTION_ACCENTS.overview;
}

function iconForField(field) {
  return field.icon || "mdi:information-outline";
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
  const next = { ...config };
  if (next.show_advanced_details === undefined && next.show_legacy_details !== undefined) {
    next.show_advanced_details = Boolean(next.show_legacy_details);
  }
  delete next.show_legacy_details;
  return next;
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

function formatStatusLabel(status) {
  return formatStateLabel(status);
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
    this._wateringProgressTick = 0;
    this._onClick = this._onClick.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_TYPE}`,
      title: DEFAULT_CONFIG.title,
      show_icons: DEFAULT_CONFIG.show_icons,
      show_header: DEFAULT_CONFIG.show_header,
      show_background: DEFAULT_CONFIG.show_background,
      compact: DEFAULT_CONFIG.compact,
      entity_fenetre_optimale: DEFAULT_CONFIG.entity_fenetre_optimale,
      entity_weather: DEFAULT_CONFIG.entity_weather,
      entity_plan_arrosage: DEFAULT_CONFIG.entity_plan_arrosage,
      entity_dernier_arrosage: DEFAULT_CONFIG.entity_dernier_arrosage,
      entity_derniere_application: DEFAULT_CONFIG.entity_derniere_application,
      entity_conseil: DEFAULT_CONFIG.entity_conseil,
      entity_action: DEFAULT_CONFIG.entity_action,
      entity_avoid: DEFAULT_CONFIG.entity_avoid,
      entity_mode: DEFAULT_CONFIG.entity_mode,
      entity_switch_arrosage_automatique: DEFAULT_CONFIG.entity_switch_arrosage_automatique,
      entity_arrosage_recommande: DEFAULT_CONFIG.entity_arrosage_recommande,
      entity_arrosage_apres_application_autorise: DEFAULT_CONFIG.entity_arrosage_apres_application_autorise,
      entity_tonte_autorisee: DEFAULT_CONFIG.entity_tonte_autorisee,
      entity_objectif_arrosage: DEFAULT_CONFIG.entity_objectif_arrosage,
      entity_type_arrosage: DEFAULT_CONFIG.entity_type_arrosage,
      entity_tonte: DEFAULT_CONFIG.entity_tonte,
      entity_hauteur: DEFAULT_CONFIG.entity_hauteur,
      entity_arrosage_en_cours: DEFAULT_CONFIG.entity_arrosage_en_cours,
      entity_debit_zone_1: DEFAULT_CONFIG.entity_debit_zone_1,
      entity_debit_zone_2: DEFAULT_CONFIG.entity_debit_zone_2,
      entity_debit_zone_3: DEFAULT_CONFIG.entity_debit_zone_3,
      entity_debit_zone_4: DEFAULT_CONFIG.entity_debit_zone_4,
      entity_debit_zone_5: DEFAULT_CONFIG.entity_debit_zone_5,
      entity_hauteur_min_tondeuse: DEFAULT_CONFIG.entity_hauteur_min_tondeuse,
      entity_hauteur_max_tondeuse: DEFAULT_CONFIG.entity_hauteur_max_tondeuse,
    };
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
        { name: "entity_fenetre_optimale", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_weather", selector: { entity: { domain: ["weather"] } } },
        { name: "entity_plan_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_dernier_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_derniere_application", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_conseil", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_action", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_avoid", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_mode", selector: { entity: { domain: ["select"] } } },
        { name: "entity_switch_arrosage_automatique", selector: { entity: { domain: ["switch"] } } },
        { name: "entity_arrosage_recommande", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_arrosage_apres_application_autorise", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_tonte_autorisee", selector: { entity: { domain: ["binary_sensor"] } } },
        { name: "entity_objectif_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_type_arrosage", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_arrosage_en_cours", selector: { entity: { domain: ["sensor"] } } },
        { name: "entity_debit_zone_1", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_2", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_3", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_4", selector: { entity: { domain: ["number"] } } },
        { name: "entity_debit_zone_5", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_min_tondeuse", selector: { entity: { domain: ["number"] } } },
        { name: "entity_hauteur_max_tondeuse", selector: { entity: { domain: ["number"] } } },
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
    this._render();
  }

  getCardSize() {
    if (!this._config) {
      return 5;
    }
    if (this._isMinimalMode()) {
      return this._config.show_header ? 4 : 3;
    }
    return this._config.compact ? 6 : 7;
  }

  getGridOptions() {
    const minimal = this._isMinimalMode();
    const compact = Boolean(this._config?.compact);
    const advanced = Boolean(this._config?.show_advanced_details);
    return {
      rows: minimal ? 4 : compact ? 6 : 7,
      columns: 12,
      min_rows: minimal ? 3 : compact ? 5 : 6,
      min_columns: 12,
      max_rows: minimal ? 4 : compact ? 7 : advanced ? 9 : 8,
      max_columns: 12,
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
    this.shadowRoot?.removeEventListener("click", this._onClick);
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
      case "config":
        return SECTION_ACCENTS.details;
      default:
        return SECTION_ACCENTS.overview;
    }
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

  _objectiveEntity() {
    return this._entity("entity_objectif_arrosage");
  }

  _objectiveMm() {
    return this._entityNumber("entity_objectif_arrosage");
  }

  _windowState() {
    const entity = this._windowEntity();
    const attrs = entity?.attributes || {};
    const status = String(attrs.status || "").trim().toLowerCase();
    const summary = String(attrs.summary || entity?.state || "Arrosage prévu").trim();
    const nextAction = String(attrs.next_action || "").trim();
    const objective = this._objectiveMm() ?? 0;
    const isAwaiting = status === "en_attente";
    const showManualAction = objective > 0 && status === "auto";
    const isBlocked = status === "bloque";
    const isNoActionRequired = !isBlocked && objective <= 0;
    return {
      entity,
      status,
      summary,
      nextAction,
      objective,
      showManualAction,
      isAwaiting,
      isBlocked,
      isNoActionRequired,
      tone: statusTone(status),
      statusLabel: formatStatusLabel(status),
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
    return {
      entity,
      summary: summary || "Aucun plan d'arrosage",
      durationHuman: durationHuman || formatDurationHuman(attrs.total_duration_min ?? entity?.state),
      zoneCount: zoneCount ?? 0,
      objectiveMm: objectiveMm ?? 0,
      planType: planType || "no_plan",
      passages: passages ?? 1,
      fractionation: Boolean(attrs.fractionation),
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
        summary: "Aucun arrosage en cours",
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
    const startedAtLabel = String(attrs.started_at || "").trim() || (startedAtRaw ? _human_datetime_text(startedAtRaw) : "");
    const detailParts = [];
    if (startedAtLabel) {
      detailParts.push(`Démarré ${startedAtLabel}`);
    }
    detailParts.push(`${activeZoneCount} zone${activeZoneCount > 1 ? "s" : ""} active${activeZoneCount > 1 ? "s" : ""}`);
    if (totalSeconds > 0) {
      detailParts.push(`Restant ${formatDurationHuman(remainingSeconds / 60.0)}`);
    }
    const summary = `Arrosage en cours ${formatNumber(progressPercent, 0) || 0}%`;
    return {
      active: true,
      progressPercent,
      remainingSeconds,
      elapsedSeconds,
      summary,
      detail: detailParts.join(" · "),
      startedAtLabel,
      activeZoneCount,
      zoneCount,
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
          this._wateringProgressTick = Date.now();
          this._render();
        }, 5000);
      }
      return;
    }
    this._clearWateringProgressTimer();
  }

  _lastWateringState() {
    const entity = this._lastWateringEntity();
    if (!entity) {
      return {
        label: "Aucun arrosage détecté",
        detail: "Historique vide",
        value: null,
      };
    }
    const rawValue = asNumber(entity.state);
    const source = String(entity.attributes?.source || "").trim();
    const dateAction = String(entity.attributes?.date_action || entity.attributes?.detected_at || "").trim();
    const zoneCount = asNumber(entity.attributes?.zone_count);
    if (source === "none" || rawValue === null || rawValue <= 0) {
      return {
        label: "Aucun arrosage détecté",
        detail: "Historique vide",
        value: null,
      };
    }
    const fragments = [];
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
    };
  }

  _objectiveContext() {
    const entity = this._objectiveEntity();
    const temperature = asNumber(entity?.attributes?.temperature);
    const etp = asNumber(entity?.attributes?.etp);
    const risk = this._entityState("entity_risque", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    return {
      entity,
      temperature,
      etp,
      risk,
      mode,
      typeArrosage,
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
    if (!label) {
      return "Lancer l'arrosage manuel";
    }
    return label;
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

  _applyHostVariables({ accent, activeTone, sectionAccent, borderRadius, iconSize, height }) {
    if (!this.style) {
      return;
    }
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
      "--gazon-danger-color": STATUS_COLORS.danger,
      "--gazon-warning-color": STATUS_COLORS.warning,
      "--gazon-success-color": STATUS_COLORS.success,
      "--gazon-neutral-color": STATUS_COLORS.neutral,
      "--gazon-accent-tone-color": STATUS_COLORS.accent,
      "--gazon-critical-color": STATUS_COLORS.critical,
      "--gazon-border-radius": borderRadius,
      "--gazon-icon-size": iconSize,
      "--gazon-card-height": height || "auto",
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
      "entity_phase",
      "entity_sous_phase",
      "entity_tonte",
      "entity_hauteur",
      "entity_arrosage_en_cours",
      "entity_arrosage_recommande",
      "entity_arrosage_apres_application_autorise",
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
      "entity_type_arrosage",
      "entity_mode",
      "entity_switch_arrosage_automatique",
      "entity_arrosage_en_cours",
      "entity_debit_zone_1",
      "entity_debit_zone_2",
      "entity_debit_zone_3",
      "entity_debit_zone_4",
      "entity_debit_zone_5",
      "entity_hauteur_min_tondeuse",
      "entity_hauteur_max_tondeuse",
    ]);

    if (this._canShowLegacyDetails()) {
      LEGACY_ENTITY_KEYS.forEach((key) => keys.add(key));
      ENTITY_KEYS.forEach((field) => keys.add(field.key));
    } else {
      if (this._activeTab === "mowing") {
        ["entity_tonte", "entity_hauteur", "entity_tonte_autorisee", "entity_fenetre_optimale"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "gazon") {
        ["entity_phase", "entity_sous_phase", "entity_niveau", "entity_risque", "entity_conseil", "entity_action", "entity_avoid"].forEach((key) => keys.add(key));
      } else if (this._activeTab === "config") {
        [
          "entity_switch_arrosage_automatique",
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
        ].forEach((key) => keys.add(key));
      } else {
        [
          "entity_fenetre_optimale",
          "entity_plan_arrosage",
          "entity_dernier_arrosage",
          "entity_derniere_application",
          "entity_conseil",
          "entity_action",
          "entity_avoid",
          "entity_objectif_arrosage",
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

    if (this._hasActiveWateringProgress()) {
      keys.add(`watering_progress_${this._wateringProgressTick || 0}`);
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
        card_height: this._config.card_height,
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
    const iconHtml = this._config?.show_icons ? renderIconBox(icon, "pill") : "";
    return `
      <div class="gi-pill gi-status-pill context-pill context-pill--${tone}">
        ${iconHtml}
        <span class="context-pill__label">${escapeHtml(label)}</span>
        <strong class="context-pill__value">${escapeHtml(value)}</strong>
      </div>
    `;
  }

  _renderTabPill(label, value, tone = "neutral", icon = null) {
    return this._renderContextPill(label, value, tone, icon);
  }

  _renderTabNav() {
    return `
      <nav class="gi-tabs tab-nav" aria-label="Domaines de la carte">
        ${TAB_DEFS.map((tab) => {
          const active = tab.key === this._activeTab;
          const iconHtml = this._config?.show_icons ? renderIconBox(tab.icon, "sm") : "";
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
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const tonte = this._entityState("entity_tonte", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const risk = this._entityState("entity_risque", null);
    const afterApplication = this._entityState("entity_arrosage_apres_application_autorise", null);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const mode = this._entityState("entity_mode", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
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

    const wateringFocus = objective > 0 || arrosageRecommande === "on" || windowState.isAwaiting || windowState.showManualAction;
    const mowingFocus =
      computeTonteTone(tonte) !== "neutral" ||
      computeRisqueTone(risk) !== "neutral" ||
      tonteAutorisee === "off" ||
      !isEmpty(phase) ||
      !isEmpty(subPhase);
    const configFocus = switchState.tone !== "success" || afterApplication === "off" || !isEmpty(mode);
    const stableState = !wateringFocus && !mowingFocus && !configFocus;

    const waterGroup = [
      {
        label: "Arrosage",
        value: formatRecommendationState(arrosageRecommande),
        tone: arrosageRecommande === "on" ? "success" : windowState.tone,
        icon: "mdi:water-check",
        secondary: windowState.summary || planState.summary || objectiveLabel,
        entityKey: "entity_arrosage_recommande",
      },
      {
        label: "Fenêtre",
        value: windowState.statusLabel,
        tone: windowState.tone,
        icon: "mdi:clock-outline",
        secondary: windowState.summary || windowState.nextAction || planState.summary,
        entityKey: "entity_fenetre_optimale",
      },
      {
        label: "Objectif",
        value: objectiveLabel,
        tone: objective > 0 ? "success" : "neutral",
        icon: "mdi:water-percent",
        secondary: typeArrosage ? `Type: ${formatApplicationMode(typeArrosage)}` : "",
        entityKey: "entity_objectif_arrosage",
      },
      {
        label: "Plan",
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
        label: "Configuration",
        value: switchState.label,
        tone: switchState.tone,
        icon: "mdi:switch",
        secondary: !isEmpty(mode)
          ? `Mode: ${formatApplicationMode(mode)}`
          : afterApplication
            ? `Après application: ${formatAuthorizationState(afterApplication)}`
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
          label: "Configuration",
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
    if (!progressState?.active) {
      return "";
    }
    const percent = Math.max(0, Math.min(100, asNumber(progressState.progressPercent) ?? 0));
    const remainingSeconds = Math.max(0, asNumber(progressState.remainingSeconds) ?? 0);
    const remainingLabel = progressState.remainingSeconds !== undefined && progressState.remainingSeconds !== null
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
  }

  _overviewProposal() {
    const windowState = this._windowState();
    const planState = this._planState();
    const objective = windowState.objective;
    const objectiveLabel = formatMm(objective);
    const switchState = this._configSwitchState();
    const tonte = this._entityState("entity_tonte", null);
    const risk = this._entityState("entity_risque", null);
    const conseil = this._entityState("entity_conseil", null);
    const action = this._entityState("entity_action", null);
    const avoid = this._entityState("entity_avoid", null);
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const arrosageApresApplication = this._entityState("entity_arrosage_apres_application_autorise", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const actionTone = this._actionTone();

    let title = "Vue d'ensemble";
    let hint = conseil || planState.summary || windowState.summary || "Les paramètres restent cohérents.";
    let tone = "neutral";
    let icon = "mdi:check-circle-outline";

    if (windowState.isAwaiting && objective > 0) {
      title = "Arrosage prévu demain matin";
      hint = `${windowState.nextAction || "Attendre le créneau prévu."}${planState.summary ? ` · ${planState.summary}` : ""}`;
      tone = "warning";
      icon = "mdi:clock-outline";
    } else if (windowState.showManualAction && objective > 0) {
      title = "Arrosage manuel possible";
      hint = `${objectiveLabel} à déclencher maintenant.${conseil ? ` ${conseil}` : ""}`.trim();
      tone = actionTone === "critical" ? "critical" : "success";
      icon = "mdi:water-pump";
    } else if (windowState.isBlocked) {
      title = "Arrosage bloqué";
      hint = windowState.nextAction || windowState.summary || "Le créneau prévu n’est pas encore ouvert.";
      tone = "danger";
      icon = "mdi:cancel";
    } else if (computeTonteTone(tonte) === "danger") {
      title = "Tonte interdite";
      hint = avoid || "Tondre avant levée complète.";
      tone = "danger";
      icon = "mdi:content-cut";
    } else if (computeRisqueTone(risk) === "danger" || computeRisqueTone(risk) === "critical") {
      title = "Risque gazon élevé";
      hint = action || conseil || "Ouvrir l’onglet Gazon pour voir les détails avancés.";
      tone = computeRisqueTone(risk);
      icon = "mdi:shield-alert-outline";
    } else if (arrosageRecommande === "on") {
      title = "Arrosage recommandé";
      hint = `${conseil || planState.summary || objectiveLabel}${arrosageApresApplication === "off" ? " · Après application non autorisé" : ""}`;
      tone = "success";
      icon = "mdi:water-check";
    } else if (switchState.tone === "danger") {
      title = "Arrosage automatique désactivé";
      hint = "L’onglet Configuration permet de vérifier l’autorisation et les débits.";
      tone = "danger";
      icon = "mdi:switch-off";
    } else if (tonteAutorisee === "off") {
      title = "Tonte interdite";
      hint = action || "Sursemis en cours.";
      tone = "danger";
      icon = "mdi:content-cut";
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
      return {
        value: suffix ? `${formatNumber(numeric, 1)} ${suffix}` : formatNumber(numeric, 1) || String(raw),
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

  _renderConfigTab() {
    const switchState = this._configSwitchState();
    const afterApplication = this._entityState("entity_arrosage_apres_application_autorise", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const mode = this._entityState("entity_mode", null);
    const modeTone = phaseTone(mode);
    const switchIcon = this._config?.show_icons ? "mdi:switch" : null;
    const zoneCards = this._zoneDebitEntries()
      .map((entry) => {
        const config = this._renderConfigValue(entry.key, "mm/h");
        return this._renderConfigActionCard(entry.label, entry.key, config.value, config.tone, "mdi:sprinkler");
      })
      .join("");
    const heightMin = this._renderConfigValue("entity_hauteur_min_tondeuse", "cm");
    const heightMax = this._renderConfigValue("entity_hauteur_max_tondeuse", "cm");

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
          ${this._renderConfigActionCard("Arrosage automatique", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
          ${this._renderConfigActionCard("Après application", "entity_arrosage_apres_application_autorise", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off")}
          ${this._renderConfigActionCard("Tonte autorisée", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          ${this._renderConfigActionCard("Mode du gazon", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
          ${this._renderConfigActionCard("Hauteur min tondeuse", "entity_hauteur_min_tondeuse", heightMin.value, heightMin.tone, "mdi:ruler-square")}
          ${this._renderConfigActionCard("Hauteur max tondeuse", "entity_hauteur_max_tondeuse", heightMax.value, heightMax.tone, "mdi:ruler-square")}
        </div>

        <div class="tab-panel__section tab-panel__section--config-quick">
          <div class="tab-panel__section-title">Accès rapide</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${this._renderConfigActionCard("Arrosage auto", "entity_switch_arrosage_automatique", switchState.label, switchState.tone, "mdi:switch")}
            ${this._renderConfigActionCard("Mode", "entity_mode", formatApplicationMode(mode), modeTone, "mdi:grass")}
            ${this._renderConfigActionCard("Après application", "entity_arrosage_apres_application_autorise", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off")}
            ${this._renderConfigActionCard("Tonte", "entity_tonte_autorisee", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", "mdi:content-cut")}
          </div>
        </div>

        <div class="tab-panel__section tab-panel__section--config-debits">
          <div class="tab-panel__section-title">Débits des zones</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${zoneCards || `<div class="tab-panel__empty">Débits non configurés.</div>`}
          </div>
          <div class="tab-panel__section-title">Hauteurs de tondeuse</div>
          <div class="tab-panel__grid tab-panel__grid--config tab-panel__grid--config-debits">
            ${this._renderConfigActionCard("Hauteur min tondeuse", "entity_hauteur_min_tondeuse", heightMin.value, heightMin.tone, "mdi:ruler-square")}
            ${this._renderConfigActionCard("Hauteur max tondeuse", "entity_hauteur_max_tondeuse", heightMax.value, heightMax.tone, "mdi:ruler-square")}
          </div>
        </div>
      </section>
    `;
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
    const height = this._entity("entity_hauteur");
    const windowState = this._windowState();
    const tonteValue = tonte ? formatStatusLabel(tonte.state) : "Non disponible";
    const heightValue = height ? formatCm(height.state) : "Non disponible";
    const heightMin = asNumber(height?.attributes?.hauteur_tonte_min_cm);
    const heightMax = asNumber(height?.attributes?.hauteur_tonte_max_cm);
    const heightSecondary = heightMin !== null && heightMax !== null ? `${formatCm(heightMin)} → ${formatCm(heightMax)}` : "";
    const windowSummary = windowState.entity ? windowState.summary : "Fenêtre optimale non disponible";
    const mowingStatusIcon = this._config?.show_icons ? "mdi:content-cut" : null;
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
            <div class="tab-panel__hero-summary">Résumé proposé</div>
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
            <div class="tab-panel__eyebrow">À retenir</div>
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
    const arrosageRecommande = this._entityState("entity_arrosage_recommande", null);
    const afterApplication = this._entityState("entity_arrosage_apres_application_autorise", null);
    const tone = windowState.tone;
    const windowIcon = this._statusIcon(windowState.status);
    const windowStatusIcon = this._config?.show_icons ? windowIcon : null;
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
      this._renderTabPill("Arrosage recommandé", formatRecommendationState(arrosageRecommande), arrosageRecommande === "on" ? "success" : "neutral", "mdi:water-check"),
      this._renderTabPill("Après application", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", "mdi:water-off"),
      this._renderTabPill("Type", formatStateLabel(context.typeArrosage), isEmpty(context.typeArrosage) ? "neutral" : "accent", "mdi:sprinkler"),
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
    ];

    const planChips = [
      this._renderTabPill("Zones", planState.zoneCount ? `${planState.zoneCount}` : "0", planState.zoneCount > 1 ? "accent" : "neutral", "mdi:pipe"),
      this._renderTabPill("Passages", planState.passages ? `${planState.passages}` : "1", planState.fractionation ? "warning" : "neutral", "mdi:cached"),
      this._renderTabPill("Fractionnement", planState.fractionation ? "Oui" : "Non", planState.fractionation ? "warning" : "neutral", "mdi:call-split"),
      this._renderTabPill("Type", planTypeLabel, this._planTypeTone(planState.planType), "mdi:shape"),
      this._renderTabPill("Objectif", objectiveLabel, objective > 0 ? "success" : "neutral", "mdi:water"),
    ];
    const wateringProgress = this._wateringProgressState();
    const manualActionLabel = this._manualActionLabel();

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

        ${this._renderWateringProgressSection(wateringProgress)}

        <section class="gi-info gi-info--main tab-panel__section">
          <div class="tab-panel__section-head">
            <div class="tab-panel__eyebrow">Résumé du plan</div>
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
          <div class="tab-panel__eyebrow">Contexte</div>
          <div class="tab-panel__grid">
            ${contextPills.join("")}
          </div>
        </section>
      </section>
    `;
  }

  _renderActiveTab() {
    switch (this._activeTab) {
      case "overview":
        return this._renderOverviewTab();
      case "mowing":
        return this._renderMowingTab();
      case "gazon":
        return this._renderGazonTab();
      case "config":
        return this._renderConfigTab();
      case "watering":
      default:
        return this._renderWateringTab();
    }
  }

  _renderDecisionLayout() {
    return `
      <section class="tabs-layout">
        ${this._renderTabNav()}
        ${this._renderActiveTab()}
        ${
          this._canShowLegacyDetails()
            ? `<section class="decision-advanced">
                ${this._renderSectionNav()}
                ${this._buildDecisionBlocks()}
                ${this._buildContent()}
                ${this._buildFooter()}
              </section>`
            : ""
        }
      </section>
    `;
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

  _fieldSection(fieldKey) {
    if (OVERVIEW_ENTITY_KEYS.has(fieldKey)) {
      return "overview";
    }
    if (["entity_arrosage_recommande", "entity_objectif_arrosage", "entity_type_arrosage"].includes(fieldKey)) {
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
    const icon = this._config?.show_icons ? iconForField(field) : null;
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

  _renderSectionNav() {
    if (this._isMinimalMode()) {
      return "";
    }
    return `
      <nav class="gi-tabs section-nav" aria-label="Sections de la carte">
        ${SECTION_DEFS.map((section) => {
          const active = section.key === this._activeSection;
          const iconHtml = this._config?.show_icons ? renderIconBox(section.icon, "sm") : "";
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

  _renderHero() {
    const tonte = this._entityState("entity_tonte", null);
    const arrosage = this._entityState("entity_arrosage_recommande", null);
    const afterApplication = this._entityState("entity_arrosage_apres_application_autorise", null);
    const tonteAutorisee = this._entityState("entity_tonte_autorisee", null);
    const hauteur = this._entityState("entity_hauteur", null);
    const typeArrosage = this._entityState("entity_type_arrosage", null);
    const objective = this._objectiveMm();
    const objectiveLabel = objective === null ? "Non disponible" : formatMm(objective);
    const windowState = this._windowState();
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
          ${this._renderMetric("Type d'arrosage", formatApplicationMode(typeArrosage), isEmpty(typeArrosage) ? "neutral" : "accent", "mdi:sprinkler")}
          ${this._renderMetric("Tonte", tonte, computeTonteTone(tonte), this._heroMetricIcon("entity_tonte", tonte))}
          ${this._renderMetric("Arrosage", formatRecommendationState(arrosage), arrosage === "on" ? "success" : "neutral", this._heroMetricIcon("entity_arrosage_recommande", arrosage))}
          ${this._renderMetric("Tonte autorisée", formatAuthorizationState(tonteAutorisee), tonteAutorisee === "on" ? "success" : "danger", this._heroMetricIcon("entity_tonte_autorisee", tonteAutorisee))}
          ${this._renderMetric("Après application", formatAuthorizationState(afterApplication), afterApplication === "on" ? "success" : "danger", this._heroMetricIcon("entity_arrosage_apres_application_autorise", afterApplication))}
          ${this._renderMetric("Hauteur", formatCm(hauteur), this._phaseTone(), this._heroMetricIcon("entity_hauteur", hauteur))}
        </div>
      </section>
    `;
  }

  _toneForField(field, entity) {
    if (!entity) {
      return "neutral";
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
    if (field.key === "entity_arrosage_apres_application_autorise") {
      return String(entity.state).toLowerCase() === "on" ? "success" : "danger";
    }
    if (field.key === "entity_phase") {
      return phaseTone(entity.state);
    }
    if (field.key === "entity_hauteur") {
      return this._phaseTone();
    }
    return "neutral";
  }

  _formatFieldValue(field, entity) {
    if (!entity) {
      return "Non disponible";
    }
    if (field.key === "entity_arrosage_recommande") {
      return formatRecommendationState(entity.state);
    }
    if (field.key === "entity_arrosage_apres_application_autorise" || field.key === "entity_tonte_autorisee") {
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
    if (field.key === "entity_tonte") {
      return formatStatusLabel(entity.state);
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
    if (field.key === "entity_hauteur") {
      const min = asNumber(entity.attributes?.hauteur_tonte_min_cm);
      const max = asNumber(entity.attributes?.hauteur_tonte_max_cm);
      if (min === null || max === null) {
        return "";
      }
      return `${formatCm(min)} → ${formatCm(max)}`;
    }
    if (field.key === "entity_objectif_arrosage") {
      const phase = entity.attributes?.phase_active;
      return isEmpty(phase) ? "" : `Phase: ${phase}`;
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
    if (!this._config?.show_header) {
      return "";
    }
    const phase = this._entityState("entity_phase", null);
    const subPhase = this._entityState("entity_sous_phase", null);
    const weather = this._weatherState();
    const manualActionLabel = this._manualActionLabel();
    const tone = this._cardTone();
    return `
      <header class="gi-row header">
        <div class="gi-row header__title-wrap">
          <div class="header__icon header__icon--${tone}">
            ${this._config.show_icons ? renderIconBox("mdi:grass", "md") : ""}
          </div>
          <div class="header__titles">
            <div class="header__title">${escapeHtml(this._config.title || DEFAULT_CONFIG.title)}</div>
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
            class="header__action gi-action gi-action--primary"
            data-gazon-action="manual-irrigation"
            aria-label="${escapeHtml(manualActionLabel)}"
          >
            ${this._config?.show_icons ? renderIconBox("mdi:water-pump", "sm") : ""}
            <span>${escapeHtml(manualActionLabel)}</span>
          </button>
        </div>

      </header>
    `;
  }

  _buildDecisionBlocks(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
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

  _buildFooter(section = this._activeSection) {
    if (section !== "details" || this._isMinimalMode()) {
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
    const background = this._config.show_background ? "true" : "false";
    const backgroundStyle = this._config.background_style || "solid";
    const themeMode = this._config.theme_mode || "auto";
    const resolvedThemeMode = themeMode === "auto" ? (this._hass?.themes?.darkMode ? "dark" : "light") : themeMode;
    const numericHeight = asNumber(this._config.card_height);
    const height = numericHeight && numericHeight > 0 ? `${numericHeight}px` : "";
    const borderRadius = `${this._config.border_radius ?? 24}px`;
    const iconSize = `${this._config.icon_size ?? 24}px`;
    const actionCritical = this._actionTone() === "critical";
    const isPreview = this._isPreviewMode();

    this._applyHostVariables({
      accent,
      activeTone,
      sectionAccent,
      borderRadius,
      iconSize,
      height,
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
        >
        ${this._buildHeader()}
        ${this._renderDecisionLayout()}
      </ha-card>
    `;

    this._bindMoreInfoButtons();

    this.shadowRoot.removeEventListener("click", this._onClick);
    this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.removeEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.removeEventListener("keydown", this._onKeyDown);
    this.shadowRoot.addEventListener("click", this._onClick);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.addEventListener("dblclick", this._onDoubleClick);
    this.shadowRoot.addEventListener("keydown", this._onKeyDown);
    this._syncWateringProgressTimer();
  }

  _bindMoreInfoButtons() {
    if (!this.shadowRoot) {
      return;
    }
    const buttons = this.shadowRoot.querySelectorAll("[data-more-info-entity]");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
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
      event.preventDefault();
      event.stopPropagation();
      this._triggerManualIrrigation();
      return;
    }
    const tabTarget = event.target.closest("[data-tab]");
    if (tabTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveTab(tabTarget.dataset.tab);
      return;
    }
    const sectionTarget = event.target.closest("[data-section]");
    if (sectionTarget) {
      event.preventDefault();
      event.stopPropagation();
      this._setActiveSection(sectionTarget.dataset.section);
      return;
    }
  }

  _onContextMenu(event) {
    event.preventDefault();
  }

  _onDoubleClick(event) {
    event.preventDefault();
  }

  _onKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
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

  _performAction(action, fallbackEntityId) {
    const normalized = typeof action === "string" ? { action } : action || { action: "none" };
    const actionName = String(normalized.action || "none").toLowerCase();
    const entityId = normalized.entity_id || fallbackEntityId;

    switch (actionName) {
      case "none":
        return;
      case "more-info":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "call-service": {
        const service = splitServiceName(normalized.service || normalized.service_name);
        if (!service || !this._hass) {
          return;
        }
        this._hass.callService(service.domain, service.service, normalized.service_data || normalized.data || {});
        return;
      }
      case "toggle":
        if (entityId) {
          this.dispatchEvent(
            new CustomEvent("hass-toggle", {
              detail: { entityId },
              bubbles: true,
              composed: true,
            }),
          );
        }
        return;
      case "navigate": {
        const path = normalized.navigation_path || normalized.path || normalized.url;
        if (!path) {
          return;
        }
        if (path.startsWith("http://") || path.startsWith("https://")) {
          window.open(path, "_blank", "noopener");
          return;
        }
        this.dispatchEvent(
          new CustomEvent("hass-navigate", {
            detail: { path },
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }
      case "url":
        if (normalized.url) {
          window.open(normalized.url, "_blank", "noopener");
        }
        return;
      default:
        return;
    }
  }
}

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
    return GazonIntelligentCard.getStubConfig();
  }

  _entityOptions(domainFilter = null) {
    const entities = Object.entries(this._hass?.states || {})
      .map(([entityId, stateObj]) => ({ entity_id: entityId, stateObj }))
      .filter(({ stateObj }) => {
        if (!domainFilter) {
          return true;
        }
        return domainMatches(stateObj, domainFilter);
      })
      .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
    return entities;
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

    const next = { ...this._config };
    let value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      value = target.value === "" ? "" : Number(target.value);
    } else {
      value = target.value;
    }

    if (value === "" && !["title"].includes(key)) {
      delete next[key];
    } else {
      next[key] = value;
    }

    this._config = normalizeConfig(next);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _renderInput(field, type = "text", placeholder = "") {
    const value = this._config?.[field] ?? "";
    return `
      <label class="field">
        <span>${escapeHtml(field)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          type="${type}"
          value="${escapeHtml(value)}"
          placeholder="${escapeHtml(placeholder)}"
          ${type === "checkbox" && value ? "checked" : ""}
        />
      </label>
    `;
  }

  _renderCheckbox(field, label) {
    const checked = Boolean(this._config?.[field]);
    return `
      <label class="field field--checkbox">
        <input data-config-key="${escapeHtml(field)}" type="checkbox" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  _renderEntityInput(field, label, domains = null) {
    const value = this._config?.[field] ?? "";
    const listId = "gazon-intelligent-card-entities";
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input
          data-config-key="${escapeHtml(field)}"
          list="${listId}"
          type="text"
          value="${escapeHtml(value)}"
          placeholder="sensor.gazon_intelligent_..."
        />
      </label>
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

    const entityOptions = this._entityOptions();
    const idList = entityOptions
      .map(({ entity_id }) => `<option value="${escapeHtml(entity_id)}"></option>`)
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
${EDITOR_STYLES}
      </style>

      <div class="editor">
        <section class="section">
          <h3>Carte</h3>
          <div class="grid">
            <label class="field">
              <span>Titre</span>
              <input data-config-key="title" type="text" value="${escapeHtml(this._config.title || "")}" placeholder="Gazon Intelligent" />
            </label>
            <label class="field">
              <span>Mode de fond</span>
              <select data-config-key="background_style">
                ${["solid", "glass", "minimal"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.background_style === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>Couleur d'accent</span>
              <input data-config-key="accent_color" type="text" value="${escapeHtml(this._config.accent_color || "")}" placeholder="var(--primary-color)" />
            </label>
            <label class="field">
              <span>Mode thème</span>
              <select data-config-key="theme_mode">
                ${["auto", "light", "dark"]
                  .map(
                    (option) =>
                      `<option value="${option}" ${this._config.theme_mode === option ? "selected" : ""}>${option}</option>`,
                  )
                  .join("")}
              </select>
            </label>
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_header", "Afficher l'en-tête")}
            ${this._renderCheckbox("show_icons", "Afficher les icônes")}
            ${this._renderCheckbox("show_background", "Afficher le fond")}
            ${this._renderCheckbox("compact", "Mode compact")}
            ${this._renderCheckbox("minimal_mode", "Mode minimal")}
            ${this._renderCheckbox("show_secondary_info", "Afficher les infos secondaires")}
            ${this._renderCheckbox("use_gradient", "Utiliser un dégradé")}
          </div>
          <div class="row">
            <label class="field">
              <span>Hauteur de carte (px)</span>
              <input data-config-key="card_height" type="number" min="0" step="1" value="${escapeHtml(this._config.card_height || "")}" placeholder="auto" />
            </label>
            <label class="field">
              <span>Taille des icônes (px)</span>
              <input data-config-key="icon_size" type="number" min="16" step="1" value="${escapeHtml(this._config.icon_size ?? 24)}" />
            </label>
          </div>
          <div class="row">
            <label class="field">
              <span>Rayon des bords (px)</span>
              <input data-config-key="border_radius" type="number" min="0" step="1" value="${escapeHtml(this._config.border_radius ?? 24)}" />
            </label>
            <div class="hint">La carte reste compatible avec le thème clair / sombre de Home Assistant.</div>
          </div>
          <div class="grid">
            ${this._renderCheckbox("show_advanced_details", "Afficher les détails avancés")}
          </div>
        </section>

        <section class="section">
          <h3>Décision principale</h3>
          <p>La carte fonctionne même si certaines entités sont absentes. Renseigne au moins les blocs que tu veux afficher.</p>
          <datalist id="gazon-intelligent-card-entities">${idList}</datalist>
          <div class="grid">
            ${this._renderEntityInput("entity_fenetre_optimale", "Fenêtre optimale")}
            ${this._renderEntityInput("entity_plan_arrosage", "Plan d'arrosage")}
            ${this._renderEntityInput("entity_objectif_arrosage", "Objectif d'arrosage")}
            ${this._renderEntityInput("entity_arrosage_recommande", "Arrosage recommandé")}
            ${this._renderEntityInput("entity_arrosage_apres_application_autorise", "Arrosage après application autorisé")}
            ${this._renderEntityInput("entity_dernier_arrosage", "Dernier arrosage détecté")}
            ${this._renderEntityInput("entity_derniere_application", "Dernière application")}
          </div>
        </section>

        <section class="section">
          <h3>Contexte principal</h3>
          <div class="grid">
            ${this._renderEntityInput("entity_mode", "Mode du gazon")}
            ${this._renderEntityInput("entity_type_arrosage", "Type d'arrosage")}
          </div>
        </section>

        <section class="section">
          <h3>Configuration</h3>
          <p>Ces entités alimentent l'onglet Config pour garder une vue rapide sur l'autorisation, les débits et les hauteurs de tonte.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_switch_arrosage_automatique", "Arrosage automatique")}
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
          <p>Ces champs alimentent les vues détaillées et les écrans de diagnostic si tu actives l'option correspondante.</p>
          <div class="grid">
            ${this._renderEntityInput("entity_phase", "Phase dominante")}
            ${this._renderEntityInput("entity_sous_phase", "Sous-phase")}
            ${this._renderEntityInput("entity_risque", "Risque gazon")}
            ${this._renderEntityInput("entity_conseil", "Conseil principal")}
            ${this._renderEntityInput("entity_action", "Action recommandée")}
            ${this._renderEntityInput("entity_avoid", "Action à éviter")}
            ${this._renderEntityInput("entity_niveau", "Niveau d'action")}
            ${this._renderEntityInput("entity_tonte", "État de tonte")}
            ${this._renderEntityInput("entity_tonte_autorisee", "Tonte autorisée")}
            ${this._renderEntityInput("entity_hauteur", "Hauteur de tonte conseillée")}
          </div>
          <div class="grid">
            ${this._renderEntityInput("manual_action_service", "Service du bouton manuel")}
            ${this._renderEntityInput("manual_action_label", "Libellé du bouton manuel")}
          </div>
        </section>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-config-key]").forEach((element) => {
      element.removeEventListener("input", this._handleInput);
      element.removeEventListener("change", this._handleInput);
      element.addEventListener("input", this._handleInput);
      element.addEventListener("change", this._handleInput);
    });
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, GazonIntelligentCard);
}

if (!customElements.get(`${CARD_TYPE}-editor`)) {
  customElements.define(`${CARD_TYPE}-editor`, GazonIntelligentCardEditor);
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
