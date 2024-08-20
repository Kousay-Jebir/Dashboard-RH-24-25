import React from 'react';
import { Box, useTheme } from '@mui/material';
import RecruitementInterviewCard from './KanbanBoard/RecruitementInterviewCard';


import InterviewsData from "./KanbanBoard/KanbanBoardData.json"; // Importing the JSON data
import InterviewStatus from './KanbanBoard/InterviewStatus';


const KanbanBoard = () => {
  const theme = useTheme();

  return (
    <Box
      padding={2}
    >
      {InterviewsData.map((interview, index) => (
        <RecruitementInterviewCard key={index} interview={interview} />
      ))}
    </Box>
  );
};

export default KanbanBoard;
