import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const ScheduleCard = () => {
  const theme = useTheme();

  return (
    <Box
      mt={10}
      border={1}
      borderRadius={2}
      borderColor={theme.palette.neutral.light}
      p={1}
      maxWidth={335}
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
          <Typography fontSize={12} color={theme.palette.neutral.normal}>
            Meeting
          </Typography>
        </Grid>
      </Grid>
      <Typography fontSize={14} fontWeight={500}>
        Réunion avec la consultante de la qualité pour la certification ISO 9001
      </Typography>
      <Typography fontSize={12}>9:00 AM - 9:45 AM</Typography>
      <Typography fontSize={12}>Via Google Meet</Typography>
      <Box>
        <Typography fontSize={12} color={theme.palette.neutral.normal}>
          Added by
        </Typography>
        <Typography fontSize={12}>Manai Rima</Typography>
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
          p={1} 
        >
          <Typography fontSize={10}>Cellule qualité</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleCard;
