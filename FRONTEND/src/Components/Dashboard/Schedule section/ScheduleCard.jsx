import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import useApi from "../../../service/useApi";
import { api } from "../../../service/api";
import { getDepartmentIdByDepartmentTitle } from "../../Recrutement/jei-departments";
import { getColorById } from "../../Recrutement/jei-departments";
const ScheduleCard = ({ selectedDay }) => {
  const theme = useTheme();

  // Fetch event data using the `useApi` hook
  const { data, loading, error } = useApi(api.getMeeting, []);
  
  // Extract events from the API response
  const events = data?.data || []; // Safe access to `data.data`

  // Convert selectedDay (which is a Date object) into a dayjs object and format it
  const selectedDateString = dayjs(selectedDay).format("YYYY-MM-DD");

  // Filter events for the selected date
  const selectedEvents = events.filter(event => {
    // Convert the event date to a dayjs object and format it as 'YYYY-MM-DD'
    const eventDate = dayjs(event.date).format("YYYY-MM-DD");
    return eventDate === selectedDateString; // Compare the dates
  });

  // Handle loading and error states
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box mt={10} border={1} borderRadius={2} borderColor={theme.palette.neutral.light} p={1} position="relative">
      {selectedEvents.length > 0 ? (
        
        selectedEvents.map((event, index) => {
          const departmentColor = getColorById(getDepartmentIdByDepartmentTitle(event.department));
          return (<Box key={index} mb={2}>
            <Grid container gap={0.5} alignItems="center">
              <Grid>
                <ForumRoundedIcon sx={{ color: theme.palette.neutral.normal, width: 12, height: 12 }} />
              </Grid>
              <Grid>
                <Typography fontSize={12} color={theme.palette.neutral.normal}>{event.status}</Typography>
              </Grid>
            </Grid>
            <Typography fontSize={14} fontWeight={500}>{event.title}</Typography>
            <Typography fontSize={12}>{event.time + " " + event.duration}</Typography>
            
            <Typography fontSize={12}>{event.place}</Typography>
            <Box>
              {/* <Typography fontSize={12} color={theme.palette.neutral.normal}>Added by</Typography> */}
              {/* <Typography fontSize={12}>{event.addedBy}</Typography> */}
            </Box>
            <Box textAlign="left" display="flex" alignItems="center" justifyContent="end" mt={1}>
              <Box border={1} borderRadius={2} color={theme.palette.white.main} bgcolor={departmentColor} p={1}>
                <Typography fontSize={10}>{event.department}</Typography>
              </Box>
            </Box>
          </Box>)
})
      ) : (
        <Typography>No events scheduled for this day.</Typography>
      )}
    </Box>
  );
};

export default ScheduleCard;
