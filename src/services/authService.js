import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  login: async (email, password) => {
    try {
      const data = await axios.post(
        `${API_BASE_URL}/auth/sign_in`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            "access-token": data.headers["access-token"],
            client: data.headers.client,
            expiry: data.headers.expiry,
            uid: data.headers.uid,
          })
        );
      }
      return data;
    } catch (error) {
      return error;
    }
  },

  register: async (email, password, password_confirmation) => {
    try {
      const data = await axios.post(
        `${API_BASE_URL}/auth/`,
        {
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return {
        error: true,
        message: error?.response?.data?.errors?.full_messages,
      };
    }
  },

  checkAuth: async (auth) => {
    try {
      const data = await axios.get(`${API_BASE_URL}/users`, {
        headers: { ...auth, "Content-Type": "application/json" },
      });
      // console.log("Authentication:", data);
      return data;
    } catch (error) {
      // console.log("Authentication:", error);
    }
  },
};
export default authService;
