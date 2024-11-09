import DataTable from '../../../DataTable'
import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MeetingDetails from '../../MeetingDetails/MeetingDetails';

const columns = [
    { id: "title", label: "Meeting title" },
    { id: "location", label: "Location" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
  ];

const EventDataGrid = ({Data}) => {
  const navigate = useNavigate();
    const [meetingId, setMeetingId] = useState(null);
    const [open, setOpen] = useState(false); // Keep this state here for the drawer
  
    const setId = (id) => {
      setMeetingId(id);
    };
  
    const handleDrawerToggle = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerContent = <MeetingDetails  meetingId={meetingId}/>;
  console.log(Data);
  return (
    <>
      <Drawer
            open={open}
            onClose={handleDrawerToggle(false)} // Ensure the drawer closes correctly
            anchor="right"
            sx={{
              '& .MuiBackdrop-root': {
                backdropFilter: 'blur(5px)',
              },
              '& .MuiDrawer-paper': {
                padding: 0,
              },
            }}
          >
            {DrawerContent}
          </Drawer>
          <DataTable
          columns={columns}
          rowData={Data}
          expandArrowNavigation={handleDrawerToggle(true)} // Toggle the drawer open
          setMeetingId={setId}
        />
    </>
  )
}

export default EventDataGrid
