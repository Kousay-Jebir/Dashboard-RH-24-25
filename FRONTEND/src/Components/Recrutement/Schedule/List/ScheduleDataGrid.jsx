import React from "react";
import DataTable from "../../../DataTable";
import data from "./ScheduleDataGrid.json";

const columns = [
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "recruiter", label: "Recruiter" },
  { id: "status", label: "Status" },
];

// const rowData = data.map(item => ({
//   ...item,
//   status: item.grade >= 60 ? 'Passed' : 'Failed'
// }));

const ScheduleDataGrid = () => {
  return <DataTable columns={columns} rowData={data} />;
};

export default ScheduleDataGrid;
