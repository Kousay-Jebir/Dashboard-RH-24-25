import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

import MembersByCategoryChart from "./Charts/MembersByCategoryChart";

const MembersByCategory = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 380,
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
        margin: 2,
        padding: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 17,
          fontWeight: theme.typography.extraMeduim,
          color: theme.palette.text.main,
        }}
      >
        Members by category
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: theme.typography.meduim,
          color: theme.palette.text.light,
          marginBlock: 0.3,
        }}
      >
        Members are organized into 3 departments based on their personal
        interests or field of expertise.
      </Typography>
      <MembersByCategoryChart />
    </Box>
  );
};

export default MembersByCategory;
