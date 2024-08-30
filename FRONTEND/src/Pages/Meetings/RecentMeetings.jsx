import React, { useState, useMemo } from "react";
import RecentMeetingsGrid from "../../Components/Meetings/RecentMeetingsGrid";
import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";
import meetings from "../../Components/Meetings/RecentMetingsData.json";

const RecentMeetings = () => {
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
        <RecentMeetingsGrid Data={filteredMeetings} />
      </BorderBox>
    </Box>
  );
};

export default RecentMeetings;
