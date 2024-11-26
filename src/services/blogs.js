import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/blogs";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const postComment = async ({ blogId, content }) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, content);
  return response.data;
};

export const deleteComment = async ({ blogId, commentId }) => {
  const response = await axios.delete(
    `${baseUrl}/${blogId}/comments/${commentId}`
  );
  return response.data;
};
