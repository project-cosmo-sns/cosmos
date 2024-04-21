import { useSearchParams } from 'next/navigation';

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('query');

  return <h1>search : {search}</h1>;
}
