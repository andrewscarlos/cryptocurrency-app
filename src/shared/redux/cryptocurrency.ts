import { IResult } from "../types/CryptoAsset";
import { IResultCryptoCurrencyDetails } from "../types/CryptoCurrency.details";
import { apiSlice } from "./api";

interface IParams {
  limit: number;
  sort?: string;
}
function getCryptoAssets() {
  return "";
}
function getCryptoCurrency({ id }: { id: string }) {
  return id;
}

function getByPrice() {
  return "/getByPrice";
}

function parseQueryParams(params: IParams) {
  const queryParams = new URLSearchParams();

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params.sort) {
    queryParams.append("sort", params.sort.toString());
  }

  return queryParams.toString();
}

export const cryptoAssetSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCryptoAssets: query<IResult, void>({
      query: getCryptoAssets,
      providesTags: ["CryptoAsset"],
    }),

    getCryptoAssetsById: query<IResultCryptoCurrencyDetails, { id: string }>({
      query: getCryptoCurrency,
      providesTags: ["CryptoAsset"],
    }),

    getByPrice: query<IResult, void>({
      query: getByPrice,
      providesTags: ["CryptoAsset"],
    }),
  }),
});

export const {
  useGetCryptoAssetsQuery,
  useGetCryptoAssetsByIdQuery,
  useGetByPriceQuery,
} = cryptoAssetSlice;
