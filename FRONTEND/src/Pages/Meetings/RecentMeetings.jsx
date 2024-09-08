import React, { useState, useMemo } from "react";
import RecentMeetingsGrid from "../../Components/Meetings/RecentMeetingsGrid";
import { Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import DateRangeFilter from "../../Components/DateRangeFilter";
import dayjs from "dayjs";
import data from "../../Components/Meetings/RecentMetingsData.json";

const RecentMeetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const filteredMeetings = useMemo(() => {
    return data
      .filter((meeting) =>
        meeting.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((meeting) => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
        const meetingDate = dayjs(meeting.Date, "DD-MM-YYYY");
        return meetingDate.isBetween(startDate, endDate, null, "[]");
      });
  }, [searchQuery, dateRange]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={8}>
          <SearchBar
            placeHolder={"Search for meeting"}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
        </Grid>
        <Grid item xs={12}>
          <BorderBox radius={2}>
            <RecentMeetingsGrid Data={filteredMeetings} />
          </BorderBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecentMeetings;