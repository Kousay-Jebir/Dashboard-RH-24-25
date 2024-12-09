import { Box } from "@mui/material";

export default function BorderBox({radius,children,styles}){
    return(
        <Box sx={{
            p:1,
            border:2,
            borderColor:'neutral.light',
            borderRadius:radius,
            ...styles
        }}>
            {children}
        </Box>    
    );
}