import { Box } from "@mui/material";
import Layout from "../../../Components/Recrutement/Schedule/KanbanBoard/Layout";
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar";
import SearchBar from "../../../components/SearchBar";
import ScheduleHeader from "./ScheduleHeader";

export default function KanbanBoard(){
    return(
        <Box>
            <Box pb={1}><ScheduleHeader/></Box>
            <Layout></Layout>
        </Box>
    )
}