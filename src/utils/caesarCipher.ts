const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function caesarShift(text: string, shift: number): string {
  return text
    .split('')
    .map((char) => {
      const upper = char.toUpperCase();
      const idx = ALPHABET.indexOf(upper);
      if (idx === -1) return char; // non-alpha, keep as-is
      const shifted = ALPHABET[(idx + shift + 26) % 26];
      return char === upper ? shifted : shifted.toLowerCase();
    })
    .join('');
}

export function rot14Encode(text: string): string {
  return caesarShift(text, 14);
}

export function rot14Decode(text: string): string {
  return caesarShift(text, -14);
}
