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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const lists = [
  { category: "Words", data: "stenoData" },
  { category: "Numbers", data: "numbers" },
  { category: "Phrases", data: "phrases" },
  { category: "States", data: "states" },
  { category: "Years", data: "years" },
];

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
  const [selectedButton, setSelectedButton] = useState(false);
  const [wpm, setWpm] = useState(200);
  const [begin, setBegin] = useState(false);
  const [view, setView] = useState("Words");
  const [refreshCount, setRefreshCount] = useState();

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
  }, [baseUrl, refreshCount]);

  // Create / Edit Lists Modals
  const [openCreateList, setOpenCreateList] = useState(false);
  const handleOpenCreateList = () => setOpenCreateList(true);
  const handleCloseCreateList = () => setOpenCreateList(false);

  const [openEditList, setOpenEditList] = useState(false);
  const handleOpenEditList = () => setOpenEditList(true);
  const handleCloseEditList = () => setOpenEditList(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState("");
  const [listToEdit, setListToEdit] = useState("");
  const [newList, setNewList] = useState("");

  const [openConfirmDeleteList, setOpenConfirmDeleteList] = useState(false);
  const handleOpenConfirmDeleteList = () => {
    setOpenConfirmDeleteList(true);
    handleCloseEditList();
  };
  const handleCloseConfirmDeleteList = () => setOpenConfirmDeleteList(false);

  const deleteLists = (obj) => {
    for (let i = 0; i < obj.length; i++) {
      const requestOne = Axios.post(`${baseUrl}/admin-delete-list-object`, {
        name: obj[i],
      }).then((res) => {
        // console.log(res);
      });

      const requestTwo = Axios.post(`${baseUrl}/admin-delete-list`, {
        listTitle: obj[i].toLowerCase(),
      }).then((res) => {
        // console.log(res);
      });

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
    }
  };

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
    }
    setTimeout(() => setInputFieldErrorMessage(""), 10000);
  }, [inputFieldCounter]);

  const saveNewList = () => {
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
    }).then((res) => {
      if (res) {
        setSuccessMessage("New list successfully created");
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
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }

    setNewList("");
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 10000);
    handleCloseCreateList();
  };

  const saveNewListTerms = () => {
    let items = [];
    for (let i = 0; i < inputFieldCounter; i++) {
      items.push(document.getElementById("box" + i).value);
    }
    setInputFieldCounter(0);

    Axios.post(`${baseUrl}/user-update-list`, {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      listTitle: listToEdit.toLowerCase(),
      newListTerms: items,
    })
      .then((err) => {
        setSuccessMessage("List updated");
        if (err) {
          setErrorMessage("Server error");
        }
      })
      .catch((err) => console.log(err));

    setSuccessMessage("List updated");

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 8000);
    handleCloseEditList();
  };

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

  // Button group selection
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleMetronomeClick = () => {
    setMetronomeIcon(!metronomeIcon);
  };

  const handleSelectButton = () => {
    setSelectedButton(!selectedButton);
  };

  function PracticeMenu() {
    return (
      <div className="practice-menu-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid silver",
          }}
        >
          <div className="practice-menu-select-list">
            <h3>Select List</h3>
            <ThemeProvider theme={themeDefault}>
              <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                onChange={handleChange}
              >
                {lists.map((option, index) => {
                  return (
                    <ToggleButton
                      size="large"
                      variant="outlined"
                      key={index}
                      value={option.data}
                      onClick={() => {
                        setListItems(option.data);
                      }}
                      color={selectedButton ? "primary" : "secondary"}
                    >
                      {option.category}
                    </ToggleButton>
                  );
                })}
                <div style={{ height: "20px" }}></div>

                <Divider>Custom Lists</Divider>
                <div
                  style={{ height: "20px", borderBottom: "1px solid #d9d9d9" }}
                ></div>
                {userLists.length > 0 ? (
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
                            listTitle: option.toLowerCase(),
                          }).then((res) => {
                            setListItems(res.data.docs[0].listTerms);
                          });
                        }}
                        color={selectedButton ? "primary" : "secondary"}
                      >
                        {option}
                      </ToggleButton>
                    );
                  })
                ) : (
                  <></>
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
            <ThemeProvider theme={themeUserList}>
              <Slider
                defaultValue={wpm}
                orientation="vertical"
                step={50}
                marks={marks}
                min={100}
                max={300}
                onChange={(e, val) => setWpm(val)}
                color="primary"
              />
            </ThemeProvider>
          </Box>
          <div style={{ height: "60px" }} />

          <p style={{ color: "red" }}> {errorMessage}</p>
          <p style={{ color: "#007EA7" }}> {successMessage}</p>

          <ThemeProvider theme={themeUserList}>
            <Button
              style={{ height: "60px", width: "150px", color: "white" }}
              variant="contained"
              value=""
              onClick={handleOpenCreateList}
            >
              Create List
            </Button>
          </ThemeProvider>
          <div style={{ height: "10px" }} />

          <ThemeProvider theme={themeUserList}>
            <Button
              style={{ height: "60px", width: "150px", color: "white" }}
              variant="contained"
              value=""
              onClick={handleOpenEditList}
            >
              Edit List
            </Button>
          </ThemeProvider>
          <div style={{ height: "10px" }} />

          <ThemeProvider theme={themeDefault}>
            <Button
              style={{ height: "60px", width: "150px" }}
              variant="contained"
              value=""
              onClick={() => {
                setBegin(true);
              }}
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
              <h2>Practice</h2>
              <Divider />
              <br />
              <div className="practice-top-buttons" ref={dropdownRef}>
                <a
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Back to Menu
                </a>
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
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                </div>
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
          <Button variant="contained" onClick={saveNewList}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* ------ */}
      {/* Edit List Modal */}
      {/* ------ */}
      <Modal
        open={openEditList}
        onClose={handleCloseEditList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit List
          </Typography>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select List</InputLabel>
              <Select
                value={listToEdit}
                label="Select List"
                onChange={(e) => setListToEdit(e.target.value)}
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
                  <MenuItem></MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
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
          <Button variant="contained" onClick={saveNewListTerms}>
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
            onClick={() => {
              handleCloseConfirmDeleteList();
              deleteLists(listToEdit);
              setRefreshCount(refreshCount + 1);
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
    </Layout>
  );
}
