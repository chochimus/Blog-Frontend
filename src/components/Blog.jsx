import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs";
import MDEditor from "@uiw/react-md-editor";
import Comments from "./Comments";

const Blog = ({ user }) => {
  const { id } = useParams();

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-2 py-6">
      <h2 className="font-bold text-5xl text-gray-900 mb-6">{blog.title}</h2>
      <MDEditor.Markdown source={blog.content} />
      <Comments blogId={id} comments={blog.comments} currentUser={user} />
    </div>
  );
};

export default Blog;
