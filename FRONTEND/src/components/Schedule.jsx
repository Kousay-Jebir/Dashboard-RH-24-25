import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ScheduleInterview({schedule}) {
    return (
        <Button
            variant='contained'
            startIcon={<AddIcon />} // Adds the plus icon at the start
            sx={{
                textTransform: 'none', // Ensures text is not in all caps
            }}
        >
            {"Schedule "+ schedule}
        </Button>
    );
}
