import React, { useReducer } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
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
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_FIELD":
//       return {
//         ...state,
//         formData: { ...state.formData, [action.field]: action.value },
//         errors: { ...state.errors, [action.field]: "" }, // Reset errors on change
//       };
//     case "SET_ERROR":
//       return {
//         ...state,
//         errors: { ...state.errors, [action.field]: action.error },
//       };
//     case "RESET_FORM":
//       return initialState;
//     default:
//       return state;
//   }
// };

export default function GeneralInformationForm({ state, dispatch }) {
  const theme = useTheme();

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const formFields = [
    { label: "First Name", name: "candidatName", type: "text", width: "221px" },
    {
      label: "Last Name",
      name: "candidatLastName",
      type: "text",
      width: "221px",
    },
    {
      label: "Email Address",
      name: "candidatEmail",
      type: "email",
      width: "321px",
    },
    {
      label: "Phone Number",
      name: "candidatPhone",
      type: "text",
      width: "253px",
    },
    { label: "Address", name: "candidatAddress", type: "text", width: "321px" },
    { label: "City", name: "candidatCity", type: "text", width: "221px" },
  ];

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: theme.palette.neutral.light,
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{ fontSize: "18px", fontWeight: theme.typography.medium, m: 2 }}
      >
        General Information
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, m: 2 }}>
        {formFields.map(({ label, name, type, width }) => (
          <FormControl key={name} sx={{ width }}>
            <FormLabel
              sx={{ fontSize: "14px", color: theme.palette.text.main, mb: 1 }}
            >
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

        <FormControl sx={{ width: "221px" }} error={!!state.errors.candidatField}>
          <FormLabel
            sx={{ fontSize: "14px", color: theme.palette.text.main, mb: 1 }}
          >
            Field
          </FormLabel>
          <Select
            name="candidatField"
            value={state.formData.candidatField}
            onChange={handleChange}
            sx={{ height: "35px", fontSize: "12px" }}
          >
            {["MPI", "CBA", "GL", "RT", "IIA", "IMI", "CH", "BIO"].map(
              (field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              )
            )}
          </Select>
          <FormHelperText error>{state.errors.candidatField}</FormHelperText>
        </FormControl>

        <FormControl sx={{ width: "221px" }} error={!!state.errors.candidatYear}>
          <FormLabel
            sx={{ fontSize: "14px", color: theme.palette.text.main, mb: 1 }}
          >
            Year
          </FormLabel>
          <Select
            name="candidatYear"
            value={state.formData.candidatYear}
            onChange={handleChange}
            sx={{ height: "35px", fontSize: "12px" }}
          >
            {[1, 2, 3, 4].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{state.errors.candidatYear}</FormHelperText>
        </FormControl>

        <FormControl
          component="fieldset"
          sx={{ width: "100%" }}
          error={!!state.errors.department}
        >
          <FormLabel
            sx={{ fontSize: "14px", color: theme.palette.text.main, mb: 1 }}
          >
            Department
          </FormLabel>
          <RadioGroup
            name="department"
            value={state.formData.department}
            onChange={handleChange}
            row
          >
            {[
              "Projet",
              "Dév. Commercial",
              "Marketing",
              "Cellule Qualité",
            ].map((dep) => (
              <FormControlLabel
                key={dep}
                value={dep}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "12px" },
                      "&.Mui-checked": {
                        color: theme.palette.neutral.main,
                      },
                    }}
                  />
                }
                label={dep}
                sx={{
                  border:
                    state.formData.department === dep ? "1px solid" : "none",
                  borderColor: theme.palette.neutral.main,
                  borderRadius: 2,
                  padding: "4px 16px",
                  "& .MuiFormControlLabel-label": {
                    color:
                      state.formData.department === dep
                        ? theme.palette.neutral.main
                        : "inherit",
                  },
                }}
              />
            ))}
          </RadioGroup>
          <FormHelperText error>{state.errors.department}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}
