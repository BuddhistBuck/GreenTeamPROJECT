/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { baseUrl } from "../../util/baseUrl";
import AdminLayout from "../../components/AdminLayout";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import themeDefault from "../../util/themeDefault";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Paper } from "@mui/material";

/**
 * @component The component that allows admin to manage admin-created lists
 */
export default function ManageListsPage(props) {
  const [list, setList] = useState([]);
  const [listObjects, setListObjects] = useState([]);
  const [newList, setNewList] = useState("");
  const [currentList, setCurrentList] = useState(rows(list));
  const [listAddModal, setListAddModal] = useState(list);
  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState("");
  const [inputFieldIndex, setInputFieldIndex] = useState(1);
  const [newListTerms, setNewListTerms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [listToAddNewTerms, setListToAddNewTerms] = useState("");
  const [refreshCount, setRefreshCount] = useState();

  // Create event log
  function createEventLog(eventType, eventDetails, admin) {
    Axios.post(`${baseUrl}/admin-create-event-log`, {
      eventType: eventType,
      eventDetails: eventDetails,
      admin: admin,
    }).then((res) => {});
  }

  const selectListMain = (event) => {
    setListAddModal(event.target.value);
    setList(event.target.value);

    Axios.post(`${baseUrl}/admin-get-list-by-title`, {
      listTitle: event.target.value,
    }).then((res) => {
      try {
        setCurrentList(rows(Object.entries(res.data)[0][1][0].listTerms));
      } catch (error) {
        setCurrentList([]);
      }
    });
  };

  const selectListAddModal = (event) => {
    setListAddModal(event.target.value);
  };

  const selectListToAddNewTerms = (event) => {
    setListToAddNewTerms(event.target.value);
  };

  const [openAddList, setOpenAddList] = useState(false);
  const handleOpenAddList = () => setOpenAddList(true);
  const handleCloseAddList = () => setOpenAddList(false);

  const [openDeleteListTerms, setOpenDeleteListTerms] = useState(false);
  const handleOpenDeleteListTerms = () => setOpenDeleteListTerms(true);
  const handleCloseDeleteListTerms = () => setOpenDeleteListTerms(false);

  const [openConfirmDeleteListTerms, setOpenConfirmDeleteListTerms] =
    useState(false);
  const handleOpenConfirmDeleteListTerms = () => {
    handleCloseDeleteListTerms();
    if (selectedListTermsForDelete.length > 0) {
      setOpenConfirmDeleteListTerms(true);
    } else {
      return;
    }
  };
  const handleCloseConfirmDeleteListTerms = () =>
    setOpenConfirmDeleteListTerms(false);

  const [openAddItems, setOpenAddItems] = useState(false);
  const handleOpenAddItems = () => setOpenAddItems(true);
  const handleCloseAddItems = () => setOpenAddItems(false);

  const [openDeleteList, setOpenDeleteList] = useState(false);
  const handleOpenDeleteList = () => setOpenDeleteList(true);
  const handleCloseDeleteList = () => setOpenDeleteList(false);

  const [openConfirmDeleteList, setOpenConfirmDeleteList] = useState(false);
  const handleOpenConfirmDeleteList = () => {
    setOpenConfirmDeleteList(true);
    handleCloseDeleteList();
  };
  const handleCloseConfirmDeleteList = () => setOpenConfirmDeleteList(false);

  const [selectedListsForDelete, setSelectedListsForDelete] = useState([]);
  const [selectedListTermsForDelete, setSelectedListTermsForDelete] =
    useState(false);

  const deleteLists = (obj) => {
    for (let i = 0; i < obj.length; i++) {
      const requestOne = Axios.post(`${baseUrl}/admin-delete-list-object`, {
        name: obj[i],
      }).then((res) => {
        // console.log(res);
      });

      const requestTwo = Axios.post(`${baseUrl}/admin-delete-list`, {
        listTitle: obj[i],
      }).then((res) => {
        // console.log(res);
      });

      const requestThree = createEventLog(
        "Deleted list",
        `List Name: ${obj[i]}`,
        JSON.parse(localStorage.getItem("currentAdmin")).admin
      );

      Axios.all([requestOne, requestTwo])
        .then(
          Axios.spread((...res) => {
            // eslint-disable-next-line no-unused-vars
            let responseOne = res[0];
            // eslint-disable-next-line no-unused-vars
            let responseTwo = res[1];
            // eslint-disable-next-line no-unused-vars
            let responseThree = res[3];
          })
        )
        .catch((err) => {
          console.log(err);
        });
      setRefreshCount(refreshCount + 1);
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = selectedListsForDelete.indexOf(value);
    const newChecked = [...selectedListsForDelete];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedListsForDelete(newChecked);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "term", headerName: "Term", width: 130 },
  ];

  function rows(list) {
    let seq = [];
    for (let i = 0; i < list.length; i++) {
      seq.push({ id: i, term: list[i] });
    }

    return seq;
  }

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

  const saveNewListTerms = () => {
    let items = [];
    for (let i = 0; i < inputFieldCounter; i++) {
      items.push(document.getElementById("box" + i).value);
    }

    if (items.length !== new Set(items).size) {
      setInputFieldErrorMessage("New list terms must be unique");
      return;
    } else {
      setInputFieldCounter(0);
      Axios.post(`${baseUrl}/admin-update-list`, {
        listTitle: listToAddNewTerms,
        newListTerms: items,
      })
        .then((res, err) => {})
        .catch((err) => console.log(err));
      createEventLog(
        "Added terms to list",
        `List Name: ${listToAddNewTerms}  ||  List Terms: ${items}`,
        JSON.parse(localStorage.getItem("currentAdmin")).admin
      );
      setSuccessMessage("Terms added to list");
      setRefreshCount(refreshCount + 1);
      handleCloseAddItems();
    }
  };

  const saveNewList = () => {
    const requestOne = Axios.post(`${baseUrl}/admin-list-object-create`, {
      name: newList,
    }).then((res) => {
      if (res) {
        setSuccessMessage("New list successfully created");
        createEventLog(
          "Created list",
          `List Name: ${newList}`,
          JSON.parse(localStorage.getItem("currentAdmin")).admin
        );
        setRefreshCount(refreshCount + 1);
      } else {
        setFailedMessage("Failed to add new list");
      }
    });

    const requestTwo = Axios.post(`${baseUrl}/admin-list-create`, {
      listTitle: newList,
    }).then((res) => {
      if (res) {
        // setSuccessMessage("New list successfully created");
      } else {
        // setFailedMessage("Failed to add new list");
      }
    });

    if (newList) {
      Axios.all([requestOne, requestTwo])
        .then(
          Axios.spread((...res) => {
            const responseOne = res[0];
            const responseTwo = res[1];
            // console.log(responseOne);
            // console.log(responseTwo);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }

    setNewList("");
    setTimeout(() => {
      setSuccessMessage("");
      setFailedMessage("");
    }, 8000);
    handleCloseAddList();
  };

  const deleteListTerms = (obj, title) => {
    for (let i = 0; i < obj.length; i++) {
      Axios.post(`${baseUrl}/admin-delete-list-term`, {
        listTitle: title,
        listTerm: obj[i],
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }

    createEventLog(
      "Deleted list terms",
      `List Name: ${title}  ||  List Terms: ${obj}`,
      JSON.parse(localStorage.getItem("currentAdmin")).admin
    );
  };

  let inputFields = generateInputFields(inputFieldCounter);

  useEffect(() => {
    if (inputFieldCounter > 8) {
      setInputFieldCounter(8);
      setInputFieldErrorMessage(
        "Cannot have fields greater than 8. Please save and try again."
      );
    }
    setTimeout(() => setInputFieldErrorMessage(""), 8000);
  }, [list, inputFieldCounter]);

  useEffect(() => {
    Axios.get(`${baseUrl}/admin-get-lists`).then((res) => {
      let arr = [];
      for (let i = 0; i < Object.entries(res.data)[0][1].length; i++) {
        arr.push(Object.entries(res.data)[0][1][i].name);
      }
      setListObjects(arr);
    });
  }, [baseUrl, refreshCount]);

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setInterval(() => setFailedMessage(""), 9000);
    setInterval(() => setSuccessMessage(""), 9000);
  }, [successMessage, failedMessage]);

  useEffect(() => {
    let selections = [];
    for (let i = 0; i < selectionModel.length; i++) {
      for (let j = 0; j < currentList.length; j++) {
        if (selectionModel[i] === currentList[j].id) {
          selections.push(currentList[j].term);
        }
      }
    }
    setSelectedListTermsForDelete(selections);
  }, [selectionModel]);

  return (
    <AdminLayout sidebar selectedLink="lists">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2>Manage Lists</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px 0px 0px",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">List</InputLabel>
              {list ? (
                <Select
                  value={list}
                  label="List"
                  onChange={(e) => selectListMain(e)}
                >
                  {listObjects ? (
                    listObjects.map((data, index) => {
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
              ) : (
                <></>
              )}
            </FormControl>
          </Box>

          <ThemeProvider theme={themeDefault}>
            &nbsp;
            <Button
              style={{ height: "55px" }}
              variant="contained"
              onClick={handleOpenAddList}
            >
              Add List
            </Button>
            &nbsp;
            <Button
              style={{ height: "55px", backgroundColor: "#d62828" }}
              variant="contained"
              onClick={handleOpenDeleteList}
            >
              Delete List
            </Button>
            &nbsp;
            <Button
              style={{ height: "55px" }}
              variant="contained"
              onClick={handleOpenAddItems}
            >
              Add Term(s)
            </Button>
            &nbsp;
            <Button
              style={{ height: "55px", backgroundColor: "#d62828" }}
              variant="contained"
              onClick={handleOpenDeleteListTerms}
            >
              Delete Selected List Term(s)
            </Button>
            {/* ------ */}
            {/* Add List Modal */}
            {/* ------ */}
            <Modal
              open={openAddList}
              onClose={handleCloseAddList}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add List
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
            {/* Delete List Modal */}
            {/* ------ */}
            <Modal
              open={openDeleteList}
              onClose={handleCloseDeleteList}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete List
                </Typography>
                <br />
                {/* ------ */}
                {/* Delete List Check Box */}
                {/* ------ */}
                <Box sx={{ minWidth: 120 }}>
                  <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {listObjects.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    selectedListsForDelete.indexOf(value) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={value} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </Box>
                <br />
                <Button
                  variant="contained"
                  onClick={handleOpenConfirmDeleteList}
                  style={{ backgroundColor: "#d62828" }}
                >
                  Delete
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
                    deleteLists(selectedListsForDelete);
                    setSuccessMessage("Successfully deleted list(s)");
                    window.location.reload();
                  }}
                >
                  Confirm
                </Button>
                &nbsp;
                <Button variant="contained" onClick={handleCloseDeleteList}>
                  Cancel
                </Button>
              </Box>
            </Modal>
            {/* ------ */}
            {/* Add List Terms Modal */}
            {/* ------ */}
            <Modal
              open={openAddItems}
              onClose={handleCloseAddItems}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Term(s)
                </Typography>
                <br />

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select List
                    </InputLabel>
                    <Select
                      value={listToAddNewTerms}
                      label="Select List"
                      onChange={selectListToAddNewTerms}
                    >
                      {listObjects ? (
                        listObjects.map((data, index) => {
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
                {listToAddNewTerms ? (
                  <>
                    {" "}
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
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Modal>
            {/* ------ */}
            {/* Delete List Terms Modal */}
            {/* ------ */}
            <Modal
              open={openDeleteListTerms}
              onClose={handleCloseDeleteListTerms}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Term(s)
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  style={{ marginLeft: "20px" }}
                >
                  {selectedListTermsForDelete.length > 0 ? (
                    selectedListTermsForDelete.map((data, index) => {
                      return (
                        <span key={index}>
                          <strong>{data}</strong>
                          <br />
                        </span>
                      );
                    })
                  ) : (
                    <p>No list terms selected</p>
                  )}
                  <br />
                </Typography>
                {selectedListTermsForDelete.length > 0 ? (
                  <Button
                    variant="contained"
                    onClick={handleOpenConfirmDeleteListTerms}
                    style={{ backgroundColor: "#d62828" }}
                  >
                    Delete
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Modal>
            {/* ------ */}
            {/* Delete Terms Confirm Modal */}
            {/* ------ */}
            <Modal
              open={openConfirmDeleteListTerms}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirm delete list terms(s)
                </Typography>
                <div style={{ height: "15px" }} />
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteListTerms(selectedListTermsForDelete, list);
                    handleCloseConfirmDeleteListTerms();
                    handleCloseDeleteListTerms();
                    setSuccessMessage(
                      "List term(s) deleted, please reload the list table to see changes"
                    );
                    setRefreshCount(refreshCount + 1);
                  }}
                >
                  Confirm
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  onClick={handleCloseConfirmDeleteListTerms}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </ThemeProvider>
        </div>
      </div>

      <div style={{ height: "100vh" }}>
        <div
          style={{
            height: 400,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <DataGrid
            rows={currentList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
            checkboxSelection
          />
          <h3 style={{ color: "#00a8e8" }}>{successMessage}</h3>
          <h3 style={{ color: "red" }}>{failedMessage}</h3>
        </div>
      </div>
    </AdminLayout>
  );
}
