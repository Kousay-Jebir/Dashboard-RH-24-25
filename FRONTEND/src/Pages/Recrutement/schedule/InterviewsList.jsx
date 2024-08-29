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
     
    // Create a counts object with initial counts set to 0
    const statusCounts = {
        CONFIRMED: 0,
        DELAYED: 0,
        CANCELLED: 0
    };

    // Count the occurrences of each status
    interviews.forEach(interview => {
        const status = interview.Status.toUpperCase();
        if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
        }
    });

    // Create the array of counts in the order: CONFIRMED, DELAYED, CANCELLED
    const countsArray = [
        interviews.length,
        statusCounts.CONFIRMED,
        statusCounts.DELAYED,
        statusCounts.CANCELLED
    ];



    const filteredInterviews = activeStatus === statuses.ALL.id ? interviews : interviews.filter((interview)=>{
        return interview.Status.toUpperCase() === activeStatus
    })
    return(
        <Box >
            <Box mb={2}><ScheduleHeader/></Box>
            <Box mb={2}>
                <StatusBar  countsArray={countsArray} activeStatus={activeStatus} setActiveStatus={setActiveStatus}></StatusBar>
            </Box>
            <List data={filteredInterviews}/>
        </Box>
    )
}