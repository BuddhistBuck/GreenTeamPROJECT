import React, { useReducer, createContext } from "react";
import { initialState, AuthReducer } from "./reducer";

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

/**
 * @component The component for the Authentication State. Allows the use of state management of
 * user accounts throughout the app.
 */
export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

/**
 * @component The component for the Authentication Dispatch. Allows dispatch functions
 * and actions to be used throughout the application.
 */
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

/**
 * @component The component for the Authentication Priovider. Stores the user information
 * to be used throughout the applicaiton.
 */
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
