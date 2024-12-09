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
  Box,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DataTable2 = ({ columns, rowData }) => {
  // const [expandedRow, setExpandedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const theme = useTheme();

  const handleExpandClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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
                              {row.member_name+" "+row.candidat_lastName}
                            </Typography>):null
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
                                  // Filter out null or undefined values
                                  .filter(grade => grade !== null && grade !== undefined)
                                  .reduce((acc, grade) => acc + grade, 0) /
                                  // Calculate the average
                                  [
                                    row.interview_situationGrade,
                                    row.interview_polePresentationGrade,
                                    row.interview_jeiKnowledgeGrade,
                                    row.interview_availabilityGrade,
                                    row.interview_rhQuestionsGrade,
                                    row.interview_associativeExperienceGrade
                                  ]
                                    .filter(grade => grade !== null && grade !== undefined).length
                                ).toFixed(2)} 
                            </Typography>):null
                        }
                      </TableCell>
                    ))}
                    <TableCell sx={{ borderBottom: "none" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandClick(index)}
                      >
                        <MoreVertIcon
                          sx={{
                            fontSize: "1.2rem",
                            // transform: expandedRow === index ? "rotate(90deg)" : "rotate(0deg)",
                            // transition: "transform 0.2s ease",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* {expandedRow === index && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ paddingBottom: 2, borderBottom: "none" }}>
                      <Box p={2}>
                        <Typography variant="body2">Additional details for {row.Name}...</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )} */}
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
    </>
  );
};

export default DataTable2;
