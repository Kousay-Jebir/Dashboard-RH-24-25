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

  const departmentStyles = (department) => {
    switch (department) {
      case "Dév. Commercial":
        return theme.palette.lightBlue.main;
      case "Projet":
        return theme.palette.blue.main;
      default:
        return theme.palette.green.main;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ padding: 1, maxWidth: "100%", overflowX: "auto" }}>
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
                  <TableCell key={column.id} sx={{ borderBottom: "none" }}>
                    {column.id === "department" ? (
                      <Typography
                        sx={{
                          backgroundColor: departmentStyles(row.department),
                          color: theme.palette.common.white,
                          display: "inline-block",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.department}
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
                        Additional details for {row.name}...
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
