import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BorderBox from "./BorderBox";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography, Collapse } from "@mui/material";
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
function NestedList({ items, currentPath, paddingLeft }) {
    return (
        <List component="div" disablePadding sx={{ pl: paddingLeft}}>
            {items.map(item => (
                <NestedListItem key={item.path} item={item} currentPath={currentPath}/>
            ))}
        </List>
    );
}

function NestedListItem({ item, currentPath }) {
    const [open, setOpen] = useState(false);

    // Determine if this item or any of its nested items is active
    const isActive = currentPath === item.path || item.secondaryMenu.some(subItem => currentPath.startsWith(subItem.path));
    const hasNestedMenu = item.secondaryMenu && item.secondaryMenu.length > 0;

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <ListItem
                sx={{ p: 1, display: 'flex', alignItems: 'center', color: isActive ? 'neutral.main' : 'neutral.light' ,
                    pt:hasNestedMenu? 1:0,pb:hasNestedMenu? 1:0
                }}
                component={Link}
                to={item.path}
            >
                {item.icon && (
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 ,color:isActive ? 'neutral.main' : 'neutral.light'}}>
                        <item.icon
                            fontSize="small"
                            color={isActive ? 'neutral.main' : 'neutral.light'}
                        />
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={item.title}
                    sx={{ marginLeft: 0, color: isActive ? 'neutral.main' : 'text.secondary' }}
                />
                {hasNestedMenu && (
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleToggle}>
                            <ArrowForwardIosIcon
                                color='neutral'
                                sx={{
                                    fontSize: 13,
                                    transition: 'transform 0.3s',
                                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                                }}
                            />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
            {hasNestedMenu && (
                <Collapse in={open}>
                    <NestedList items={item.secondaryMenu} currentPath={currentPath} paddingLeft={4} />
                </Collapse>
            )}
        </>
    );
}

export default function SelectMenu({menuData}) {
    const location = useLocation(); // Get the current path

    return (
        <BorderBox radius={2}>
            <Typography sx={{ p: 0, color: 'text.secondary', fontSize: 'small' }}>Select menu</Typography>
            <List>
                {menuData.map(item => (
                    <React.Fragment key={item.path}>
                        <NestedListItem item={item} currentPath={location.pathname} />
                    </React.Fragment>
                ))}
            </List>
        </BorderBox>
    );
}
