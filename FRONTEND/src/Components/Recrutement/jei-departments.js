
export const departments = {
    MARKETING : {
        id: 1,
        title : 'Marketing',
        color : 'blue.main'

    },
    PROJET : {
        id: 2,
        title : 'Projet',
        color : 'green.main'
    },
    DEV_CO : {
        id: 3,
        title : 'Dév. Commercial',
        color : 'lightBlue.main'
    },
    QUALITY : {
        id: 4,
        title : 'Cellule qualité',
        color : 'purple.main'
    },
};


export function getColorById(id) {

    for (const department of Object.values(departments)) {
        if (department.id === id) {
            return department.color;
        }
    }
    return undefined;
}

export function getDepartmentIdByDepartmentTitle(title) {

    for (const department of Object.values(departments)) {
        if (department.title === title) {
            return department.id;
        }
    }
    return undefined;
}