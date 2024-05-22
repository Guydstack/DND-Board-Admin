import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { setIsAuth, setOnLoad } = useContext(AuthContext);

  const queryFn = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }
    return await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users/managers/auth`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true,
    });
  };

  const { isSuccess, isError } = useQuery({
    queryKey: ['auth'],
    queryFn,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuth(true);
    } else if (isError) {
      setIsAuth(false);
    }
    setOnLoad(true);
  }, [isSuccess, isError]);

  return [isSuccess];
}

export default useAuth;
