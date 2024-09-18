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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        console.log("Search Query:", event.target.value); // Debugging line
    };

    const handleDateChange = (date) => {
        setSelectedDate(date ? dayjs(date, "DD-MM-YYYY") : null);
    };

    const filteredInterviews = useMemo(() => {
        console.log("Filtering Interviews"); // Debugging line
        return interviews
            .filter((interview) => {
                const lowercasedQuery = searchQuery.toLowerCase();
                console.log("Interview Name:", interview.name); // Debugging line
                return interview.name.toLowerCase().includes(lowercasedQuery);
            })
            .filter((interview) => {
                if (!selectedDate) return true; 
                const interviewDate = dayjs(interview.date, "DD-MM-YYYY");
                return interviewDate.isSame(selectedDate, "day");
            });
    }, [searchQuery, selectedDate]);
    console.log(filteredInterviews)
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
