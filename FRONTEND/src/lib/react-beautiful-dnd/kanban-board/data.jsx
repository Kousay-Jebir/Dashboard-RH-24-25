import interviewsData from '../../../Components/Recrutement/Schedule/KanbanBoard/KanbanBoardData.json'

export const items = interviewsData;

export const columns = {
    'confirmed':{
        id:'confirmed',
        items:items
    },
    'delayed':{
        id:'delayed',
        items:[]
    },
    'cancelled':{
        id:'cancelled',
        items:[]
    }
}