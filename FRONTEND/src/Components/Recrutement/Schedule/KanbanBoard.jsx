import { Box, useTheme } from "@mui/material";

import RecruitementInterviewCard from "./KanbanBoard/RecruitementInterviewCard";

const KanbanBoard = () => {

    const theme = useTheme();

  return (
    <Box
      border={2}
      borderRadius={2}
      margin={2}
      padding={2}
      borderColor={theme.palette.neutral.light}
    >
      <RecruitementInterviewCard />
    </Box>
  );
};

export default KanbanBoard;
