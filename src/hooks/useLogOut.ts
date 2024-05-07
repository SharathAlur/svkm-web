import { useAuthContext } from "../contexts/AuthContextProvider";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { fireAuth } from "../firebase/config";
import { notification } from "antd";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const [api, contextHolder] = notification.useNotification();

  const logOut = async () => {
    try {
      await signOut(fireAuth);

      dispatch({ type: "LOGOUT" });
    } catch (e) {
      api.error({
        message: "Could not sign out!",
      });
    } finally {
      api.success({
        message: "Signed our!",
      });
    }
  };

  return { logOut, contextHolder };
};
