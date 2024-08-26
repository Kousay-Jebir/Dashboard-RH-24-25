import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

const KanbanForm = () => {
    const theme = useTheme();
    const [formValues, setFormValues] = useState({
        interviewWith: '',
        interviewedBy: '',
        department: 'projects',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleRadioChange = (event) => {
        setFormValues({ ...formValues, department: event.target.value });
    };

    const validateForm = () => {
      const newErrors = {};
  
      // Utility function to check for invalid characters
      const hasInvalidCharacters = (value) => /[^a-zA-Z\s\-\'èéàâôîû]/.test(value);
  
      // Validate 'Interview with'
      if (!formValues.interviewWith.trim()) {
          newErrors.interviewWith = "The interviewee's name is required.";
      }
      else if (hasInvalidCharacters(formValues.interviewWith)) {
        newErrors.interviewWith = "It contains invalid characters.";
      } else if (formValues.interviewWith.length < 3) {
          newErrors.interviewWith = "The interviewee's name is too short";
      } else if (formValues.interviewWith.length > 20) {
          newErrors.interviewWith = "The interviewee's name is too long.";
      } 
  
      // Validate 'Interviewed by'
      if (!formValues.interviewedBy.trim()) {
          newErrors.interviewedBy = "The interviewer's name is required.";
      } else if (hasInvalidCharacters(formValues.interviewedBy)) {
        newErrors.interviewedBy = "It contains invalid characters.";
      } else if (formValues.interviewedBy.length < 3) {
          newErrors.interviewedBy = "The interviewer's name is too short.";
      } else if (formValues.interviewedBy.length > 20) {
          newErrors.interviewedBy = "The interviewer's name is too long.";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (validateForm()) {
          const jsonData = JSON.stringify(formValues, null, 2); // Convert to JSON with 2-space indentation
          downloadJSON(jsonData, 'kanbanFormData.json');
      }
    };
    const downloadJSON = (jsonData, filename) => {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

    const renderTextField = (label, width, placeholder, name) => (
        <Box sx={{ width: '216px', height: '20px', display: 'flex', flexDirection: 'row', gap: '7px' }}>
            <Typography
                variant="body2"
                sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '10px',
                    fontWeight: theme.typography.regular,
                    lineHeight: '12.1px',
                    textAlign: 'left',
                }}
            >
                {label}
            </Typography>
            <TextField
                name={name}
                placeholder={placeholder}
                value={formValues[name]}
                onChange={handleInputChange}
                error={!!errors[name]}
                helperText={errors[name]}
                FormHelperTextProps={{
                  sx: {
                      fontFamily: theme.typography.fontFamily,
                      fontSize: '8px',
                      lineHeight: '8px',
                      marginTop: '1px',
                      //marginBottom: '1px',
                      

                  }
              }}
                sx={{
                    height: '20px',
                    width: width,
                    '& .MuiInputBase-root': { height: '100%' },
                    '& .MuiInputBase-input': { fontFamily: theme.typography.fontFamily, fontSize: '10px' },
                }}
            />
        </Box>
    );

    return (
        <Box sx={{
            width: '236px',
            height: '260px',
            gap: '7px',
            border: '1px solid lightGrey',
            paddingLeft: '10px',
            paddingTop: '10px'
        }}>
            <Box sx={{
                width: '216px',
                height: '84px',
                gap: '8px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '10px',
                        fontWeight: theme.typography.regular,
                        lineHeight: '12.1px',
                        textAlign: 'left',
                    }}
                >
                    Recruitement Interview
                </Typography>

                <Box sx={{ display: 'flex', gap: '6px' }}>
                    {renderTextField('Interview with', 142, "Enter name", 'interviewWith')}
                </Box>
                <Box sx={{ display: 'flex', gap: '6px' }}>
                    {renderTextField('Will be interviewed by', 108, "Enter name", 'interviewedBy')}
                </Box>
            </Box>

            <Box sx={{
                width: '216px',
                height: '102px',
                gap: '8px',
                paddingTop: '10px'
            }}>
                <FormControl component="fieldset">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '10px',
                            fontWeight: theme.typography.regular,
                            lineHeight: '12.1px',
                            textAlign: 'left',
                        }}
                    >
                        Choose department
                    </Typography>
                    <RadioGroup
                        aria-label="department"
                        name="department"
                        value={formValues.department}
                        onChange={handleRadioChange}
                        sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '10px', marginTop: '5px' }}
                    >
                        {['Development Commercial', 'Projects', 'Marketing', 'Cellule Qualité'].map(dept => (
                            <FormControlLabel
                                key={dept}
                                value={dept.toLowerCase().replace(' ', '_')}
                                control={<Radio sx={{ width: '12px', height: '12px', marginRight: '4px' }} />}
                                label={<Typography sx={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: '10px',
                                    fontWeight: theme.typography.regular,
                                    lineHeight: '12.1px',
                                    textAlign: 'left',
                                    gap: '5px'
                                }}>{dept}</Typography>}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        width: '216px',
                        height: '24px',
                        padding: '6px 6px 6px 6px',
                        gap: '8px',
                        color: 'white',
                        borderRadius: '4px',
                        border: `1px solid ${theme.palette.neutral}`,
                        backgroundColor: '#404951',
                        textAlign: 'center',
                        fontSize: '10px',
                        marginTop: '30px',
                        
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    );
};

export default KanbanForm;
