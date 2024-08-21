import { Box, Typography } from "@mui/material";
import BorderBox from "../../../../components/BorderBox";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
export default function InterviewStatus({columnId,columnLength}){
    let bgColor,textColor,title,icon;
    if(columnId === 'confirmed'){
         bgColor = 'success.main';
         textColor = 'success.text';
         title = 'Confirmed'
         icon = <CheckCircleOutlineRoundedIcon sx={{color:textColor}} fontSize='small'/>
    }
    else if(columnId === 'delayed'){
         bgColor = 'warning.main';
         textColor = 'warning.text';
         title = 'Delayed';
         icon = <RestoreOutlinedIcon sx={{color:textColor}} fontSize='small'/>
    }
    else if(columnId === 'cancelled') {
         bgColor = 'error.main';
         textColor = 'error.text';
         title = 'Cancelled';
         icon = <CancelOutlinedIcon sx={{color:textColor}} fontSize='small'/>
    }
    return(
        <Box display={'flex'} gap={1} alignItems={'center'} bgcolor={bgColor} borderRadius={1} paddingBlock={1} paddingInline={1.5} flexWrap={'wrap'} mb={1}>
            {icon}
            <Typography color={textColor}>{title +'('+columnLength+')'}</Typography>
        </Box>
    )
}