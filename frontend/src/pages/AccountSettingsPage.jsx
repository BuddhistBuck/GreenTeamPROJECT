import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Divider from "@mui/material/Divider";
import "../css/account.css";
import stripeBadge from "../util/images/stripe-badge-grey.png";
import Box from "@mui/material/Box";
import Axios from "axios";
import { Button } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { baseUrl } from "../util/baseUrl";

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

  // Style variable for Modal components
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [firstNameInputChanged, setFirstNameInputChanged] = useState(false);
  const [lastNameInputChanged, setLastNameInputChanged] = useState(false);

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
      if (err) return;
    });
  }

  return (
    <Layout>
      <div className="account-container">
        <h2>Account Settings</h2>
        <Divider />
        <div className="account-content">
          <div className="account-block">
            <form>
              <label htmlFor="firstName">
                <strong style={{ color: "#303030" }}>First Name</strong>
                <div style={{ height: "10px" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "350px",
                  }}
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
                          "Must log out in order to see the reflected changes."
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
                <strong style={{ color: "#303030" }}>Last Name</strong>
                <div style={{ height: "10px" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "350px",
                  }}
                >
                  <input
                    type="text"
                    defaultValue={lastName}
                    onChange={(e) => {
                      setInputLastName(e.target.value);
                      setUpdateMessage(
                        "Must log out in order to see the reflected changes."
                      );
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
                          "Please log out in order to reflect the changes."
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
            </form>
            {<p style={{ color: "#00A8E8" }}>{updateMessage}</p>}
            <div className="account-option">
              {userSubscriptionStatus ? (
                <div>
                  <p>
                    Subscription Status:&nbsp;
                    <span style={{ color: "#003459" }}>Active</span>
                  </p>
                  <Button
                    style={{ backgroundColor: "#003459" }}
                    width="20%"
                    variant="contained"
                    onClick={handleOpenCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                  }}
                >
                  <p>
                    Subscription Status:&nbsp;
                    <span style={{ color: "#003459" }}>Inactive</span>
                  </p>
                  <Button
                    style={{ backgroundColor: "#003459" }}
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
            style={{ backgroundColor: "#003459" }}
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
            style={{ backgroundColor: "#003459" }}
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
            style={{ backgroundColor: "#003459" }}
            onClick={() => {
              handleCloseCancelSubscriptionMessage();
              setCounter(counter + 1);
              window.location.reload();
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
}
