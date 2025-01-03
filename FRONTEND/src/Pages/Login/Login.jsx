import { Grid, useTheme } from '@mui/material';
import React from 'react';
//import loginBg from '../../assets/login_bg.png';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    const theme = useTheme();

    return (
        <Grid container sx={{ height: '100vh', width: '100vw' }}>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.background.paper,
                    padding: theme.spacing(4),
                }}
            >
                <LoginForm />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //backgroundImage: `url(${loginBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    
                    width: '100%',
                }}
            >
                
            </Grid>
        </Grid>
    );
};

export default Login;
