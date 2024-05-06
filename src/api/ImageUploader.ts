import { useMutation } from 'react-query';
import fetchData from './fetchData';

const uploadImage = async (fileData) => {
  const { uploadURL, file } = fileData;
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetchData({
    param: uploadURL, // 업로드 URL
    method: 'patch', // patch 요청
    requestData: formData, // 요청 본문에 전송할 데이터
  });

  return response; // 이미지url이 오겟징...온다고햇다.
};

export default function ImageUploader({ uploadURL }) {
  const { mutate: uploadImage, isLoading, error } = useMutation(uploadProfileImage, {
    onSuccess: () => {
      alert('프로필 이미지가 성공적으로 업로드되었습니다!');
    },
    onError: (error) => {
      console.log(`오류 발생: ${error.message}`);
    },
  });

  const handleFileChange = (event : ) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage({ uploadURL, file });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isLoading} />
      {isLoading && <div>업로딩 중...</div>}
      {error && <div>오류: {error.message}</div>}
    </div>
  );
}
