import React from 'react';
import { Box, useTheme } from '@mui/material';
import RecruitementInterviewCard from './KanbanBoard/RecruitementInterviewCard';


import InterviewsData from "./KanbanBoard/KanbanBoardData.json"; // Importing the JSON data


const KanbanBoard = () => {
  const theme = useTheme();

  return (
    <Box
      border={2}
      borderRadius={2}
      padding={2}
      borderColor={theme.palette.neutral.light}
    >
      {InterviewsData.map((interview, index) => (
        <RecruitementInterviewCard key={index} interview={interview} />
      ))}
    </Box>
  );
};

export default KanbanBoard;
