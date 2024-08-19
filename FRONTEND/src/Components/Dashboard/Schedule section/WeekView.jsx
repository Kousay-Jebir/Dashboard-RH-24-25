import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  startOfYear,
  endOfYear,
  format,
  isSameWeek,
  isToday,
  isSameDay,
} from "date-fns";

// Generate all weeks of the year
const dates = eachWeekOfInterval(
  {
    start: startOfYear(new Date()), // Start from January 1st of the current year
    end: endOfYear(new Date()), // End on December 31st of the current year
  },
  {
    weekStartsOn: 1, // Start the week on Monday
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);
  return acc;
}, []);

const WeekView = () => {
  const theme = useTheme();

  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // Track the current week
  const [selectedDay, setSelectedDay] = useState(new Date()); // Track the selected day

  // UseEffect to initialize to the current week containing today's date
  useEffect(() => {
    const today = new Date();
    const todayWeekIndex = dates.findIndex((week) => {
      return isSameWeek(today, week[0], { weekStartsOn: 1 }); // Find the week that contains today
    });
    setCurrentWeekIndex(todayWeekIndex !== -1 ? todayWeekIndex : 0); // If found, set to that week

    // Set the default selected day to today
    setSelectedDay(today);
  }, []);

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

  const currentWeek = dates[currentWeekIndex]; // Get the current week to display
  const currentMonth = format(currentWeek[0], "MMMM"); // Get the month of the first day of the week
  const currentYear = format(currentWeek[0], "yyyy"); // Get the year of the first day of the week

  return (
    <Box maxWidth={335} maxHeight={62}>
      {/* Display Month and Year */}

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
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
              borderRadius: "4px",
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
            <ArrowBackIosRoundedIcon
              sx={{
                width: 15,
                height: 15,
              }}
            />
          </IconButton>
        
          <Typography variant="contained" marginInline={1} align="center" fontSize={12}>
            Week {currentWeekIndex + 1}
          </Typography>
        
          <IconButton
            aria-label="Next week"
            size="small"
            onClick={handleNextWeek}
            color={theme.palette.neutral.main}
            sx={{
              backgroundColor: theme.palette.white.main,
              border: 2,
              borderRadius: "4px",
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
            <ArrowForwardIosIcon
              sx={{
                width: 15,
                height: 15,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        {currentWeek.map((day, dayIndex) => {
          const dayName = format(day, "EEE"); // Abbreviated day name (e.g., Mon, Tue, Wed)
          const isSelectedDay = selectedDay && isSameDay(day, selectedDay); // Check if the day is selected

          return (
            <Grid item key={dayIndex} xs>
              <Box
                width={32}
                height={36}
                borderRadius={1}
                bgcolor={
                  isSelectedDay
                    ? theme.palette.primary.main // Highlight selected day
                    : "transparent"
                }
                color={isSelectedDay ? "white" : "inherit"}
                onClick={() => handleDayClick(day)}
                style={{ cursor: "pointer" }} // Change cursor to pointer for clickable days
              >
                <Typography
                  fontSize={11}
                  fontWeight={500}
                  align="center"
                  color={isSelectedDay ? theme.palette.white.main : theme.palette.neutral.normal}
                >
                  {dayName}
                </Typography>
                <Typography
                  fontSize={11}
                  fontWeight={500}
                  align="center"
                  color={isSelectedDay ? theme.palette.white.main : "inherit"}
                >
                  {day.getDate()}
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
