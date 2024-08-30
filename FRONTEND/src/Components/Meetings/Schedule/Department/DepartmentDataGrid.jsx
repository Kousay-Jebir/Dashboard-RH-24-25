import React from "react";
import DataTable from "../../../DataTable";
import BorderBox from "../../../../components/BorderBox";

const columns = [
  { id: "Title", label: "Meeting title" },
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Status", label: "Status" },
];

const DepartmentDataGrid = ({Data}) => {
  return <BorderBox radius={2}>
    <DataTable columns={columns} rowData={Data} />
  </BorderBox>;
};

export default DepartmentDataGrid;
