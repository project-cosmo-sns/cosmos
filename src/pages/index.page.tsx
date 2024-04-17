import CommentButton from '@/components/Common/Buttons/CommentButton';
import CommentInput from '@/components/Common/CommentInput';

export default function Home() {
  return (
    <>
      <div>Home</div>
      <CommentInput placeholder="댓글을 입력해주세요" />
      <CommentButton clickEvent={() => console.log('1')}>등록</CommentButton>
    </>
  );
}
