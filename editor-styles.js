export const EDITOR_STYLES = String.raw`
        :host {
          display: block;
          --editor-border: var(--divider-color, rgba(127,127,127,0.2));
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
        .field span {
          color: var(--secondary-text-color);
        }
        .field input,
        .field select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--editor-border);
          background: var(--secondary-background-color);
          color: var(--primary-text-color);
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
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .empty {
          padding: 16px;
          color: var(--secondary-text-color);
        }`;
