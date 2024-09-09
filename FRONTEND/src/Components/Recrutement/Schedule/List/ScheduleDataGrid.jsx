import React from "react";
import DataTable from "../../../DataTable";
import { Typography } from "@mui/material";

const columns = [
  { id: "Name", label: "Name" },
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Recruiter", label: "Recruiter" },
  { id: "Status", label: "Status" },
];


const ScheduleDataGrid = ({data}) => {
  return <DataTable columns={columns} rowData={data} />;
};

export default ScheduleDataGrid;
