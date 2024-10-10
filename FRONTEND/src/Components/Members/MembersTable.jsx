import React from 'react'
import DataTable2 from '../DataTable2'

const columns = [
    { id: "Name", label: "Name" },
    { id: "E-mail address", label: "E-mail" },
    { id: "Department", label: "Department" },
    { id: "Address", label: "Address" },
    { id: "City", label: "City" },
    { id: "Field", label: "Field" },
    { id: "Year", label: "Year" },
    { id: "Phone number", label: "Phone Number" },
    { id: "Score", label: "Score" }
  ];


const MembersTable = ({Data}) => {

  return (
    <DataTable2 columns={columns} rowData={Data} />
  )
}

export default MembersTable
