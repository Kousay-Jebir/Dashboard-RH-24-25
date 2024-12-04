import React, { useReducer, useState,useEffect } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import AddMemberPopup from "./AddMemberPopup";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { departments } from "../jei-departments";
import { getDepartmentIdByDepartmentTitle } from "../jei-departments";
import { getColorById } from "../jei-departments";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import RecentInterviewKPI from "./RecentInterviewKPI";
import { api } from "../../../service/api";
import useApi from "../../../service/useApi";
import { useNavigate } from "react-router-dom";


const calculateAverageScore = (row) => {
  const scores = [
    row.polePresentationGrade,
    row.jeiKnowledgeGrade,
    row.availabilityGrade,
    row.rhQuestionsGrade,
    row.situationGrade,
    row.associativeExperienceGrade,
  ].filter(score => score !== undefined); // Filter out any undefined grades
  
  if (scores.length === 0) return 0; // Avoid division by zero
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return (sum / scores.length).toFixed(2); // Return average, formatted to 2 decimal places
};





// Define initial state and reducer function
const initialState = {
  editingRow: null,
  isEditing: false,
  kpiData: [],
  tempData: null, // Temporary data for editing
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT':
      return {
        ...state,
        isEditing: true,
        editingRow: action.payload,
        tempData: { ...state.kpiData[action.payload] },
      };
    case 'START_ADD_MEMBER':
      return {
        ...state,
        isEditing: false,
        tempData: null,
      };
    case 'SAVE_CHANGES':
      return {
        ...state,
        kpiData: state.kpiData.map((row, index) =>
          index === state.editingRow ? { ...state.tempData } : row
        ),
        isEditing: false,
        editingRow: null,
        tempData: null,
      };
    case 'CANCEL_EDIT':
      return {
        ...state,
        isEditing: false,
        editingRow: null,
        tempData: null,
      };
    case 'UPDATE_TEMP_DATA':
      return {
        ...state,
        tempData: {
          ...state.tempData,
          ...action.payload,
        },
      };
    case 'SET_KPI_DATA':
      return {
        ...state,
        kpiData: action.payload,
      };
    default:
      return state;
  }
};

