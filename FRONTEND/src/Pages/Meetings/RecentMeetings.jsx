import React, { useState, useMemo } from "react";
import RecentMeetingsGrid from "../../Components/Meetings/RecentMeetingsGrid";
import { Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import DateRangeFilter from "../../Components/DateRangeFilter";
import dayjs from "dayjs";
import { api } from "../../service/api";
import useApi from "../../service/useApi";

const RecentMeetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const {loading,error,data} = useApi(api.getMeeting,[])
  const meetings = data.data;
 
  if (loading) return <div>Loading...</div>; // Loading indicator
  if (error) return <div>Error: {error}</div>; // Error handling

  const filteredMeetings =  meetings
      .filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((meeting) => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
        const meetingDate = dayjs(meeting.Date, "DD-MM-YYYY");
        return meetingDate.isBetween(startDate, endDate, null, "[]");
      });


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