import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, postComment } from "../services/blogs";
import { useState } from "react";

const Comments = ({ blogId, comments, currentUser }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const content = { content: comment };
    postCommentMutation.mutate({ blogId, content });
    setComment("");
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate({ blogId, commentId });
    }
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto p-4 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
      <ul className="space-y-4 mb-6">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="text-gray-800">{comment.content}</div>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              <span>- {comment.user.username}</span>
              {comment.user.username === currentUser && (
                <button
                  type="button"
                  onClick={() => handleCommentDelete(comment.id)}
                  disabled={deleteCommentMutation.isLoading}
                  className={`ml-4 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
        <textarea
          name="comment"
          placeholder="write a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows="3"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="self-end px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
