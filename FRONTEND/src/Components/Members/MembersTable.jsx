import React from 'react'
import DataTable2 from '../DataTable2'

const columns = [
    { id: "Name", label: "Name" },
    { id: "member_email", label: "E-mail" },
    { id: "Department", label: "Department" },
    { id: "candidat_adress", label: "Address" },
    { id: "candidat_city", label: "City" },
    { id: "candidat_field", label: "Field" },
    { id: "candidat_year", label: "Year" },
    { id: "candidat_phone", label: "Phone Number" },
    { id: "Score", label: "Score" }
  ];


const MembersTable = ({Data}) => {

  return (
    <DataTable2 columns={columns} rowData={Data} />
  )
}

export default MembersTable
