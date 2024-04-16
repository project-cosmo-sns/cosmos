export default interface CtaDefaultType {
  children: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size: string;
  color: string;
}
