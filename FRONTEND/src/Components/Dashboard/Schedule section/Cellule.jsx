import { Box, Typography, useTheme } from "@mui/material"
const cellule = () => {

  const theme = useTheme();

  return (
    <Box
        border={1}
        borderRadius={2}
        color={theme.palette.white.main}
        bgcolor={theme.palette.purple.main}
        position="absolute" // Position absolutely
        bottom={10} // Adjust as needed
        right={10}   // Adjust as needed
        padding={0.7}
      >
        <Typography fontSize={10}>Cellule qualité</Typography>
      </Box>
  )
}

export default cellule
