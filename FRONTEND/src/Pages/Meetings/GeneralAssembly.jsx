import GeneralAssemblyDataGrid from "../../Components/Meetings/Schedule/General Assembly/GeneralAssemblyDataGrid";
import meetings from "../../Components/Meetings/Schedule/General Assembly/GeneralAssemblyData.json";
import { useState, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import DateRangeFilter from "../../Components/DateRangeFilter";
import dayjs from "dayjs";

const GeneralAssembly = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle date range change
  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  // Filter meetings based on search query and date range
  const filteredMeetings = useMemo(() => {
    return meetings
      .filter((meeting) =>
        meeting.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((meeting) => {
        const [startDate, endDate] = dateRange;
        if (!startDate || !endDate) return true;
        const meetingDate = dayjs(meeting.Date, "DD-MM-YYYY");
        return meetingDate.isBetween(startDate, endDate, null, "[]");
      });
  }, [searchQuery, dateRange]);

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
