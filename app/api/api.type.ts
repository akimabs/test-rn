import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type TResponse<D> = {
  data: D;
  success: boolean;
};

export type TResponseSuccess<D> = AxiosResponse<TResponse<D>>;
export type TResponseError<D = unknown> = TResponse<D>;

export type AppUseQueryOptions<Res, TData = Res, ResError = TResponseError> = Partial<UseQueryOptions<Res, ResError, TData>>;
