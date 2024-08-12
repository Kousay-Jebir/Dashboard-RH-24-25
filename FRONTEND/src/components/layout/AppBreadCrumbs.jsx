import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AppBreadCrumbs = () => {
  const location = useLocation();
  
  // Convert the location path into breadcrumb items
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumbs>
      <Typography color="textSecondary">HR Management</Typography> {/* Static base path */}
      {pathnames.length > 0 ? (
        pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;

          return (
            <Typography color={last ? 'textPrimary' : 'textSecondary'} key={index}>
              {value}
            </Typography>
          );
        })
      ) : (
        <Typography color="textPrimary">HR Management</Typography> 
      )}
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;

