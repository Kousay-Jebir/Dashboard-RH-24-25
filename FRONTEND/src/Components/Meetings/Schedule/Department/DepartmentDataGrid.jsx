import React from "react";
import DataTable from "../../../DataTable";
import BorderBox from "../../../../components/BorderBox";

const columns = [
  { id: "name", label: "Meeting title" },
  { id: "department", label: "Department" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "status", label: "Status" },
];
const DepartmentDataGrid = ({Data}) => {
  return <BorderBox radius={2}>
    <DataTable columns={columns} rowData={Data} />
  </BorderBox>;
};

export default DepartmentDataGrid;
