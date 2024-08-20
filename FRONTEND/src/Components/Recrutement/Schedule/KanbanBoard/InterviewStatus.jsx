import { Box, Typography } from "@mui/material";
import BorderBox from "../../../../components/BorderBox";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
export default function InterviewStatus({}){
    return(
        <Box display={'flex'} gap={1} alignItems={'center'} bgcolor={'success.main'} borderRadius={1} paddingBlock={1} paddingInline={1.5} flexWrap={'wrap'} mb={1}>
            <CheckCircleOutlineRoundedIcon sx={{color:"success.text"}} fontSize='small'/>
            <Typography color={'#1DAF61'}>Confirmed(9)</Typography>
        </Box>
    )
}