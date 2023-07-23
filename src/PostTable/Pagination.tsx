import clsx from 'clsx';
import { FC } from 'react';
import styles from './Pagination.module.css';

type Props = {
  totalRows: number;
  activePage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  totalRows,
  activePage,
  onChangePage,
}) => {
  const pagesQty = Math.ceil(totalRows / 10);
  const pagesBtn = Array.from({ length: pagesQty }).map(
    (_item, index) => index + 1
  );

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles['page-back-next']}
        onClick={() => onChangePage(activePage - 1)}
      >
        Назад
      </button>
      <div>
        {pagesBtn.map((page) => (
          <button
            type="button"
            key={`page${page}`}
            className={clsx(
              { [styles.active]: activePage === page },
              styles.pages
            )}
            onClick={() => onChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles['page-back-next']}
        onClick={() => onChangePage(activePage + 1)}
      >
        Вперёд
      </button>
    </div>
  );
};
