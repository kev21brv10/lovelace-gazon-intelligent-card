export const EDITOR_STYLES = String.raw`
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
