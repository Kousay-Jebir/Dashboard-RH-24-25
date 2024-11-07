import DataTable from "../../../DataTable"


const columns = [
    { id: "title", label: "Meeting title" },
    { id: "ag", label: "AG" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "place", label: "place" },
  ];

const GeneralAssemblyDataGrid = ({Data}) => {
  return (
    <DataTable columns={columns} rowData={Data}></DataTable>
  )
}

export default GeneralAssemblyDataGrid
