import { FC } from 'react';
import styles from './SkeletonTableRow.module.css';

type SkeletonTableRowType = {
  isLoading: boolean;
};

export const SkeletonTableRow: FC<SkeletonTableRowType> = ({ isLoading }) => {
  return (
    <tr>
      <td colSpan={3} className={styles['loading-cell']}>
        {isLoading ? <>&nbsp;</> : 'Данные отсутствуют'}
      </td>
    </tr>
  );
};
