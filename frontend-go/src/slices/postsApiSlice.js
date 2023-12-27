import { apiSlice } from "./apiSlice";
const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
      }),
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    getPostDetail: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useGetPostDetailQuery } = postsApiSlice;
