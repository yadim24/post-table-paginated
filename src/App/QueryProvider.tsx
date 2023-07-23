import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const queryClient = new QueryClient();

export const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
