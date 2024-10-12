import { Box, Grid , Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import MembersByGenderChart from "./Charts/MembersByGenderChart";

export default function MembersByGender() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
        padding: 2,
      }}
    >
      <Typography sx={{
          fontSize: 17,
          fontWeight: theme.typography.extraMeduim,
          color: theme.palette.text.main,
        }}>
        Members by gender
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: theme.typography.meduim,
          color: theme.palette.text.light,
          marginBlock: 0.3,
        }}
      >
        Find how many male and female members in the association
      </Typography>
      <MembersByGenderChart/>
    </Box>
  );
}
