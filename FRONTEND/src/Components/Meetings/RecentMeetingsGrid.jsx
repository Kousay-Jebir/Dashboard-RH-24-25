import React from 'react'
import DataTable from "../DataTable"


const RecentMeetingsColumns = [
  {id:"title" , label:"Meeting title"},
  { id: "department", label: "Department" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "duration", label: "Duration"}
]

const RecentMeetingsGrid = ({Data}) => {
  return (
    <React.Fragment>
      <DataTable columns={RecentMeetingsColumns} rowData={Data}></DataTable>
    </React.Fragment>
  )
}

export default RecentMeetingsGrid
