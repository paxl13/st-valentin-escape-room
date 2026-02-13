import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle3 } from '../../utils/puzzleValidation';
import styles from './Puzzle3Deduction.module.css';

interface Props {
  onSolve: () => void;
}

const HINTS = [
  "C'est un jeu vidéo classique de la fin des années 80.",
  "C'est un jeu de type run and gun sur console.",
  "Le jeu se joue à deux joueurs coopérativement et est célèbre pour sa difficulté.",
  "C'est le troisième opus d'une série culte de Konami sur Super Nintendo.",
  "Le titre complet contient un chiffre. Pense à Contra...",
];

export default function Puzzle3Deduction({ onSolve }: Props) {
  const [visibleHints, setVisibleHints] = useState(1);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const showMoreHints = useCallback(() => {
    setVisibleHints((prev) => Math.min(prev + 1, HINTS.length));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!answer.trim()) return;
    if (validatePuzzle3(answer)) {
      onSolve();
    } else {
      setError('Ce n\'est pas la bonne réponse...');
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [answer, onSolve]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  return (
    <PuzzleShell
      puzzleNumber={3}
      title="La Déduction"
      subtitle="Dévoile les indices un par un et trouve la réponse"
      error={error}
    >
      <div className={styles.hints}>
        <AnimatePresence>
          {HINTS.slice(0, visibleHints).map((hint, i) => (
            <motion.div
              key={i}
              className={styles.hint}
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
          Révéler l'indice suivant ({visibleHints}/{HINTS.length})
        </button>
      )}

      <div className={`${styles.inputRow} ${shaking ? styles.shake : ''}`}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Ta réponse..."
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setError(''); }}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Valider
        </button>
      </div>
    </PuzzleShell>
  );
}
