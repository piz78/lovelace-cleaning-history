import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { formatDateTimeNumeric, handleAction, hasAction } from "custom-card-helpers";
import type {
  FrontendLocaleData,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
} from "custom-card-helpers";
import type { CleaningHistoryCardConfig } from "./types";
import "./cleaning-history-card-editor";

const HOLD_TIME_MS = 500;
const DOUBLE_CLICK_WINDOW_MS = 250;

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

  @state() private _modalUrl?: string;

  @query(".modal-overlay") private _modalOverlay?: HTMLDivElement;

  private _holdTimer?: number;

  private _holdTriggered = false;

  private _clickTimer?: number;

  public setConfig(config: CleaningHistoryCardConfig): void {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
    this._selectedKey = undefined;
  }

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement(
      "cleaning-history-card-editor"
    ) as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<CleaningHistoryCardConfig> {
    return { entity: "", attribute: DEFAULT_ATTRIBUTE };
  }

  public getCardSize(): number {
    return 5;
  }

  public getLayoutOptions(): Record<string, number> {
    return {
      grid_columns: 4,
      grid_rows: 4,
      grid_min_rows: 2,
      grid_max_rows: 8,
    };
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

  private _openModal(url: string): void {
    this._modalUrl = url;
  }

  private _closeModal(): void {
    this._modalUrl = undefined;
  }

  private _onModalKeydown(ev: KeyboardEvent): void {
    if (ev.key === "Escape") {
      this._closeModal();
    }
  }

  private _onImagePointerDown(): void {
    this._holdTriggered = false;
    if (!hasAction(this._config.hold_action)) {
      return;
    }
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      handleAction(this, this.hass, this._config, "hold");
    }, HOLD_TIME_MS);
  }

  private _onImagePointerUp(): void {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  private _onImageClick(url: string): void {
    if (this._holdTriggered) {
      this._holdTriggered = false;
      return;
    }
    if (!hasAction(this._config.double_tap_action)) {
      this._handleTap(url);
      return;
    }
    if (this._clickTimer) {
      clearTimeout(this._clickTimer);
      this._clickTimer = undefined;
      handleAction(this, this.hass, this._config, "double_tap");
      return;
    }
    this._clickTimer = window.setTimeout(() => {
      this._clickTimer = undefined;
      this._handleTap(url);
    }, DOUBLE_CLICK_WINDOW_MS);
  }

  private _handleTap(url: string): void {
    if (!this._config.tap_action) {
      this._openModal(url);
      return;
    }
    handleAction(this, this.hass, this._config, "tap");
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
                        @pointerdown=${this._onImagePointerDown}
                        @pointerup=${this._onImagePointerUp}
                        @pointercancel=${this._onImagePointerUp}
                        @click=${() => this._onImageClick(selectedUrl)}
                      />
                    `
                  : nothing}
              `}
        </div>
      </ha-card>
      ${this._modalUrl
        ? html`
            <div
              class="modal-overlay"
              tabindex="-1"
              role="dialog"
              aria-modal="true"
              @click=${this._closeModal}
              @keydown=${this._onModalKeydown}
            >
              <img
                class="modal-image"
                src=${this._modalUrl}
                @click=${(ev: Event) => ev.stopPropagation()}
              />
              <button
                class="modal-close"
                aria-label="Close"
                @click=${this._closeModal}
              >
                ✕
              </button>
            </div>
          `
        : nothing}
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has("_modalUrl") && this._modalUrl) {
      this._modalOverlay?.focus();
    }
  }

  static styles = css`
    ha-card {
      --ha-card-header-font-size: 18px;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 16px 16px;
    }
    .history-select {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
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
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      outline: none;
    }
    .modal-image {
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 18px;
      cursor: pointer;
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
