import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";
import useApi from "../../../service/useApi";
import { api } from "../../../service/api";

const MembersByCategoryChart = () => {
  const theme = useTheme();
  // Using the custom hook to fetch data
  const { data, loading, error } = useApi(api.getMember, []);
  
  // Destructure members data correctly
  const members = data?.data || []; // Safe access if `data` is undefined initially
  
  const [chartData, setChartData] = useState({
    poles: [],
  });

  useEffect(() => {
    if (members.length > 0) {
      // Organize the data by department
      const departments = members.reduce((acc, member) => {
        if (member.interview_department) {
          if (!acc[member.interview_department]) {
            acc[member.interview_department] = 0;
          }
          acc[member.interview_department] += 1; // Increment count of members in each department
        }
        return acc;
      }, {});

      // Convert the department data into a format suitable for the chart
      const chartFormattedData = Object.keys(departments).map((department) => ({
        label: department,
        value: departments[department],
      }));

      setChartData({ poles: chartFormattedData });
    }
  }, [members]); // Re-run effect whenever `members` data changes

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // Dynamic color mapping (You can improve this mapping based on your requirements)
  const departmentColors = {
    "Projet": theme.palette.green.main,
    "Dév. Commercial": theme.palette.lightBlue.main,
    "Marketing": theme.palette.blue.main,
    // You can add more departments here if needed
  };

  return (
    <Box sx={{ maxWidth: 400, borderColor: theme.palette.neutral.light }}>
      <BarChart
        borderRadius={8}
        margin={{
          left: 25,
          right: 25,
          top: 10,
          bottom: 7,
        }}
        xAxis={[
          {
            id: "barCategories",
            data: chartData.poles.map((pole) => pole.label),
            scaleType: "band",
            categoryGapRatio: 0.4,
            colorMap: {
              type: "ordinal",
              colors: chartData.poles.map((pole) =>
                departmentColors[pole.label] || theme.palette.grey.main
              ),
            },
          },
        ]}
        series={[
          {
            data: chartData.poles.map((pole) => pole.value),
          },
        ]}
        width={270}
        height={200}
        leftAxis={{
          disableTicks: true,
        }}
        bottomAxis={{
          disableTicks: true,
        }}
      />
      <Stack direction="column" gap={0.5} marginInline={1} marginTop={4} marginBottom={1}>
        {chartData.poles.map((pole, index) => (
          <Stack key={index} alignItems="center" direction="row" gap={0.7}>
            <Box
              sx={{
                bgcolor: departmentColors[pole.label] || theme.palette.grey.main, // Use department color
                width: 17,
                height: 17,
                borderRadius: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.primary,
              }}
            >
              {pole.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default MembersByCategoryChart;
