// import { useState } from 'react';
// import classNames from 'classnames/bind';
// import Image from 'next/image';
// import { Inputs } from '@/components/Feed/CreateFeed/type';
// import { useForm, Controller } from 'react-hook-form';
// import styles from './EditFeed.module.scss';

// interface EditFeedTypes {
//   profileImage: string;
// }

// export default function EditFeed({ profileImage }: EditFeedTypes) {
//   const [images, setImages] = useState<Blob[]>([]);
//   const cn = classNames.bind(styles);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     control,
//     formState: { errors },
//     watch,
//   } = useForm<Inputs>();
//   return (
//     <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
//       <div className={cn('wrapper')}>
//         <Image
//           className={cn('profile-image')}
//           src={profileImage || '/images/profile.svg'}
//           alt="profile_image"
//           width={40}
//           height={40}
//           onClick={() => console.log('프로필모달 열기')}
//         />
//         <div className={cn('content')}>
//           <textarea
//             className={cn('text')}
//             rows={5}
//             maxLength={300}
//             placeholder="글을 작성해보세요"
//             {...register('content', {
//               required: '게시글을 작성해주세요',
//             })}
//           />
//           {errors.content && (
//             <span className={cn('error')}>{errors.content.message}</span>
//           )}
//           <span className={cn('limit')}>
//             {watch('content') && watch('content').length}/300
//           </span>
//           <div className={cn('addImage')}>
//             <div className={cn('image-wrapper')}>
//               <Controller
//                 control={control}
//                 name="feedImage"
//                 render={({ field: { onChange } }) => (
//                   <input
//                     className={cn('file-input')}
//                     id="feedImage"
//                     type="file"
//                     multiple
//                     onChange={(event) => {
//                       const fileList = event.target.files
//                         ? Array.from(event.target.files)
//                         : [];
//                       const currentImageValue = [...images, ...fileList];
//                       console.log([...fileList], '-----파일리스트----');
//                       setImages(currentImageValue);
//                       updateUrlBucket(fileList);
//                     }}
//                   />
//                 )}
//               />
//               <label htmlFor="feedImage" className={cn('file-label')}>
//                 <span className={cn('label-text')}>이미지 업로드</span>
//               </label>
//               {imagePreview && (
//                 <div className={cn('preview-box')}>
//                   {imagePreview.map((item, index) => (
//                     <div key={index} className={cn('preview-container')}>
//                       <CloseIcon
//                         className={cn('close')}
//                         onClick={() => {
//                           filterImage(index);
//                         }}
//                       />
//                       <div className={cn('preview-wrapper')}>
//                         <img
//                           className={cn('file-preview')}
//                           src={item}
//                           alt="image_item"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={cn('button')}>
//         <DefaultButton
//           buttonType="submit"
//           color="primary-01"
//           onClick={() => console.log('')}
//           size="medium"
//         >
//           등록
//         </DefaultButton>
//       </div>
//     </form>
//   );
// }
