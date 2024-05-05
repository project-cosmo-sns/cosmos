import instance from './axios';

interface FetchDataOptions<T> {
  param: string;
  method?: 'get' | 'post' | 'patch' | 'delete';
  requestData?: T;
}

/**
 * @template T - 보낼 데이터의 유형
 * @param {string} param : 요청에 사용할 endpoint
 * @param {'get' | 'post' | 'put' | 'delete'} param : 요청에 사용할 HTTP 메소드(옵셔널). 기본값은 'get'
 * @param {function} requestData : 요청 본문에 전송할 데이터 (옵셔널). 'post' 및 'put' 메소드에만 해당
 */

export default async function fetchData<T>({
  param,
  method = 'get',
  requestData,
}: FetchDataOptions<T>): Promise<T> {
  if (requestData) {
    const response = await instance.request<T>({
      url: param,
      method,
      data: requestData,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  }

  const response = await instance.request<T>({
    url: param,
    method,
  });
  return response.data;
}
