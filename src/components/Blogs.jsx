import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAll } from "../services/blogs";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error}</p>
      </div>
    );

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto my-6 sm:p-6">
      <h1 className="font-bold text-3xl text-gray-800 pb-6 border-b border-gray-300">
        Blogs
      </h1>
      <div className="flex flex-col">
        <ul>
          {visibleBlogs.map((blog) => (
            <li
              key={blog.id}
              className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition duration-150"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="block pl-4 py-6 font-semibold text-xl sm:text-2xl text-gray-600 hover:text-gray-800 transition duration-150"
              >
                {blog.title}
              </Link>
              <p className="text-xs sm:text-base text-gray-400 sm:mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
        {visibleCount < blogs.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="mt-6 px-4 py-2 text-blue-500 font-medium hover:text-blue-600 transition duration-150"
          >
            Show More...
          </button>
        )}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Blogs;
