import interviewsData from '../../../Components/Recrutement/Schedule/KanbanBoard/KanbanBoardData.json';

function sortByStatus(columns) {

    interviewsData.forEach(interview => {

        const status = interview.Status.toLowerCase();
        console.log(status)

        if (columns[status]) {

            columns[status].items.push(interview);
        } else {
            console.error(`Unknown status: ${status}`);
        }
    });
}


 const columns = {
    'confirmed': {
        id: 'confirmed',
        items: []
    },
    'delayed': {
        id: 'delayed',
        items: []
    },
    'cancelled': {
        id: 'cancelled',
        items: []
    }
};

sortByStatus(columns);

const items = interviewsData;

export {items,columns}
