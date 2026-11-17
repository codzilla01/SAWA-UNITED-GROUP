export const SAWA_EVENTS = {
  selectSector: "sawa:select-sector",
  prefillSector: "sawa:prefill-sector",
} as const;

export function emitSawaEvent(name: (typeof SAWA_EVENTS)[keyof typeof SAWA_EVENTS], detail: string) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}
