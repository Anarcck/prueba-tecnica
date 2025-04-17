import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReduxProvider } from '@/store/provider';
import './globals.css';
import LoadAuth from '@/components/InitAuth';
import SocketListener from '@/components/SocketListener';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'To Do App',
  description: 'A simple to do app with Next.js and Redux',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <LoadAuth />
          <SocketListener /> 
          <Toaster position="top-right" /> 
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
