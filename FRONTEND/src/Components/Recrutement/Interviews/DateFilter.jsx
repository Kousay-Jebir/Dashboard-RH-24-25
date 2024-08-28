import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DateFilter = ({ onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(date) => {
          const formattedDate = date ? dayjs(date).format("DD-MM-YYYY") : null;
          onDateChange(formattedDate);
        }}
        format="DD-MM-YYYY"
      />
    </LocalizationProvider>
  );
};

export default DateFilter;
