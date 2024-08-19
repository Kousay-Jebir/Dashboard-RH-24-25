import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const RecruitementInterviewCard = () => {

  const theme = useTheme();

  return (
    <Box
      mt={10}
      border={1}
      borderRadius={2}
      borderColor={theme.palette.neutral.light}
      p={1}
      width={240}
      position="relative" 
    >
      <Grid container gap={0.5} alignItems="center">
        <Grid>
          <ForumRoundedIcon
            sx={{
              color: theme.palette.neutral.normal,
              width: 12,
              height: 12,
            }}
          />
        </Grid>
        <Grid>
          <Typography fontSize={11} color={theme.palette.neutral.normal}>
            Recruitement interview
          </Typography>
        </Grid>
      </Grid>
      <Typography fontSize={13} fontWeight={500}>
        Inteview with Ben Marzouk Wahib
      </Typography>
      <Typography fontSize={11}>08/10/2024 - 9:00 AM - 9:45 AM</Typography>
      <Box>
        <Typography fontSize={11} color={theme.palette.neutral.normal}>
          Will be interviewed by
        </Typography>
        <Typography fontSize={11}>Youssef Dhieb</Typography>
      </Box>
      <Box
        textAlign="left"
        display="flex"
        alignItems="center"
        justifyContent="end" 
        mt={1}
      >
        <Box
          border={1}
          borderRadius={2}
          color={theme.palette.white.main}
          bgcolor={theme.palette.purple.main}
          p={0.6} 
        >
          <Typography fontSize={10}>Marketing</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecruitementInterviewCard;
