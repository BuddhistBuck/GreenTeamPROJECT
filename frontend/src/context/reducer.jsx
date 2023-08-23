// User information variable
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

// Admin information variable
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

// Intial state of user information
export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

/**
 * @component Reducer component that takes the current state and action 
 * in order to return a new state.
 */
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_CREATE_ACCOUNT":
      return {
        ...initialState,
        loading: true,
      };
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: true,
      };
    case "CREATE_ACCOUNT_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
