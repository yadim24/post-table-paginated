import { ReactElement, ReactNode } from 'react';
import styles from './OverlayLoader.module.css';

export function OverlayLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={styles['loader-container']}>
      {isLoading && (
        <div className={styles.loader}>
          <span>Идёт загрузка....</span>
        </div>
      )}
      {children}
    </div>
  );
}
