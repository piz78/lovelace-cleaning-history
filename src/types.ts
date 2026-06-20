import type { LovelaceCardConfig } from "custom-card-helpers";

export interface CleaningHistoryCardConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  attribute?: string;
}
