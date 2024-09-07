import React from "react";
import DataTable from "../../../DataTable";
import BorderBox from "../../../BorderBox";

const columns = [
  { id: "Title", label: "Meeting title" },
  { id: "Location", label: "Location" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
];

const TeamBuildingDataGrid = ({ Data }) => {
  return (
    <BorderBox radius={2}>
      <DataTable columns={columns} rowData={Data}></DataTable>
    </BorderBox>
  );
};

export default TeamBuildingDataGrid;
