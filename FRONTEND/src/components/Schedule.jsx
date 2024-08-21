import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Schedule({schedule,isOutlined}) {
    return (
        <Button
            variant='contained'
            startIcon={<AddIcon />} // Adds the plus icon at the start
            disableElevation
            sx={{
                textTransform: 'none', // Ensures text is not in all caps
                borderRadius:1.5
            }}
        >
            {"Schedule "+ schedule}
        </Button>
    );
}
