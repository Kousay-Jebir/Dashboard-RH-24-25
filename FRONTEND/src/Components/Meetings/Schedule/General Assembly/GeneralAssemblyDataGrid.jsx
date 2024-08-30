import DataTable from "../../../DataTable"


const columns = [
    { id: "Title", label: "Meeting title" },
    { id: "AG", label: "AG" },
    { id: "Date", label: "Date" },
    { id: "Time", label: "Time" },
    { id: "Place", label: "place" },
  ];

const GeneralAssemblyDataGrid = ({Data}) => {
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  )
}

export default GeneralAssemblyDataGrid
