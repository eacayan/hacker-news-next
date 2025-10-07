'use client';

import { SortTypeOptions, SortType } from '@/types';
import { isSortType } from '@/lib/utils';

import styles from './SortControls.module.scss';

interface SortControlProps {
  onSort: (type: SortType) => void;
}

export default function SortControls({ onSort }: SortControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isSortType(e.target.value)) {
      onSort(e.target.value);
    }
  };

  return (
    <div className={styles.controls}>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleChange} defaultValue="score" className={styles.select}>
        {SortTypeOptions.map((type) => (
          <option key={type} value={type}>
            {type === 'karma' ? 'Author Karma' : 'Score'}
          </option>
        ))}
      </select>
    </div>
  );
}
