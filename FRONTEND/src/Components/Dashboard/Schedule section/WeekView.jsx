import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material";
import dayjs from "dayjs"; // Import dayjs
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

// Helper function to generate all weeks of the year using Day.js
const generateWeeksOfYear = () => {
  const startOfYear = dayjs().startOf("year"); // Start from the beginning of the year
  const endOfYear = dayjs().endOf("year"); // End on December 31st of the year

  let weeks = [];
  let currentWeekStart = startOfYear;

  while (currentWeekStart.isBefore(endOfYear)) {
    const currentWeekEnd = currentWeekStart.add(6, "day"); // Add 6 days to form a week
    const daysOfWeek = [];
    
    for (let i = 0; i < 7; i++) {
      // Ensure each day is a dayjs object
      daysOfWeek.push(currentWeekStart.add(i, "day"));
    }
    weeks.push(daysOfWeek);
    
    // Move to the next week
    currentWeekStart = currentWeekStart.add(7, "days");
  }

  return weeks;
};

const WeekView = ({ selectedDay, setSelectedDay }) => {
  const theme = useTheme();
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // Track the current week
  const [dates, setDates] = useState([]); // Store all weeks of the year

  // Initialize the dates array on mount
  useEffect(() => {
    setDates(generateWeeksOfYear());
  }, []);

  // Set the default selected day to today
  useEffect(() => {
    if (dates.length === 0) return; // Ensure dates are populated before accessing them

    const today = dayjs(); // Get today's date using Day.js
    const todayWeekIndex = dates.findIndex((week) =>
      week.some((day) => day.isSame(today, "day"))
    );
    if (todayWeekIndex !== -1) {
      setCurrentWeekIndex(todayWeekIndex); // Set the current week index to the week that contains today
    }
    setSelectedDay(today); // Set today's date as the selected day by default
  }, [dates, setSelectedDay]);

  const handleNextWeek = () => {
    if (currentWeekIndex < dates.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1); // Move to the next week
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1); // Move to the previous week
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day); // Update the selected day
  };

  // Ensure currentWeek is set only after dates are populated
  const currentWeek = dates[currentWeekIndex] || []; // Avoid undefined access
  const currentMonth = currentWeek.length ? dayjs(currentWeek[0]).format("MMMM") : ""; // Get the month of the first day of the week
  const currentYear = currentWeek.length ? dayjs(currentWeek[0]).format("YYYY") : ""; // Get the year of the first day of the week

  return (
    <Box maxWidth={335} maxHeight={62}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Typography fontSize={15} fontWeight={600}>
            {currentMonth} {currentYear}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="Previous week"
            size="small"
            onClick={handlePreviousWeek}
            disabled={currentWeekIndex === 0}
            color={theme.palette.neutral.main}
            sx={{
              backgroundColor: theme.palette.white.main,
              border: 2,
              borderRadius: 1,
              borderColor: theme.palette.neutral.light,
              width: 20,
              height: 20,
              "&:hover": {
                backgroundColor: theme.palette.neutral.main,
                color: theme.palette.white.main,
                border: 0,
              },
            }}
          >
            <ArrowBackIosRoundedIcon sx={{ width: 15, height: 15 }} />
          </IconButton>

          <Typography variant="contained" marginInline={1} align="center" fontSize={12}>
            Week {currentWeekIndex + 1}
          </Typography>

          <IconButton
            aria-label="Next week"
            size="small"
            onClick={handleNextWeek}
            disabled={currentWeekIndex === dates.length - 1}
            color={theme.palette.neutral.main}
            sx={{
              backgroundColor: theme.palette.white.main,
              border: 2,
              borderRadius: 1,
              borderColor: theme.palette.neutral.light,
              width: 20,
              height: 20,
              "&:hover": {
                backgroundColor: theme.palette.neutral.main,
                color: theme.palette.white.main,
                border: 0,
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ width: 15, height: 15 }} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        {currentWeek.map((day, dayIndex) => {
          const dayName = dayjs(day).format("ddd"); // Abbreviated day name (e.g., Mon, Tue, Wed)
          const isSelectedDay = selectedDay && dayjs(day).isSame(selectedDay, "day"); // Check if the day is selected

          return (
            <Grid item key={dayIndex} xs>
              <Box
                width={32}
                height={36}
                borderRadius={1}
                bgcolor={isSelectedDay ? theme.palette.primary.main : "transparent"}
                color={isSelectedDay ? "white" : "inherit"}
                onClick={() => handleDayClick(day)} // Set selected day
                style={{ cursor: "pointer" }}
              >
                <Typography fontSize={11} fontWeight={500} align="center" color={isSelectedDay ? theme.palette.white.main : theme.palette.neutral.normal}>
                  {dayName}
                </Typography>
                <Typography fontSize={11} fontWeight={500} align="center" color={isSelectedDay ? theme.palette.white.main : "inherit"}>
                  {day.date()}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeekView;
