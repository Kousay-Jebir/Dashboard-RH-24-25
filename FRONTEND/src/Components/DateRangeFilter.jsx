import * as React from "react";
import Calendar from "@mui/icons-material/Event";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTheme } from "@mui/material";

export default function DateRangeFilter() {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: {
              size: "small",
              InputProps: {
                endAdornment: <Calendar />,
              },
            },
          }}
          sx={{
            width: "190px",
            "& .MuiInputBase-input": {
              fontSize: "12px", // Reduced font size
              color: theme.palette.text.light,
            },
            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
              fontSize: "12px", 
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
