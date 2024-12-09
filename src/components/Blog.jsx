import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs";
import MDEditor from "@uiw/react-md-editor";
import Comments from "./Comments";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

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

  return (
    <div className="flex flex-col items-center px-2 py-6">
      <h2 className="font-bold text-3xl sm:text-5xl text-gray-900 my-6 text-center">
        {blog.title}
      </h2>
      <div className="w-full max-w-4xl px-4 mb-12" data-color-mode="light">
        <div className="wmde-markdown-var"> </div>
        <MDEditor.Markdown source={blog.content} />
      </div>
      <Comments blogId={id} comments={blog.comments} currentUser={user} />
    </div>
  );
};

export default Blog;
