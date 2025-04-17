'use client';

import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/dashboard'); // vuelve al dashboard sin recargar
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          minWidth: 500,
        }}
      >
        <button
          onClick={handleClose}
          style={{
            float: 'right',
            background: 'none',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
