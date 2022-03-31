import Axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    Axios.post("http://localhost:4000/admin-login", loginPayload).then(
      (res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        return res.data;
      }
    );
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
