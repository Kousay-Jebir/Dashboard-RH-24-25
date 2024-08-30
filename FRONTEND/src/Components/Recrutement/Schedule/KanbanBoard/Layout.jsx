import { Grid } from "@mui/material";
import InterviewStatus from "./InterviewStatus";
import RecruitementInterviewCard from "./RecruitementInterviewCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanForm from "../../../kanbanForm";
import ScheduleButton from "../../../ScheduleButton";
import { statuses } from "../../interview-states";
import { getDepartmentIdByDepartmentTitle } from "../../jei-departments";
import { useState } from "react";

export default function Layout({ boardColumns, setBoardColumns }) {
    const [showFormInColumn, setShowFormInColumn] = useState(null); // Track which column shows the form

    const getFormData = (formData) => {
        const updatedColumns = { ...boardColumns };
        
        const newInterview = {
            id: Date.now().toString(), // Generate a unique ID
            Interviewee: formData.interviewWith,
            Date: formData.date,
            Time: formData.time,
            Interviewer: formData.interviewedBy,
            Department: formData.department,
            DepartmentId: getDepartmentIdByDepartmentTitle(formData.department),
            Status: showFormInColumn
        };

        updatedColumns[showFormInColumn] = {
            ...updatedColumns[showFormInColumn],
            items: [...updatedColumns[showFormInColumn].items, newInterview]
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

        // If moving within the same column
        if (source.droppableId === destination.droppableId) {
            const updatedItems = Array.from(sourceColumn.items);
            const [movedItem] = updatedItems.splice(source.index, 1);
            updatedItems.splice(destination.index, 0, movedItem);

            // Update boardColumns state
            setBoardColumns({
                ...boardColumns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: updatedItems
                }
            });
        } else {
            // Moving between columns
            const sourceItems = Array.from(sourceColumn.items);
            const destItems = Array.from(destColumn.items);
            const [movedItem] = sourceItems.splice(source.index, 1);

            movedItem.Status = destination.droppableId; // Update status to match destination column
            destItems.splice(destination.index, 0, movedItem);

            // Update boardColumns state
            setBoardColumns({
                ...boardColumns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        }
    };

    const handleAddInterviewClick = (columnId) => {
        setShowFormInColumn(prev => (prev === columnId ? null : columnId));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container xs={12} sx={{ overflow: 'auto', minWidth: 835 }} spacing={2}>
                {Object.entries(boardColumns).map(([id, column]) => (
                    <Droppable droppableId={id} key={id}>
                        {(provided) => (
                            <Grid
                                item
                                xs={4}
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
