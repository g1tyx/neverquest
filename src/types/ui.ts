export type Animation =
  | "bounceIn"
  | "fadeOutUp"
  | "flipInX"
  | "headShake"
  | "pulse"
  | "zoomIn"
  | "zoomInRight"
  | "zoomOut";

export type AnimationSpeed = "fast" | "faster" | "slow" | "slower";

export type BootstrapColorVariant = "dark" | "outline-dark" | "secondary";

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

type DeltaDisplayContents = {
  color: "text-danger" | "text-muted" | "text-success" | null;
  value: number | string;
};

export type DeltaReserve =
  | { isRegeneration: true }
  | (DeltaReserveBase & { isRegeneration: false });

export type DeltaReserveBase = {
  delta?: DeltaDisplay;
  value: number;
};

export type FloatingText = {
  delta: DeltaDisplay;
  key: string;
};

export type UIAttachment = "above" | "below";

export type UISize = "normal" | "small";
