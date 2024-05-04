import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

interface ModalPortalTypes {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalPortalTypes) {
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (typeof window === 'undefined') return <></>;
  if (!isCSR) return <></>;

  const el = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(children, el);
}
