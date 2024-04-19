import CreateFeed from '@/components/Feed/CreateFeed';
import FeedCard from '@/components/Feed/FeedCard';

export default function Home() {
  return (
    <div>
      <FeedCard />
      <CreateFeed />
      <div>home</div>
    </div>
  );
}
