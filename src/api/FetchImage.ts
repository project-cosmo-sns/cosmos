import fetchData from './fetchData';

// 프로미스를 반환하는 비동기 함수로 변경
export default async function FetchImage() {
  try {
    // fetchData 함수를 이용해 비동기적으로 데이터를 가져옴
    const data = await fetchData<{ uploadURL: string }>({
      param: 'profile/image/create',
      method: 'get', // 'get' 메소드는 기본값, 생략 가능
    });

    // 가져온 이미지 URL을 반환.
    return data.uploadURL;
  } catch (error) {
    console.error('이미지 fetching 실패 :', error);
    // 에러 발생 시 던져서 일단 처리
    throw error;
  }
}
