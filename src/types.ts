export interface PuzzleConfig {
  id: number;
  title: string;
  subtitle: string;
  revealedWord: string;
}

export interface EscapeRoomState {
  currentPuzzle: number; // 0 = intro, 1-5 = puzzles, 6 = final
  solvedPuzzles: number[];
  revealedWords: string[];
  showingWordReveal: boolean;
}

export type EscapeRoomAction =
  | { type: 'START_GAME' }
  | { type: 'SOLVE_PUZZLE'; puzzleId: number; word: string }
  | { type: 'DISMISS_WORD_REVEAL' }
  | { type: 'UNLOCK_FINAL' };

export const PUZZLES: PuzzleConfig[] = [
  { id: 1, title: 'Le Calcul de Notre Histoire', subtitle: 'Chaque jour compte', revealedWord: 'POUR' },
  { id: 2, title: 'La Série de Pi', subtitle: 'Une convergence infinie', revealedWord: 'TOU' },
  { id: 3, title: 'La Déduction', subtitle: 'Indices par indices', revealedWord: 'MA' },
  { id: 4, title: 'Le Décodage', subtitle: 'Un message caché', revealedWord: 'POUZE' },
  { id: 5, title: "L'Heure Binaire", subtitle: 'Chaque bit compte', revealedWord: 'JOURS' },
];

export const FINAL_PASSWORD = 'MA POUZE POUR TOU JOURS';
