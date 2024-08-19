import { Box, Typography, useTheme } from "@mui/material";
// import BorderBox from "../BorderBox";

import WeekView from "./Schedule section/WeekView";
import ScheduleCard from "./Schedule section/ScheduleCard";
const Schedule = () => {

    const theme = useTheme();

  return (
    <Box sx={{
        // maxWidth: 363,
        // minHeight: 486,
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
        padding: 2,
      }}>
        <Typography fontSize={16} fontWeight={theme.typography.extraMeduim} mb={0.5}>
            Schedule
        </Typography>
        <Typography fontSize={14} fontWeight={theme.typography.regular} color={theme.palette.neutral.normal} mb={2}>
            Find here scheduled events, meetings, interviews.
        </Typography>
        <WeekView />
        <ScheduleCard />
    </Box>
  )
}

export default Schedule
