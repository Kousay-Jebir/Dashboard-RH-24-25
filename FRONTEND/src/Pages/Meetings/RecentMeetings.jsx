import React from "react";
import RecentMeetingsGrid from "../../Components/Meetings/RecentMeetingsGrid";
import { Box, Grid } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";

const RecentMeetings = () => {
  return (
      <Box>
        <Box mb={2}><SearchBar placeHolder={'Search for meeting'}/></Box>
        <BorderBox radius={2}>
          <RecentMeetingsGrid />
        </BorderBox>
      </Box>
  );
};

export default RecentMeetings;
