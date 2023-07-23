import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { FC } from 'react';
import styles from './PostTableHeader.module.css';

type PostTableHeaderType = {
  children: string;
  sortedField: 'id' | 'title' | 'body' | null;
  selectedOrder: 'asc' | 'desc' | null;
  value: string;
  onClick: () => void;
};

export const PostTableHeader: FC<PostTableHeaderType> = ({
  children,
  sortedField,
  selectedOrder,
  value,
  onClick,
}) => {
  return (
    <th className={styles.th}>
      <button
        type="button"
        value={value}
        className={styles.button}
        onClick={onClick}
      >
        <span>{children}</span>
        {sortedField !== value && <ChevronsUpDown className={styles.arrow} />}
        {sortedField === value && selectedOrder === 'asc' && (
          <ChevronDown className={styles.arrow} />
        )}
        {sortedField === value && selectedOrder === 'desc' && (
          <ChevronUp className={styles.arrow} />
        )}
      </button>
    </th>
  );
};
