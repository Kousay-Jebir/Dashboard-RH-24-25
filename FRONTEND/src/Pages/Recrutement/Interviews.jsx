import React, { useState, useMemo } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import useApi from "../../service/useApi";
import dayjs from "dayjs";
import DateFilter from "../../Components/DateFilter";
import { api } from "../../service/api";

export default function Interviews() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    
    const { data, loading, error, refetch } = useApi(api.getFinishedInterview, []);

    const interviews = data.data;

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date ? dayjs(date, "DD-MM-YYYY") : null);
    };

    const filteredInterviews = useMemo(() => {
        if (!Array.isArray(interviews) || loading || error) return []; // Return empty if not an array or loading/error

        return interviews
            .filter((interview) => {
                const lowercasedQuery = searchQuery.toLowerCase();
                return interview.candidat?.name.toLowerCase().includes(lowercasedQuery);
            })
            .filter((interview) => {
                if (!selectedDate) return true; 
                const interviewDate = dayjs(interview.date, "YYYY-MM-DD");
                return interviewDate.isSame(selectedDate, "day");
            });
    }, [interviews, searchQuery, selectedDate, loading, error]);

    if (loading) return <p>Loading interviews...</p>;
    if (error) return <p>Error: {error}</p>;

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
