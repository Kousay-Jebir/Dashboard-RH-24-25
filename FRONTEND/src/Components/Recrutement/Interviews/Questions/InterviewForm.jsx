import React, { useReducer } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  useTheme,
  Typography,
} from "@mui/material";

// Initial form state
const initialState = {
  formData: {
    candidatName: "",
    candidatLastName: "",
    candidatField: "",
    candidatYear: "",
    candidatPhone: "",
    candidatEmail: "",
    candidatAddress: "",
    candidatCity: "",
    department: "",
  },
  errors: {},
};

// Reducer function to handle form state and errors
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" }, // Reset errors on change
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

// Validation function for required fields
const validateFields = (state, requiredFields) => {
  let isValid = true;
  requiredFields.forEach((field) => {
    if (!state.formData[field]) {
      state.dispatch({
        type: "SET_ERROR",
        field,
        error: `${field.replace("candidat", "").replace(/([A-Z])/g, " $1")} is required`,
      });
      isValid = false;
    }
  });
  return isValid;
};

export default function CandidateForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const theme = useTheme();

  const handleChange = (e) => {
    dispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = [
      "candidatName",
      "candidatLastName",
      "candidatYear",
      "candidatPhone",
      "candidatEmail",
      "department",
    ];

    if (validateFields({ state, dispatch }, requiredFields)) {
      console.log("Form submitted", state.formData);
      dispatch({ type: "RESET_FORM" });
    }
  };

  const formFields = [
    { label: "First Name", name: "candidatName", type: "text", width: "221px" },
    { label: "Last Name", name: "candidatLastName", type: "text", width: "221px" },
    { label: "Email Address", name: "candidatEmail", type: "email", width: "321px" },
    { label: "Phone Number", name: "candidatPhone", type: "text", width: "253px" },
    { label: "Address", name: "candidatAddress", type: "text", width: "321px" },
    { label: "City", name: "candidatCity", type: "text", width: "221px" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ fontSize: "18px", fontWeight: theme.typography.medium, m: 2  }}>
        General Information
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 , m :2 }}>
        {formFields.map(({ label, name, type, width }) => (
          <FormControl key={name} sx={{ width }}>
            <FormLabel sx={{ fontSize: "14px", color: theme.palette.text.main }}>
              {label}
            </FormLabel>
            <TextField
              name={name}
              type={type}
              value={state.formData[name]}
              onChange={handleChange}
              size="small"
              error={!!state.errors[name]}
              helperText={state.errors[name]}
              sx={{
                "& .MuiInputBase-input": { fontSize: "12px" },
                "& .MuiInputBase-root": { height: "35px" },
              }}
            />
          </FormControl>
        ))}

        <FormControl sx={{ width: "221px" }}>
          <FormLabel sx={{ fontSize: "14px", color: theme.palette.text.main }}>
            Field
          </FormLabel>
          <Select
            name="candidatField"
            value={state.formData.candidatField}
            onChange={handleChange}
            sx={{ height: "35px", fontSize: "12px" }}
          >
            {["MPI", "CBA", "GL", "RT", "IIA", "IMI", "CH", "BIO"].map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "221px" }}>
          <FormLabel sx={{ fontSize: "14px", color: theme.palette.text.main }}>
            Year
          </FormLabel>
          <Select
            name="candidatYear"
            value={state.formData.candidatYear}
            onChange={handleChange}
            sx={{ height: "35px", fontSize: "12px" }}
            error={!!state.errors.candidatYear}
          >
            {[1, 2, 3, 4].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl component="fieldset" sx={{ width: "100%" }} error={!!state.errors.department}>
          <FormLabel sx={{ fontSize: "14px", color: theme.palette.text.main }}>
            Department
          </FormLabel>
          <RadioGroup
            name="department"
            value={state.formData.department}
            onChange={handleChange}
            row
          >
            {["Projet", "Dév. Commercial", "Marketing", "Cellule Qualité"].map((dep) => (
              <FormControlLabel
                key={dep}
                value={dep}
                control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "12px" } }} />}
                label={dep}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
        Submit
      </Button>
    </form>
  );
}
