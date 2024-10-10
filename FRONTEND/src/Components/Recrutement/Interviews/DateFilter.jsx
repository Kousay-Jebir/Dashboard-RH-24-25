import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTheme } from "@mui/material";

const DateFilter = ({ onDateChange }) => {

  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(date) => {
          const formattedDate = date ? dayjs(date).format("DD-MM-YYYY") : null;
          onDateChange(formattedDate);
        }}
        format="DD-MM-YYYY"
        slotProps={{ textField: { size: 'small' } }}
        sx={{ width: "200px",
          "& .MuiInputBase-input": {
                fontSize: "13px",
                color: theme.palette.text.light
              },
              "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                fontSize: "16px", 
              },
         }}
      />
    </LocalizationProvider>
  );
};

export default DateFilter;
