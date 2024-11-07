import { Box, Typography } from '@mui/material';

const HorizontalBarGraph = ({ stats, colors }) => {
  // Calculate total absences (justified + unjustified)
  const totalAbsent = stats.absent.justified + stats.absent.unjustified;
  const total = stats.present + totalAbsent; // Total number of participants (present + absent)

  return (
    <Box sx={{ width: '100%' }}>
      {/* Present Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Box
          sx={{
            width: `${(stats.present / total) * 100}%`,
            height: 20,
            backgroundColor: colors[0], // Color for present
            borderRadius: 2,
          }}
        />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
           Presence: {stats.present}/{total}
        </Typography>
      </Box>

      {/* Absence Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: `${(totalAbsent / total) * 100}%`,
            height: 20,
            backgroundColor: colors[1], // Color for absence
            borderRadius: 2,
          }}
        />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          Absence: {totalAbsent} ({stats.absent.unjustified} Unjustified )
        </Typography>
      </Box>
    </Box>
  );
};

export default HorizontalBarGraph;
