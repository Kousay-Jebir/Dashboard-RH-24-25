import { Box, useTheme ,Typography } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";

export default function Interviews(){
    const theme = useTheme();
    return(
        <Box sx={{
            border: 2,
            borderRadius: 2,
            borderColor: theme.palette.neutral.light,
            margin: 2,
            padding: 2,
          }}>
            <InterviewsDataGrid/>
        </Box>
    )
}