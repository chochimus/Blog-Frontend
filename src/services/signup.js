import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/users";

export const postSignup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
