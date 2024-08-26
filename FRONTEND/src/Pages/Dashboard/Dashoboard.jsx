import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";
import Schedule from "../../Components/Dashboard/Schedule";
import AllTicketsKPI from "../../Components/AllTicketsKPI";

const Dashoboard = () => {
  const handleDateChange = (newDate) => {
    console.log("Selected Date:", newDate);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: 1100,
        margin: 2,
        padding: 2,
      }}
    >
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Typography fontSize={26} fontWeight={theme.typography.extraMeduim}>Dashboard</Typography>
        </Grid>

        <Grid item xs={12} >
          <AllTicketsKPI  />
        </Grid>

        <Grid item xs={4}>
          <MembersByCategory />
        </Grid>

        <Grid item xs={4}>
          <MembersByGender />
        </Grid>

        <Grid item xs={4}>
          <Schedule />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashoboard;
