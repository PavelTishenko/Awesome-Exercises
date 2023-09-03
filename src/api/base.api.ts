import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';
import { Exercise, Response } from './types.api';

export const baseQueryURL = 'https://api.api-ninjas.com/v1/';
export const apiKey = 'nYzEe+s9A3kLxO5XffkIXA==sDt8FsXeqUCA8vzw';

type QueryFn = BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError
>;

const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryURL,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    headers.set('X-API-KEY', apiKey);
    return headers;
  },
}) as QueryFn;

const baseQueryWithInterceptor: QueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 502) {
    Alert.alert('Ooops', 'Please try later');
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  tagTypes: ['GET'],
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    getExercises: builder.query<Response[], Exercise>({
      query: arg => {
        const { name, type, muscle } = arg;

        return {
          url: 'exercises',
          params: { name, type, muscle },
        };
      },
    }),
  }),
});

export const { useGetExercisesQuery } = baseAPI;
