import axios from "axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/blogs";

axios.defaults.withCredentials = true;

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const postComment = async ({ blogId, comment }) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment);
  return response.data;
};
