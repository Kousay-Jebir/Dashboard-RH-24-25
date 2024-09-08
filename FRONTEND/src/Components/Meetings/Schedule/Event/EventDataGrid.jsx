import React from 'react'
import DataTable from '../../../DataTable'


const columns = [
    { id: "Title", label: "Meeting title" },
    { id: "Location", label: "Location" },
    { id: "Date", label: "Date" },
    { id: "Time", label: "Time" },
  ];

const EventDataGrid = ({Data}) => {
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  )
}

export default EventDataGrid
