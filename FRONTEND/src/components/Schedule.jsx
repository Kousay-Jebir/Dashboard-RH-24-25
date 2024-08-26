import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ScheduleButton({schedule}) {
    return (
        <Button
            
            variant={variant}
            startIcon={<AddIcon />} // Adds the plus icon at the start
            disableElevation
            sx={{
                textTransform: 'none',
                borderRadius:1.5,
                ...sx
            }}
        >
            {schedule}
        </Button>
    );
}
