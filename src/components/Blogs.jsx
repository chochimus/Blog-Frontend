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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div>
      <ul>
        {visibleBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
        {visibleCount < blogs.length && (
          <button onClick={() => setVisibleCount((prev) => prev + 10)}>
            Show More
          </button>
        )}
      </ul>
    </div>
  );
};

export default Blogs;
