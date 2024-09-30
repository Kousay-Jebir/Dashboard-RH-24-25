import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  useTheme,
} from "@mui/material";

export default function ScoresForm() {
  const theme = useTheme();

  const [scores, setScores] = useState({
    polePresentationGrade: 0,
    jeiKnowledgeGrade: 0,
    availabilityGrade: 0,
    rhQuestionsGrade: 0,
    situationGrade: 0,
    associativeExperienceGrade: 0,
  });
  const [errors, setErrors] = useState({
    polePresentationGrade: "",
    jeiKnowledgeGrade: "",
    availabilityGrade: "",
    rhQuestionsGrade: "",
    situationGrade: "",
    associativeExperienceGrade: "",
  });

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || value > 100) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Score must be between 0 and 100",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setScores((prevScores) => ({ ...prevScores, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(scores).some(
        (score) => score === "" || score < 0 
      )
    ) {
      setErrors((prevErrors) =>
        Object.keys(scores).reduce((acc, key) => {
          if (scores[key] === "" || scores[key] < 0 ) {
            acc[key] = "Score must be between 0 and 100";
          }
          return acc;
        }, {})
      );
    } else {
      console.log("Scores submitted:", scores);
    }
  };

  // Mapping score keys to labels
  const scoreLabels = {
    polePresentationGrade: "Pole Presentation",
    jeiKnowledgeGrade: "JEI Knowledge",
    availabilityGrade: "Availability",
    rhQuestionsGrade: "RH Questions",
    situationGrade: "Situation Handling",
    associativeExperienceGrade: "Associative Experience",
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: "18px", fontWeight: theme.typography.medium, m: 2 }}
      >
        Scores{" "}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, m: 2 }}>
        {Object.keys(scores).map((scoreKey, index) => (
          <Box key={scoreKey} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "12px", mb: 1, textAlign: "center" }}
            >
              {scoreLabels[scoreKey]}
            </Typography>
            <TextField
              name={scoreKey}
              type="number"
              value={scores[scoreKey]}
              onChange={handleScoreChange}
              error={!!errors[scoreKey]}
              helperText={errors[scoreKey] || ""}
              size="small"
              sx={{
                width: "120px",
                "& .MuiInputBase-input": { fontSize: "12px" },
                "& .MuiInputBase-root": { height: "35px" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                    position="end"
                  >
                    /100
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Scores
        </Button>
      </Box>
    </Box>
  );
}
