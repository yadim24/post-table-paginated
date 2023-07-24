import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { ChangeEventHandler, FC, useState } from 'react';
import { OverlayLoader } from 'shared/OverlayLoader';
import { useDebounce } from 'shared/useDebounce';
import { Pagination } from './Pagination';
import styles from './PostTable.module.css';
import { PostTableHeader } from './PostTableHeader';
import { PostTableRow } from './PostTableRow';
import { SkeletonTableRow } from './SkeletonTableRow';
import { SortValues, getPosts } from './getPosts';

type QueryParams = {
  page: number;
  sort: SortValues | null;
  order: 'asc' | 'desc' | null;
  filter: string;
};

export const PostTable: FC = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    sort: null,
    order: null,
    filter: '',
  });

  const postsFilter = queryParams.filter ?? '';
  const debounceFilter = useDebounce(postsFilter, 500);

  const {
    isLoading,
    isFetching,
    data = { result: [], totalRows: 1 },
  } = useQuery({
    queryKey: [
      'posts',
      {
        page: queryParams.page,
        sort: queryParams.sort,
        order: queryParams.order,
        filter: debounceFilter,
      },
    ],
    queryFn: () =>
      getPosts({
        page: queryParams.page,
        sort: queryParams.sort,
        order: queryParams.order,
        filter: debounceFilter,
      }),
    keepPreviousData: true,
  });

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    const filterRow = e.target.value;

    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      filter: filterRow,
      page: 1,
    }));
  };

  const changePageNumber = (newPage: number): void => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      page: newPage,
    }));
  };

  const changeSortParams = (value: SortValues | null): void => {
    if (value === queryParams.sort) {
      setQueryParams((prevQueryParams) => ({
        ...prevQueryParams,
        order: prevQueryParams.order === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setQueryParams((prevQueryParams) => ({
        ...prevQueryParams,
        sort: value,
        order: 'asc',
      }));
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles['search-wrapper']}>
        <input
          type="text"
          placeholder="Поиск"
          value={postsFilter}
          onChange={handleFilter}
          className={styles.search}
        />
        <div className={styles['search-icon-wrapper']}>
          <Search color="#fff" size={24} />
        </div>
      </div>
      <OverlayLoader isLoading={isFetching}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              {(
                [
                  { title: 'ID', value: 'id' },
                  { title: 'Заголовок', value: 'title' },
                  { title: 'Описание', value: 'body' },
                ] satisfies { title: string; value: SortValues }[]
              ).map((item) => (
                <PostTableHeader
                  key={item.value}
                  sortedField={queryParams.sort}
                  selectedOrder={queryParams.order}
                  value={item.value}
                  onClick={() => changeSortParams(item.value)}
                >
                  {item.title}
                </PostTableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.result.map((post) => {
              return (
                <PostTableRow
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                />
              );
            })}
            {data.result.length === 0 && (
              <SkeletonTableRow isLoading={isLoading} />
            )}
          </tbody>
        </table>
      </OverlayLoader>
      <Pagination
        totalRows={data.totalRows}
        activePage={queryParams.page}
        onChangePage={changePageNumber}
      />
    </main>
  );
};
