import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_PASSWORD } from '../../types';
import styles from './FinalReveal.module.css';

const Particles = lazy(() => import('../Particles/Particles'));

interface Props {
  revealedWords: string[];
}

const POEM = `Roses are red,
Violets are blue,
This puzzle was made,
Just for you.

(Placeholder — ton vrai poème ira ici)`;

export default function FinalReveal({ revealedWords }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const shuffledWords = useMemo(() => {
    const words = [...revealedWords];
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  }, [revealedWords]);

  const password = selectedWords.join(' ');

  const handleWordClick = useCallback((word: string) => {
    setError('');
    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      }
      return [...prev, word];
    });
  }, []);

  const handleUnlock = useCallback(() => {
    if (password.toUpperCase() === FINAL_PASSWORD) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Ce n\'est pas le bon ordre...');
    }
  }, [password]);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="input"
            className={styles.passwordSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.label}>Toutes les épreuves sont résolues</span>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Touche les mots dans le bon ordre pour former le mot de passe.
            </p>

            <div className={styles.wordsHint}>
              {shuffledWords.map((word, i) => {
                const isSelected = selectedWords.includes(word);
                const order = isSelected ? selectedWords.indexOf(word) + 1 : null;
                return (
                  <motion.button
                    key={i}
                    className={`${styles.wordChip} ${isSelected ? styles.wordChipSelected : ''}`}
                    onClick={() => handleWordClick(word)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {order && <span className={styles.wordOrder}>{order}</span>}
                    {word}
                  </motion.button>
                );
              })}
            </div>

            <div className={styles.passwordPreview}>
              {selectedWords.length > 0 ? password : '...'}
            </div>

            <div className={styles.inputSection}>
              <button
                className={styles.unlockBtn}
                onClick={handleUnlock}
                disabled={selectedWords.length !== revealedWords.length}
              >
                Déverrouiller
              </button>
              {error && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className={styles.celebration}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Suspense>
              <Particles celebration />
            </Suspense>
            <motion.div
              className={styles.heart}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💝
            </motion.div>

            <motion.div
              className={styles.password}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {FINAL_PASSWORD}
            </motion.div>

            <motion.h2
              className={styles.poemTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Pour toi...
            </motion.h2>

            <motion.p
              className={styles.poem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {POEM}
            </motion.p>

            <motion.span
              className={styles.signature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              — Avec tout mon amour 💕
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
