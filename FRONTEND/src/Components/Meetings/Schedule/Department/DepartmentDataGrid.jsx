import React from "react";
import DataTable from "../../../DataTable";
import Data from "./DepartmentData.json"

const columns = [
  { id: "Title", label: "Meeting title" },
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Status", label: "Status" },
];

const DepartmentDataGrid = () => {
  return <DataTable columns={columns} rowData={Data} />;
};

export default DepartmentDataGrid;
