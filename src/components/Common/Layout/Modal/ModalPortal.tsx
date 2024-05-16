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
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);

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

  if (typeof window === 'undefined') return <></>;
  if (!isCSR) return <></>;

  const el = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(children, el);
}
