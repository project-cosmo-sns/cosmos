import fetchData from '@/api/fetchData';
import DeleteModal from '@/components/Common/DeleteModal';
import EmojiBundle from '@/components/Common/EmojiBundle';
import { MeatBallsIcon } from '@/components/Common/IconCollection';
import WriterProfile from '@/components/Common/WriterProfile';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
import { useOpenLoginModal } from '@/hooks/useOpenLoginModal';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import useSendScrapRequest from '@/hooks/useSendScrapRequest';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditDeleteMenu from '../EditDeleteMenu';
import HashTag from '../HashTag';
import MarkdownContent from '../Markdown';
import PostComment from '../PostComment';
import ScrapButton from '../ScrapButton';
import { HashTagType, PostDetailType } from '../types';
import styles from './PostContent.module.scss';

const cn = classNames.bind(styles);

export default function PostContent() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditDeleteMenuOpen, setIsEditDeleteMenuOpen] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  const { showToastHandler } = useToast();
  const { showLoginModalHandler } = useOpenLoginModal();

  const {
    isSuccess: isMemberStatusSuccess,
    isLogin,
    isAuthorized,
  } = useFetchMemberStatus();

  const {
    data: postData,
    isSuccess,
    isPending,
    refetch,
  } = useQuery<PostDetailType>({
    queryKey: ['postData', postId],
    queryFn: () =>
      fetchData({
        param: `/post/${postId}/detail`,
      }),
    enabled: false,
  });

  useEffect(() => {
    if (postId) {
      if (isMemberStatusSuccess)
        if (isLogin) {
          if (isAuthorized) {
            refetch();
          } else {
            router.replace('/');
            showToastHandler('인증된 사용자만 확인할 수 있습니다', 'warn');
          }
        } else {
          router.replace('/');
          showLoginModalHandler();
        }
    }
  }, [postId, isMemberStatusSuccess]);

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}/view-count/increase`,
        method: 'post',
      }),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/post/${postId}`,
        method: 'delete',
      }),
    onSuccess: () => router.push('/?tab=feed'),
  });

  const { handleEmojiClick, isAddPending, isDeletePending } =
    useSendEmojiRequest({
      id: Number(postId),
      isPost: true,
    });

  const { handleScrapClick } = useSendScrapRequest({
    postId: Number(postId),
  });

  useEffect(() => {
    if (postId && isSuccess) mutate();
  }, [postId, isSuccess]);

  if (isPending) <>...Loading</>;
  if (isSuccess) {
    const { post, writer } = postData.postDetail;
    const {
      category,
      title,
      createdAt,
      content,
      hashTags,
      emojis,
      // scrapCount,
      isScraped,
      viewCount,
      commentCount,
      isMine,
    } = post;

    return (
      <>
        <div className={cn('wrapper')}>
          <span className={cn('category')}>{category}</span>
          <span className={cn('title')}>{title}</span>
          <div className={cn('header')}>
            <WriterProfile
              writer={writer}
              createdAt={createdAt.slice(0, 10).replace(/-/g, '.')}
            />
            <div className={cn('menu')}>
              <ScrapButton
                handleClickScrap={(isClicked: boolean) =>
                  handleScrapClick(isClicked)
                }
                isScraped={isScraped}
                // scrapCount={scrapCount}
              />
              {isMine && (
                <MeatBallsIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsEditDeleteMenuOpen((prev) => !prev);
                  }}
                />
              )}
              <EditDeleteMenu
                isShow={isEditDeleteMenuOpen}
                handleCloseMenu={() => setIsEditDeleteMenuOpen(false)}
                handleClickEdit={() =>
                  router.replace(`/write?postId=${postId}`)
                }
                handleClickDelete={() => setIsDeleteModalOpen(true)}
              />
            </div>
          </div>
          <div className={cn('divide-line')} />
          <MarkdownContent
            className={cn('markdown-content')}
            content={content}
          />
          <div className={cn('hashtag-container')}>
            {hashTags.map((tag: HashTagType) => (
              <HashTag key={`${tag.tagName}`} tag={tag} />
            ))}
          </div>
          <EmojiBundle
            isPost
            commentCount={commentCount}
            viewCount={viewCount}
            emojiList={emojis}
            handleEmojiClick={handleEmojiClick}
            isPending={isAddPending || isDeletePending}
          />
          <PostComment postId={Number(postId)} />
        </div>
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={deleteMutate}
        />
      </>
    );
  }
}
