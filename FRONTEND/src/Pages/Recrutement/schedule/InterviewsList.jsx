import { Box, Grid } from "@mui/material";
import ScheduleHeader from "./ScheduleHeader";
import SearchBar from "../../../components/SearchBar";
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar";
import List from "../List";
import DateRangeFilter from "../../../Components/DateRangeFilter"; 
import data from "../../../Components/Recrutement/Schedule/List/ScheduleDataGrid.json";
import { useState } from "react";
import { statuses } from "../../../Components/Recrutement/interview-states";
import dayjs from "dayjs";

export default function InterviewsList() {
    const [interviews, setInterviews] = useState(data);
    const [activeStatus, setActiveStatus] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    const [dateRange, setDateRange] = useState([null, null]); // New state for date range

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

    // Filter interviews based on status, search query, and date range
    const filteredInterviews = interviews
        .filter(interview => 
            activeStatus === statuses.ALL.id || interview.Status.toUpperCase() === activeStatus
        )
        .filter(interview => 
            interview.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(interview => {
            const [startDate, endDate] = dateRange;
            if (!startDate || !endDate) return true; // If no date range is set, don't filter by date
            const interviewDate = dayjs(interview.Date, "DD-MM-YYYY");
            return interviewDate.isBetween(startDate, endDate, null, '[]');
        });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange);
    };

    return (
        <Grid container>
            <Box mb={2}>
                <SearchBar 
                    placeHolder={'Search for interview'}
                    onChange={handleSearchChange} 
                />
                <DateRangeFilter onDateRangeChange={handleDateRangeChange} /> {/* Add DateRangeFilter */}
            </Box>
            <Box mb={2}>
                <StatusBar countsArray={countsArray} activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
            </Box>
            <List data={filteredInterviews} />
        </Grid>
    );
}
