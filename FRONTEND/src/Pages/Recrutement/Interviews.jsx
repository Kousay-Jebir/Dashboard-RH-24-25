import { Box, useTheme ,Typography } from "@mui/material";
import InterviewsDataGrid from "../../Components/Recrutement/Interviews/InterviewsDataGrid";
import SearchBar from "../../components/SearchBar";
import BorderBox from "../../components/BorderBox";

export default function Interviews(){
    const theme = useTheme();
    return(
        <Box>
            <Box mb={2}>
                <SearchBar placeHolder={'Search for interview'}/>
            </Box>
            <BorderBox radius={2}>
                <InterviewsDataGrid/>
            </BorderBox>
        </Box>
    )
}