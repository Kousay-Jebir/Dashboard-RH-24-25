import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const RecentInterviewKPI = ({
  poleGrade = "N/A",
  knowledgeGrade = "N/A",
  availabilityGrade = "N/A",
  RHGrade = "N/A",
  situationsGrade = "N/A",
  associativeGrade = "N/A",
}) => {
  const theme = useTheme();

  const formatGrade = (grade) => {
    // Check if the grade is a string that contains "/"
    if (typeof grade === "string" && grade.includes("/")) {
      return grade; // Return as is if it's already in "x/y" format
    }
    // If it's a number, format it as "x/100"
    return `${grade}/100`;
  };

  const CustomKPI = ({
    title = "KPI default Title",
    value = "KPI default Value",
    width = "auto",
    height = "49px",
    borderRadius = "5px",
    border = "0.1px solid Lightgrey",
    titleStyle = {},
    valueStyle = {},
    boxStyle = {},
  }) => {
    return (
      <Box
        sx={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          border: border,
          display: "flex",
          padding:"8px 8px",
          flexDirection: "column",
          ...boxStyle,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "14.52px",

            textAlign: "left",
            color: (theme) => theme.palette.secondary.main,
            ...titleStyle,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "14px",
            textAlign: "left",
            fontWeight:theme.typography.fontWeightMedium,
            ...valueStyle,
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      <CustomKPI
        title="Pole presentation grade"
        value={formatGrade(poleGrade)}
        width="190px"
      />
      <CustomKPI
        title="Knowledge of JEI grade"
        value={formatGrade(knowledgeGrade)}
        width="180px"
      />
      <CustomKPI
        title="Availability grade"
        value={formatGrade(availabilityGrade)}
        width="170px"
      />
      <CustomKPI
        title="RH questions grade"
        value={formatGrade(RHGrade)}
        width="170px"
      />
      <CustomKPI
        title="Situations grade"
        value={formatGrade(situationsGrade)}
        width="180px"
      />
      <CustomKPI
        title="Associative experience grade"
        value={formatGrade(associativeGrade)}
        width="190px"
      />
    </Box>
  );
};

export default RecentInterviewKPI;
