import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
  TableSortLabel,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { api } from "../service/api";
import { useNotificationError, useNotificationSuccess } from "../context/SnackBarContext";

const DataTable2 = ({ columns, rowData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const theme = useTheme();
  const onerror = useNotificationError();
  const onsuccess = useNotificationSuccess();

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = async () => {
    if (selectedRow) {
      console.log("Delete action for:", selectedRow.member_id); // Add your delete logic here
      try{
        const response = await api.deleteMember(selectedRow.member_id)
        onsuccess("Member deleted successfully")

      }
      catch(e){
        onerror("Error during member deletion")
        console.log(e)
      }

    }
    handleMenuClose();
  };

  const departmentStyles = (Department) => {
    switch (Department) {
      case "Dév. Commercial":
        return theme.palette.lightBlue.main;
      case "Projet":
        return theme.palette.green.main;
      case "Cellule Qualité":
        return theme.palette.purple.main;
      default:
        return theme.palette.blue.main;
    }
  };

  const statusStyles = (status) => {
    switch (status) {
      case "Cancelled":
        return { color: theme.palette.error.main };
      case "Delayed":
        return { color: theme.palette.warning.text };
      case "Confirmed":
      default:
        return { color: theme.palette.success.text };
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sortConfig.key === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnId, direction });
  };

  const sortedRows = [...rowData].sort((a, b) => {
    if (sortConfig.key === null) {
      return 0;
    }
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
        elevation={0}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    borderBottom: "none",
                    color: theme.palette.neutral.normal,
                  }}
                >
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  borderBottom: "none",
                  color: theme.palette.neutral.normal,
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: "none" },
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          borderBottom: "none",
                          ...(column.id === "Status" &&
                            statusStyles(row.status)),
                        }}
                      >
                        {column.id === "Department" ? (
                          <Typography
                            sx={{
                              backgroundColor: departmentStyles(row.interview_department),
                              color: theme.palette.common.white,
                              display: "inline-block",
                              borderRadius: "12px",
                              padding: "2px 8px",
                              fontSize: "0.875rem",
                            }}
                          >
                            {row.interview_department}
                          </Typography>
                        ) : column.render ? (
                          column.render(row)
                        ) : (
                          row[column.id]
                        )}
                        {
                          column.id === "Name" ? (
                            <Typography
                              sx={{
                                display: "inline-block",
                                borderRadius: "12px",
                                padding: "2px 8px",
                                fontSize: "0.875rem",
                              }}
                            >
                              {row.member_name + " " + row.candidat_lastName}
                            </Typography>
                          ) : null
                        }
                        {
                          column.id === "Score" ? (
                            <Typography
                              sx={{
                                display: "inline-block",
                                borderRadius: "12px",
                                padding: "2px 8px",
                                fontSize: "0.875rem",
                              }}
                            >
                              {(
                                [
                                  row.interview_situationGrade,
                                  row.interview_polePresentationGrade,
                                  row.interview_jeiKnowledgeGrade,
                                  row.interview_availabilityGrade,
                                  row.interview_rhQuestionsGrade,
                                  row.interview_associativeExperienceGrade
                                ]
                                  .filter((grade) => grade !== null && grade !== undefined)
                                  .reduce((acc, grade) => acc + grade, 0) /
                                [
                                  row.interview_situationGrade,
                                  row.interview_polePresentationGrade,
                                  row.interview_jeiKnowledgeGrade,
                                  row.interview_availabilityGrade,
                                  row.interview_rhQuestionsGrade,
                                  row.interview_associativeExperienceGrade
                                ].filter((grade) => grade !== null && grade !== undefined).length
                              ).toFixed(2)}
                            </Typography>
                          ) : null
                        }
                      </TableCell>
                    ))}
                    <TableCell sx={{ borderBottom: "none" }}>
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuOpen(event, row)}
                      >
                        <MoreVertIcon sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rowData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete Member</MenuItem>
      </Menu>
    </>
  );
};

export default DataTable2;
