import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import styles from './Puzzle5Binary.module.css';

interface Props {
  onSolve: () => void;
}

const BIT_VALUES = [32, 16, 8, 4, 2, 1];
const TARGET_HOURS = 1;
const TARGET_MINUTES = 43;

const HINTS = [
  "Ce n'est pas vraiment une heure de réveil.",
  "Chaque chiffre compte... littéralement.",
  "Pense à une phrase de 3 mots en anglais.",
  "Compte les lettres de chaque mot.",
];

function bitsToDecimal(bits: boolean[]): number {
  return bits.reduce((sum, on, i) => sum + (on ? BIT_VALUES[i] : 0), 0);
}

export default function Puzzle5Binary({ onSolve }: Props) {
  const [hourBits, setHourBits] = useState(() => Array(6).fill(false));
  const [minuteBits, setMinuteBits] = useState(() => Array(6).fill(false));
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const [visibleHints, setVisibleHints] = useState(0);

  const showMoreHints = useCallback(() => {
    setVisibleHints((prev) => Math.min(prev + 1, HINTS.length));
  }, []);

  const toggleBit = useCallback((row: 'hours' | 'minutes', index: number) => {
    setError('');
    const setter = row === 'hours' ? setHourBits : setMinuteBits;
    setter((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const hours = bitsToDecimal(hourBits);
    const minutes = bitsToDecimal(minuteBits);
    if (hours === TARGET_HOURS && minutes === TARGET_MINUTES) {
      onSolve();
    } else {
      setError("Ce n'est pas la bonne heure...");
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [hourBits, minuteBits, onSolve]);

  const hours = bitsToDecimal(hourBits);
  const minutes = bitsToDecimal(minuteBits);

  return (
    <PuzzleShell
      puzzleNumber={5}
      title="L'Heure Binaire"
      subtitle="Quelle heure affiche un je t'aime ?"
      error={error}
    >
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

      <div className={styles.clock}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Heures</span>
          <div className={styles.leds}>
            {hourBits.map((on, i) => (
              <button
                key={i}
                className={`${styles.led} ${on ? styles.ledOn : ''}`}
                onClick={() => toggleBit('hours', i)}
                aria-label={`Bit ${BIT_VALUES[i]} heures`}
              >
                <span className={styles.ledGlow} />
              </button>
            ))}
          </div>
          <div className={styles.bitLabels}>
            {BIT_VALUES.map((v) => (
              <span key={v} className={styles.bitLabel}>{v}</span>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Minutes</span>
          <div className={styles.leds}>
            {minuteBits.map((on, i) => (
              <button
                key={i}
                className={`${styles.led} ${on ? styles.ledOn : ''}`}
                onClick={() => toggleBit('minutes', i)}
                aria-label={`Bit ${BIT_VALUES[i]} minutes`}
              >
                <span className={styles.ledGlow} />
              </button>
            ))}
          </div>
          <div className={styles.bitLabels}>
            {BIT_VALUES.map((v) => (
              <span key={v} className={styles.bitLabel}>{v}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.display}>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
      </div>

      <button
        className={`${styles.submitBtn} ${shaking ? styles.shake : ''}`}
        onClick={handleSubmit}
      >
        Valider
      </button>
    </PuzzleShell>
  );
}
