import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { api } from "../service/api";

const DataTable = ({
  columns,
  rowData,
  meetingUpdateService=null,
  expandArrowNavigation = null,
  setMeetingId = null,
  changeStatus = false,
}) => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const theme = useTheme();
  
  // Local state to track selected status for each row
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    // Initialize selectedStatus with the current status for each row when data is loaded
    const initialStatus = {};
    rowData.forEach((row) => {
      initialStatus[row.id] = row.status;
    });
    setSelectedStatus(initialStatus);
  }, [rowData]);

  const handleExpandClick = (index) => {
    if (!expandArrowNavigation) {
      navigate(`/recruitement/interviews/${rowData[index].id}`);
    }
    if (setMeetingId) {
      setMeetingId(rowData[index].id);
    }
    expandArrowNavigation();
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleStatusChange = async(e, rowId,expandedRow) => {
    const newStatus = e.target.value;
    console.log(`Row ID: ${rowId}, New Status: ${newStatus}`);
    try{
      const result = await meetingUpdateService(rowId,{status:newStatus})
      setSelectedStatus((prevState) => ({
        ...prevState,
        [rowId]: newStatus, 
      }));
    }
    catch(error)
    {

    }

  };

  const departmentStyles = (Department) => {
    switch (Department.toLowerCase()) {
      case "dév. commercial":
        return theme.palette.lightBlue.main;
      case "projet":
        return theme.palette.green.main;
      case "cellule qualité":
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

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }} elevation={0}>
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
                  <TableCell
                    key={column.id}
                    sx={{
                      borderBottom: "none",
                      ...(column.id === "status" && statusStyles(row.status)),
                    }}
                  >
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
                    ) : column.id === "name" ? (
                      row.candidat?.name || row.title
                    ) : column.id === "date" ? (
                      <Typography
                        sx={{
                          display: "inline-block",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {dayjs(row.date).format("DD/MM/YYYY")}
                      </Typography>
                    ) : column.id === "status" && changeStatus ? (
                      // Conditional rendering for status change
                      <FormControl fullWidth size="small" variant="outlined">
                        <Select
                          variant="standard"
                          value={selectedStatus[row.id] || row.status} // Use local state value or fallback to row status
                          sx={{color:statusStyles(selectedStatus[row.id] || row.status)}}
                          onChange={(e) => handleStatusChange(e, row.id,expandedRow)}
                          label="Status"
                        >
                          <MenuItem value="Confirmed" sx={{color:statusStyles("Confirmed")}}>Confirmed</MenuItem>
                          <MenuItem value="Cancelled" sx={{color:statusStyles("Cancelled")}}>Cancelled</MenuItem>
                          <MenuItem value="Delayed" sx={{color:statusStyles("Delayed")}}>Delayed</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      row[column.id]
                    )}
                    {column.id === "location" ? (
                      <Typography
                        sx={{
                          display: "inline-block",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.place}
                      </Typography>
                    ) : null}
                    {column.id === "ag" ? (
                      <Typography
                        sx={{
                          display: "inline-block",
                          borderRadius: "12px",
                          padding: "2px 8px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.assemblyType}
                      </Typography>
                    ) : null}
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
                        Additional details for {row.candidat?.name || row.title}...
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
