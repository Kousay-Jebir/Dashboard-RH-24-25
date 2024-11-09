import DataTable from "../../../DataTable"
import MeetingDetails from "../../MeetingDetails/MeetingDetails";
import React from "react";
import { Drawer } from "@mui/material";

const columns = [
    { id: "title", label: "Meeting title" },
    { id: "ag", label: "AG" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "place", label: "place" },
  ];

const GeneralAssemblyDataGrid = ({Data}) => {

  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

 const [open, setOpen] = React.useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 
  let DrawerContent = <MeetingDetails />

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter:'blur(5px)'
          },
          '& .MuiDrawer-paper': {
              padding: 0,
            },
        }}
        >
          {DrawerContent}
        </Drawer>
      <DataTable columns={columns} rowData={Data}></DataTable>
    </>
  )
}

export default GeneralAssemblyDataGrid
