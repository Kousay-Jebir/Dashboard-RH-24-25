import { TextField, Box } from "@mui/material";

const Duration = ({ value, onChange, error }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Duration (minutes)"
        variant="outlined"
        type="number"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? "Please enter a valid duration." : ""}
        fullWidth
      />
    </Box>
  );
};

export default Duration;
