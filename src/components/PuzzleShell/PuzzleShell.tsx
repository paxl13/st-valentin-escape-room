import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './PuzzleShell.module.css';

interface Props {
  puzzleNumber: number;
  title: string;
  subtitle: string;
  error?: string;
  children: ReactNode;
}

export default function PuzzleShell({ puzzleNumber, title, subtitle, error, children }: Props) {
  return (
    <motion.div
      className={styles.shell}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.puzzleNumber}>Épreuve {puzzleNumber} / 5</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.content}>{children}</div>
      {error && (
        <motion.p
          className={styles.errorMsg}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          key={error}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
