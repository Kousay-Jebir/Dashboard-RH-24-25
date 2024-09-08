import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import RecentInterviewKPI from "./RecentInterviewKPI";


const DataTable = ({data}) => {
  const [expandedRow, setExpandedRow] = useState(null); // Track expanded row
  const theme = useTheme();

  const handleExpandClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle row expansion
  };

  return (
    <TableContainer component={Paper} sx={{maxWidth: '100%', overflowX: 'auto' }} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Name</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Department</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Date</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Duration</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Recruiter</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Grade</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: "none" } }}>
                <TableCell sx={{ borderBottom: "none" }}>{row.name}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
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
                <TableCell sx={{ borderBottom: "none" }}>{row.date}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.duration}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.recruiter}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.grade}/100</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <IconButton size="small" onClick={() => handleExpandClick(index)}>
                    <ArrowForwardIosRoundedIcon
                      sx={{
                        fontSize: "1rem",
                        transform: expandedRow === index ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ paddingBottom: 2, borderBottom: "none" }}>
                    <Box p={2}>
                      <RecentInterviewKPI
                        poleGrade={row.poleGrade}
                        knowledgeGrade={row.knowledgeGrade}
                        availabilityGrade={row.availabilityGrade}
                        RHGrade={row.RHGrade}
                        situationsGrade={row.situationsGrade}
                        associativeGrade={row.associativeGrade}
                      />
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
