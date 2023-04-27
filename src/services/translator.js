import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const translatorApi = createApi({
  reducerPath: "translatorApi",
  baseQuery: fetchBaseQuery({
    method: "POST",
    baseUrl: "https://translo.p.rapidapi.com/api/v3/translate",

    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", "translo.p.rapidapi.com");

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTranslatedArticle: builder.query({
      query: (body) => ({
        body: body.body,
      }),
    }),
  }),
});

export const { useLazyGetTranslatedArticleQuery } = translatorApi;
