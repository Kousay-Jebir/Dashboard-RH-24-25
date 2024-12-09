import React from "react";
import DataTable from "../../../DataTable";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "recruiter", label: "Recruiter" },
  { id: "status", label: "Status" },
];

const ScheduleDataGrid = ({data}) => {
  const navigate=useNavigate()
  return <DataTable columns={columns} rowData={data}/>;
};

export default ScheduleDataGrid;
