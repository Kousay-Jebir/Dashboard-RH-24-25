import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";
import DateFilter from "../../Components/Recrutement/Interviews/DateFilter";
import data from "../../Components/Recrutement/Interviews/InterviewsData.json";
import dayjs from "dayjs";

export default function Interviews() {
  const theme = useTheme();
  const [filteredData, setFilteredData] = useState(data);

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const filtered = data.filter((row) =>
        dayjs(row.date, "DD-MM-YYYY").format("DD-MM-YYYY") === selectedDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to all data if no date is selected
    }
  };

  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: theme.palette.neutral.light,
        margin: 2,
        padding: 2,
      }}
    >
      <DateFilter onDateChange={handleDateChange} />
      <InterviewsDataGrid data={filteredData} />
    </Box>
  );
}

