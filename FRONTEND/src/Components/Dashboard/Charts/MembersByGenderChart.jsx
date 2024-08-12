import { Box, Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useTheme } from "@emotion/react";
import data from "./MembersData.json";

export default function MembersByGenderChart() {
  const theme = useTheme();
  const filteredData = data.membres.filter(
    (member) => member.id === 2 || member.id === 3
  );
  const totalValue = 99;

  const getArcLabel = (params) => {
    const percent = params.value / totalValue;
    console.log(percent);
    return `${(percent * 100).toFixed(1)}%`;
  };

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
            data: filteredData,
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
        colors={[theme.palette.lightBlue.main, theme.palette.purple.main]}
        margin={{ top: 2, left: 2, right: 2, bottom: 2 }}
        height={200}
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
              bgcolor: theme.palette.lightBlue.main,
              width: 17,
              height: 17,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: theme.typography.meduim,
              color: theme.palette.text.main,
            }}
          >
            Homme
          </Typography>
        </Stack>
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
              fontWeight: theme.typography.meduim,
              color: theme.palette.text.main,
            }}
          >
            Femme
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
