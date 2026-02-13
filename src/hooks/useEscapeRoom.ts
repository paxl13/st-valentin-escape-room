import { useReducer, useCallback } from 'react';
import type { EscapeRoomState, EscapeRoomAction } from '../types';

const initialState: EscapeRoomState = {
  currentPuzzle: 0,
  solvedPuzzles: [],
  revealedWords: [],
  showingWordReveal: false,
};

function escapeRoomReducer(state: EscapeRoomState, action: EscapeRoomAction): EscapeRoomState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, currentPuzzle: 1 };
    case 'SOLVE_PUZZLE':
      return {
        ...state,
        solvedPuzzles: [...state.solvedPuzzles, action.puzzleId],
        revealedWords: [...state.revealedWords, action.word],
        showingWordReveal: true,
      };
    case 'DISMISS_WORD_REVEAL': {
      const nextPuzzle = state.solvedPuzzles.length >= 4 ? 5 : state.currentPuzzle + 1;
      return {
        ...state,
        showingWordReveal: false,
        currentPuzzle: nextPuzzle,
      };
    }
    case 'UNLOCK_FINAL':
      return {
        ...state,
        currentPuzzle: 5,
      };
    default:
      return state;
  }
}

export function useEscapeRoom() {
  const [state, dispatch] = useReducer(escapeRoomReducer, initialState);

  const solvePuzzle = useCallback((puzzleId: number, word: string) => {
    dispatch({ type: 'SOLVE_PUZZLE', puzzleId, word });
  }, []);

  const dismissWordReveal = useCallback(() => {
    dispatch({ type: 'DISMISS_WORD_REVEAL' });
  }, []);

  const unlockFinal = useCallback(() => {
    dispatch({ type: 'UNLOCK_FINAL' });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  return {
    state,
    solvePuzzle,
    dismissWordReveal,
    unlockFinal,
    startGame,
  };
}
