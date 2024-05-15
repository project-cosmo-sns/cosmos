import { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { CloseIcon, AddImageIcon } from '@/components/Common/IconCollection';
import { Inputs, FeedType } from '@/components/Feed/CreateFeed/type';
import { useCreateFeedRequest } from '@/hooks/useCreateFeedRequest';
import { useMutation } from '@tanstack/react-query';
import { FeedDetailType } from '@/components/Feed/types';
import { useForm, Controller } from 'react-hook-form';
import styles from './EditFeed.module.scss';
import WriterProfile from '@/components/Common/WriterProfile';
import { refetchType } from '@/@types/type';
import fetchData from '@/api/fetchData';

interface EditFeedTypes {
  feedData: FeedDetailType;
  editState: boolean;
  toggleEditMode: Dispatch<SetStateAction<boolean>>;
  feedContentRefetch: refetchType<FeedDetailType>;
}

export default function EditFeed({
  feedData,
  editState,
  toggleEditMode,
  feedContentRefetch,
}: EditFeedTypes) {
  const [images, setImages] = useState<Blob[]>([]);
  const [wasteBucket, setWasteBucket] = useState<string[]>([]);
  const [newBucket, setNewBucket] = useState<string[]>([]);
  const cn = classNames.bind(styles);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      content: feedData.feed.content,
      feedImage: feedData.feed.imageUrls,
    },
  });
  const { getUrl, deleteImage } = useCreateFeedRequest();
  const [urlBucket, setUrlBucket] = useState<string[]>(getValues('feedImage'));
  // const [imagePreview, setImagePreview] = useState<string[]>(
  //   getValues('feedImage'),
  // );
  const { id: feedId } = feedData.feed;

  const putUrlMutate = useMutation({
    mutationFn: ({ url, file }: { url: string; file: Blob }) =>
      axios({
        method: 'put',
        url: `${url}`,
        data: file,
        headers: {
          'Access-Control-Allow-Origin': 'https://alpha.cosmo-sns.com',
        },
      }),
    onSuccess: (data) => {
      const prev = getValues('feedImage');
      if (data.config.url) {
        const imageUrl = data.config.url.split('?')[0];
        if (prev) {
          setValue('feedImage', [...prev, imageUrl]);
          setUrlBucket([...prev, imageUrl]);
          setNewBucket((prevNew) => [...prevNew, imageUrl]);
        } else {
          setValue('feedImage', [imageUrl]);
          setUrlBucket([imageUrl]);
        }
      }
    },
    onError: () => {
      console.log('에러');
    },
  });

  const putUrl = (url: string, file: Blob) => {
    putUrlMutate.mutate({ url, file });
  };

  const getUrlRequest = async () => {
    const { data } = await getUrl();
    return data?.uploadURL;
  };

  const updateUrlBucket = async (currentImageValue: Blob[]) => {
    console.log('-----업데이트 url 버켓 실행------');
    let urlList: string[] = [];
    if (currentImageValue && currentImageValue.length > 0) {
      for (let i = 0; i < currentImageValue.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const uploadUrl = await getUrlRequest();
        if (uploadUrl) urlList.push(uploadUrl);
      }
      urlList.map((url, i) => putUrl(url, currentImageValue[i]));
    }
    return [];
  };

  const filterImage = (index: number) => {
    const urlBox = getValues('feedImage');
    const filteredImages = images.filter((el, i) => i !== index);
    const filteredUrlBucket = urlBox.filter((el, i) => i !== index);
    const markedForDeletionUrl = urlBox.filter((el, i) => i === index);

    setWasteBucket((prev) => [...prev, ...markedForDeletionUrl]);
    setImages(filteredImages);
    setValue('feedImage', filteredUrlBucket);
    setUrlBucket(filteredUrlBucket);
    // setImagePreview(filteredUrlBucket);
  };

  // const updateImageUrls = () => {
  //   console.log('-----업데이트 이미지 유알엘 실행------');
  //   if (images && images.length > 0) {
  //     let urlList = [];
  //     for (let i = 0; i < images.length; i += 1) {
  //       const file: Blob | MediaSource = new Blob([images[i]]);
  //       const createdUrl = URL.createObjectURL(file);
  //       urlList.push(createdUrl);
  //     }
  //     setImagePreview((prev) => [...prev, ...urlList]);
  //     return [...urlList];
  //   }
  //   return [];
  // };

  const { mutate: editFeed } = useMutation({
    mutationFn: (data: FeedType) =>
      fetchData({
        param: `/feed/${feedId}`,
        method: 'patch',
        requestData: {
          content: data.content,
          imageUrls: data.feedImage,
        },
      }),
    onSuccess: () => feedContentRefetch(),
  });

  const onSubmit = async (data: FeedType) => {
    try {
      for (let i = 0; i < wasteBucket.length; i += 1) {
        const splittedImageUrl = wasteBucket[i].split('/');
        const imageUrl = splittedImageUrl[splittedImageUrl.length - 1];
        deleteImage(imageUrl);
      }
      editFeed(data);
    } catch (error) {
      console.log(error, '------error------');
    }
    toggleEditMode(!editState);
  };

  const editCancel = async () => {
    try {
      for (let i = 0; i < newBucket.length; i += 1) {
        const splittedImageUrl = newBucket[i].split('/');
        const imageUrl = splittedImageUrl[splittedImageUrl.length - 1];
        deleteImage(imageUrl);
      }
    } catch (error) {
      console.log(error);
    }
    toggleEditMode(!editState);
  };

  // useEffect(() => {
  //   console.log('-----유즈 이펙트 실행------');
  //   updateImageUrls();
  // }, [urlBucket]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('writer')}>
        <WriterProfile writer={feedData.writer} />
      </div>
      <div className={cn('wrapper')}>
        <div className={cn('content')}>
          <div className={cn('addImage')}>
            <div className={cn('image-wrapper')}>
              <Controller
                control={control}
                name="feedImage"
                render={({ field: { onChange } }) => (
                  <input
                    className={cn('file-input')}
                    id="feedImage"
                    type="file"
                    multiple
                    onChange={(event) => {
                      const fileList = event.target.files
                        ? Array.from(event.target.files)
                        : [];
                      const currentImageValue = [...images, ...fileList];
                      setImages(currentImageValue);
                      updateUrlBucket(fileList);
                    }}
                  />
                )}
              />
              {watch('feedImage')?.length < 3 ? (
                <label htmlFor="feedImage" className={cn('file-label')}>
                  <div className={cn('image-icon-wrapper')}>
                    <AddImageIcon className={cn('image-icon')} />
                    <span className={cn('label-text')}>이미지 업로드</span>
                  </div>
                </label>
              ) : (
                ''
              )}
              {urlBucket && (
                <div className={cn('preview-box')}>
                  {urlBucket.map((item, index) => (
                    <div key={index} className={cn('preview-container')}>
                      <CloseIcon
                        className={cn('close')}
                        onClick={() => {
                          filterImage(index);
                        }}
                      />
                      <div className={cn('preview-wrapper')}>
                        <img
                          className={cn('file-preview')}
                          src={item}
                          alt="image_item"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <textarea
            className={cn('text')}
            rows={5}
            maxLength={300}
            placeholder="글을 작성해보세요"
            {...register('content', {
              required: '게시글을 작성해주세요',
            })}
          />
          {errors.content && (
            <span className={cn('error')}>{errors.content.message}</span>
          )}
          <span className={cn('limit')}>
            {watch('content') && watch('content').length}/300
          </span>
        </div>
      </div>
      <div className={cn('button')}>
        <DefaultButton buttonType="submit" color="primary-01" size="medium">
          등록
        </DefaultButton>
        <DefaultButton
          onClick={editCancel}
          buttonType="button"
          color="black-01"
          size="medium"
        >
          취소하기
        </DefaultButton>
      </div>
    </form>
  );
}
