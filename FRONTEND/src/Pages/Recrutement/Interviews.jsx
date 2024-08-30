import { Box, useTheme, Typography } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import interviews from "../../Components/Recrutement/Interviews/InterviewsData.json";
import { useState, useMemo } from "react";

export default function Interviews() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter interviews based on search query
    const filteredInterviews = useMemo(() => {
        if (!searchQuery) return interviews;

        const lowercasedQuery = searchQuery.toLowerCase();
        return interviews.filter(interview =>
            interview.name.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery]);

    return (
        <Box>
            <Box mb={2}>
                <SearchBar 
                    placeHolder={'Search for interview'}
                    onChange={handleSearchChange}
                />
            </Box>
            <BorderBox radius={2}>
                <InterviewsDataGrid data={filteredInterviews} />
            </BorderBox>
        </Box>
    );
}
