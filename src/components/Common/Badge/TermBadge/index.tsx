interface TermBadgeTypes {
  term: number;
}

export default function TermBadge({ term }: TermBadgeTypes) {
  return (
    <div>
      <span>{term}기</span>
    </div>
  );
}
