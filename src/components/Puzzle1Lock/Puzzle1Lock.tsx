import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle1 } from '../../utils/puzzleValidation';
import styles from './Puzzle1Lock.module.css';

interface Props {
  onSolve: () => void;
}

export default function Puzzle1Lock({ onSolve }: Props) {
  const [digits, setDigits] = useState(Array(8).fill(''));
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const char = value.slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    setError('');
    if (char && index < 7) {
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
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    if (!pasted) return;
    const newDigits = Array(8).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    const focusIdx = Math.min(pasted.length, 7);
    inputRefs.current[focusIdx]?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    const code = digits.join('');
    if (code.length < 8) {
      setError('Entre les 8 chiffres du code');
      return;
    }
    if (validatePuzzle1(code)) {
      onSolve();
    } else {
      setError('Ce n\'est pas le bon code...');
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [digits, onSolve]);

  const code = digits.join('');

  return (
    <PuzzleShell
      puzzleNumber={1}
      title="Le Cadenas"
      subtitle="8 chiffres protègent un secret. Une date, peut-être ?"
      error={error}
    >
      <p className={styles.hint}>Un jour spécial, gravé dans ta mémoire...</p>
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
            autoFocus={i === 0}
          />
        ))}
      </motion.div>
      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={code.length < 8}
      >
        Déverrouiller
      </button>
    </PuzzleShell>
  );
}
