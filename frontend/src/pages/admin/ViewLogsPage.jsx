import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import Axios from "axios";
import { baseUrl } from "../../util/baseUrl";
import { TablePaginationActions, createData } from "../../util/logEventTable";

// Import Material UI components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * @component The component that allows admin to view manage-list logs
 */
export default function ViewLogsPage(props) {
  const [eventLogs, setEventLogs] = useState([]);

  // Get all logs
  useEffect(() => {
    Axios.get(`${baseUrl}/admin-get-event-logs`).then((res) => {
      setEventLogs(res.data);
    });
  }, []);

  // Table utilities
  const rows = createData(eventLogs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventLogs.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AdminLayout sidebar selectedLink="logs">
      <div style={{ height: "100vh" }}>
        <h2>Event Logs</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.key}>
                  <TableCell component="th" scope="row">
                    {row.eventType}
                  </TableCell>
                  <TableCell style={{ width: 600 }} align="right">
                    <span style={{ color: "grey" }}>{row.eventDetails}</span>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.admin}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.timeCreated}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  rowsPerPageOptions={[5, 10]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}
