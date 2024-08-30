import React from 'react'
import TeamBuildingDataGrid from '../../Components/Meetings/Schedule/Team Building/TeamBuildingDataGrid'
import meetings from "../../Components/Meetings/Schedule/Team Building/TeamBuildingData.json";
import{ useState, useMemo } from "react";
import { Box } from "@mui/material";
import BorderBox from '../../components/BorderBox';
import SearchBar from '../../components/SearchBar';

const TeamBuilding = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter meetings based on search query
  const filteredMeetings = useMemo(() => {
    if (!searchQuery) return meetings;

    const lowercasedQuery = searchQuery.toLowerCase();
    return meetings.filter(meeting =>
      meeting.Title.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <Box>
      <Box mb={2}>
        <SearchBar
          placeHolder={'Search for meeting'}
          onChange={handleSearchChange} // Attach the change handler
        />
      </Box>
      <BorderBox radius={2}>
        <TeamBuildingDataGrid Data={filteredMeetings} />
      </BorderBox>
    </Box>
  )
}

export default TeamBuilding
