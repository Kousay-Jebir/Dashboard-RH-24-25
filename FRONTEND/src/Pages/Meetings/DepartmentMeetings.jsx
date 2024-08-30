import React from 'react'
import DepartmentDataGrid from '../../Components/Meetings/Schedule/Department/DepartmentDataGrid'
import SearchBar from '../../components/SearchBar'
import StatusBar from '../../Components/Recrutement/Schedule/list/StatusBar'
import { Box } from '@mui/material'
import { statuses } from '../../Components/Recrutement/interview-states'
import { useState } from 'react'
import data from "../../Components/Meetings/Schedule/Department/DepartmentData.json"


const DepartmentMeetings = () => {
    const [interviews, setInterviews] = useState(data);
    const [activeStatus, setActiveStatus] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

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

    // Filter interviews based on both status and search query
    const filteredInterviews = interviews
        .filter(interview => 
            activeStatus === statuses.ALL.id || interview.Status.toUpperCase() === activeStatus
        )
        .filter(interview => 
            interview.Title.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming `Name` is a field in the interview data
        );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
  return (
    <Box>
            <Box mb={2}>
                <SearchBar 
                    placeHolder={'Search for interview'}
                    onChange={handleSearchChange} 
                />
            </Box>
            <Box mb={2}>
                <StatusBar countsArray={countsArray} activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
            </Box>
            <DepartmentDataGrid Data={filteredInterviews}/>
        </Box>
  )
}

export default DepartmentMeetings
