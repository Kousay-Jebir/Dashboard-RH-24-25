import React, { useEffect, useReducer, useState } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { api } from "../../../../service/api";
import useApi from "../../../../service/useApi";
import { useParams } from "react-router-dom";

import GeneralInformationForm from "./GeneralInformationForm";
import DynamicSectionsForm from "./DynamicSectionsForm";
import ScoresForm from "./ScoresForm";
import Duration from "./Duration";

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
    duration: "",
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
  const [sections, setSections] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const theme = useTheme();

  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useApi(() => {
    return api.getInterviewById(id);
  });

  const interview = data ? data.data : null;

  const [formData, setFormData] = useState({
    // You can add other form fields here if needed
    scores: {
      polePresentationGrade: 0,
      jeiKnowledgeGrade: 0,
      availabilityGrade: 0,
      rhQuestionsGrade: 0,
      situationGrade: 0,
      associativeExperienceGrade: 0,
    },
  });

  useEffect(() => {
    if (interview) {
      dispatch({
        type: "SET_FIELD",
        field: "candidatName",
        value: interview.candidat.name,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatLastName",
        value: interview.candidat.lastName,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatField",
        value: interview.candidat.field,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatYear",
        value: interview.candidat.year,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatPhone",
        value: interview.candidat.phone,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatEmail",
        value: interview.candidat.email,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatAddress",
        value: interview.candidat.adress,
      });
      dispatch({
        type: "SET_FIELD",
        field: "candidatCity",
        value: interview.candidat.city,
      });
      dispatch({
        type: "SET_FIELD",
        field: "department",
        value: interview.department,
      });
      dispatch({
        type: "SET_FIELD",
        field: "duration",
        value: interview.duration,
      });

      setFormData((prevState) => ({
        ...prevState,
        scores: {
          polePresentationGrade: interview.polePresentationGrade || 0,
          jeiKnowledgeGrade: interview.jeiKnowledgeGrade || 0,
          availabilityGrade: interview.availabilityGrade || 0,
          rhQuestionsGrade: interview.rhQuestionsGrade || 0,
          situationGrade: interview.situationGrade || 0,
          associativeExperienceGrade: interview.associativeExperienceGrade || 0,
        },
        duration: interview.duration,
      }));
    }
  }, [interview]);

  const [errors, setErrors] = useState({
    polePresentationGrade: "",
    jeiKnowledgeGrade: "",
    availabilityGrade: "",
    rhQuestionsGrade: "",
    situationGrade: "",
    associativeExperienceGrade: "",
    duration: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!validateScores()) {
      isValid = false;
    }
    if (!validateSections()) {
      isValid = false;
    }
    if (!validateForm()) {
      isValid = false;
    }

    if (isValid) {
      console.log("Sections submitted", sections);
      console.log("Form submitted", state.formData);
      console.log("Form submitted:", formData);
      try {
        for (const section of sections) {
          console.log(section);
          const formattedSection = {
            name: section.title,
            questions: section.questions.map((q) => ({
              question: q.question,
              answer: q.response,
              interviewId: parseInt(id, 10),
              type: section.title, // Replace with actual logic for type if needed
              section: section.title, // Section name from the title
            })),
          };

          await api.createSection(formattedSection);

          const candidatData = {
            name: state.candidatName,
            lastName: state.candidatLastName,
            phone: state.candidatPhone,
            email: state.candidatEmail,
            field: state.candidatField,
            year: state.formData.candidatYear,
            adress: state.formData.candidatAddress,
            city: state.formData.candidatCity,
            //department: state.formData.department
          };

          // Call the API to update the candidate information
          await api.updateCandidat(id, candidatData);

          const submittedInterview = {
            time: interview.date,
            duration: formData.duration,
            polePresentationGrade: formData.scores.polePresentationGrade,
            jeiKnowledgeGrade: formData.scores.jeiKnowledgeGrade,
            availabilityGrade: formData.scores.availabilityGrade,
            rhQuestionsGrade: formData.scores.rhQuestionsGrade,
            situationGrade: formData.scores.situationGrade,
            associativeExperienceGrade:
              formData.scores.associativeExperienceGrade,
            status: "finished",
          };

          await api.updateInterview(id, submittedInterview);
        }

        // Optional: Handle success if all sections are posted
        console.log("All sections posted successfully");
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        alert("Échec de l'envoi du message.");
      }
      //dispatch({ type: "RESET_FORM" });
      //setSections([]);
      // setFormData({
      //   scores: {
      //     polePresentationGrade: 0,
      //     jeiKnowledgeGrade: 0,
      //     availabilityGrade: 0,
      //     rhQuestionsGrade: 0,
      //     situationGrade: 0,
      //     associativeExperienceGrade: 0,
      //   },
      // });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const requiredFields = [
      "candidatName",
      "candidatLastName",
      "candidatYear",
      "candidatField",
      "candidatPhone",
      "candidatEmail",
      "department",
    ];

    requiredFields.forEach((field) => {
      if (!state.formData[field]) {
        dispatch({
          type: "SET_ERROR",
          field,
          error: `${field
            .replace("candidat", "")
            .replace(/([A-Z])/g, " $1")} is required`,
        });
        isValid = false;
      }
    });

    if (
      state.formData.candidatEmail &&
      !validateEmail(state.formData.candidatEmail)
    ) {
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
    if (sections.length === 0) {
      newSubmitError = "Sections are required!";
    } else {
      newSubmitError = "";
      const updatedSections = sections.map((section) => {
        const updatedQuestions = section.questions.map((question) => {
          if (!question.response.trim()) {
            newSubmitError = "All responses are required!";
            return { ...question, error: "Response is required" };
          }
          return { ...question, error: "" };
        });
        return { ...section, questions: updatedQuestions };
      });
      setSections(updatedSections);
    }

    if (!!newSubmitError) {
      setSubmitError(newSubmitError);
      return false;
    } else {
      // console.log("Sections submitted", sections);
      setSubmitError("");
      return true;
    }
  };

  const addSection = async (title) => {
    if (title.trim()) {
      setSections([...sections, { title, questions: [] }]);

      try {
        const response = await api.createSection({ name: title });
        console.log(response.data.id);
        setSections([
          ...sections,
          { title, id: response.data.id, questions: [] },
        ]);
        console.log(sections);
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        alert("Échec de l'envoi du message.");
      }
    }
  };

  const modifySectionTitle = async (index, newTitle) => {
    let Sec_id = sections[index].id;
    console.log("SecID =", Sec_id);
    if (newTitle.trim()) {
      setSections(
        sections.map((section, i) =>
          i === index ? { ...section, title: newTitle } : section
        )
      );

      try {
        const response = await api.updateSection(Sec_id, { name: newTitle });
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        alert("Échec de l'envoi du message.");
      }
    }
  };

  const removeSection = async (index) => {
    setSections(sections.filter((_, i) => i !== index));

    let Sec_id = sections[index].id;
    console.log("SecID_for_delete =", Sec_id);

    try {
      const response = await api.deleteSection(Sec_id);
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Échec de l'envoi du message.");
    }
  };

  const addQuestion = async (sectionIndex, newQuestion) => {
    const question_data = {
      question: newQuestion.question,
      answer: "Default Answer",
      interviewId: parseInt(id, 10),
      type: sections[sectionIndex].title,
      section: String(sections[sectionIndex].id),
    };
    console.log(question_data);

    try {
      const response = await api.createInterviewQuestion(question_data);
      console.log(response);
      const updatedSections = sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              questions: [
                ...section.questions,
                {
                  question: newQuestion.question,
                  response: "",
                  id: response.data.id,
                },
              ],
            }
          : section
      );
      setSections(updatedSections);
      console.log(sections);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Échec de l'envoi du message.");
    }
  };

  const handleQuestionChange = async (sectionIndex, questionIndex, field, value ) => {
    ques_id = sections[sectionIndex][questionIndex].id
    if (field === "response") {
      const question_data = {
        question: sections[sectionIndex][questionIndex].question,
        answer: value,
        type: sections[sectionIndex].title,
      };
    } else {
      const question_data = {
        question: value,
        answer: sections[sectionIndex][questionIndex].response,
        type: sections[sectionIndex].title,
      };
    }
    console.log(question_data);

    try {
      const response = await api.updateInterviewQuestion(ques_id, question_data);
      console.log(response);

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

      console.log(sections);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Échec de l'envoi du message.");
    }
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = sections.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            questions: section.questions.filter((_, j) => j !== questionIndex),
          }
        : section
    );
    setSections(updatedSections);
  };

  //Scores:

  // Handle changes in the ScoresForm component
  const handleScoresChange = (newScores) => {
    setFormData((prevData) => ({
      ...prevData,
      scores: newScores,
    }));
  };

  // Handle form submission
  const validateScores = () => {
    let scoresValid = true;
    const { scores } = formData;

    // Check if any score is invalid
    if (Object.values(scores).some((score) => score === "" || score <= 0)) {
      // Set errors for each invalid score
      setErrors((prevErrors) =>
        Object.keys(scores).reduce((acc, key) => {
          if (scores[key] === "" || scores[key] <= 0) {
            acc[key] = "Score must be between 0 and 100";
          }
          return acc;
        }, {})
      );
      scoresValid = false; // Mark as invalid
    } else {
      // Clear the errors if scores are valid
      setErrors({});
    }

    return scoresValid;
  };

  //Duration:

  const handleDurationChange = (e) => {
    setFormData({ ...formData, duration: e.target.value });
  };

  const handleBlur = () => {
    validateDuration(formData, setErrors);
  };

  const validateDuration = () => {
    let durationValid = true;
    if (formData.duration === "" || formData.duration == 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "Duration is required",
      }));
      durationValid = false;
    } else if (formData.duration >= 121) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "Duration cannot exceed 121 minutes (2 hours)",
      }));
      durationValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: null,
      }));
    }

    return durationValid;
  };

  return (
    <Box sx={{ padding: 0 }}>
      {submitError && <Typography color="error">{submitError}</Typography>}
      <Box
        sx={{
          gap: 2,
          display: "flex",
          marginLeft: "auto",
          justifyContent: "end",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            mb: 2,
            color: theme.palette.neutral.normal,
            borderColor: theme.palette.neutral.normal,
            "&:hover": {
              backgroundColor: theme.palette.neutral.light,
              borderColor: theme.palette.neutral.light,
            },
          }}
        >
          Get back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mb: 2,
            // display: "flex",
            // marginLeft: "auto",
            backgroundColor: theme.palette.neutral.normal,
            borderColor: theme.palette.neutral.normal,
            "&:hover": {
              backgroundColor: theme.palette.neutral.main,
              borderColor: theme.palette.neutral.main,
            },
          }}
          onClick={handleSubmit}
        >
          Save interview
        </Button>
      </Box>
      <GeneralInformationForm state={state} dispatch={dispatch} />
      <DynamicSectionsForm
        sections={sections}
        addSection={addSection}
        modifySectionTitle={modifySectionTitle}
        removeSection={removeSection}
        addQuestion={addQuestion}
        handleQuestionChange={handleQuestionChange}
        removeQuestion={removeQuestion}
      />
      <ScoresForm
        scores={formData.scores}
        onScoresChange={handleScoresChange}
        errors={errors}
      />
      <Duration
        value={formData.duration}
        onChange={handleDurationChange}
        error={errors.duration}
        onBlur={handleBlur}
      />
    </Box>
  );
}
