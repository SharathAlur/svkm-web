import React, { useReducer, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../firebase/config";

interface userState {
  user: any;
  authIsReady: boolean;
}

interface IAuthContext extends userState {
  dispatch: (action: any) => void;
}
const initialState = {
  user: null,
  authIsReady: false,
};
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthReducer = (state, action): userState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsubscribe();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
