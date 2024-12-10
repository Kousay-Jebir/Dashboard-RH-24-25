import { Grid } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanForm from "../../../kanbanForm";
import ScheduleButton from "../../../ScheduleButton";
import { getDepartmentIdByDepartmentTitle } from "../../jei-departments";
import InterviewStatus from "./InterviewStatus";
import RecruitementInterviewCard from "./RecruitementInterviewCard";
import { api } from "../../../../service/api";


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function Layout({ boardColumns, setBoardColumns }) {
    const [showFormInColumn, setShowFormInColumn] = useState(null); // Track which column shows the form
    console.log(boardColumns)
    const getFormData = async(formData) => {
        const updatedColumns = { ...boardColumns };
        
        const newInterview = {
            recruiter: formData.interviewedBy,
            date: formData.date,
            time: formData.time,
            duration: "1 hour",
            department: formData.department,
            status: capitalizeFirstLetter(showFormInColumn),
            "polePresentationGrade": 0,
            "jeiKnowledgeGrade": 0,
            "availabilityGrade": 0,
            "rhQuestionsGrade": 0,
            "situationGrade": 0,
            "associativeExperienceGrade": 0,
            "candidatName": formData.interviewWithFirstName,
            "candidatEmail": formData.candidatEmail,
            "candidatPhone": formData.candidatPhone,
            "candidatAddress": formData.candidatAddress,
            "candidatLastName": formData.interviewWithLastName,
            "candidatField": formData.candidatYear,
            "candidatYear": formData.candidatYear,
            "candidatCity": formData.candidatCity

        };
        const result = (await (api.createInterview(newInterview))).data.data;
        

        const newInterviewForUi = {
            id:result.id.toString(),
            recruiter: formData.interviewedBy,
            date: formData.date,
            time: formData.time,
            duration: "1 hour",
            department: formData.department,
            status: showFormInColumn,
            candidat: {
                name:formData.interviewWith
            }
        };

        updatedColumns[showFormInColumn] = {
            ...updatedColumns[showFormInColumn],
            items: [...updatedColumns[showFormInColumn].items, newInterviewForUi]
        };

        setBoardColumns(updatedColumns);
        setShowFormInColumn(null); // Hide form after submission
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        if (!destination) return;
    
        // Get source and destination columns
        const sourceColumn = boardColumns[source.droppableId];
        const destColumn = boardColumns[destination.droppableId];
    
        let updatedBoardColumns;
    
        // If moving within the same column
        if (source.droppableId === destination.droppableId) {
            const updatedItems = Array.from(sourceColumn.items);
            const [movedItem] = updatedItems.splice(source.index, 1);
            updatedItems.splice(destination.index, 0, movedItem);
    
            updatedBoardColumns = {
                ...boardColumns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: updatedItems
                }
            };
        } else {
            // Moving between columns
            const sourceItems = Array.from(sourceColumn.items);
            const destItems = Array.from(destColumn.items);
            const [movedItem] = sourceItems.splice(source.index, 1);
    
            movedItem.Status = destination.droppableId; // Update status to match destination column
            destItems.splice(destination.index, 0, movedItem);
    
            updatedBoardColumns = {
                ...boardColumns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            };
            api.updateInterview(+(movedItem.id),{...movedItem,id:+(movedItem.id),status:capitalizeFirstLetter(movedItem.Status)})
        }
    
        // Update the state and send the new state to the API
        setBoardColumns(updatedBoardColumns);
    
    };
    
    

    const handleAddInterviewClick = (columnId) => {
        setShowFormInColumn(prev => (prev === columnId ? null : columnId));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container xs={12} sx={{ overflow: 'auto', minWidth: 835}} spacing={2} wrap="nowrap">
                {Object.entries(boardColumns).map(([id, column]) => (
                    <Droppable droppableId={id} key={id}>
                        {(provided) => (
                            <Grid
                                item
                                xs={3}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <InterviewStatus columnId={id} columnLength={column.items.length} />
                                {column.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: 'none',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <RecruitementInterviewCard interview={item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {showFormInColumn === id && <KanbanForm getFormData={getFormData} />}
                                <ScheduleButton
                                    schedule="Add Interview"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'start',
                                        paddingBlock: 1,
                                        color: 'text.primary',
                                        borderColor: 'neutral.light',
                                        fontFamily:"inter",
                                        fontWeight:500
                                    }}
                                    onClick={() => handleAddInterviewClick(id)}
                                />
                            </Grid>
                        )}
                    </Droppable>
                ))}
            </Grid>
        </DragDropContext>
    );
}
