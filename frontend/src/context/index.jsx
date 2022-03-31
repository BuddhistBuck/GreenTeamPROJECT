import { loginUser, logoutUser, loginAdmin, logoutAdmin } from "./actions";
import { AuthProvider, useAuthDispatch, useAuthState } from "./context";

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  loginUser,
  logoutUser,
  loginAdmin,
  logoutAdmin,
};
