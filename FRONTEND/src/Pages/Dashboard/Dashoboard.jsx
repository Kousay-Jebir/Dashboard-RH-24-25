import React from "react";
import { Box, Grid, useTheme } from "@mui/material";

import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";
import Schedule from "../../Components/Dashboard/Schedule";

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
      <Grid container spacing={2}>

        <Grid item xs={4} >
          <MembersByCategory />
        </Grid>

        <Grid item xs={4} > 
          <MembersByGender />
        </Grid>

        <Grid item xs={4} >
          <Schedule />
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashoboard;
