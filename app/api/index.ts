import { useQuery } from "@tanstack/react-query";
import { AppUseQueryOptions, TResponseError, TResponseSuccess } from "./api.type";
import axios, { AxiosRequestConfig } from "axios";

export async function get<Res>(path: string, config?: AxiosRequestConfig): Promise<Res> {
  return (await axios
    .get(path, config)
    .then((response: TResponseSuccess<Res>) => response.data ?? "")
    .catch((err) => Promise.reject(err))) as Promise<Res>;
}

export function withQuery<Req = unknown, Res = unknown, ResError = never>(
  queryKey: string,
  fetcher: (rest: Req) => Promise<Res>
) {
  function query<TData = Res>(
    rest: Req,
    options?: AppUseQueryOptions<Res, TData, ResError> & {
      onSuccess?: (data: Res) => void;
      onError?: (err: TResponseError<ResError>) => void;
    }
  ) {
    return useQuery({
      queryKey: [`QUERY_${queryKey}`, rest],
      retry: false,
      queryFn: async () => {
        const fetcherResponse = await fetcher(rest)
          .then((res: Res) => {
            options?.onSuccess?.(res);
            return res;
          })
          .catch((err: TResponseError<ResError>) => {
            options?.onError?.(err);
            throw err;
          });

        return fetcherResponse;
      },
      ...options,
    });
  }

  return Object.assign(fetcher, { query });
}
