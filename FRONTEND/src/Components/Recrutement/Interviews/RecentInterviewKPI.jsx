import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const RecentInterviewKPI = ({
  poleGrade = "N/A",
  knowledgeGrade = "N/A",
  availabilityGrade = "N/A",
  RHGrade = "N/A",
  situationsGrade = "N/A",
  associativeGrade = "N/A",
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
    setEditedGrades((prev) => ({ ...prev, [name]: value }));
    onChange({ [name]: value });
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {[
        { title: "Pole presentation grade", value: editedGrades.poleGrade, name: 'poleGrade' },
        { title: "Knowledge of JEI grade", value: editedGrades.knowledgeGrade, name: 'knowledgeGrade' },
        { title: "Availability grade", value: editedGrades.availabilityGrade, name: 'availabilityGrade' },
        { title: "RH questions grade", value: editedGrades.RHGrade, name: 'RHGrade' },
        { title: "Situations grade", value: editedGrades.situationsGrade, name: 'situationsGrade' },
        { title: "Associative experience grade", value: editedGrades.associativeGrade, name: 'associativeGrade' },
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
