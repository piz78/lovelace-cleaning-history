import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formatDateTimeNumeric } from "custom-card-helpers";
import type {
  FrontendLocaleData,
  HomeAssistant,
  LovelaceCard,
} from "custom-card-helpers";
import type { CleaningHistoryCardConfig } from "./types";

const DEFAULT_ATTRIBUTE = "cleaning_history_picture";

const HISTORY_LABEL_RE =
  /^(\d+):\s*(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\s+(\d{1,2}):(\d{2})\s*-\s*(.+)$/;

function formatHistoryLabel(label: string, locale: FrontendLocaleData): string {
  const match = label.match(HISTORY_LABEL_RE);
  if (!match) {
    return label;
  }
  const [, index, month, day, year, hour, minute, rest] = match;
  const now = new Date();
  const fullYear = year
    ? year.length === 2
      ? 2000 + Number(year)
      : Number(year)
    : now.getFullYear();
  let date = new Date(
    fullYear,
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute)
  );
  if (!year && date.getTime() > now.getTime() + 24 * 60 * 60 * 1000) {
    date = new Date(
      fullYear - 1,
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
  }
  if (Number.isNaN(date.getTime())) {
    return label;
  }
  return `${index}: ${formatDateTimeNumeric(date, locale)} - ${rest}`;
}

@customElement("cleaning-history-card")
export class CleaningHistoryCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: CleaningHistoryCardConfig;

  @state() private _selectedKey?: string;

  public setConfig(config: CleaningHistoryCardConfig): void {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
    this._selectedKey = undefined;
  }

  public getCardSize(): number {
    return 5;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (!changedProps.has("hass") || this._selectedKey) {
      return;
    }
    const entries = this._getEntries();
    if (entries.length) {
      this._selectedKey = entries[0][0];
    }
  }

  private _getEntries(): [string, string][] {
    if (!this._config || !this.hass) {
      return [];
    }
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return [];
    }
    const attribute = this._config.attribute || DEFAULT_ATTRIBUTE;
    const history = stateObj.attributes[attribute] as
      | Record<string, string>
      | undefined;
    return history ? Object.entries(history) : [];
  }

  private _handleSelected(ev: Event): void {
    const value = (ev.target as HTMLSelectElement).value;
    if (value) {
      this._selectedKey = value;
    }
  }

  private _openImage(url: string): void {
    window.open(url, "_blank");
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const entries = this._getEntries();
    const title = this._config.title ?? stateObj.attributes.friendly_name;
    const selectedUrl = this._selectedKey
      ? entries.find(([key]) => key === this._selectedKey)?.[1]
      : undefined;

    return html`
      <ha-card .header=${title}>
        <div class="content">
          ${entries.length === 0
            ? html`<div class="warning">No history available</div>`
            : html`
                <label class="history-label">History</label>
                <select class="history-select" @change=${this._handleSelected}>
                  ${entries.map(
                    ([key]) =>
                      html`<option
                        value=${key}
                        ?selected=${key === this._selectedKey}
                      >
                        ${formatHistoryLabel(key, this.hass.locale)}
                      </option>`
                  )}
                </select>
                ${selectedUrl
                  ? html`
                      <img
                        class="history-image"
                        src=${selectedUrl}
                        alt=${this._selectedKey ?? ""}
                        @click=${() => this._openImage(selectedUrl)}
                      />
                    `
                  : nothing}
              `}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 16px 16px;
    }
    .history-label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .history-select {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      margin-top: 4px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
    }
    .history-select:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }
    .history-image {
      width: 100%;
      max-width: 100%;
      border-radius: var(--ha-card-border-radius, 12px);
      cursor: zoom-in;
    }
    .warning {
      padding: 8px 0;
      color: var(--error-color);
    }
  `;
}

declare global {
  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "cleaning-history-card",
  name: "Cleaning History Card",
  description:
    "Browse and display a robot vacuum's historical cleaning maps from a camera entity's attributes.",
});
