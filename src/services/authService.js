const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = () => {
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
      console.log(data);
    } catch (error) {
      console.log(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  };
  // login("percyavon@example.com", "hello123");
};
export default authService;
