import { AxiosResponse } from 'axios';
import instance from './axios';

interface FetchDataOptions<T> {
  param: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  requestData?: T;
}

export default async function fetchData<T>({
  param,
  method = 'get',
  requestData,
}: FetchDataOptions<T>): Promise<T> {
  const url = param;

  let response: AxiosResponse<T>;

  if (requestData) {
    response = await instance.request<T>({
      url,
      method,
      data: requestData,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    response = await instance.request<T>({
      url,
      method,
    });
  }

  return response.data;
}
