import BorderBox from "./BorderBox";
import MenuIcon from '@mui/icons-material/Menu';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";

export default function SelectMenu() {
    return (
        <BorderBox radius={2}>
            <Typography sx={{ p: 0, color: 'text.secondary', fontSize: 'small' }}>Select menu</Typography>
            <List>
                <ListItem sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                        <MenuIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="List" sx={{ marginLeft: 0 }} />

                </ListItem >
                <ListItem sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                        <ViewKanbanIcon fontSize="small" color='neutral'/>
                    </ListItemIcon>
                    <ListItemText primary="Kanban board" sx={{ marginLeft: 0 }} />
                    <ListItemSecondaryAction>
                        <ArrowForwardIosIcon  sx={{ fontSize: 13,color:'neutral' }} />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </BorderBox>
    );
}
