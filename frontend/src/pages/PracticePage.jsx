/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-func-assign */

// Import packages and UI components
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import PracticeInterface from "../components/PracticeInterface";
import { baseUrl } from "../util/baseUrl";
import Axios from "axios";
import "../css/practice.css";

// Practice page style components and utilities
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { MetronomeClearIcon, MetronomeSolidIcon } from "../util/metronomeIcons";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import themeDefault from "../util/themeDefault";
import themeUserList from "../util/themeUserList";
import { marks } from "../util/sliderValues";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import themeListButtons from "../util/themeListButtons";
import themeListButtonsDark from "../util/themeListButtonsDark";
import themeSliderDark from "../util/themeSliderDark";
import themeSlider from "../util/themeSlider";
import themeUserButtons from "../util/themeUserButtons";

/**
 * @component Home Page and Practice Session
 **/
export default function PraticePage() {
  // 'Select List' dropdown utilities
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [listItems, setListItems] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [metronomeIcon, setMetronomeIcon] = useState(true);
  const [wpm, setWpm] = useState(200);
  const [begin, setBegin] = useState(false);
  const [view, setView] = useState("");
  const [refreshCount, setRefreshCount] = useState();
  const [counter, setCounter] = useState(0);

  // Check subscription status
  const [subscriptionStatus, setSubscriptionStatus] = useState();

  useEffect(() => {
    Axios.post(`${baseUrl}/get-user-by-email`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
    }).then((res) => {
      setSubscriptionStatus(res.data.docs[0].subscriptionStatus);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get default lists
  const [lists, setLists] = useState([]);

  useEffect(() => {
    Axios.get(`${baseUrl}/admin-get-lists`).then((res) => {
      let data = res.data.lists;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].name);
      }
      setLists(arr);
    });
    setRefreshCount(refreshCount + 1);
  }, [baseUrl, refreshCount]);

  // Get user lists
  useEffect(() => {
    Axios.post(`${baseUrl}/user-get-lists`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
    }).then((res) => {
      let arr = [];
      for (let i = 0; i < res.data.lists.length; i++) {
        arr.push(res.data.lists[i].name);
      }
      setUserLists(arr);
    });
  }, [counter]);

  // Create / Edit Lists Modals
  const [openCreateList, setOpenCreateList] = useState(false);
  const handleOpenCreateList = () => setOpenCreateList(true);
  const handleCloseCreateList = () => setOpenCreateList(false);

  const [openAddTerms, setOpenAddTerms] = useState(false);
  const handleOpenAddTerms = () => setOpenAddTerms(true);
  const handleCloseAddTerms = () => setOpenAddTerms(false);

  const [openDeleteTerms, setOpenDeleteTerms] = useState(false);
  const handleOpenDeleteTerms = () => setOpenDeleteTerms(true);
  const handleCloseDeleteTerms = () => {
    setOpenDeleteTerms(false);
    setListToDeleteTerms("");
    setListToDeleteTermsArray([]);
    setChecked([]);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState("");
  const [listToEdit, setListToEdit] = useState("");
  const [listToDeleteTerms, setListToDeleteTerms] = useState([]);
  const [listToDeleteTermsArray, setListToDeleteTermsArray] = useState([]);
  const [listSelected, setListSelected] = useState("");
  const [previousListTerms, setPreviousListTerms] = useState([]);

  const [newList, setNewList] = useState("");

  const [openConfirmDeleteList, setOpenConfirmDeleteList] = useState(false);
  const handleOpenConfirmDeleteList = () => {
    setOpenConfirmDeleteList(true);
    handleCloseAddTerms();
  };
  const handleCloseConfirmDeleteList = () => setOpenConfirmDeleteList(false);

  const deleteLists = (obj) => {
    const requestOne = Axios.post(`${baseUrl}/user-delete-list-object`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      name: obj,
    }).then((res) => {});

    const requestTwo = Axios.post(`${baseUrl}/user-delete-list`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      listTitle: obj,
    }).then((res) => {});

    Axios.all([requestOne, requestTwo])
      .then(
        Axios.spread((...res) => {
          // eslint-disable-next-line no-unused-vars
          let responseOne = res[0];
          // eslint-disable-next-line no-unused-vars
          let responseTwo = res[1];
        })
      )
      .catch((err) => {
        console.log(err);
      });
    setRefreshCount(refreshCount + 1);
  };

  // DELETE LIST TERMS

  const loadListToDeleteTerms = (list) => {
    Axios.post(`${baseUrl}/user-get-list-by-title`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      listTitle: list,
    }).then((res) => {
      setListToDeleteTerms(res.data.docs[0].listTitle);
      setListToDeleteTermsArray(res.data.docs[0].listTerms);
    });
  };

  const deleteListTerms = (title, obj) => {
    let terms = String(obj).split(",");

    console.log(terms);
    for (let i = 0; i < obj.length; i++) {
      Axios.post(`${baseUrl}/user-delete-list-term`, {
        email: JSON.parse(localStorage.getItem("currentUser")).email,
        listTitle: title,
        listTerm: terms[i],
      })
        .then((res) => setSuccessMessage("List terms removed"))
        .catch((err) => {
          setErrorMessage(err);
        });
    }
  };

  // Check list for Delete Term(s) Modal
  const [checked, setChecked] = useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //////

  // Input fields for Add Terms To List Modal
  function generateInputFields(count) {
    let fields = [];
    for (let i = 0; i < count; i++) {
      let name = "box" + i;
      fields.push(
        <TextField
          required
          id={name}
          label="Term"
          variant="outlined"
          size="small"
        />
      );
    }
    return fields;
  }

  let inputFields = generateInputFields(inputFieldCounter);

  useEffect(() => {
    if (inputFieldCounter > 8) {
      setInputFieldCounter(8);
      setInputFieldErrorMessage(
        "Cannot have fields greater than 8. Please save and try again."
      );
    } else if (inputFieldCounter < 1) {
      setInputFieldCounter(1);
    }
    setTimeout(() => setInputFieldErrorMessage(""), 10000);
  }, [inputFieldCounter]);

  // Clear error messages
  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 10000);
  }, [successMessage, errorMessage]);

  // Save List
  const saveNewList = () => {
    if (!newList) {
      setErrorMessage("List name is empty, cannot save list");
      handleCloseCreateList();

      return;
    }

    const requestOne = Axios.post(`${baseUrl}/user-list-object-create`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      name: newList,
    }).then((res) => {
      if (res) {
        setSuccessMessage("New list created");
      } else {
        setErrorMessage("Server error");
      }
    });

    const requestTwo = Axios.post(`${baseUrl}/user-list-create`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      listTitle: newList,
      listTerms: [],
    }).then((res) => {
      if (res) {
      } else {
        setErrorMessage("Server error");
      }
    });

    if (newList) {
      Axios.all([requestOne, requestTwo])
        .then(
          Axios.spread((...res) => {
            const responseOne = res[0];
            const responseTwo = res[1];
            setCounter(counter + 1);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }

    setNewList("");
    handleCloseCreateList();
  };

  // Save List Terms
  const saveNewListTerms = () => {
    let items = [];
    for (let i = 0; i < inputFieldCounter; i++) {
      items.push(document.getElementById("box" + i).value);
    }

    for (var i = 0; i < items.length; i++) {
      if (items[i] === "") {
        setInputFieldErrorMessage("One or more fields cannot be empty");
        return;
      }
    }

    if (items.length !== new Set(items).size) {
      setInputFieldErrorMessage("New list terms must be unique");
      return;
    } else {
      Axios.post(`${baseUrl}/user-update-list`, {
        email: JSON.parse(localStorage.getItem("currentUser")).email,
        listTitle: listToEdit,
        newListTerms: items,
      }).then((err) => {
        if (previousListTerms.length === err.data.err.listTerms.length) {
          setInputFieldErrorMessage(
            "One or more terms already exist in list, please add new terms"
          );
        } else {
          setSuccessMessage("List updated");
          setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
          }, 8000);
          handleCloseAddTerms();
          setInputFieldCounter(0);
        }
      });
    }
  };

  useEffect(() => {
    if (listSelected) {
      Axios.post(`${baseUrl}/admin-get-list-by-title`, {
        listTitle: listSelected,
      }).then((res) => {
        setListItems(res.data.docs[0].listTerms);
      });
    } else {
      setListItems([]);
    }
  }, [listSelected]);

  // Button group selection
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleMetronomeClick = () => {
    setMetronomeIcon(!metronomeIcon);
  };

  let darkTheme = JSON.parse(localStorage.getItem("currentUser")).darkTheme;

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

  function PracticeMenu() {
    return (
      <div className="practice-menu-container">
        <div
          style={
            darkTheme
              ? {
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid #393939",
                  borderRadius: "5px",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid silver",
                  borderRadius: "5px",
                }
          }
        >
          <div
            className={
              darkTheme
                ? "practice-menu-select-list-dark"
                : "practice-menu-select-list"
            }
          >
            <h3 style={darkTheme ? { color: "white" } : { color: "black" }}>
              Select List
            </h3>
            <ThemeProvider
              theme={darkTheme ? themeListButtonsDark : themeListButtons}
            >
              <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                onChange={handleChange}
              >
                {lists.length > 0 ? (
                  lists.map((option, index) => {
                    return (
                      <ToggleButton
                        size="large"
                        variant="outlined"
                        key={index}
                        value={option}
                        onClick={() => {
                          listSelected
                            ? setListSelected("")
                            : setListSelected(option);
                        }}
                        style={darkTheme ? { backgroundColor: "#666666" } : {}}
                        color={darkTheme ? "secondary" : "secondary"}
                      >
                        {option}
                      </ToggleButton>
                    );
                  })
                ) : (
                  <p
                    style={
                      darkTheme
                        ? { color: "white", margin: "0 auto" }
                        : { color: "grey", margin: "0 auto" }
                    }
                  >
                    Lists loading ...{" "}
                  </p>
                )}
                <div style={{ height: "20px" }} />
                <p
                  style={
                    darkTheme
                      ? { color: "white", margin: "0 auto" }
                      : { color: "black", margin: "0 auto" }
                  }
                >
                  Custom Lists
                </p>
                <div style={{ height: "5px" }} />
                {subscriptionStatus && userLists.length > 0 ? (
                  <div style={{ borderBottom: "1px solid silver" }} />
                ) : (
                  <div></div>
                )}
                {userLists.length > 0 && subscriptionStatus ? (
                  userLists.map((option, index) => {
                    return (
                      <ToggleButton
                        size="large"
                        variant="outlined"
                        key={index + lists.length}
                        value={option}
                        onClick={() => {
                          Axios.post(`${baseUrl}/user-get-list-by-title`, {
                            email: JSON.parse(
                              localStorage.getItem("currentUser")
                            ).email,
                            listTitle: option,
                          }).then((res) => {
                            setListItems(res.data.docs[0].listTerms);
                          });
                        }}
                        style={darkTheme ? { backgroundColor: "#666666" } : {}}
                        color={darkTheme ? "secondary" : "secondary"}
                      >
                        {option}
                      </ToggleButton>
                    );
                  })
                ) : subscriptionStatus ? (
                  <div
                    style={{
                      width: "70%",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={darkTheme ? { color: "white" } : { color: "grey" }}
                    >
                      There are no lists created
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "70%",
                      margin: "0 auto",
                      textAlign: "center",
                      // color: "grey",
                    }}
                  >
                    <div style={{ height: "20px" }} />
                    <p
                      style={
                        darkTheme ? { color: "white" } : { color: "black" }
                      }
                    >
                      Please{" "}
                      <a style={{ color: "#00a8e8" }} href="/account">
                        subscribe
                      </a>{" "}
                      to access the Custom Lists feature.
                    </p>
                  </div>
                )}
              </ToggleButtonGroup>
            </ThemeProvider>
            <div style={{ height: "20px" }}></div>
          </div>
        </div>
        <div style={{ width: "50px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* WPM Slider Component */}
          <Box
            sx={{
              height: "200px",
              paddingRight: "30px",
            }}
          >
            <br />
            <ThemeProvider theme={darkTheme ? themeSliderDark : themeSlider}>
              <Slider
                defaultValue={wpm}
                orientation="vertical"
                step={50}
                marks={marks}
                min={150}
                max={300}
                onChange={(e, val) => setWpm(val)}
              />
            </ThemeProvider>
          </Box>
          <p style={{ color: "red" }}> {errorMessage}</p>
          <p style={{ color: "#007EA7" }}> {successMessage}</p>
          <div
            style={
              !subscriptionStatus
                ? {
                    border: "2px solid silver",
                    backgroundColor: "#b0b0b0",
                    padding: "5px",
                    pointerEvents: "none",
                    textAlign: "center",
                  }
                : {}
            }
          >
            {!subscriptionStatus ? (
              <p style={{ color: "#545353" }}>Premium Features</p>
            ) : (
              <></>
            )}
            <ThemeProvider theme={themeUserButtons}>
              <Button
                style={{ height: "70px", width: "150px", color: "white" }}
                variant="contained"
                value=""
                onClick={handleOpenCreateList}
                color={darkTheme ? "primary" : "secondary"}
              >
                Create List
              </Button>
            </ThemeProvider>
            <div style={{ height: "10px" }} />

            <ThemeProvider theme={themeUserButtons}>
              <Button
                style={{ height: "70px", width: "150px", color: "white" }}
                variant="contained"
                value=""
                onClick={handleOpenAddTerms}
                color={darkTheme ? "primary" : "secondary"}
              >
                Add Term(s) To List
              </Button>
            </ThemeProvider>
            <div style={{ height: "10px" }} />

            <ThemeProvider theme={themeUserButtons}>
              <Button
                style={{ height: "70px", width: "150px", color: "white" }}
                variant="contained"
                value=""
                onClick={handleOpenDeleteTerms}
                color={darkTheme ? "primary" : "secondary"}
              >
                Delete Term(s) From List
              </Button>
            </ThemeProvider>
          </div>
          <div style={{ height: "10px" }} />

          <ThemeProvider theme={themeDefault}>
            <Button
              style={
                darkTheme
                  ? {
                      height: "70px",
                      width: "150px",
                      backgroundColor: "#003459",
                    }
                  : {
                      height: "70px",
                      width: "150px",
                      backgroundColor: "#008B9E",
                    }
              }
              variant="contained"
              value=""
              onClick={() => {
                setBegin(true);
              }}
              disabled={!view}
            >
              Begin
            </Button>
          </ThemeProvider>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      {begin && listItems ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="practice-root">
            <div className="practice-block">
              <h2 style={darkTheme ? { color: "white" } : { color: "black" }}>
                Practice
              </h2>
              <div style={{ borderBottom: "1px solid silver" }} />
              <br />
              <div className="practice-top-buttons" ref={dropdownRef}>
                <a
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Back to Menu
                </a>
                {/* <a
                  onClick={() => {
                    // setSelectedOption(selectedOption);
                  }}
                >
                  Randomize
                </a> */}
                <a
                  onClick={() => {
                    setSelectedOption(selectedOption);
                  }}
                >
                  Restart Session
                </a>
              </div>
              <div style={{ height: "50px" }}></div>

              <div className="practice-wpm">
                <div style={{ width: "50px" }} />
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  <ThemeProvider theme={themeDefault}>
                    <ToggleButton
                      variant="outlined"
                      onClick={() => handleMetronomeClick(false)}
                      className="metronome-button"
                    >
                      {metronomeIcon ? (
                        <MetronomeClearIcon />
                      ) : (
                        <MetronomeSolidIcon />
                      )}
                    </ToggleButton>
                  </ThemeProvider>
                </div> */}
                <div style={{ width: "50px" }} />

                {/* ---- DISPLAY LIST DATA ---- */}
                <PracticeInterface wpm={wpm} listItems={listItems} />
                <div style={{ width: "100px" }} />
              </div>
            </div>
          </div>
          <div style={{ height: "300px" }} />
        </div>
      ) : (
        <PracticeMenu />
      )}

      {/* ------ */}
      {/* Create List Modal */}
      {/* ------ */}
      <Modal
        open={openCreateList}
        onClose={handleCloseCreateList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create List
          </Typography>
          <br />
          <TextField
            required
            id="standard-basic"
            label="List Name"
            variant="outlined"
            size="small"
            onChange={(e) => setNewList(e.target.value)}
          />
          &nbsp;
          <Button
            variant="contained"
            style={
              darkTheme
                ? { backgroundColor: "#4f7fa1" }
                : { backgroundColor: "#008B9E" }
            }
            onClick={saveNewList}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* ------ */}
      {/* Add Terms To List Modal */}
      {/* ------ */}
      <Modal
        open={openAddTerms}
        onClose={handleCloseAddTerms}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Term(s) To List
          </Typography>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={darkTheme ? { color: "white" } : {}}
              >
                Select List
              </InputLabel>
              <Select
                value={listToEdit}
                label="Select List"
                onChange={(e) => {
                  setListToEdit(e.target.value);
                  // Get previous list of terms
                  Axios.post(`${baseUrl}/user-get-list-by-title`, {
                    email: JSON.parse(localStorage.getItem("currentUser"))
                      .email,
                    listTitle: e.target.value,
                  }).then((res) => {
                    setPreviousListTerms(res.data.docs[0].listTerms);
                  });
                }}
                style={
                  darkTheme
                    ? { backgroundColor: "#666666", color: "white" }
                    : { backgroundColor: "#white" }
                }
              >
                {userLists.length > 0 ? (
                  userLists.map((data, index) => {
                    return (
                      <MenuItem key={index} value={data}>
                        {data}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem>You have no lists</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          {listToEdit ? (
            <>
              <p style={darkTheme ? { color: "white" } : { color: "black" }}>
                Note that if a term already exists in the list, it will not be
                added.
              </p>
              <br />
              <div className={{ display: "flex", flexDirection: "row" }}>
                {inputFields.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "5px 0px 5px",
                      }}
                    >
                      <>{item}</>
                    </div>
                  );
                })}

                <p style={{ color: "red" }}>{inputFieldErrorMessage}</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    Add
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setInputFieldCounter(inputFieldCounter + 1);
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    Remove
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setInputFieldCounter(inputFieldCounter - 1);
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <br />
              <Button
                variant="contained"
                style={
                  darkTheme
                    ? { backgroundColor: "#4f7fa1" }
                    : { backgroundColor: "#008B9E" }
                }
                onClick={saveNewListTerms}
              >
                Save
              </Button>
              &nbsp;
              <Button
                variant="contained"
                style={{ backgroundColor: "#d62828" }}
                onClick={handleOpenConfirmDeleteList}
              >
                Delete List
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Modal>

      {/* ------ */}
      {/* Delete List Confirm Modal */}
      {/* ------ */}
      <Modal
        open={openConfirmDeleteList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm delete list(s) &nbsp;
          </Typography>
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#d62828" }}
            onClick={() => {
              handleCloseConfirmDeleteList();
              deleteLists(listToEdit);
              setListToEdit("");
              setRefreshCount(refreshCount + 1);
              setCounter(counter + 1);
            }}
          >
            Confirm
          </Button>
          &nbsp;
          <Button variant="contained" onClick={handleCloseConfirmDeleteList}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* ------ */}
      {/* Delete Terms From List Modal */}
      {/* ------ */}
      <Modal
        open={openDeleteTerms}
        onClose={handleCloseDeleteTerms}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Term(s) From List &nbsp;
          </Typography>

          <Box sx={{ minWidth: 120 }}>
            <br />
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={darkTheme ? { color: "white" } : {}}
              >
                Select List
              </InputLabel>
              <Select
                // value={listToEdit}
                label="Select List"
                onChange={(e) => loadListToDeleteTerms(e.target.value)}
                style={
                  darkTheme
                    ? { backgroundColor: "#666666", color: "white" }
                    : { backgroundColor: "#white" }
                }
              >
                {userLists.length > 0 ? (
                  userLists.map((data, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={data}
                        style={
                          darkTheme
                            ? { bgColor: "#666666" }
                            : { backgroundColor: "#white" }
                        }
                      >
                        {data}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem>You have no lists</MenuItem>
                )}
              </Select>
              <div style={{ height: "20px" }} />
              <Paper
                style={
                  darkTheme
                    ? {
                        maxHeight: 200,
                        overflow: "auto",
                        backgroundColor: "#666666",
                        color: "black",
                        padding: "10px",
                      }
                    : {
                        maxHeight: 200,
                        overflow: "auto",
                        backgroundColor: "white",
                        color: "white",
                        padding: "10px",
                      }
                }
              >
                <List
                  sx={
                    darkTheme
                      ? {
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "#666666",
                          color: "white",
                        }
                      : {
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                          color: "black",
                        }
                  }
                >
                  {listToDeleteTermsArray.length > 0 ? (
                    listToDeleteTermsArray.map((value, index) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })
                  ) : listToDeleteTerms ? (
                    <p>This list is empty</p>
                  ) : (
                    <></>
                  )}
                </List>
              </Paper>
            </FormControl>
          </Box>
          <br />
          {listToDeleteTermsArray.length > 0 ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#d62828" }}
              onClick={() => {
                handleCloseDeleteTerms();
                deleteListTerms(listToDeleteTerms, checked);
                setRefreshCount(refreshCount + 1);
              }}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </Layout>
  );
}
