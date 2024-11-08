import { Box, Typography, useTheme } from "@mui/material";
import WeekView from "./Schedule section/WeekView";
import ScheduleCard from "./Schedule section/ScheduleCard";
import { useState } from "react";

const Schedule = () => {
  const theme = useTheme();

  const [selectedDay, setSelectedDay] = useState(new Date()); // Track the selected day

  return (
    <Box sx={{
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

      {/* Pass selectedDay to WeekView and ScheduleCard */}
      <WeekView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <ScheduleCard selectedDay={selectedDay} />
    </Box>
  );
}

export default Schedule;
