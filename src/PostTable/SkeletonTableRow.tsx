import { FC } from 'react';
import styles from './SkeletonTableRow.module.css';

export const SkeletonTableRow: FC = () => {
  return (
    <tr>
      <td colSpan={3} className={styles['loading-cell']}>
        Загрузка постов...
      </td>
    </tr>
  );
};
