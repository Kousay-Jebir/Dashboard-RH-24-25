import { Box, Typography } from "@mui/material";
import React from "react";

const TicketKPI = ({
  title = "KPI default Title",
  value = "KPI default Value",
  icon,
  height = "84px",
  padding = "15px 16px",
  borderRadius = "5px",
  border = "0.1px solid Lightgrey",
  titleVariant = "body1",
  valueVariant = "h5",
  titleStyle = {}, // Additional styles for title
  valueStyle = {}, // Additional styles for value
  boxStyle = {}, // Additional styles for the Box
  iconBoxStyle = {}, // Additional styles for the icon's Box
}) => {
  return (
    <Box
      sx={{
        height: height,
        padding: padding,
        borderRadius: borderRadius,
        border: border,
        display: "flex",
        flexDirection: "column",
        ...boxStyle, // Merging additional styles
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // between title and icon
          width: "100%",
        }}
      >
        <Typography
          variant={titleVariant}
          sx={{
            flexGrow: 1, // Allow title to take up available space
            ...titleStyle, // Merging additional styles
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: (theme) => theme.palette.secondary.main,

            justifyContent: "center",
            width: "28px",
            height: "28px",
            border: border,
            borderRadius: "4px",
            ...iconBoxStyle,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        variant={valueVariant}
        sx={{
          fontWeight: "bold",

          ...valueStyle,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default TicketKPI;
