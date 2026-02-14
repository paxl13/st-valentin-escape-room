import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEscapeRoom } from './hooks/useEscapeRoom';
import { PUZZLES } from './types';
import ProgressBar from './components/ProgressBar/ProgressBar';
import WordReveal from './components/WordReveal/WordReveal';
import Puzzle1Lock from './components/Puzzle1Lock/Puzzle1Lock';
import Puzzle2Series from './components/Puzzle2Series/Puzzle2Series';
import Puzzle3Deduction from './components/Puzzle3Deduction/Puzzle3Deduction';
import Puzzle4Cipher from './components/Puzzle4Cipher/Puzzle4Cipher';
import Puzzle5Binary from './components/Puzzle5Binary/Puzzle5Binary';
import FinalReveal from './components/FinalReveal/FinalReveal';
import styles from './App.module.css';

const Particles = lazy(() => import('./components/Particles/Particles'));

export default function App() {
  const { state, solvePuzzle, dismissWordReveal, startGame } = useEscapeRoom();
  const { currentPuzzle, solvedPuzzles, revealedWords, showingWordReveal } = state;

  const handleSolve = (puzzleId: number) => {
    const puzzle = PUZZLES.find((p) => p.id === puzzleId);
    if (puzzle) {
      solvePuzzle(puzzleId, puzzle.revealedWord);
    }
  };

  return (
    <div className={styles.app}>
      <Suspense>
        <Particles />
      </Suspense>

      <AnimatePresence>
        {showingWordReveal && revealedWords.length > 0 && (
          <WordReveal
            word={revealedWords[revealedWords.length - 1]}
            allWords={revealedWords}
            onContinue={dismissWordReveal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPuzzle === 0 && (
          <motion.div
            key="intro"
            className={styles.intro}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.introIcon}>🔐</div>
            <h1 className={styles.introTitle}>L'Escape Room de la St-Valentin</h1>
            <p className={styles.introDesc}>
              5 épreuves t'attendent. Chacune dévoile un mot du message secret.
              Résous-les toutes pour découvrir la surprise finale.
            </p>
            <motion.button
              className={styles.startBtn}
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer
            </motion.button>
          </motion.div>
        )}

        {currentPuzzle >= 1 && currentPuzzle <= 5 && (
          <motion.div
            key={`puzzle-wrapper-${currentPuzzle}`}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProgressBar currentPuzzle={currentPuzzle} solvedCount={solvedPuzzles.length} />
            <div className={styles.puzzleArea}>
              <AnimatePresence mode="wait">
                {currentPuzzle === 1 && (
                  <Puzzle1Lock key="p1" onSolve={() => handleSolve(1)} />
                )}
                {currentPuzzle === 2 && (
                  <Puzzle2Series key="p2" onSolve={() => handleSolve(2)} />
                )}
                {currentPuzzle === 3 && (
                  <Puzzle3Deduction key="p3" onSolve={() => handleSolve(3)} />
                )}
                {currentPuzzle === 4 && (
                  <Puzzle4Cipher key="p4" onSolve={() => handleSolve(4)} />
                )}
                {currentPuzzle === 5 && (
                  <Puzzle5Binary key="p5" onSolve={() => handleSolve(5)} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {currentPuzzle === 6 && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
            <FinalReveal revealedWords={revealedWords} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
