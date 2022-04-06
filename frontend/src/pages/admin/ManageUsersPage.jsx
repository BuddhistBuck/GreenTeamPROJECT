import React from "react";
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

  function createData(
    firstName,
    lastName,
    subscriptionStatus,
    email,
    listCount,
    lastLoggedIn
  ) {
    return {
      firstName,
      lastName,
      subscriptionStatus,
      email,
      listCount,
      lastLoggedIn,
    };
  }

  const rows = [
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
    createData("John", "Doe", "active", "johndoe@email.com", 3, "12:00 am EST"),
  ];

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
            {rows.map((row) => (
              <StyledTableRow key={row.firstName}>
                <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.subscriptionStatus}
                </StyledTableCell>
                <StyledTableCell align="right">{row.listCount}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.lastLoggedIn}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button>Send Email</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
