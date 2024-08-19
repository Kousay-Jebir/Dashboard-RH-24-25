import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";
import WeekView from "../../Components/Dashboard/WeekView";
import ScheduleCard from "../../Components/Dashboard/Schedule section/ScheduleCard";

const Dashoboard = () => {
  const handleDateChange = (newDate) => {
    console.log("Selected Date:", newDate);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: 1100,
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
        margin: 2,
        padding: 2,
      }}
    >
      <Grid container spacing={0.5}>
        <Grid item>
          <WeekView />
          <ScheduleCard />
        </Grid>
        <Grid item>
          <MembersByCategory />
        </Grid>
        <Grid item>
          <MembersByGender />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashoboard;
