import Axios from "axios";
import { baseUrl } from "../util/baseUrl";

/**
 * @component Log In functionality (user). Dispatches an
 * log in action and sends a POST request to server with payload
 * from the Log In form.
 */
export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    Axios.post(`${baseUrl}/user-login`, loginPayload).then((res) => {
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        localStorage.removeItem("currentAdmin");
        window.location.href = "/practice";
      }
    });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

/**
 * @component Log In functionality (admin). Dispatches a
 * log in action and sends a POST request to server with payload
 * from the Log In form.
 */
export async function loginAdmin(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    Axios.post(`${baseUrl}/admin-login`, loginPayload).then((res) => {
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentAdmin", JSON.stringify(res.data));
        localStorage.removeItem("currentUser");
        window.location.href = "/admin/documentation";
      }
    });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

/**
 * @component Sign Up functionality (admin). Dispatches an
 * account creation action and sends a POST request to server with payload
 * from the Sign Up form.
 */
export async function createAccountUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_CREATE_ACCOUNT" });
    Axios.post(`${baseUrl}/user-create`, loginPayload).then((res) => {
      dispatch({ type: "CREATE_ACCOUNT_SUCCESS", payload: res.data });
      return res.data;
    });
  } catch (error) {
    dispatch({ type: "CREATE_ACCOUNT_ERROR", error: error });
  }
}

/**
 * @component Log In functionality (user). Dispatches a
 * log out action and deletes all tokens from local storage.
 */
export async function logoutUser(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentAdmin");
  window.location.reload();
}

/**
 * @component Log In functionality (admin). Dispatches a
 * log out action and deletes all tokens from local storage.
 */
export async function logoutAdmin(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentAdmin");
  window.location.reload();
}
