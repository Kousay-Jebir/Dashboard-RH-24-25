import { Box } from "@mui/material";

export default function BorderBox({radius,children,styles}){
    return(
        <Box sx={{
            border:1,
           
            borderRadius:radius,
            ...styles
        }}>
            {children}
        </Box>    
    );
}