import React, { useState, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import TeamBuildingDataGrid from '../../Components/Meetings/Schedule/Team Building/TeamBuildingDataGrid';
import meetings from "../../Components/Meetings/Schedule/Team Building/TeamBuildingData.json";
import BorderBox from '../../components/BorderBox';
import SearchBar from '../../components/SearchBar';
import DateRangeFilter from '../../Components/DateRangeFilter';
import dayjs from "dayjs";


const TeamBuilding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const filteredMeetings = useMemo(() => {
    return meetings
      .filter(meeting => meeting.Title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(meeting => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true;
        const meetingDate = dayjs(meeting.Date, "DD-MM-YYYY");
        return meetingDate.isBetween(startDate, endDate, null, '[]');
      });
  }, [searchQuery, dateRange]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <SearchBar
            placeHolder={'Search for meeting'}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
        </Grid>
        <Grid item xs={12}>
            <TeamBuildingDataGrid Data={filteredMeetings} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamBuilding;
