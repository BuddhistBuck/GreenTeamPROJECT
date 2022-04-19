import React, { useState, useEffect } from "react";
import Axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function ManageUsersPage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/users").then((res) => {
      let users = formatUserData(res.data);
      setUsers(users);
    });
  }, []);

  function formatUserData(users) {
    let res = [];
    let obj = Object.entries(users);
    for (let i = 0; i < Object.keys(users).length; i++) {
      res.push(obj[i][1]);
    }
    return res;
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <AdminLayout sidebar selectedLink="users">
      <h2>Manage Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">
                Subscription Status
              </StyledTableCell>
              <StyledTableCell align="right">List Count</StyledTableCell>
              <StyledTableCell align="right">Last Logged In</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              users.map((row) => (
                <StyledTableRow key={row.firstName}>
                  <StyledTableCell align="right">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.subscriptionStatus ? "Subscribed" : "Not Subscribed"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.listCount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastLoggedIn}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>Send Email</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
