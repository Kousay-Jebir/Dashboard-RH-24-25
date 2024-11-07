import React from 'react'
import DataTable from '../../../DataTable'


const columns = [
    { id: "title", label: "Meeting title" },
    { id: "location", label: "Location" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
  ];

const EventDataGrid = ({Data}) => {
  console.log(Data);
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  )
}

export default EventDataGrid
