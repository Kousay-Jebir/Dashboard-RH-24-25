import { Box } from "@mui/material"
import SearchBar from "../../../components/SearchBar";  
export default function ScheduleHeader(){
    return(
        <Box>
            <SearchBar placeHolder={'Search for interview'}/>
        </Box>
    )
}