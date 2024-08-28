import React from "react";
import DataTable from "../../../DataTable";
import data from "./ScheduleDataGrid.json";

const columns = [
  { id: "Name", label: "Name" },
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Recruiter", label: "Recruiter" },
  { id: "Status", label: "Status" },
];

// const rowData = data.map(item => ({
//   ...item,
//   status: item.grade >= 60 ? 'Passed' : 'Failed'
// }));

const ScheduleDataGrid = () => {
  return <DataTable columns={columns} rowData={data} />;
};

export default ScheduleDataGrid;
