import { useState } from 'react';
import PuzzleShell from '../PuzzleShell/PuzzleShell';
import { validatePuzzle2 } from '../../utils/puzzleValidation';
import styles from './Puzzle2Series.module.css';

interface Props {
  onSolve: () => void;
}

const OPTIONS = [
  {
    id: 'A',
    formula: '1 + 1/2 + 1/3 + 1/4 + ...',
    name: 'Série harmonique',
    convergesTo: '→ ∞ (diverge)',
  },
  {
    id: 'B',
    formula: '1 - 1/3 + 1/5 - 1/7 + ...',
    name: 'Série de Leibniz',
    convergesTo: '→ π/4',
  },
  {
    id: 'C',
    formula: '1 + 1/4 + 1/9 + 1/16 + ...',
    name: 'Problème de Bâle',
    convergesTo: '→ π²/6',
  },
  {
    id: 'D',
    formula: '1 + 1/2 + 1/4 + 1/8 + ...',
    name: 'Série géométrique',
    convergesTo: '→ 2',
  },
];

export default function Puzzle2Series({ onSolve }: Props) {
  const [error, setError] = useState('');
  const [wrongId, setWrongId] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (optionId: string) => {
    if (validatePuzzle2(optionId)) {
      onSolve();
    } else {
      setWrongId(optionId);
      setError('Cette série ne converge pas vers π/4...');
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
        Parmi ces séries infinies, laquelle converge vers un <strong>multiple de π</strong> ?
      </p>

      <button className={styles.hint} onClick={() => setShowHint(true)}>
        {showHint ? 'π/4' : 'Touche ici pour un indice'}
      </button>

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
