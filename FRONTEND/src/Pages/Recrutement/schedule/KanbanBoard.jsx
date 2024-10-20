import { Box } from "@mui/material";
import Layout from "../../../Components/Recrutement/Schedule/KanbanBoard/Layout";
import { statuses } from "../../../Components/Recrutement/interview-states";
import SearchBar from "../../../components/SearchBar";
import { useState, useEffect } from "react";
import useApi from "../../../service/useApi";
import { api } from "../../../service/api";

export default function KanbanBoard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [boardColumns, setBoardColumns] = useState({});
    const [filteredColumns, setFilteredColumns] = useState({});
    const { data, error, loading } = useApi(api.getRecentInterview, []);

    const InterviewsData = (data?.data || []).map(interview => ({
        ...interview,
        id: interview.id.toString()
    }));

    // Initialize boardColumns when data is fetched
    useEffect(() => {
        if (data) {
            const initialColumns = {
                [statuses.CONFIRMED.id]: { id: statuses.CONFIRMED.id, items: [] },
                [statuses.DELAYED.id]: { id: statuses.DELAYED.id, items: [] },
                [statuses.CANCELLED.id]: { id: statuses.CANCELLED.id, items: [] }
            };

            InterviewsData.forEach(interview => {
                const status = interview.status.toUpperCase();
                if (initialColumns[status]) {
                    initialColumns[status].items.push(interview);
                } else {
                    console.error(`Unknown status: ${status}`);
                }
            });

            setBoardColumns(initialColumns);
            setFilteredColumns(initialColumns);
        }
    }, [data]); // Depend on `data` to handle updates

    // Function to filter items based on search query
    useEffect(() => {
        const filtered = {};
        Object.keys(boardColumns).forEach(columnId => {
            filtered[columnId] = {
                ...boardColumns[columnId],
                items: boardColumns[columnId].items.filter(item =>
                    item.candidat.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            };
        });

        setFilteredColumns(searchQuery ? filtered : boardColumns);
    }, [searchQuery, boardColumns]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Render loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || "An error occurred while fetching data."}</div>;
    }

    return (
        <Box>
            <Box pb={1}>
                <SearchBar placeHolder={"Search for interview"} onChange={handleSearchChange} />
            </Box>
            <Layout boardColumns={filteredColumns} setBoardColumns={setBoardColumns} />
        </Box>
    );
}
