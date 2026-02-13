import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle2 } from '../../utils/puzzleValidation';
import styles from './Puzzle2Series.module.css';

interface Props {
  onSolve: () => void;
}

const HINTS = [
  "C'est relié à un nombre irrationnel très célèbre.",
  "Cherche juste la partie après la virgule.",
  "Les signes alternent entre + et −.",
  "0.1415926...",
];

const OPTIONS = [
  {
    id: 'A',
    formula: '1/10 + 1/100 + 1/1000 + 1/10000 + 1/100000 + ...',
  },
  {
    id: 'B',
    formula: '1/6 − 1/30 + 1/84 − 1/180 + 1/330 − 1/546 + ...',
  },
  {
    id: 'C',
    formula: '1/4 − 1/8 + 1/12 − 1/16 + 1/20 − 1/24 + ...',
  },
  {
    id: 'D',
    formula: '1/6 + 1/36 + 1/216 + 1/1296 + 1/7776 + ...',
  },
];

export default function Puzzle2Series({ onSolve }: Props) {
  const [error, setError] = useState('');
  const [wrongId, setWrongId] = useState('');
  const [visibleHints, setVisibleHints] = useState(0);

  const showMoreHints = useCallback(() => {
    setVisibleHints((prev) => Math.min(prev + 1, HINTS.length));
  }, []);

  const handleSelect = (optionId: string) => {
    if (validatePuzzle2(optionId)) {
      onSolve();
    } else {
      setWrongId(optionId);
      setError('Ce n\'est pas la bonne réponse...');
      setTimeout(() => setWrongId(''), 400);
    }
  };

  return (
    <PuzzleShell
      puzzleNumber={2}
      title="La Série de Pi"
      subtitle="Mon amour est infini, comme les décimales de π"
      error={error}
    >
      <p className={styles.question}>
        Parmi ces séries infinies, laquelle converge vers les <strong>décimales de π</strong> ?
      </p>

      <div className={styles.hints}>
        <AnimatePresence>
          {HINTS.slice(0, visibleHints).map((hint, i) => (
            <motion.div
              key={i}
              className={styles.hintItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.hintNumber}>Indice {i + 1}</span>
              {hint}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleHints < HINTS.length && (
        <button className={styles.moreBtn} onClick={showMoreHints}>
          Révéler un indice ({visibleHints}/{HINTS.length})
        </button>
      )}

      <div className={styles.options}>
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            className={`${styles.optionCard} ${wrongId === opt.id ? styles.wrong : ''}`}
            onClick={() => handleSelect(opt.id)}
          >
            <span className={styles.optionLabel}>{opt.id}.</span>
            <span className={styles.optionText}>{opt.formula}</span>
          </button>
        ))}
      </div>
    </PuzzleShell>
  );
}
