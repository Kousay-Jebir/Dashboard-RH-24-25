import React, { useState } from 'react';
import { Box } from "@mui/material";
import ScheduleHeader from "./ScheduleHeader";
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar";
import ScheduleDataGrid from "../../../Components/Recrutement/Schedule/List/ScheduleDataGrid";
import DateRangeFilter from '../../../Components/DateRangeFilter';

export default function InterviewsList() {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Box>
      <Box mb={2}>
        <ScheduleHeader />
      </Box>
      <Box mb={2}>
        <StatusBar />
      </Box>
      <Box mb={2}>
        <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
        <ScheduleDataGrid dateRange={dateRange} />
      </Box>
    </Box>
  );
}
