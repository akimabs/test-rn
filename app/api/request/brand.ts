import { get, withQuery } from "..";
import { BrandAPIType } from "../type/brand.type";

// for this moment, think this use dotenv(for react native) and improve the native side for better security
const BASE_URL = "https://catalog-api4.sociolla.com/v3";

export const getBrandsImage = withQuery("/brands", (params: BrandAPIType.BrandImage.Request) =>
  get<BrandAPIType.BrandImage.Response>("/brands", { baseURL: BASE_URL, params })
);

export const getBrandsLetter = withQuery("/brands/letters", (params: BrandAPIType.BrandLetter.Request) =>
  get<BrandAPIType.BrandLetter.Response>("/brands/letters", { baseURL: BASE_URL, params })
);
