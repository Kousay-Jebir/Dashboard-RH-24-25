import { Box } from "@mui/material";
import ScheduleHeader from "./ScheduleHeader";
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar";
import ScheduleDataGrid from "../../../Components/Recrutement/Schedule/List/ScheduleDataGrid";
export default function InterviewsList() {
  return (
    <Box>
      <Box mb={2}>
        <ScheduleHeader />
      </Box>
      <Box mb={2}>
        <StatusBar></StatusBar>
      </Box>
      <Box mb={2}>
        <ScheduleDataGrid />
      </Box>
    </Box>
  );
}
