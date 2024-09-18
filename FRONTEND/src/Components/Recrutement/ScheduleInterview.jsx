import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, School as SchoolIcon } from "@mui/icons-material";
import { api } from "../../service/api";

const ScheduleInterview = ({ close }) => {
  const [showDateTime, setShowDateTime] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    Candidate: "",
    Phone: "",
    City: "",
    Adress: "",
    Field: "",
    Academic_year: "",
    date: "",
    time: "",
    Recruiter: "",
    email: "",
    status: "",
    department: "",
  });

  const transformFormDataToPostData = (formData) => {
    return {
      status: formData.status ,
      recruiter: formData.Recruiter ,
      department: formData.department ,
      date: new Date(formData.date).toISOString(), 
      time: formData.time,
      duration: "1 hour",
      polePresentationGrade: 0,
      jeiKnowledgeGrade: 0,
      availabilityGrade: 0,
      rhQuestionsGrade: 0,
      situationGrade: 0,
      associativeExperienceGrade: 0,
      candidatName: formData.Candidate,
      candidatEmail: formData.email ,
      candidatPhone: formData.Phone ,
      candidatAddress: formData.Adress ,
      candidatLastName: "last name", 
      candidatField: formData.Field ,
      candidatYear: String(formData.Academic_year)
    };
  };

  const theme = useTheme();

  const handleToggle = () => {
    setIsVisible(!isVisible);
    close();
  };

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleScheduleClick = async (e) => {
    // console.log(formData);
    const postData = transformFormDataToPostData(formData);


    try {
      console.log(postData);
      await api.createInterview(postData);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Échec de l'envoi du message.");
    }
  };

  const toggleDateTimeFields = () => {
    setShowDateTime((prev) => !prev);
  };

  const renderTextField = (
    label,
    name,
    placeholder,
    type = "text",
    multiline = false
  ) => (
    <Box
      sx={{
        height: "30px",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: "13px",
          width: "20%",
          fontWeight: theme.typography.regular,
        }}
      >
        {label}
      </Typography>
      <TextField
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        error={!!errors[name]}
        helperText={errors[name]}
        sx={{
          width: "75%",
          "& .MuiInputBase-root": { height: "100%" },
          "& .MuiInputBase-input": {
            fontFamily: theme.typography.fontFamily,
            fontSize: "14px",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "12px",
            color: theme.palette.warning.text,
            margin: 0,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.neutral.light,
            },
          },
        }}
      />
    </Box>
  );

  const CustomSelect = ({ label, name, placeholder, options, icon }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "40%",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: "12px",
          fontWeight: theme.typography.regular,
          textAlign: "left",
          color: theme.palette.neutral.normal,
        }}
      >
        {label}
      </Typography>
      <Select
        name={name}
        displayEmpty
        onChange={handleChange}
        value={formData[name] || ""}
        sx={{
          height: "30px",
          borderRadius: 2,
          borderColor: theme.palette.neutral.light,
          "& .MuiInputBase-root": { height: "100%" },
          "& .MuiInputBase-input": {
            fontFamily: theme.typography.fontFamily,
            fontSize: "12px",
          },
        }}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Box sx={{ width: 521 }}>
        <Box sx={{ height: 21, gap: 12 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 2,
              marginTop: 3,
            }}
          >
            Schedule an interview for later
          </Typography>
          <Tooltip title="Close">
            <IconButton
              onClick={handleToggle}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
                color: theme.palette.grey[600],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: 2,
            marginTop: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {renderTextField("Candidate", "Candidate", "Enter name")}
            {renderTextField("Phone", "Phone", "+ 216")}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {renderTextField("City", "City", "Enter city")}
            {renderTextField("Adress", "Adress", " Enter address")}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 2,
            }}
          >
            <CustomSelect
              label="Field"
              name="Field"
              placeholder="Select the candidate's field"
              options={[
                { value: "MPI", label: "MPI" },
                { value: "CBA", label: "CBA" },
                { value: "RT", label: "RT" },
                { value: "IIA", label: "IIA" },
                { value: "GL", label: "GL" },
                { value: "IMI", label: "IMI" },
                { value: "CH", label: "CH" },
                { value: "BIO", label: "BIO" },
              ]}
              icon={<SchoolIcon />}
            />
            <CustomSelect
              label="Academic year"
              name="Academic_year"
              placeholder="Select the candidate's academic year"
              options={[
                { value: 1, label: "1st year" },
                { value: 2, label: "2nd year" },
                { value: 3, label: "3rd year" },
                { value: 4, label: "4th year" },
              ]}
              icon={<SchoolIcon />}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: 14,
              color: theme.palette.neutral.normal,
              marginBottom: 1,
              cursor: "pointer",
            }}
            onClick={toggleDateTimeFields}
          >
            + Add date & time
          </Typography>

          {showDateTime && (
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 1 }}>
              {renderTextField("Date", "date", "", "date")}
              {renderTextField("Time", "time", "", "time")}
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {renderTextField("Recruiter", "Recruiter", "Enter name")}
            {renderTextField("E-mail address", "email", "Enter e-mail address")}
          </Box>
        </Box>

        <Box
          sx={{
            width: 521,
            height: 54,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: 2,
            marginTop: 6,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "13px" }}>
            Change Status
          </Typography>
          <RadioGroup
            name="status"
            onChange={handleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              marginLeft: "10px",
            }}
          >
            {["Confirmed", "Delayed", "Canceled"].map((status) => (
              <FormControlLabel
                key={status}
                value={status}
                sx={{
                  border: 1,
                  borderColor: theme.palette.neutral.light,
                  borderRadius: 2,
                  padding: "2px 6px",
                  fontSize: "12px",
                  color: theme.palette.neutral.normal,
                }}
                control={
                  <Radio
                    sx={{
                      height: 20,
                      width: 20,
                      borderColor: theme.palette.neutral,
                      "& .MuiSvgIcon-root": { fontSize: "12px" },
                      color: theme.palette.neutral,
                      "&.Mui-checked": { color: "#6A7177" },
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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "13px" }}>
            Change Privacy
          </Typography>
          <RadioGroup
            name="department"
            onChange={handleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              marginLeft: "10px",
            }}
          >
            {["Projet", "Marketing", "Dev.Commercial", "Qualité"].map(
              (privacy) => (
                <FormControlLabel
                  key={privacy}
                  value={privacy}
                  sx={{
                    border: 1,
                    borderColor: theme.palette.neutral.light,
                    borderRadius: 2,
                    padding: "2px 6px",
                    fontSize: "12px",
                    color: theme.palette.neutral.normal,
                  }}
                  control={
                    <Radio
                      sx={{
                        height: 20,
                        width: 20,
                        borderColor: theme.palette.neutral,
                        "& .MuiSvgIcon-root": { fontSize: "12px" },
                        color: theme.palette.neutral,
                        "&.Mui-checked": { color: "#6A7177" },
                      }}
                    />
                  }
                  label={privacy}
                />
              )
            )}
          </RadioGroup>
        </Box>

        <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
          <Button
            variant="outlined"
            onClick={handleScheduleClick} // Log form data when clicked
            sx={{
              width: "40%",
              height: 46,
              fontSize: 12,
              color: "#404951",
              border: "1px solid lightGrey",
              borderRadius: 2,
              marginRight: 0,
              textTransform: "none",
              fontFamily: "Inter",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "lightGrey",
              },
            }}
          >
            Schedule
          </Button>

          <Button
            sx={{
              width: "60%",
              height: 46,
              fontSize: 12,
              backgroundColor: "#404951",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: 2,
              fontFamily: "Inter",
              "&:hover": {
                backgroundColor: "#404951",
              },
            }}
          >
            Start interview
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleInterview;
