'use client'
import fetcher from "@/lib/fetcher";
import { useState } from "react";
import { Credentials } from "../schema";

function useAuth() {
  const [login, setLogin] = useState(false);

  const loginHandler = async (credentials: Credentials) => {
    const result = await fetcher.POST('auth/login', credentials);

    if (result.status !== 200) {
      return result
    }
    if (result) {
      setLogin(true);
    }

    return result
  };

  const signupHandler = async (credentials: Credentials) => {
    const result = await fetcher.POST('auth/sign-up', credentials);

    if (result.status !== 200) {
      return

    }
    if (result) {
      setLogin(true);
    }

    return result;
  }

  const logoutHandler = () => {
    setLogin(false);
  }

  const isLoggedIn = () => {
    return login;
  }

  return {
    loggedin: login,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler
  };
}

export default useAuth;
