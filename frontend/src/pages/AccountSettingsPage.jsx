import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Divider from "@mui/material/Divider";
import "../css/account.css";
import stripeBadge from "../util/images/stripe-badge-grey.png";
import Box from "@mui/material/Box";
import Axios from "axios";
import { Button, FormControlLabel, FormGroup } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { baseUrl } from "../util/baseUrl";
import { DarkThemeSwitch } from "../components/DarkThemeSwitch";

/**
 * @author Chris P
 * @component Account Settings Page
 **/
export default function AccountSettingsPage() {
  let email = JSON.parse(localStorage.getItem("currentUser")).email;
  const [firstName, setFirstName] = useState(
    JSON.parse(localStorage.getItem("currentUser")).firstName
  );
  const [lastName, setLastName] = useState(
    JSON.parse(localStorage.getItem("currentUser")).lastName
  );

  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [firstNameModified, setFirstNameModified] = useState(false);
  const [lastNameModified, setLastNameModified] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [openCancelSubscription, setOpenCancelSubscription] = useState(false);
  const handleOpenCancelSubscription = () => {
    setOpenCancelSubscription(true);
    setCounter(counter + 1);
  };
  const handleCloseCancelSubscription = () => setOpenCancelSubscription(false);

  const [openCancelSubscriptionMessage, setOpenCancelSubscriptionMessage] =
    useState(false);
  const handleOpenCancelSubscriptionMessage = () => {
    setOpenCancelSubscriptionMessage(true);
  };
  const handleCloseCancelSubscriptionMessage = () =>
    setOpenCancelSubscriptionMessage(false);

  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    Axios.post(`${baseUrl}/get-user-by-email`, {
      email: email,
    }).then((res) => {
      setUserSubscriptionStatus(res.data.docs[0].subscriptionStatus);
      setFirstName(res.data.docs[0].firstName);
      setLastName(res.data.docs[0].lastName);
    });

    setInterval(() => setUpdateMessage(""), 16000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const [firstNameInputChanged, setFirstNameInputChanged] = useState(false);
  const [lastNameInputChanged, setLastNameInputChanged] = useState(false);

  const [darkTheme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("currentUser")).darkTheme
  );
  function handleChangedarkTheme(event) {
    setDarkTheme(event.target.checked);
    let param = {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      darkTheme: String(event.target.checked),
    };
    updateUserInfo(param, false);
    let updatedToken = JSON.parse(localStorage.getItem("currentUser"));
    updatedToken.darkTheme = event.target.checked;
    localStorage.setItem("currentUser", JSON.stringify(updatedToken));
  }

  // Get token on update to load dark theme
  useEffect(() => {
    let darkThemeToken = JSON.parse(
      localStorage.getItem("currentUser")
    ).darkTheme;

    if (darkThemeToken) {
      document.body.style.backgroundColor = "#454545";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [darkTheme]);

  // Default style for Modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: darkTheme ? "#454545" : "background.paper",
    color: darkTheme ? "#ffffff" : "000000",
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  // Update visibility of button components based on inputs
  useEffect(() => {
    if (firstName !== inputFirstName) setFirstNameModified(true);
    else {
      setFirstNameModified(false);
    }
    if (lastName !== inputLastName) setLastNameModified(true);
    else {
      setLastNameModified(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFirstName, inputLastName]);

  // Send POST request to server to update user info
  function updateUserInfo(param, redirectToStripe) {
    Axios.post(`${baseUrl}/user-update`, param).then((res, err) => {
      if (redirectToStripe)
        window.location.href = "https://buy.stripe.com/fZe4gt1008aDciQcMN";
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  return (
    <Layout>
      <div
        className={darkTheme ? "account-container-dark" : "account-container"}
      >
        <h2 style={darkTheme ? { color: "white" } : { color: "black" }}>
          Account Settings
        </h2>
        <div className={darkTheme ? "account-block-dark" : "account-block"}>
          <a
            href="/"
            style={
              darkTheme
                ? { color: "#00A8e8", marginTop: "-15px" }
                : { color: "#003459", marginTop: "-15px" }
            }
          >
            Back to Practice Page
          </a>
          <div style={{ height: "20px" }} />
          <form>
            <label htmlFor="firstName">
              <strong
                style={darkTheme ? { color: "white" } : { color: "black" }}
              >
                First Name
              </strong>
              <div style={{ height: "10px" }} />
              <div
                className="account-field-container"
              >
                <input
                  type="text"
                  defaultValue={firstName}
                  onChange={(e) => {
                    setInputFirstName(e.target.value);
                    setFirstNameInputChanged(true);
                  }}
                />
                {firstNameModified && firstNameInputChanged ? (
                  <Button
                    style={{ backgroundColor: "#003459" }}
                    variant="contained"
                    onClick={() => {
                      let param = {
                        email: JSON.parse(localStorage.getItem("currentUser"))
                          .email,
                        firstName: inputFirstName,
                      };
                      updateUserInfo(param, false);
                      setUpdateMessage(
                        "Log in again in order to see the reflected changes."
                      );
                      setCounter(counter + 1);
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </label>
            <div style={{ height: "20px" }} />
            <label htmlFor="lastName">
              <strong
                style={darkTheme ? { color: "white" } : { color: "black" }}
              >
                Last Name
              </strong>
              <div style={{ height: "10px" }} />
              <div className="account-field-container"
              >
                <input
                  type="text"
                  defaultValue={lastName}
                  onChange={(e) => {
                    setInputLastName(e.target.value);
                    setLastNameInputChanged(true);
                  }}
                />
                {lastNameModified && lastNameInputChanged ? (
                  <Button
                    style={{ backgroundColor: "#003459" }}
                    variant="contained"
                    onClick={() => {
                      let param = {
                        email: JSON.parse(localStorage.getItem("currentUser"))
                          .email,
                        lastName: inputLastName,
                      };
                      updateUserInfo(param, false);
                      setUpdateMessage(
                        "Log in again in order to see the reflected changes."
                      );
                      setCounter(counter + 1);
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </label>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <strong
                style={darkTheme ? { color: "white" } : { color: "black" }}
              >
                Dark Theme
              </strong>
              <DarkThemeSwitch
                sx={{ m: 1 }}
                checked={darkTheme}
                onChange={handleChangedarkTheme}
              />
            </div>
            {<p style={{ color: "#00A8E8" }}>{updateMessage}</p>}
          </form>
          <div className="account-option">
            {userSubscriptionStatus ? (
              <div>
                <p style={darkTheme ? { color: "white" } : { color: "black" }}>
                  Subscription Status:&nbsp;
                  <span
                    style={
                      darkTheme ? { color: "#00a8e8" } : { color: "#003459" }
                    }
                  >
                    Active
                  </span>
                </p>
                <Button
                  style={
                    darkTheme
                      ? { backgroundColor: "#4f7fa1" }
                      : { backgroundColor: "#008B9E" }
                  }
                  width="20%"
                  variant="contained"
                  onClick={handleOpenCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>
            ) : (
              <div
                className="subscription-block"
              >
                <p style={darkTheme ? { color: "white" } : { color: "black" }}>
                  Subscription Status:&nbsp;
                  <span
                    style={
                      darkTheme ? { color: "#00a8e8" } : { color: "#003459" }
                    }
                  >
                    Inactive
                  </span>
                </p>
                <Button
                  style={
                    darkTheme
                      ? { backgroundColor: "#4f7fa1" }
                      : { backgroundColor: "#008B9E" }
                  }
                  width="20%"
                  variant="contained"
                  onClick={() => {
                    let param = {
                      email: JSON.parse(localStorage.getItem("currentUser"))
                        .email,
                      subscriptionStatus: true,
                    };
                    updateUserInfo(param, true);
                  }}
                >
                  Purchase Subscription
                </Button>
                <br />
                <div style={{ height: "20px" }} />

                <img src={stripeBadge} alt="" width="400px" />
              </div>
            )}
          </div>
        </div>
        <div style={{ height: "50px" }} />
      </div>
      <Modal
        open={openCancelSubscription}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to cancel your subscription?
          </Typography>
          <br />
          <Button
            variant="contained"
            style={
              darkTheme
                ? { backgroundColor: "#4f7fa1" }
                : { backgroundColor: "#008B9E" }
            }
            onClick={() => {
              let param = {
                email: JSON.parse(localStorage.getItem("currentUser")).email,
                subscriptionStatus: "false",
              };
              updateUserInfo(param, false);
              handleCloseCancelSubscription();
              handleOpenCancelSubscriptionMessage();
            }}
          >
            Yes
          </Button>
          &nbsp;
          <Button
            variant="contained"
            style={
              darkTheme
                ? { backgroundColor: "#4f7fa1" }
                : { backgroundColor: "#008B9E" }
            }
            onClick={handleCloseCancelSubscription}
          >
            No
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openCancelSubscriptionMessage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your subscription was successfully cancelled.
          </Typography>
          <div style={{ height: "10px" }} />
          <Button
            variant="contained"
            style={
              darkTheme
                ? { backgroundColor: "#4f7fa1" }
                : { backgroundColor: "#008B9E" }
            }
            onClick={() => {
              handleCloseCancelSubscriptionMessage();
              setCounter(counter + 1);
              // window.location.reload();
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
}
