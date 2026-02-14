import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

interface Props {
  currentPuzzle: number;
  solvedCount: number;
}

export default function ProgressBar({ currentPuzzle, solvedCount }: Props) {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((step, i) => {
        const solved = solvedCount > i;
        const active = currentPuzzle === step;
        return (
          <div key={step} style={{ display: 'contents' }}>
            <div
              className={`${styles.dot} ${solved ? styles.dotSolved : ''} ${active ? styles.dotActive : ''}`}
            />
            <div className={`${styles.step} ${active ? styles.active : ''}`}>
              <motion.div
                className={styles.fill}
                initial={false}
                animate={{ scaleX: solved ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        );
      })}
      <div
        className={`${styles.dot} ${solvedCount >= 5 ? styles.dotSolved : ''}`}
      />
    </div>
  );
}
