import { useState } from "react";
import authService from "../services/authService";

const useAuthentication = () => {
  const [auth, setAuth] = useState(null);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data) setAuth(data);
  };

  return { auth, login };
};

export default useAuthentication;
