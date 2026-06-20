import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fireEvent } from "custom-card-helpers";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { CleaningHistoryCardConfig } from "./types";

const SCHEMA = [
  { name: "entity", required: true, selector: { entity: { domain: "camera" } } },
  { name: "title", selector: { text: {} } },
  { name: "attribute", selector: { text: {} } },
  { name: "tap_action", selector: { ui_action: {} } },
  { name: "hold_action", selector: { ui_action: {} } },
  { name: "double_tap_action", selector: { ui_action: {} } },
] as const;

const LABELS: Record<string, string> = {
  entity: "Entity",
  title: "Title",
  attribute: "Attribute",
  tap_action: "Tap action",
  hold_action: "Hold action",
  double_tap_action: "Double tap action",
};

@customElement("cleaning-history-card-editor")
export class CleaningHistoryCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CleaningHistoryCardConfig;

  public setConfig(config: CleaningHistoryCardConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _computeLabel = (schema: { name: string }): string =>
    LABELS[schema.name] ?? schema.name;

  private _valueChanged(
    ev: CustomEvent<{ value: CleaningHistoryCardConfig }>
  ): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}
