import React from "react";
import DepartmentDataGrid from "../../Components/Meetings/Schedule/Department/DepartmentDataGrid";
import SearchBar from "../../components/SearchBar";
import StatusBar from "../../Components/Recrutement/Schedule/list/StatusBar";
import { Box, Grid } from "@mui/material";
import { statuses } from "../../Components/Recrutement/interview-states";
import { useState } from "react";
import data from "../../Components/Meetings/Schedule/Department/DepartmentData.json";
import DateRangeFilter from "../../Components/DateRangeFilter";
import dayjs from "dayjs";

const DepartmentMeetings = () => {
  const [interviews, setInterviews] = useState(data);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [dateRange, setDateRange] = useState([null, null]);

  // Create a counts object with initial counts set to 0
  const statusCounts = {
    CONFIRMED: 0,
    DELAYED: 0,
    CANCELLED: 0,
  };

  // Count the occurrences of each status
  interviews.forEach((interview) => {
    const status = interview.Status.toUpperCase();
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status]++;
    }
  });

  // Create the array of counts in the order: CONFIRMED, DELAYED, CANCELLED
  const countsArray = [
    interviews.length,
    statusCounts.CONFIRMED,
    statusCounts.DELAYED,
    statusCounts.CANCELLED,
  ];

  // Filter interviews based on both status and search query
  const filteredInterviews = interviews
    .filter(
      (interview) =>
        activeStatus === statuses.ALL.id ||
        interview.Status.toUpperCase() === activeStatus
    )
    .filter(
      (interview) =>
        interview.Title.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming `Name` is a field in the interview data
    )
    .filter((interview) => {
      const [startDate, endDate] = dateRange;
      if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
      const interviewDate = dayjs(interview.Date, "DD-MM-YYYY");
      return interviewDate.isBetween(startDate, endDate, null, "[]");
    });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Grid spacing={2} container >
      <Grid xs={12} md={8} item >
        <SearchBar
          placeHolder={"Search for interview"}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid xs={12} md={4} item >
        <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
      </Grid>
      <Grid xs={12} item>
        <StatusBar
          countsArray={countsArray}
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
        />
      </Grid>
      <Grid xs={12} item >
        <DepartmentDataGrid Data={filteredInterviews} />
      </Grid>
    </Grid>
  );
};

export default DepartmentMeetings;
