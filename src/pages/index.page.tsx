import ReplyButton from '@/components/Common/ReplyButton';
import ReplyInput from '@/components/Common/ReplyInput';

export default function Home() {
  return (
    <>
      <div>Home</div>
      <ReplyInput placeholder="댓글을 입력해주세요" />
      <ReplyButton clickEvent={() => console.log('1')}>등록</ReplyButton>
    </>
  );
}
