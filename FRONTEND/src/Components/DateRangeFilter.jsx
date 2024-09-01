import * as React from "react";
import Calendar from "@mui/icons-material/Event";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function DateRangeFilter({ onDateRangeChange }) {
  const [dateRange, setDateRange] = React.useState([null, null]);
  const theme = useTheme();

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["SingleInputDateRangeField"]}
        sx={{ paddingTop: "0px" }}
      >
        <DateRangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: {
              InputProps: {
                endAdornment: <Calendar />,
                style: {
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                },
              },
            },
          }}
          sx={{
            height: "43px",
            "& .MuiTextField-root": {
              minWidth: "250px",
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              color: theme.palette.text.primary,
              padding: "8px 12px", // Adjust padding to control the internal height
            },
            "& .MuiSvgIcon-root": {
              fontSize: "16px",
              color: theme.palette.text.light,
            },
            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              borderRadius: "6px", // Border radius for the input field
              borderWidth: "2px", // Border width for the input field
              borderColor: theme.palette.neutral.light, // Border color
              borderStyle: "solid", // Border style
            },
          }}
          format="DD-MM-YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
