    import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
    import React, { useState,useEffect } from 'react';
    import { api } from '../../../service/api';
    import useApi from '../../../service/useApi';
    import { useNotificationError } from '../../../context/SnackBarContext';
    import { useNotificationSuccess } from '../../../context/SnackBarContext';


    const EditMeeting = ({meetingId,updateMeetingService,setUpdating,close}) => {
        const onSuccess = useNotificationSuccess();
        const onError = useNotificationError();
        const { data, error, loading } = useApi(() => api.getMeetingById(meetingId), {});
        const fetchedData = data?.data || {};
        const [showDateTime, setShowDateTime] = useState(false);
        const [formData, setFormData] = useState({
            title: '',
            date: '',
            time: '',
            place: '',
            addedBy: '',
            status: '',
            department: ''
        });
        const [errors, setErrors] = useState({});
        
        const theme = useTheme();
        
        useEffect(() => {
            // Only update formData when fetchedData is available
            if (fetchedData) {
            setFormData({
                title: fetchedData.title || '',
                date: fetchedData.date || '',
                time: fetchedData.time || '',
                place: fetchedData.place || '',
                addedBy: fetchedData.addedBy || '',
                status: fetchedData.status || '',
                department: fetchedData.department || ''
            });
            }
        }, [fetchedData]); // The effect will run when fetchedData changes
    /*
        useEffect(() => {
            setFetchedData(meetingData);
            setFormData({
                title: meetingData.Title,
                place: meetingData.Place,
                addedBy: meetingData.AddedBy,
                status: meetingData.Status?.StatusText || 'Confirmed',
                department: meetingData.Department,
            });
        }, []);*/

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        };

        const toggleDateTimeFields = () => {
            setShowDateTime((prev) => !prev);
        };

        const validateForm=()=>{

            const newErrors={}
            if((formData.title.length<2) || (formData.title.length>20)){
                newErrors.title="Enter a valid title";
            }
            if(!formData.title.trim()){
                newErrors.title="Title is required.";

            }
            if (!formData.date){
                newErrors.date="Date is required.";

            }
            if (!formData.time){
                newErrors.time="Time is required.";
                
            }
            if((!formData.addedBy.match(/^[A-Za-zÀ-ÿ' -]+$/)) || (formData.addedBy.length<3) || (formData.addedBy.length>20))
            {
                newErrors.addedBy="Enter a valid name ";
            }
            if (!formData.addedBy){
                newErrors.addedBy="Name is required";
                
            }
            if (!formData.place){
                newErrors.place="Location is required";
                
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length===0;
            




        };

        const transformFormDataToPostData = (formData) => {
            const timeArray = formData.time.split(":");
            const adaptedTime = timeArray[0]+":"+timeArray[1];
            return {
            title : formData.title,
            date: formData.date , 
            time:adaptedTime,
            addedBy:formData.addedBy,
            place : formData.place ,
            status: formData.status , 
            department:formData.department
            };
        };

        const handleSaveChangeClick = async (e) => {

            e.preventDefault();//Prevent default form submission
            const isValid=validateForm();
        
            if(!isValid){
            return ; 
            }
            console.log(formData);
            const postData = transformFormDataToPostData(formData);
            try{
            await updateMeetingService(meetingId,postData);
            onSuccess("Meeting updated successfully")
            setUpdating(-1)
            }
            catch(e){
                onError("Error during meeting updation")
            }

        }

        
        
        const renderTextField = (label, name, placeholder, type = 'text',multiline = false) => (
            <Box sx={{ alignItems:'center', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '13px',
                        fontWeight: theme.typography.regular,
                        color: theme.palette.neutral.normal,
                    }}
                >
                    {label}
                </Typography>
                <TextField
                    size='small'
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    type={type}
                    error={!!errors[name]}
                    helperText={errors[name]}
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-root': { height: '100%' },
                        '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '14px' },
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px',
                            color: 'red',
                            marginTop:0.5,
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.neutral.light, 
                        },},
                        marginBottom:0.5,
                    }}
                    
                />
            </Box>
        );

        if (!fetchedData) {
            return <p>Loading meeting details...</p>;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    p:2
                }}
            >
                <Box sx={{ width: 521 }}>
                    <Box sx={{ height: 21, gap: 12 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: theme.typography.fontFamily,
                                fontWeight: 700,
                                fontSize: 18,
                                marginBottom:2,
                                marginTop:3
                                
                            }}
                        >
                            Edit Meeting
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            //padding: '16px',
                            marginBottom: 2,
                            marginTop:4
                        }}
                    >
                        {renderTextField('Title', 'title', formData.title)}
                    
                        <Typography
                            sx={{
                                fontFamily: theme.typography.fontFamily,
                                fontSize: 14,
                                color: theme.palette.neutral.normal,
                                marginBottom: 1,
                                cursor: 'pointer',
                                marginTop:2,
                            }}
                            onClick={toggleDateTimeFields}
                        >
                            + Add date & time
                        </Typography>

                        {showDateTime && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 2 }}>
                                {renderTextField('Date', 'date', '', formData.date)}
                                {renderTextField('Time', 'time', '', formData.time)}
                            </Box>
                        )}

                        {renderTextField('Place', 'place', formData.place)}
                        {renderTextField('Added by', 'addedBy', formData.addedBy)}
                    </Box>

                    <Box
                        sx={{
                            width: 521,
                            height: 54,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            //padding: '16px',
                            marginBottom: 2,
                            marginTop:6,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontSize: '13px' }}>Change Status</Typography>
                        <RadioGroup
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '4px',
                            }}
                        >
                            {['Confirmed', 'Delayed', 'Cancelled'].map((status) => (
                                <FormControlLabel
                                    key={status}
                                    value={status}
                                    defaultValue="Confirmed"
                                    sx={{
                                        border: 1,
                                        borderColor: theme.palette.neutral.light,
                                        borderRadius: 2,
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                    }}
                                    control={
                                        <Radio
                                            sx={{
                                                height: 20,
                                                width: 20,
                                                borderColor: theme.palette.neutral,
                                                '& .MuiSvgIcon-root': { fontSize: '12px' },
                                                color: theme.palette.neutral,
                                                '&.Mui-checked': { color: '#6A7177' },
                                            }}
                                        />
                                    }
                                    label={status}
                                />
                            ))}
                        </RadioGroup>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            //padding: '16px',
                            marginBottom: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontSize: '13px' }}>Change Privacy</Typography>
                        <RadioGroup
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '4px',
                            }}
                        >
                            {[ 'Executive Board Members','All members included', 'Projet', 'Marketing', 'Dév. Commercial', 'Cellule qualité'].map((privacy) => (
                                <FormControlLabel
                                    key={privacy}
                                    value={privacy}
                                    defaultValue="Executive Board Members"
                                    sx={{
                                        border: 1,
                                        borderColor: theme.palette.neutral.light,
                                        borderRadius: 2,
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                    }}
                                    control={
                                        <Radio
                                            sx={{
                                                height: 20,
                                                width: 20,
                                                borderColor: theme.palette.neutral,
                                                '& .MuiSvgIcon-root': { fontSize: '12px' },
                                                color: theme.palette.neutral,
                                                '&.Mui-checked': { color: '#6A7177' },
                                            }}
                                        />
                                    }
                                    label={privacy}
                                />
                            ))}
                        </RadioGroup>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={()=>{setUpdating(-1)}}
                            sx={{
                                width: '40%',
                                height: 46,
                                fontSize: 10,
                                color: '#404951',
                                border: '1px solid lightGrey',
                                borderRadius: 2,
                                marginRight: 0,
                                fontFamily: 'Inter',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    borderColor: 'lightGrey',
                                },
                            }}
                        >
                            Discard
                        </Button>

                        <Button
                            onClick={handleSaveChangeClick}
                            sx={{
                                width: '60%',
                                height: 46,
                                fontSize: 10,
                                backgroundColor: '#404951',
                                color: '#FFFFFF',
                                borderRadius: 2,
                                fontFamily: 'Inter',
                                '&:hover': {
                                    backgroundColor: '#404951',
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    export default EditMeeting;
