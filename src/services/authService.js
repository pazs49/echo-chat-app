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

        console.log(localStorage.getItem("auth"));
      }
      return data;
    } catch (error) {
      console.log(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  },

  checkAuth: async (auth) => {
    try {
      const data = await axios.get(`${API_BASE_URL}/users`, {
        headers: { ...auth, "Content-Type": "application/json" },
      });
      console.log("Authentication:", data);
      return data;
    } catch (error) {
      console.log("Authentication:", error);
    }
  },

  // login("percyavon@example.com", "hello123");
};
export default authService;
