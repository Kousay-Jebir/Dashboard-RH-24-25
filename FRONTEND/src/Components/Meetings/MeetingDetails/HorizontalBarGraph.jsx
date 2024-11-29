import { Box, Grid } from "@mui/material";

export default function HorizontalBarGraph({ stats, colors, labels }) {
  // Map stats to percentages and associate with labels
  const mapStatsToPercentages = (stats) => {
    const total = Object.values(stats).reduce((acc, val) => acc + val, 0);
    return Object.entries(stats).map(([key, value]) => ({
      key,
      percentage: value / total,
    }));
  };

  const statsWithPercentages = mapStatsToPercentages(stats);

  return (
    <Grid container spacing={0.5}>
      {statsWithPercentages.map((stat, index) => (
        <Grid
          key={stat.key}
          item
          xs={Math.round(stat.percentage * 12)} // Dynamically calculate grid size
        >
          <Box
            sx={{
              bgcolor: colors[index % colors.length], // Cycle through colors
              height: 25,
            }}
          ></Box>
          {labels && labels[stat.key] && (
            <Box sx={{ textAlign: 'center', fontSize: 12, marginTop: 2 }}>
              {labels[stat.key]}: {(stat.percentage * 100).toFixed(1)}%
            </Box>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
