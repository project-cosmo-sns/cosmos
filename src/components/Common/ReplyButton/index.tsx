import './ReplyButton.module.scss';

interface ReplyButtonTypes {
  children: string;
  clickEvent: () => void;
}

export default function ReplyButton({
  children,
  clickEvent,
}: ReplyButtonTypes) {
  return (
    <button onClick={() => clickEvent()} type="submit">
      {children}
    </button>
  );
}
