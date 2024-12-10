import { Box, Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { api } from "../../../service/api";

export default function MeetingTypesChart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the APIs
        const departmentMeetings = await api.getTotalDepartmentMeeting();
        const events = await api.getTotalEvent();
        const teamBuildings = await api.getTotalTeamBuilding();
        const generalAssemblies = await api.getTotalGeneralAssembly();

        // Process the data
        const data = [
          { id: "departmentMeetings", label: "Department Meetings", value: departmentMeetings?.data?.totalMeetings || 0 },
          { id: "generalAssemblies", label: "General Assemblies", value: generalAssemblies?.data?.totalMeetings || 0 },
          { id: "teamBuildings", label: "Team Buildings", value: teamBuildings?.data?.totalMeetings || 0 },
          { id: "events", label: "Events", value: events?.data?.totalMeetings || 0 },
        ];
        console.log(departmentMeetings)
        const total = data.reduce((acc, curr) => acc + curr.value, 0);
        setChartData(data);
        setTotalValue(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getArcLabel = (params) => {
    const percent = params.value / totalValue;
    return `${(percent * 100).toFixed(1)}%`;
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (totalValue === 0) {
    return <Typography>No data available</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 250,
        borderColor: theme.palette.neutral.light,
      }}
    >
      <PieChart
        series={[
          {
            paddingAngle: 1,
            innerRadius: 60,
            outerRadius: 80,
            cornerRadius: 5,
            data: chartData,
            arcLabel: getArcLabel,
            arcLabelRadius: 107,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 40, additionalRadius: -20, color: "gray" },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontSize: 14,
            fill: theme.palette.text.light,
          },
        }}
        colors={[
          theme.palette.purple.main,
          theme.palette.blue.main,
          theme.palette.lightBlue.main,
          theme.palette.green.main,
        ]}
        margin={{ top: 2, left: 2, right: 2, bottom: 2 }}
        height={220}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
      <Stack direction="column" gap={0.5} marginInline={1} marginBlock={1}>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.purple.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.medium,
              color: theme.palette.text.main,
            }}
          >
            Department Meetings
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.blue.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.medium,
              color: theme.palette.text.main,
            }}
          >
            General Assemblies
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.lightBlue.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.medium,
              color: theme.palette.text.main,
            }}
          >
            Team Buildings
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" gap={0.7}>
          <Box
            sx={{
              bgcolor: theme.palette.green.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.medium,
              color: theme.palette.text.main,
            }}
          >
            Events
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
