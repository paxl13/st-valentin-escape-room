import { useState, useCallback } from 'react';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle4 } from '../../utils/puzzleValidation';
import styles from './Puzzle4Cipher.module.css';

interface Props {
  onSolve: () => void;
}

const CIPHER_TEXT = "OACIF";

export default function Puzzle4Cipher({ onSolve }: Props) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!answer.trim()) return;
    if (validatePuzzle4(answer)) {
      onSolve();
    } else {
      setError('Le déchiffrement n\'est pas correct...');
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [answer, onSolve]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  return (
    <PuzzleShell
      puzzleNumber={4}
      title="Le Décodage"
      subtitle="Un message chiffré attend d'être dévoilé"
      error={error}
    >
      <div className={styles.cipherBlock}>
        <div className={styles.cipherLabel}>Message chiffré</div>
        <div className={styles.cipherText}>{CIPHER_TEXT}</div>
      </div>

      <p className={styles.explanation}>
        Ce message a été chiffré avec un <strong>chiffre de César</strong> —
        chaque lettre a été décalée de <span className={styles.explanationMono}>14 positions</span> dans
        l'alphabet (ROT14).
      </p>
      <p className={styles.explanation}>
        Par exemple : <span className={styles.explanationMono}>A → O</span>,{' '}
        <span className={styles.explanationMono}>B → P</span>,{' '}
        <span className={styles.explanationMono}>C → Q</span>...
      </p>

      <div className={`${styles.inputRow} ${shaking ? styles.shake : ''}`}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="Message déchiffré..."
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setError(''); }}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Déchiffrer
        </button>
      </div>
    </PuzzleShell>
  );
}
