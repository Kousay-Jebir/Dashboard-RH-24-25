import * as React from "react";
import Calendar from "@mui/icons-material/Event";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: {
              size: "small",
              InputProps: {
                endAdornment: <Calendar />,
                style: { fontSize: '12px' }
              },
            },
          }}
          sx={{
            width: "250px",
            "& .MuiTextField-root": {
              minWidth: "250px",
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              color: theme.palette.text.primary,
            },
            "& .MuiSvgIcon-root": {
              fontSize: "16px",
              color: theme.palette.text.light,
            },
          }}
          format="DD-MM-YYYY" // Ensure correct format
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}