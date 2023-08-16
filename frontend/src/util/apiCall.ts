import axios, { AxiosPromise } from "axios";

export function axiosInstance<T, R>(
  path: string,
  type: "GET" | "POST" | "PUT",
  body: T
): AxiosPromise<R> {
  const config = {
    url: import.meta.env.VITE_API_URL + path,
    method: type,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}
