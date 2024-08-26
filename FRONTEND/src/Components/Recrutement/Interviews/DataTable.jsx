import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
const rows = [
  {
    id: 1,
    name: "Snow Jon",
    pole: "Dév. Commercial",
    date: "20/10/2024",
    durée: 13,
    recruteur: "Amine Hamdi",
    score: 75,
  },
  {
    id: 2,
    name: "Ben Marzouk Wahib",
    pole: "Marketing",
    date: "08/10/2024",
    durée: 20,
    recruteur: "Youssef Dhieb",
    score: 99,
  },
  {
    id: 3,
    name: "Abid Aymen",
    pole: "Dév. Commercial",
    date: "03/10/2024",
    durée: 19,
    recruteur: "Amine Hamdi",
    score: 60,
  },
  {
    id: 4,
    name: "Khemiri Sahar",
    pole: "Projet",
    date: "18/10/2024",
    durée: 5,
    recruteur: "Amine Hamdi",
    score: 86,
  },
];

const getFullName = (value, row) => {
  return `${row.firstName || ""} ${row.lastName || ""}`;
};

const columns = [
  { field: "name", headerName: "Name", width: 160 },
  { field: "pole", headerName: "Pôle", width: 160 },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    //valueGetter: getFullName,
  },
  { field: "durée", headerName: "Durée", width: 130 },
  { field: "recruteur", headerName: "Recruteur", width: 130 },
  { field: "score", headerName: "Score", width: 130 },
  //{
  //   ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  //   renderCell: (params) => (
  //     <CustomDetailPanelToggle id={params.id} value={params.value} />
  //   ),
  // },
];

export default function DataTable() {
  console.log("Hi!");
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
