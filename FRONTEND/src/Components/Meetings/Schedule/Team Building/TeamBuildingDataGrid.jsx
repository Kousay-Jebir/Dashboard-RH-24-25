import React from "react";
import DataTable from "../../../DataTable";
import BorderBox from "../../../../components/BorderBox";

const columns = [
  { id: "title", label: "Meeting title" },
  { id: "location", label: "Location" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
];

const TeamBuildingDataGrid = ({ Data }) => {
  return (
    <BorderBox radius={2}>
      <DataTable columns={columns} rowData={Data}></DataTable>
    </BorderBox>
  );
};

export default TeamBuildingDataGrid;
