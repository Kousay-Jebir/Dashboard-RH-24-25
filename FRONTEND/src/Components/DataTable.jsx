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
  useTheme,
  Box,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const DataTable = ({ columns, rowData }) => {
  const [expandedRow, setExpandedRow] = useState(null);
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
        return { color: theme.palette.warning.light };
      case "Confirmed":
      default:
        return { color: theme.palette.success.main };
    }
  };

  return (
    <TableContainer component={Paper} sx={{maxWidth: "100%", overflowX: "auto" }} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: "none" } }}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{
                    borderBottom: "none",
                    ...(column.id === "Status" && statusStyles(row.Status)),
                  }}>
                    {column.id === "Department" ? (
                      <Typography
                        sx={{
                          backgroundColor: departmentStyles(row.Department),
                          color: theme.palette.common.white,
                          display: "inline-block",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.Department}
                      </Typography>
                    ) : (
                      column.render ? column.render(row) : row[column.id]
                    )}
                  </TableCell>
                ))}
                <TableCell sx={{ borderBottom: "none" }}>
                  <IconButton size="small" onClick={() => handleExpandClick(index)}>
                    <ArrowForwardIosRoundedIcon
                      sx={{
                        fontSize: "1rem",
                        transform: expandedRow === index ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} sx={{ paddingBottom: 2, borderBottom: "none" }}>
                    <Box p={2}>
                      <Typography variant="body2">
                        Additional details for {row.name || row.Title}...
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
