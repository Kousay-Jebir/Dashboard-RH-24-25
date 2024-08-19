import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

const AppBreadCrumbs = () => {
  const location = useLocation();
  
  // Convert the location path into breadcrumb items, limiting to the first 2 segments
  const pathnames = location.pathname.split('/').filter(x => x).slice(0, 2);

  return (
    <Breadcrumbs>
      <Typography color="textSecondary" fontSize={'small'}>HR Management</Typography> {/* Static base path */}
      {pathnames.length > 0 ? (
        pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;

          return (
            <Typography fontSize={'small'} color={last ? 'textPrimary' : 'textSecondary'} key={index}>
              {value}
            </Typography>
          );
        })
      ) : (
        <Typography fontSize={'small'} color="textPrimary">HR Management</Typography> 
      )}
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;
