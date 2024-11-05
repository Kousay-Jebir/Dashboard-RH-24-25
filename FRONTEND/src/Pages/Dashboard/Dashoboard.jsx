import { Box, Drawer, Grid, Typography, useTheme ,Button } from "@mui/material";
import React, { useState } from "react";

import AllTicketsKPI from "../../Components/AllTicketsKPI";
import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";
import Schedule from "../../Components/Dashboard/Schedule";
import ScheduleMeeting from "../../Components/Meetings/MeetingDetails/ScheduleMeeting";
import ScheduleInterview from "../../Components/Recrutement/ScheduleInterview";
import ScheduleButton from "../../Components/ScheduleButton";

import QRCodeDialog from "../../Components/Meetings/MeetingDetails/QrCodeDialog";

const Dashoboard = () => {
  const [open, setOpen] = useState(false); // State to control the Drawer
  const [selectedSchedule, setSelectedSchedule] = useState(null); // State to track selected schedule type

  //pop-up
  const [openP, setOpenP] = useState(false); // Gère l'ouverture et la fermeture du pop-up

  const handleOpen = () => {
    setOpenP(true);
  };

  const handleClose = () => {
    setOpenP(false);
  };

  //pop-up

  const theme = useTheme();

  // Function to open the Drawer and select the schedule type
  const toggleDrawer = (scheduleType) => {
    setSelectedSchedule(scheduleType);
    setOpen(true);
  };

  // Function to close the Drawer
  const closeDrawer = () => {
    setOpen(false);
    setSelectedSchedule(null); // Reset selected schedule type
  };

  return (
    <Box
      sx={{
        margin: 2,
        padding: 2,
      }}
    >
      {/* Drawer to display ScheduleInterview or ScheduleMeeting based on selectedSchedule */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        anchor="right"
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(5px)",
          },
          "& .MuiDrawer-paper": {
            padding: 2,
          },
        }}
      >
        {/* Conditional rendering of ScheduleInterview or ScheduleMeeting */}
        {selectedSchedule === "interview" && (
          <ScheduleInterview close={closeDrawer} />
        )}
        {selectedSchedule === "meeting" && (
          <ScheduleMeeting close={closeDrawer} />
        )}
      </Drawer>

      {/* Main content of the Dashboard */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography fontSize={26} fontWeight={theme.typography.extraMedium}>
            Dashboard
          </Typography>
        </Grid>

        {/* Button to open ScheduleInterview */}
        <Grid item xs={6} md={2}>
          <ScheduleButton
            onClick={() => toggleDrawer("interview")}
            variant="text"
            schedule="Schedule interview"
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </Grid>

        {/* Button to open ScheduleMeeting */}
        <Grid item xs={6} md={2}>
          <ScheduleButton
            onClick={() => toggleDrawer("meeting")}
            variant="contained"
            schedule="Schedule meeting"
          />
        </Grid>

        {/* Other components in the Dashboard */}
        <Grid item xs={12} md={12}>
          <AllTicketsKPI />
        </Grid>

        <Grid item xs={12} md={4}>
          <MembersByCategory />
        </Grid>

        <Grid item xs={12} md={4}>
          <MembersByGender />
        </Grid>

        <Grid item xs={12} md={4}>
          <Schedule />
        </Grid>
      </Grid>
      <Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Show QR Code
      </Button>
      {/* Utilisation du composant QRCodePopup pour afficher le QR code */}
      <QRCodeDialog open={openP} handleClose={handleClose} />
    </Box>
    </Box>
  );
};

export default Dashoboard;
