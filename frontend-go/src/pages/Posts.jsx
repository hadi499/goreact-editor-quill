import React from "react";
import { useGetPostsQuery } from "../slices/postsApiSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Posts = () => {
  const { data, isLoading } = useGetPostsQuery();
  return (
    <div className="w-[600px] mx-auto mt-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data.posts.map((post) => (
            <div key={post.id} className="mb-5 border border-blue-500 p-3">
              <div className="text-xl font-semibold hover:text-blue-500">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
