import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const RecruitementInterviewCard = ({ interview }) => {
  const theme = useTheme();

  const departmentColors = {
    'Dév. Commercial': theme.palette.lightBlue.main,
    'Projet': theme.palette.blue.main,
    'Marketing': theme.palette.green.main,
  };

  return (
    <Box
      border={1}
      borderRadius={2}
      borderColor={theme.palette.neutral.light}
      p={1}
      mb={1} 
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
            Recruitment interview
          </Typography>
        </Grid>
      </Grid>
      <Typography fontSize={13} fontWeight={500} mb={1}>
        Interview with {interview.Interviewee}
      </Typography>
      <Typography fontSize={11} mb={1}>
        {interview.Date} - {interview.Time}
      </Typography>
      <Box mb={1}>
      <Typography fontSize={11}>
          <span style={{ color: theme.palette.neutral.normal }}>
            Will be interviewed by
          </span>{" "}
          {interview.Interviewer}
        </Typography>
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
          bgcolor={departmentColors[interview.Department] || theme.palette.grey[300]}
          p={0.6} 
        >
          <Typography fontSize={10}>{interview.Department}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecruitementInterviewCard;
