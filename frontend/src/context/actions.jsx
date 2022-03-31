import Axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    Axios.post("http://localhost:4000/user-login", loginPayload).then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.href = "/practice";
      return res.data;
    });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function loginAdmin(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    Axios.post("http://localhost:4000/admin-login", loginPayload).then(
      (res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("currentAdmin", JSON.stringify(res.data));
        window.location.href = "/admin/documentation";
        return res.data;
      }
    );
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logoutUser(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export async function logoutAdmin(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentAdmin");
  localStorage.removeItem("token");
}
