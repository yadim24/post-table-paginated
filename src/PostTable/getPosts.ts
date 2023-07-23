export type SortValues = 'id' | 'title' | 'body';

type Params = {
  page: number;
  sort: SortValues | null;
  order: 'asc' | 'desc' | null;
  filter: string;
};

type GetPosts = (params: Params) => Promise<{
  result: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
  totalRows: number;
}>;

export const getPosts: GetPosts = async ({ page, sort, order, filter }) => {
  const query = new URLSearchParams({
    _page: page.toString(),
    _limit: '10',
    ...(sort && { _sort: sort }),
    ...(order && { _order: order }),
    ...(filter && { q: filter }),
  });

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return {
    result: await response.json(),
    totalRows: +(response.headers.get('X-Total-Count') as string),
  };
};
