import { PostTable } from 'PostTable';
import React, { ReactElement } from 'react';
import { QueryProvider } from './QueryProvider';

export function App(): ReactElement {
  return (
    <React.StrictMode>
      <QueryProvider>
        <PostTable />
      </QueryProvider>
    </React.StrictMode>
  );
}
