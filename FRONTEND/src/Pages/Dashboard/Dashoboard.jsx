import React from "react";
import { Box, Grid, useTheme } from "@mui/material";

import MembersByCategory from "../../Components/Dashboard/MembersByCategory";
import MembersByGender from "../../Components/Dashboard/MembersByGender";

const Dashoboard = () => {

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
        <Grid item >
          <MembersByCategory />
        </Grid>
        <Grid item >
          <MembersByGender />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashoboard;
