import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

interface ModalPortalTypes {
  children: React.ReactNode;
  modalVisible?: boolean;
}

export default function ModalPortal({
  children,
  modalVisible,
}: ModalPortalTypes) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    if (modalVisible) {
      document.body.style.overflow = 'hidden';
    }
    if (!modalVisible) {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return null;
  if (!mounted) return null;

  const el = document.getElementById('modal-root') as HTMLElement;

  return ReactDom.createPortal(children, el);
}
