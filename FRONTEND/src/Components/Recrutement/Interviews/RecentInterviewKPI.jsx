import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const RecentInterviewKPI = ({
  poleGrade = 0,
  knowledgeGrade = 0,
  availabilityGrade = 0,
  RHGrade = 0,
  situationsGrade = 0,
  associativeGrade = 0,
  isEditing = false,
  onSave,
  onCancel,
  onChange,
}) => {
  const theme = useTheme();
  const [editedGrades, setEditedGrades] = useState({
    poleGrade,
    knowledgeGrade,
    availabilityGrade,
    RHGrade,
    situationsGrade,
    associativeGrade,
  });

  useEffect(() => {
    // Update state when props change
    setEditedGrades({
      poleGrade,
      knowledgeGrade,
      availabilityGrade,
      RHGrade,
      situationsGrade,
      associativeGrade,
    });
  }, [poleGrade, knowledgeGrade, availabilityGrade, RHGrade, situationsGrade, associativeGrade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGrades((prev) => ({ ...prev, [name]: Number(value) })); // Convert to number
    onChange({ [name]: Number(value) }); // Pass as number
  };
  

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {[
        { title: "Pole presentation grade", value: editedGrades.poleGrade, name: 'polePresentationGrade' },
        { title: "Knowledge of JEI grade", value: editedGrades.knowledgeGrade, name: 'jeiKnowledgeGrade' },
        { title: "Availability grade", value: editedGrades.availabilityGrade, name: 'availabilityGrade' },
        { title: "RH questions grade", value: editedGrades.RHGrade, name: 'rhQuestionsGrade' },
        { title: "Situations grade", value: editedGrades.situationsGrade, name: 'situationGrade' },
        { title: "Associative experience grade", value: editedGrades.associativeGrade, name: 'associativeExperienceGrade' },
      ].map(({ title, value, name }) => (
        <Box
          key={title}
          sx={{
            width: "190px",
            height: "49px",
            borderRadius: "5px",
            border: "0.1px solid Lightgrey",
            display: "flex",
            padding: "8px 8px",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "14.52px",
              textAlign: "left",
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            {title}
          </Typography>
          {isEditing ? (
            <TextField
              name={name}
              type="number"
              value={value}
              variant="standard"
              onChange={handleInputChange}
              size="small"
              sx={{ fontSize: "small" }}
            />
          ) : (
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                textAlign: "left",
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              {`${value}/100`}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RecentInterviewKPI;
