import React, { useReducer, useState } from "react";
import { Box, Button , useTheme , Typography } from "@mui/material";
import GeneralInformationForm from "./GeneralInformationForm";
import DynamicSectionsForm from "./DynamicSectionsForm";

// Initial form state for general information
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
        errors: { ...state.errors, [action.field]: "" },
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

export default function GlobalForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [editIndex, setEditIndex] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Sections submitted", sections);
    if (validateForm() && validateSections()) {
      console.log("Sections submitted", sections);
      console.log("Form submitted", state.formData);
      dispatch({ type: "RESET_FORM" });
      setSections([]);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const requiredFields = [
      "candidatName",
      "candidatLastName",
      "candidatYear",
      "candidatPhone",
      "candidatEmail",
      "department",
    ];

    requiredFields.forEach((field) => {
      if (!state.formData[field]) {
        dispatch({
          type: "SET_ERROR",
          field,
          error: `${field.replace("candidat", "").replace(/([A-Z])/g, " $1")} is required`,
        });
        isValid = false;
      }
    });

    if (state.formData.candidatEmail && !validateEmail(state.formData.candidatEmail)) {
      dispatch({
        type: "SET_ERROR",
        field: "candidatEmail",
        error: "Email Address is not valid",
      });
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //Sections functions

  const validateSections = () => {

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

    if (!!newSubmitError) {
      setSubmitError(newSubmitError);
      return(false)
    } else {
      // console.log("Sections submitted", sections);
      setSubmitError("");
      return (true);
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
    <Box sx={{ padding: 0 }}>
      {submitError && <Typography color="error">{submitError}</Typography>}
      <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 , display: "flex" , marginLeft: "auto",  }} onClick={handleSubmit}>
        Submit
      </Button>
      <GeneralInformationForm
        state={state}
        dispatch={dispatch}
      />
      <DynamicSectionsForm
        sections={sections}
        addSection={addSection}
        modifySectionTitle={modifySectionTitle}
        removeSection={removeSection}
        addQuestion={addQuestion}
        handleQuestionChange={handleQuestionChange}
        removeQuestion={removeQuestion}
      />
    </Box>
  );
}