const DataTable = ({ data }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, { ...initialState, kpiData: data });
  const [expandedRow, setExpandedRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log(state)
  const theme = useTheme();
  useEffect(() => {
    dispatch({ type: 'SET_KPI_DATA', payload: data });
  }, [data]);
  const handleExpandClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleEditClick = (index) => {
    dispatch({ type: 'TOGGLE_EDIT', payload: index });
  };

  const reviewResponsesHandler  = (index)=>{
    console.log(state);
    console.log(state.kpiData[index]);
    navigate(`/recruitement/interviews/questions/${state.kpiData[index].id}`)
  }

  const handleAddMember = () => {
    dispatch({ type: 'START_ADD_MEMBER' });
    setPopupOpen(true)
  };

  const handleConfirmAddMember = () => {
    api.upgradeCandidat({id:state.kpiData[expandedRow].candidat.id})
    setPopupOpen(false); 
  };

  const handleSaveChanges = () => {
    if (state.editingRow !== null) {
      dispatch({ type: 'SAVE_CHANGES' });
    }
    console.log("saving");
    console.log(state.tempData)
    api.updateInterview(state.tempData.id,{
      polePresentationGrade:state.tempData.polePresentationGrade,
      jeiKnowledgeGrade:state.tempData.jeiKnowledgeGrade,
      availabilityGrade:state.tempData.availabilityGrade,
      rhQuestionsGrade:state.tempData.rhQuestionsGrade,
      situationGrade:state.tempData.situationGrade,
      associativeExperienceGrade:state.tempData.associativeExperienceGrade,
    });
  };

  const handleCancelEdit = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

 /*  const handleUpdateTempData = (updatedGrades) => {
    console.log("updated grades")
    console.log(updatedGrades)
    dispatch({ type: 'UPDATE_TEMP_DATA', payload: updatedGrades });
  };
 */
  const handleUpdateTempData = (updatedGrades) => {
    console.log("updated grades", updatedGrades);
    
    // Validate the grades to ensure they don't exceed 100
    const validatedGrades = Object.keys(updatedGrades).reduce((acc, key) => {
      // Ensure the score doesn't exceed 100
      acc[key] = Math.min(updatedGrades[key], 100);
      return acc;
    }, {});
  
    // Update the tempData with validated grades
    dispatch({ type: 'UPDATE_TEMP_DATA', payload: validatedGrades });
  };
  

  return (
    <>
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Name</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Department</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Date</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Duration</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Recruiter</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}>Grade</TableCell>
            <TableCell sx={{ borderBottom: "none", color: theme.palette.neutral.normal }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.kpiData.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: "none" } }}>
                <TableCell sx={{ borderBottom: "none" }}>{row.candidat.name}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <Typography
                    sx={{
                      backgroundColor:
                        /* row.department === departments.DEV_CO.title
                          ? theme.palette.lightBlue.main
                          : row.department === "Projet"
                          ? theme.palette.blue.main
                          : theme.palette.green.main, */
                          getColorById(getDepartmentIdByDepartmentTitle(row.department))
                          ,
                      color: theme.palette.common.white,
                      display: "inline-block",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {row.department}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.date}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.duration}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{row.recruiter}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>{Math.round(calculateAverageScore(row))}/100</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <IconButton size="small" onClick={() => handleExpandClick(index)}>
                    <ArrowForwardIosRoundedIcon
                      sx={{
                        fontSize: "1rem",
                        transform: expandedRow === index ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              {expandedRow === index && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ paddingBottom: 2, borderBottom: "none" }}>
                    <Box p={2}>
                      <RecentInterviewKPI
                        poleGrade={state.isEditing && state.editingRow === index ? state.tempData?.polePresentationGrade : row.polePresentationGrade}
                        knowledgeGrade={state.isEditing && state.editingRow === index ? state.tempData?.jeiKnowledgeGrade : row.jeiKnowledgeGrade}
                        availabilityGrade={state.isEditing && state.editingRow === index ? state.tempData?.availabilityGrade : row.availabilityGrade}
                        RHGrade={state.isEditing && state.editingRow === index ? state.tempData?.rhQuestionsGrade : row.rhQuestionsGrade}
                        situationsGrade={state.isEditing && state.editingRow === index ? state.tempData?.situationGrade : row.situationGrade}
                        associativeGrade={state.isEditing && state.editingRow === index ? state.tempData?.associativeExperienceGrade : row.associativeExperienceGrade}
                        isEditing={state.isEditing && state.editingRow === index}
                        onSave={() => handleSaveChanges()}
                        onCancel={() => handleCancelEdit()}
                        onChange={(updatedGrades) => handleUpdateTempData(updatedGrades)}
                      />
                      <Box display={'flex'} gap={1} justifyContent={'end'}>
                        <Button
                          startIcon={<ChatRoundedIcon />}
                          variant="outlined"
                          sx={{ borderColor: 'neutral.light', color: 'text.light', textTransform: 'none', fontWeight: 'regular' }}
                          onClick={()=>{reviewResponsesHandler(index)}}
                        >
                          Review responses
                        </Button>
                        <Button
                          startIcon={state.isEditing && state.editingRow === index ? null : <BorderColorIcon />}
                          variant="outlined"
                          sx={{ borderColor: 'neutral.light', color: 'text.light', textTransform: 'none', fontWeight: 'regular' }}
                          onClick={state.isEditing ? handleCancelEdit : () => handleEditClick(index)}
                        >
                          {state.isEditing && state.editingRow === index ? 'Discard' : 'Modify'}
                        </Button>
                        <Button
                          startIcon={state.isEditing ? null : <PersonAddIcon />}
                          variant="contained"
                          disableElevation
                          sx={{ textTransform: 'none', fontWeight: 'regular' }}
                          onClick={state.isEditing ? handleSaveChanges : handleAddMember}
                        >
                          {state.isEditing ? 'Save changes' : 'Add member'}
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <AddMemberPopup 
    open={isPopupOpen} 
    onClose={() => setPopupOpen(false)} 
    onConfirm={()=>handleConfirmAddMember()} // Pass the confirm handler
  />
  </>
  );
};

export default DataTable;
