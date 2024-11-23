import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs";
import Comments from "./Comments";

const Blog = () => {
  const { id } = useParams();

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.content}</div>
      <Comments blogId={id} comments={blog.comments} />
    </div>
  );
};

export default Blog;
