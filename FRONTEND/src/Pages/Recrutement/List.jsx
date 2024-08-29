import { Box, useTheme } from '@mui/material';
import ScheduleDataGrid from '../../Components/Recrutement/Schedule/List/ScheduleDataGrid';
import DateRangeFilter from '../../Components/DateRangeFilter';
import React, { useState } from 'react';

const List = () => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Box sx={{
      border: 2,
      borderRadius: 2,
      borderColor: theme.palette.neutral.light,
      margin: 2,
      padding: 2,
    }}>
      <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
      <ScheduleDataGrid dateRange={dateRange} />
    </Box>
  );
}

export default List;
