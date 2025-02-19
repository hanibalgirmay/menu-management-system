import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Sidebar } from '../components/Sidebar';
import PrelineScript from '../components/PrelineScript';
import { Provider } from 'react-redux';
import store from '../store';
import ErrorBoundary from '../components/ErrorBoundary';
import ClientWrapper from '../components/ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FullStack Nestjs | Nextjs',
  description: 'Develop by Hanibal using Turo',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`flex h-screen bg-background`}>
        <ClientWrapper>{children}</ClientWrapper>
        {/* <Sidebar />
        <main className="!bg-white flex-1 overflow-auto"></main> */}
      </body>
      <PrelineScript />
    </html>
  );
}
