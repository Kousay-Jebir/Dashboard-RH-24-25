import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ScheduleButton({  schedule, sx,variant='contained',onClick }) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      startIcon={<AddIcon />}
      disableElevation
      sx={{
        textTransform: "none",
        borderRadius: 1.5,
        ...sx,
      }}
    >
      {schedule}
    </Button>
  );
}
