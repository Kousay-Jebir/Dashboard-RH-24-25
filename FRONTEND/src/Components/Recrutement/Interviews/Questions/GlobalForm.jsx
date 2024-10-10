import React, { useReducer, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import DynamicSectionsForm from "./DynamicSectionsForm";

export default function GlobalForm() {
  const [sections, setSections] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();

    let newSubmitError = "";
    const updatedSections = sections.map((section) => {
      const updatedQuestions = section.questions.map((question) => {
        if (!question.response.trim()) {
          newSubmitError = "All responses are required.";
          return { ...question, error: "Response is required" };
        }
        return { ...question, error: "" };
      });
      return { ...section, questions: updatedQuestions };
    });

    setSections(updatedSections);

    if (newSubmitError) {
      setSubmitError(newSubmitError);
    } else {
      console.log("Sections submitted", sections);
      setSubmitError("");
    }
  };

  const addSection = (title) => {
    if (title.trim()) {
      setSections([...sections, { title, questions: [] }]);
    }
  };

  const modifySectionTitle = (index, newTitle) => {
    if (newTitle.trim()) {
      setSections(sections.map((section, i) =>
        i === index ? { ...section, title: newTitle } : section
      ));
    }
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addQuestion = (sectionIndex, newQuestion) => {
    const updatedSections = sections.map((section, i) =>
      i === sectionIndex
        ? { ...section, questions: [...section.questions, newQuestion] }
        : section
    );
    setSections(updatedSections);
  };

  const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            questions: section.questions.map((q, j) => {
              if (j === questionIndex) {
                const updatedQuestion = { ...q, [field]: value };
  
                // Only reset error when response is non-empty
                if (field === "response") {
                  if (value.trim() !== "") {
                    updatedQuestion.error = "";
                  }
                }
  
                return updatedQuestion;
              } else {
                return q;
              }
            }),
          }
        : section
    );
    setSections(updatedSections);
  };
  

  const removeQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = sections.map((section, i) =>
      i === sectionIndex
        ? { ...section, questions: section.questions.filter((_, j) => j !== questionIndex) }
        : section
    );
    setSections(updatedSections);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <DynamicSectionsForm
        sections={sections}
        addSection={addSection}
        modifySectionTitle={modifySectionTitle}
        removeSection={removeSection}
        addQuestion={addQuestion}
        handleQuestionChange={handleQuestionChange}
        removeQuestion={removeQuestion}
      />
      {submitError && <Typography color="error">{submitError}</Typography>}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
