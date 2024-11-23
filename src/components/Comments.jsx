import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../services/blogs";
import { useState } from "react";

const Comments = ({ blogId, comments }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postCommentMutation.mutate({ blogId, comment });
    setComment("");
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          name="comment"
          placeholder="write a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit" disabled={!comment.trim()}>
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
