import { TextField, Box, Typography, useTheme } from "@mui/material";

const Duration = ({ value, onChange, error, onBlur }) => {
  const theme = useTheme();

  const handleDurationChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || Number(inputValue) >= 0) {
      onChange(e);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid",
        borderColor: theme.palette.neutral.light,
        borderRadius: 2,
        marginBlock: 2,
      }}
    >
      <Typography
        sx={{ fontSize: "18px", fontWeight: theme.typography.medium, m: 2 }}
      >
        Duration
      </Typography>
      <TextField
        type="number"
        value={value}
        onChange={handleDurationChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error ? "Please enter a valid duration." : ""}
        inputProps={{ min: "0" }} // Prevent negative values
      />
    </Box>
  );
};

export default Duration;
