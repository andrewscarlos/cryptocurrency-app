import { IResult } from "../types/CryptoAsset";
import { IResultCryptoCurrencyDetails } from "../types/CryptoCurrency.details";
import { apiSlice } from "./api";

function getCryptoAssets() {
  return "";
}
function getCryptoCurrency({ id }: { id: string }) {
  return id;
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
  }),
});

export const { useGetCryptoAssetsQuery, useGetCryptoAssetsByIdQuery } =
  cryptoAssetSlice;
