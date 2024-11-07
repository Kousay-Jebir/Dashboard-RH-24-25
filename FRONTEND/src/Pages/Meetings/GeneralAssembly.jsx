import GeneralAssemblyDataGrid from "../../Components/Meetings/Schedule/General Assembly/GeneralAssemblyDataGrid";
import { useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import DateRangeFilter from "../../Components/DateRangeFilter";
import dayjs from "dayjs";
import { api } from '../../service/api';
import useApi from '../../service/useApi';

const GeneralAssembly = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);


  const {loading,error,data} = useApi(api.getMeeting,[])
  const meetings = data.data;
 
  if (loading) return <div>Loading...</div>; // Loading indicator
  if (error) return <div>Error: {error}</div>; // Error handling

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle date range change
  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  // Filter meetings based on search query and date range
  const filteredMeetings = 
      meetings
      .filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((meeting) => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
        const interviewDate = dayjs(interview.date)
        console.log(interview.date)
        console.log(interviewDate)
        return interviewDate.startOf('day').isBetween(startDate, endDate, null, '[]');
      });


  return (
    <Grid container spacing={2}>
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
          <GeneralAssemblyDataGrid Data={filteredMeetings} />
        </BorderBox>
      </Grid>
    </Grid>
  );
};

export default GeneralAssembly;
