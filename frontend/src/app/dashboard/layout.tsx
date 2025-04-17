'use client';

import { ReactNode } from 'react';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '@/components/Sidebar';
import styles from './dashboard.module.css';
import ModalWrapper from '@/components/ModalWrapper';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isEditModal = pathname.startsWith('/dashboard/edit/');
  const isNewModal = pathname === '/dashboard/new';
  const isModal = isEditModal || isNewModal;

  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          {!isModal && children}
        </main>
      </div>

      {isModal && (
        <ModalWrapper>
          {children}
        </ModalWrapper>
      )}
    </div>
  );
}
