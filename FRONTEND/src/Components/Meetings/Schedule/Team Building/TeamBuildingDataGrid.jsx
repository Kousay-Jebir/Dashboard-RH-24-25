import DataTable from "../../../DataTable";
import BorderBox from "../../../../components/BorderBox";
import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MeetingDetails from "../../MeetingDetails/MeetingDetails";
import { api } from "../../../../service/api";
const columns = [
  { id: "title", label: "Meeting title" },
  { id: "location", label: "Location" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
];

const TeamBuildingDataGrid = ({ Data }) => {
  const navigate = useNavigate();
    const [meetingId, setMeetingId] = useState(null);
    const [open, setOpen] = useState(false); // Keep this state here for the drawer
  
    const setId = (id) => {
      setMeetingId(id);
    };
  
    const handleDrawerToggle = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerContent = <MeetingDetails type="teamBuilding" updateMeetingService={api.updateTeamBuilding} meetingId={meetingId}/>;
  return (
    <BorderBox radius={2}>
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
          meetingUpdateService={api.updateTeamBuilding}
          expandArrowNavigation={handleDrawerToggle(true)} // Toggle the drawer open
          setMeetingId={setId}
        />
    </BorderBox>
  );
};

export default TeamBuildingDataGrid;
