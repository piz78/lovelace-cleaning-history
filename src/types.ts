import type { ActionConfig, LovelaceCardConfig } from "custom-card-helpers";

export interface CleaningHistoryCardConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  attribute?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
