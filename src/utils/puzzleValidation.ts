export function validatePuzzle1(code: string): boolean {
  return code === '15032005';
}

export function validatePuzzle2(selectedOption: string): boolean {
  return selectedOption === 'B';
}

export function validatePuzzle3(answer: string): boolean {
  const normalized = answer.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized === 'contra 3';
}

export function validatePuzzle4(answer: string): boolean {
  const normalized = answer.trim().toUpperCase().replace(/\s+/g, ' ');
  return normalized === "JE T'AIME";
}
