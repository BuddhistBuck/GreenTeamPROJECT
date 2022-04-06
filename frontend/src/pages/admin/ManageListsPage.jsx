import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../../util/muiTheme";
import Modal from "@mui/material/Modal";

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

import { stenoData } from "../../util/stenoData/stenoData";
import { numbers } from "../../util/stenoData/numbers";
import { phrases } from "../../util/stenoData/phrases";
import { states } from "../../util/stenoData/states";
import { years } from "../../util/stenoData/years";

export default function ManageListsPage(props) {
  const [category, setCategory] = useState(stenoData);
  const [currentList, setCurrentList] = useState(rows(category));
  const [selectedItemsForDeletion, setSelectedItemsForDeletion] =
    useState(false);
  const [categoryAddModal, setCategoryAddModal] = useState(stenoData);
  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState("");

  const selectCategoryMain = (event) => {
    setCategoryAddModal(event.target.value);
    setCategory(event.target.value);
  };

  const selectCategoryAddModal = (event) => {
    setCategoryAddModal(event.target.value);
  };

  const [openDeleteItems, setOpenDeleteItems] = useState(false);
  const handleOpenConfirmDeletion = () => setOpenDeleteItems(true);
  const handleCloseConfirmDeletion = () => setOpenDeleteItems(false);

  const [openAddItems, setOpenAddItems] = useState(false);
  const handleOpenAddItems = () => setOpenAddItems(true);
  const handleCloseAddItems = () => setOpenAddItems(false);

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
      fields.push(
        <TextField
          required
          id="standard-basic"
          label="Term"
          variant="outlined"
          size="small"
        />
      );
    }
    return fields;
  }

  function saveNewListTerms() {}

  let inputFields = generateInputFields(inputFieldCounter);

  useEffect(() => {
    setCurrentList(rows(category));

    if (inputFieldCounter > 10) {
      setInputFieldCounter(10);
      setInputFieldErrorMessage(
        "Cannot have fields greater than 10. Please save and try again"
      );
    }

    setTimeout(() => setInputFieldErrorMessage(""), 8000);
  }, [category, inputFieldCounter]);

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
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={selectCategoryMain}
              >
                <MenuItem value={stenoData}>Words</MenuItem>
                <MenuItem value={numbers}>Numbers</MenuItem>
                <MenuItem value={phrases}>Phrases</MenuItem>
                <MenuItem value={states}>States</MenuItem>
                <MenuItem value={years}>Years</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ThemeProvider theme={muiTheme}>
            &nbsp;
            <Button
              style={{ height: "55px" }}
              variant="contained"
              onClick={handleOpenAddItems}
            >
              Add To List
            </Button>
            &nbsp;
            <Button
              style={{ height: "55px" }}
              variant="contained"
              onClick={handleOpenConfirmDeletion}
            >
              Delete Item
            </Button>
            {/* ------ */}
            {/* Add Items Modal */}
            {/* ------ */}
            <Modal
              open={openAddItems}
              onClose={handleCloseAddItems}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Items
                </Typography>
                <br />

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Category
                    </InputLabel>
                    <Select
                      value={category}
                      label="Select Category"
                      onChange={selectCategoryAddModal}
                    >
                      <MenuItem value={stenoData}>Words</MenuItem>
                      <MenuItem value={numbers}>Numbers</MenuItem>
                      <MenuItem value={phrases}>Phrases</MenuItem>
                      <MenuItem value={states}>States</MenuItem>
                      <MenuItem value={years}>Years</MenuItem>
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
                          console.log(inputFieldCounter);
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
                          console.log(inputFieldCounter);
                        }}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <br />
                <Button variant="contained" onChange={saveNewListTerms}>
                  Save
                </Button>
              </Box>
            </Modal>
            {/* ------ */}
            {/* Delete Items Modal */}
            {/* ------ */}
            <Modal
              open={openDeleteItems}
              onClose={handleCloseConfirmDeletion}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirm deletion:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {selectedItemsForDeletion ? (
                    <p>{selectedItemsForDeletion}</p>
                  ) : (
                    <p>No items selected</p>
                  )}
                </Typography>
              </Box>
            </Modal>
          </ThemeProvider>
        </div>
      </div>

      <div style={{ height: 400, width: "100%", margin: "0 auto" }}>
        <DataGrid
          rows={currentList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </AdminLayout>
  );
}
