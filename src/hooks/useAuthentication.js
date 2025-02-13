import useAuthStore from "../store/authStore";

import authService from "../services/authService";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthentication = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data) {
      setAuth(data);
      navigate("/");
    }
  };

  const register = async (email, password, password_confirmation) => {
    const data = await authService.register(
      email,
      password,
      password_confirmation
    );
    if (data) {
      setAuth(data);
    }
  };

  const logout = () => {
    if (localStorage.getItem("auth")) localStorage.removeItem("auth");
  };

  const checkAuth = async () => {
    if (!localStorage.getItem("auth")) return false;
    const auth = JSON.parse(localStorage.getItem("auth"));
    const data = await authService.checkAuth(auth);
    return data;
  };

  const getAuth = () => {
    if (localStorage.getItem("auth")) {
      return JSON.parse(localStorage.getItem("auth"));
    }
  };
  return { login, checkAuth, logout, getAuth, register };
};

export default useAuthentication;
