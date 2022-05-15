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
import { baseUrl } from "../../util/baseUrl";

/**
 * @component The component that allows admin to view user account information
 */
export default function ViewUsersPage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get(`${baseUrl}/users`).then((res) => {
      let users = formatUserData(res.data);
      console.log(res.data);
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

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
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
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">
                Subscription Status
              </StyledTableCell>
              <StyledTableCell align="right">Date Created</StyledTableCell>
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
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.subscriptionStatus ? "Subscribed" : "Not Subscribed"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDate(row.timeCreated)}
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
