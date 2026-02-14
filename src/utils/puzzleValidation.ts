export function validatePuzzle1(answer: string): boolean {
  const normalized = answer.trim().replace(/\s+/g, '');
  return normalized === '742560';
}

export function validatePuzzle2(selectedOption: string): boolean {
  return selectedOption === 'B';
}

export function validatePuzzle3(answer: string): boolean {
  const normalized = answer.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized.split(' ')[0] === 'contra';
}

export function validatePuzzle4(answer: string): boolean {
  const normalized = answer.trim().toUpperCase().replace(/\s+/g, ' ');
  return normalized === "AMOUR";
}
