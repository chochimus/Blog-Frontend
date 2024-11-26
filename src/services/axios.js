import axios from "axios";
import { postLogout } from "./logout";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        if (data.error === "TOKEN_EXPIRED") {
          console.log("Session expired. Logging out...");
          await postLogout();
        } else {
          console.log("Some other token error, please log in again");
          await postLogout();
        }
      }
      return Promise.reject(error);
    }
  }
);

export default axios;
