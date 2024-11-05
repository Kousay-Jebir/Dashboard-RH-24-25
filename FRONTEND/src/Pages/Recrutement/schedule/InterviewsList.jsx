import { Grid } from "@mui/material";
import ScheduleHeader from "./ScheduleHeader";
import SearchBar from "../../../components/SearchBar";
import StatusBar from "../../../Components/Recrutement/Schedule/list/StatusBar";
import List from "../List";
import DateRangeFilter from "../../../Components/DateRangeFilter";
import { useState, useEffect } from "react";
import { api } from "../../../service/api";
import { statuses } from "../../../Components/Recrutement/interview-states";
import dayjs from "dayjs";
import useApi from "../../../service/useApi";

export default function InterviewsList() {

    const [activeStatus, setActiveStatus] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState(''); 
    const [dateRange, setDateRange] = useState([null, null]); 
    
    const {loading,error,data} = useApi(api.getRecentInterview,[])
    const interviews = data.data;

    if (loading) return <div>Loading...</div>; // Loading indicator
    if (error) return <div>Error: {error}</div>; // Error handling

    // Create a counts object with initial counts set to 0
    const statusCounts = {
        CONFIRMED: 0,
        DELAYED: 0,
        CANCELLED: 0
    };

    // Count the occurrences of each status
    interviews.forEach(interview => {
        const status = interview.status.toUpperCase();
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
            activeStatus === statuses.ALL.id || interview.status.toUpperCase() === activeStatus
        )
        .filter(interview => 
            interview.candidat.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Grid container spacing={2}>
            <Grid item xs={12} md={8} alignItems={"center"}>
                <SearchBar 
                    placeHolder={'Search for interview'}
                    onChange={handleSearchChange} 
                />
            </Grid>
            <Grid item xs={12} md={4} >
                <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
            </Grid>
            <Grid item xs={12}>
                <StatusBar countsArray={countsArray} activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
            </Grid>
            <Grid item xs={12}>
                <List data={filteredInterviews} />
            </Grid>
        </Grid>
    );
}
