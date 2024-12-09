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
        sx={{
          width: "100%",
          height: "43px", 

          "& .MuiInputBase-root": {
            height: "100%", // Ensures input fills the height
          },
          "& .MuiInputBase-input": {
            fontSize: "13px",
            color: theme.palette.text.light,
          },
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            fontSize: "16px",
          },
          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            borderRadius: "6px",
            borderWidth: "2px", 
            borderColor: theme.palette.neutral.light, 
            borderStyle: "solid",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateFilter;
