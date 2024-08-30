import { Box } from "@mui/material";
import Layout from "../../../Components/Recrutement/Schedule/KanbanBoard/Layout";
import { statuses } from "../../../Components/Recrutement/interview-states";
import SearchBar from "../../../components/SearchBar";
import InterviewsData from '../../../Components/Recrutement/Schedule/KanbanBoard/KanbanBoardData.json';
import { useState, useEffect } from "react";

export default function KanbanBoard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [boardColumns, setBoardColumns] = useState({});
    const [filteredColumns, setFilteredColumns] = useState({});

    // Initialize boardColumns only once
    useEffect(() => {
        const initialColumns = {
            [statuses.CONFIRMED.id]: { id: statuses.CONFIRMED.id, items: [] },
            [statuses.DELAYED.id]: { id: statuses.DELAYED.id, items: [] },
            [statuses.CANCELLED.id]: { id: statuses.CANCELLED.id, items: [] }
        };

        InterviewsData.forEach(interview => {
            const status = interview.Status.toUpperCase();
            if (initialColumns[status]) {
                initialColumns[status].items.push(interview);
            } else {
                console.error(`Unknown status: ${status}`);
            }
        });

        setBoardColumns(initialColumns);
        setFilteredColumns(initialColumns);
    }, []);

    // Function to filter items based on search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredColumns(boardColumns); // Return original columns if no search query
            return;
        }

        const filtered = {};
        Object.keys(boardColumns).forEach(columnId => {
            filtered[columnId] = {
                ...boardColumns[columnId],
                items: boardColumns[columnId].items.filter(item =>
                    item.Interviewee.toLowerCase().includes(searchQuery.toLowerCase())
                )
            };
        });

        setFilteredColumns(filtered);
    }, [searchQuery, boardColumns]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box>
            <Box pb={1}>
                <SearchBar placeHolder={"Search for interview"} onChange={handleSearchChange} />
            </Box>
            <Layout boardColumns={filteredColumns} setBoardColumns={setBoardColumns} />
        </Box>
    );
}
