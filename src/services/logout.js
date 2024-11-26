import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/logout";

export const postLogout = async () => {
  const response = await axios.post(baseUrl, {});
  return response.data;
};
