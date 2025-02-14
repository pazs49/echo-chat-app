import Login from "../pages/Login";

import LoadingScreen from "@/components/LoadingScreen";

import useAuthentication from "../hooks/useAuthentication";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { checkAuth } = useAuthentication();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleCheckAuth = async () => {
    const authStatus = await checkAuth();

    if (!authStatus) navigate("/login");
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return isAuthenticated ? children : null;
};
export default ProtectedRoute;
