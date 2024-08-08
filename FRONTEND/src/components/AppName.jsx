import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
export default function AppName(){
    return(
        <Box paddingInline={3} display={'flex'} alignItems={'center'} gap={1} borderBottom={1} paddingBlock={2}>
            <Avatar   sx={{height:74,width:74,borderRadius:'50%',border:'1px solid grey'
            }}  src="/src/assets/JEI.png" />
            <Box>
                <Typography>Junior Entreprise INSAT</Typography>
                <Typography>HR Management</Typography>
            </Box>
        </Box>
    )
}