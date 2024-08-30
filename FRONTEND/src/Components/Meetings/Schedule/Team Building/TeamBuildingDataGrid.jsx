import React from 'react'
import DataTable from '../../../DataTable'


const columns = [
    { id: "Title", label: "Meeting title" },
    { id: "Location", label: "Location" },
    { id: "Date", label: "Date" },
    { id: "Time", label: "Time" },
  ];

const TeamBuildingDataGrid = ({Data}) => {
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  );
}

export default TeamBuildingDataGrid
