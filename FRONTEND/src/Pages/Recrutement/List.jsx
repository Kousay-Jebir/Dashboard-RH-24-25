import { Box, useTheme } from '@mui/material';
import ScheduleDataGrid from '../../Components/Recrutement/Schedule/List/ScheduleDataGrid';
import BorderBox from '../../components/BorderBox';

const List = ({data}) => {

  const theme = useTheme();

  return (
    <BorderBox radius={2}>
        <ScheduleDataGrid data={data}/>
    </BorderBox>
  )
}

export default List
