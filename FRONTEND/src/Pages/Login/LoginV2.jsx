import { Grid, Typography, Box } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import loginPhoto from "../../assets/loginPhoto.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { useState } from "react";
import axios from "axios";
import { BACKEND_API_ROUTES } from "../../service/apiRoutes";
import { api } from "../../service/api";
import { useNotificationError } from "../../context/SnackBarContext";

export default function LoginV2() {
    const { login } = useAuth();
    const onFailue = useNotificationError();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); 

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await api.login(formData)
            console.log(response);
            if (response.data.access_token) {
                login(response.data.access_token);
                navigate('/dashboard')
            } else {
                throw new Error(response.data.message || "Login failed");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Login failed";
            console.log(error);
            setError(errorMessage); // Set user-friendly error message
            onFailue(errorMessage)
        }
    };

    return (
        <Grid container minHeight={'100vh'} p={1.5}>
            <Grid item xs={12} md={6} display='flex' alignItems='center' justifyContent={'center'}>
                <Box>
                    <Box textAlign='center' mb={7}>
                        <Typography variant="h6">HR Dashboard</Typography>
                        <Typography color='text.light'>Junior Entreprise INSAT</Typography>
                    </Box>
                    <LoginForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} error={error} setError={()=>{setError('')}} />
                    <Box textAlign='center' mt={15}>
                        <Typography color='text.light' variant="body2">2024 © HR Management By Junior Entreprise INSAT</Typography>
                    </Box>
                </Box>
            </Grid>

            <Grid item sm sx={{
                display: { xs: 'none', md: 'flex' },
                backgroundImage: `url(${loginPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 9
            }}>
                <Box textAlign='center' sx={{ backdropFilter: 'blur(8px)', background: '#ffffff38' }} p={1} borderRadius={3} border={'1px solid #ffffff38'}>
                    <LocalFireDepartmentRoundedIcon color="white" />
                    <Typography sx={{ color: '#FFF' }} variant="h5">Streamlining our internal HR management experience</Typography>
                    <Typography sx={{ color: '#FFF', fontSize: '0.8em' }}>Welcome to our HR management platform, our all-in-one solution for seamless communication and efficient HR management within JEI. Our platform is designed to streamline interactions and HR processes, making day-to-day operations smoother and more effective.</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
