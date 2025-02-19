'use client';

import { Provider } from 'react-redux';
import store from '../store';
import ErrorBoundary from './ErrorBoundary';
import { PropsWithChildren } from 'react';
import { Sidebar } from './Sidebar';

const ClientWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Sidebar />
        <main className="!bg-white flex-1 overflow-auto">{children}</main>
      </ErrorBoundary>
    </Provider>
  );
};

export default ClientWrapper;
