import React, { useState } from 'react';
import { Typography, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import BorderBox from '../../../../components/BorderBox';
import MenuIcon from '@mui/icons-material/Menu';
import { statuses } from '../../interview-states'; // Adjust the import path as needed

const Status = ({ title, icon: Icon, count, id, styles, setActive, closeMenu = null }) => {
    const handleStatusSelect = () => {
        setActive(id);
        if (closeMenu) closeMenu();
    };

    return (
        <Box display={'flex'} alignItems={'center'} gap={1} onClick={handleStatusSelect} sx={{ cursor: 'pointer' }}>
            {Icon && <Icon fontSize="small" sx={{ color: styles.color }} />}
            <Typography sx={{ ...styles }}>{`${title} (${count})`}</Typography>
        </Box>
    );
};

export default function StatusBar({ activeStatus, setActiveStatus, countsArray }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:622px)');

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    // Filter out the "FINISHED" status
    const filteredStatuses = Object.values(statuses).filter((status) => status.id !== 'FINISHED');

    const menuContent = (
        <BorderBox
            radius={1.5}
            styles={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 2,
                position: 'absolute',
                top: 570, // Adjust as needed
                left: 25,
                backgroundColor: theme.palette.background.paper,
                zIndex: 1200, // Ensure it's above other content
            }}
        >
            {filteredStatuses.map((status, index) => (
                <Status
                    key={status.id}
                    id={status.id}
                    icon={status.icon}
                    title={status.title}
                    count={countsArray[index]}
                    setActive={setActiveStatus}
                    closeMenu={handleMenuToggle}
                    styles={
                        status.id !== activeStatus
                            ? { color: 'text.secondary', fontWeight: 'regular' }
                            : { color: 'text.primary', fontWeight: 'medium' }
                    }
                />
            ))}
        </BorderBox>
    );

    return (
        <Box>
            {isMobile ? (
                <BorderBox styles={{ display: 'flex', alignItems: 'center' }} radius={1.5}>
                    <IconButton onClick={handleMenuToggle}>
                        <MenuIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                    <Typography>Filter interview status</Typography>
                    {menuOpen && menuContent}
                </BorderBox>
            ) : (
                <BorderBox
                    radius={1.5}
                    styles={{
                        display: 'flex',
                        gap: 4,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingBlock: 1.5,
                        maxWidth: 'max-content',
                        paddingInline: 3,
                        color: 'text.secondary',
                    }}
                >
                    {filteredStatuses.map((status, index) => (
                        <Status
                            key={status.id}
                            id={status.id}
                            icon={status.icon}
                            title={status.title}
                            count={countsArray[index]}
                            setActive={setActiveStatus}
                            styles={
                                status.id !== activeStatus
                                    ? { color: 'text.secondary', fontWeight: 'regular' }
                                    : { color: 'text.primary', fontWeight: 'medium' }
                            }
                        />
                    ))}
                </BorderBox>
            )}
        </Box>
    );
}
