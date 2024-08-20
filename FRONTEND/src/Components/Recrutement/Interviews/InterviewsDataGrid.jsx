import React from "react";
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
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import data from "./InterviewsData.json"; 

const DataTable = () => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} sx={{  padding: 1
     }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Name</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Department</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Date</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Duration</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Recruiter</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} >Grade</TableCell>
            <TableCell sx={{ borderBottom: "none" , color: theme.palette.neutral.normal }} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: "none" } }}
            >
              <TableCell sx={{ borderBottom: "none" }} >{row.name}</TableCell>
              <TableCell sx={{ borderBottom: "none" }} >
                <Typography
                  sx={{
                    backgroundColor:
                      row.department === "Dév. Commercial"
                        ? theme.palette.lightBlue.main
                        : row.department === "Projet"
                        ? theme.palette.blue.main
                        : theme.palette.green.main,
                    color: theme.palette.common.white,
                    display: "inline-block",
                    borderRadius: "12px",
                    padding: "2px 8px",
                    fontSize: "0.875rem",
                  }}
                >
                  {row.department}
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} >{row.date}</TableCell>
              <TableCell sx={{ borderBottom: "none" }} >{row.duration}</TableCell>
              <TableCell sx={{ borderBottom: "none" }} >{row.recruiter}</TableCell>
              <TableCell sx={{ borderBottom: "none" }} >{row.grade}/100</TableCell>
              <TableCell sx={{ borderBottom: "none" }} >
                <IconButton size="small">
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
