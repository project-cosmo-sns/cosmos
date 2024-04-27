import ReactDom from 'react-dom';

interface ModalPortalTypes {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalPortalTypes) {
  const el = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(children, el);
}
