import React from 'react'
import DataTable from '../../../DataTable'
import Data from "./TeamBuildingData.json"

const columns = [
    { id: "Title", label: "Meeting title" },
    { id: "Location", label: "Location" },
    { id: "Date", label: "Date" },
    { id: "Time", label: "Time" },
  ];

const TeamBuildingDataGrid = () => {
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  );
}

export default TeamBuildingDataGrid
