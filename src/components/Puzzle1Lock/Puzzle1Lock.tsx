import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle1 } from '../../utils/puzzleValidation';
import styles from './Puzzle1Lock.module.css';

interface Props {
  onSolve: () => void;
}

const NUM_DIGITS = 6;

const HINTS = [
  "Le jour où tout a commencé entre nous.",
  "Le jour où on s'est dit oui pour la vie.",
  "Le jour où on est devenus parents pour la première fois.",
  "Le jour où notre famille s'est agrandie une deuxième fois.",
  "Le jour où notre famille est devenue un quintette.",
];

const INSTRUCTION = "Multiplie ces 5 jours ensemble.";

export default function Puzzle1Lock({ onSolve }: Props) {
  const [visibleHints, setVisibleHints] = useState(1);
  const [digits, setDigits] = useState(Array(NUM_DIGITS).fill(''));
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const showMoreHints = useCallback(() => {
    setVisibleHints((prev) => Math.min(prev + 1, HINTS.length));
  }, []);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const char = value.slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    setError('');
    if (char && index < NUM_DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [digits]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, NUM_DIGITS);
    if (!pasted) return;
    const newDigits = Array(NUM_DIGITS).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    const focusIdx = Math.min(pasted.length, NUM_DIGITS - 1);
    inputRefs.current[focusIdx]?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    const code = digits.join('');
    if (code.length < NUM_DIGITS) {
      setError('Entre les 6 chiffres du résultat');
      return;
    }
    if (validatePuzzle1(code)) {
      onSolve();
    } else {
      setError("Ce n'est pas la bonne réponse...");
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [digits, onSolve]);

  const allHintsVisible = visibleHints >= HINTS.length;
  const code = digits.join('');

  return (
    <PuzzleShell
      puzzleNumber={1}
      title="Le Calcul de Notre Histoire"
      subtitle="Chaque jour compte... littéralement."
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
              <span className={styles.hintNumber}>Jour {i + 1}</span>
              {hint}
            </motion.div>
          ))}
        </AnimatePresence>

        {allHintsVisible && (
          <motion.div
            className={styles.instruction}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {INSTRUCTION}
          </motion.div>
        )}
      </div>

      {visibleHints < HINTS.length && (
        <button className={styles.moreBtn} onClick={showMoreHints}>
          Révéler le jour suivant ({visibleHints}/{HINTS.length})
        </button>
      )}

      <motion.div
        className={`${styles.digits} ${shaking ? styles.shake : ''}`}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className={styles.digitInput}
            placeholder="•"
          />
        ))}
      </motion.div>

      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={code.length < NUM_DIGITS}
      >
        Valider
      </button>
    </PuzzleShell>
  );
}
