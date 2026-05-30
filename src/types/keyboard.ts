export type KeyVariant = "alpha" | "modifier" | "accent";

export interface KeyDef {
  id: string;
  code: string;
  label: string;
  subLabel?: string;
  variant: KeyVariant;
  width: number;
  height?: number;
  marginLeft?: number;
  centerLabel?: boolean;
}

export interface KeyRow {
  id: string;
  keys: KeyDef[];
  offsetLeft?: number;
}

export type AccentColor =
  | "teal"
  | "pink"
  | "orange"
  | "purple"
  | "blue"
  | "red";

export type SoundPack =
  | "cherry-blue"
  | "cherry-brown"
  | "cherry-red"
  | "cherry-black"
  | "topre"
  | "creams"
  | "none";
