import React, { useState, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import TeamBuildingDataGrid from '../../Components/Meetings/Schedule/Team Building/TeamBuildingDataGrid';
import BorderBox from '../../components/BorderBox';
import SearchBar from '../../components/SearchBar';
import DateRangeFilter from '../../Components/DateRangeFilter';
import dayjs from "dayjs";
import { api } from '../../service/api';
import useApi from '../../service/useApi';


const TeamBuilding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);


  const {loading,error,data} = useApi(api.getTeamBuilding,[])
  const meetings = data.data;
 
  if (loading) return <div>Loading...</div>; // Loading indicator
  if (error) return <div>Error: {error}</div>; // Error handling

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const filteredMeetings = 
     meetings
      .filter(meeting => meeting.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(meeting => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
        const interviewDate = dayjs(interview.date)
        console.log(interview.date)
        console.log(interviewDate)
        return interviewDate.startOf('day').isBetween(startDate, endDate, null, '[]');
      });
  

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
