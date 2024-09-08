import React, { useState, useMemo } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import interviews from "../../Components/Recrutement/Interviews/InterviewsData.json";
import dayjs from "dayjs";
import DateFilter from "../../Components/DateFilter";

export default function Interviews() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle date filter change
    const handleDateChange = (date) => {
        setSelectedDate(date ? dayjs(date, "DD-MM-YYYY") : null); // Parse the selected date correctly
    };

    // Filter interviews based on search query and date
    const filteredInterviews = useMemo(() => {
        return interviews
            .filter((interview) => {
                const lowercasedQuery = searchQuery.toLowerCase();
                return interview.name.toLowerCase().includes(lowercasedQuery);
            })
            .filter((interview) => {
                if (!selectedDate) return true; // If no date is selected, don't filter by date
                const interviewDate = dayjs(interview.date, "DD-MM-YYYY"); // Parse the interview date correctly
                return interviewDate.isSame(selectedDate, "day");
            });
    }, [searchQuery, selectedDate]);

    return (
        <Box>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={8}>
                    <SearchBar 
                        placeHolder={"Search for interview"}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DateFilter onDateChange={handleDateChange} />
                </Grid>
            </Grid>
            <BorderBox radius={2}>
                <InterviewsDataGrid data={filteredInterviews} />
            </BorderBox>
        </Box>
    );
}
