import { motion } from 'framer-motion';
import styles from './WordReveal.module.css';

interface Props {
  word: string;
  allWords: string[];
  onContinue: () => void;
}

export default function WordReveal({ word, allWords, onContinue }: Props) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        className={styles.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Mot déverrouillé
      </motion.span>

      <motion.span
        className={styles.word}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
      >
        {word}
      </motion.span>

      <motion.div
        className={styles.wordsCollected}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {allWords.map((w, i) => (
          <span
            key={i}
            className={`${styles.collectedWord} ${w === word ? styles.collectedWordNew : ''}`}
          >
            {w}
          </span>
        ))}
      </motion.div>

      <motion.button
        className={styles.continueBtn}
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continuer
      </motion.button>
    </motion.div>
  );
}
