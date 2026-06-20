import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";
import type { CleaningHistoryCardConfig } from "./types";

const DEFAULT_ATTRIBUTE = "cleaning_history_picture";

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
    const value = (ev.target as { value?: string }).value;
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
                <ha-select
                  .label=${"History"}
                  .value=${this._selectedKey ?? ""}
                  naturalMenuWidth
                  fixedMenuPosition
                  @selected=${this._handleSelected}
                  @closed=${(ev: Event) => ev.stopPropagation()}
                >
                  ${entries.map(
                    ([key]) =>
                      html`<ha-list-item .value=${key}>${key}</ha-list-item>`
                  )}
                </ha-select>
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
    ha-select {
      width: 100%;
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
