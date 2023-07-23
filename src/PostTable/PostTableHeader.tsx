import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { FC } from 'react';
import styles from './PostTableHeader.module.css';

type PostTableHeaderType = {
  children: string;
  isSorted: 'id' | 'title' | 'body' | null;
  isOrdered: 'asc' | 'desc' | null;
  value: string;
  onClick: () => void;
};

export const PostTableHeader: FC<PostTableHeaderType> = ({
  children,
  isSorted,
  isOrdered,
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
        {isSorted !== value && <ChevronsUpDown className={styles.arrow} />}
        {isSorted === value && isOrdered === 'asc' && (
          <ChevronDown className={styles.arrow} />
        )}
        {isSorted === value && isOrdered === 'desc' && (
          <ChevronUp className={styles.arrow} />
        )}
      </button>
    </th>
  );
};
