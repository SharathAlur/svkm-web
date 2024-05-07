import { useAuthContext } from "../contexts/AuthContextProvider";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase/config";

export const useLogIn = () => {
  const { dispatch } = useAuthContext();

  const logIn = async (email, password, onComplete) => {
    try {
      const res = await signInWithEmailAndPassword(fireAuth, email, password);
      console.log(res);

      dispatch({ type: "LOGIN", payload: res.user });
    } catch (error) {
      console.log(error);
    } finally {
      onComplete && onComplete();
    }
  };

  return { logIn };
};
