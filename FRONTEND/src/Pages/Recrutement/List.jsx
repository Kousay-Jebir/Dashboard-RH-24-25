import { Box, useTheme } from '@mui/material';
import ScheduleDataGrid from '../../Components/Recrutement/Schedule/List/ScheduleDataGrid';
const List = () => {

  const theme = useTheme();

  return (
    <Box sx={{
      border: 2,
      borderRadius: 2,
      borderColor: theme.palette.neutral.light,
      margin: 2,
      padding: 2,
    }}>
        <ScheduleDataGrid/>
    </Box>
  )
}

export default List
