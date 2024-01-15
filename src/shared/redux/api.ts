import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "http://localhost:3000/api/cryptocurrency";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["CryptoAsset"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: { Accept: "application/json" },
  }),
});


