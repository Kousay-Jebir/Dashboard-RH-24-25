import { Box } from "@mui/material"
import ScheduleHeader from "./ScheduleHeader"
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar"
import List from "../List"
import data from "../../../Components/Recrutement/Schedule/List/ScheduleDataGrid.json"
import { useState } from "react";
import { statuses } from "../../../Components/Recrutement/interview-states"
export default function InterviewsList(){
    const [interviews,setInterviews] = useState(data);
    const [activeStatus, setActiveStatus] = useState('ALL');
    console.log(activeStatus)
    const filteredInterviews = activeStatus === statuses.ALL.id ? interviews : interviews.filter((interview)=>{
        return interview.Status.toUpperCase() === activeStatus
    })
    return(
        <Box >
            <Box mb={2}><ScheduleHeader/></Box>
            <Box mb={2}>
                <StatusBar activeStatus={activeStatus} setActiveStatus={setActiveStatus}></StatusBar>
            </Box>
            <List data={filteredInterviews}/>
        </Box>
    )
}