import { Grid } from "@mui/material";
import InterviewStatus from "./InterviewStatus";
import RecruitementInterviewCard from "./RecruitementInterviewCard";
import InterviewsData from './KanbanBoardData.json'
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { columns } from "../../../../lib/react-beautiful-dnd/kanban-board/data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Layout() {
    const [boardColumns,setBoardColumns] = useState(columns)
    const onDragEnd = (result,boardColumns,setBoardColumns)=>{
        if(!result.destination){
            return
        }
        const {source,destination} = result;
        if(source.droppableId !== destination.droppableId){
            const sourceColumn = boardColumns[source.droppableId];
            const destColumn = boardColumns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed]= sourceItems.splice(source.index,1);
            destItems.splice(destination.index,0,removed);
            setBoardColumns({
                ...boardColumns,
                [source.droppableId] : {
                    ...sourceColumn,
                    items:sourceItems
                },
                [destination.droppableId] : {
                    ...destColumn,
                    items:destItems
                }
            })
        }
        else{
            const column = boardColumns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed]=copiedItems.splice(source.index,1);
            copiedItems.splice(destination.index,0,removed);
            setBoardColumns({
                ...boardColumns,
                [source.droppableId]:{
                    ...column,
                    items:copiedItems
                }
            })
        }       
        console.log(boardColumns)
    }
    return(
        <DragDropContext onDragEnd={result => onDragEnd(result,boardColumns,setBoardColumns)}>
            <Grid container xs={12} sx={{overflow:'scroll'}} spacing={2}>
            {
                Object.entries(boardColumns).map(([id,column])=>{
                    return(
                        <Droppable droppableId={id} key={id}>
                            {(provided,snapshot)=>{
                                return (
                                    <Grid item xs={4}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        
                                    }}
                                    >   
                                    <InterviewStatus columnId={id} columnLength={column.items.length}/>
                                        {column.items.map((item,index)=>{
                                            return(
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {
                                                        (provided,snapshot)=>{
                                                            return(
                                                                <div ref={provided.innerRef} 
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        userSelect:'none',
                                                                        ...provided.draggableProps.style
                                                                    }}>
                                                                        <RecruitementInterviewCard  interview={item}/>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </Grid>
                                )
                            }}
                        </Droppable>
                    )
                })
            }
            </Grid>
        </DragDropContext> 
        
    )
}