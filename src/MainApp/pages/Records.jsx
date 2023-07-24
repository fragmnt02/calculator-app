import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { useGetAllRecordsRequest } from "../../global/hooks/request";

const handleDeleteRecord = (values) => {
  // Implement the logic to delete the record by its ID
  axios
    .delete(`${process.env.REACT_APP_API_URL}/v1/records/${values._id}`)
    .then(() => {
      // On successful delete, update the page
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting user record:", error);
    });
};

const columns = [
  { Header: "ID", accessor: "_id" },
  { Header: "Operation", accessor: "operation_id" },
  { Header: "Amount", accessor: "amount" },
  { Header: "User Balance", accessor: "user_balance" },
  { Header: "Operation Response", accessor: "operation_response" },
  { Header: "Date", accessor: "date" },
  {
    Header: "Delete",
    accessor: "is_deleted",
    Cell: ({ row: { values } }) => (
      <div>
        {!values.is_deleted ? (
          <Button
            variant="outlined"
            color="secondary"
            disabled={values.is_deleted}
            onClick={() => handleDeleteRecord(values)}
          >
            Delete
          </Button>
        ) : (
          <div>Deleted</div>
        )}
      </div>
    ),
  },
];

export const RecordsPage = () => {
  const { getAllRecords, records } = useGetAllRecordsRequest();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
    setFilter,
  } = useTable(
    {
      columns,
      data: records,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    // Fetch user records from the API
    getAllRecords(null, pageSize, pageIndex);
  }, [pageIndex, pageSize]);

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px" }}>
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          User Records
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          margin="normal"
          onChange={(e) => setFilter("type", e.target.value)}
        />
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <TableRow key={index} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={() => setPageSize(10)}>Show 10 per page</Button>
        <Button onClick={() => setPageSize(20)}>Show 20 per page</Button>
        <Button onClick={() => setPageSize(50)}>Show 50 per page</Button>
        <Button onClick={() => setPageSize(rows.length)}>Show All</Button>
      </Paper>
    </Container>
  );
};
