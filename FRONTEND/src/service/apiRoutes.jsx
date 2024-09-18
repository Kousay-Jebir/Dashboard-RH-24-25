const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const BACKEND_API_ROUTES = {
    GET_SUPERADMIN: '/superadmin',
    GET_SUPERADMIN_BY_ID: '/superadmin/:id',
    CREATE_SUPERADMIN: '/superadmin/create',
    GET_MEMBER: '/member',
    GET_MEMBER_BY_ID: '/member/:id',
    CREATE_MEMBER: '/member/create',
    GET_MEETING:'/meeting',
    GET_MEETING_BY_ID:'/meeting/:id',
    CREATE_MEETING:'/meeting/create',
    JOIN_MEETING:'/meeting/join',
    GET_MEETINGQUESTION:'/meetingquestion',
    CREATE_MEETINGQUESTION:'/meetingquestion/create',
    ANSWER_MEETINGQUESTION:'/meetingquestion/answer',
    GET_INTERVIEW:'/interview',
    CREATE_INTERVIEW:'/interview/createInterview',
    GET_INTERVIEWQUESTION:'/interviewquestion',
    CREATE_INTERVIEWQUESTION:'/interviewquestion/create',
    GET_CANDIDAT:'/candidat',
    CREATE_CANDIDAT:'/candidat/create',
    UPGRADE_CANDIDAT:'/candidat/upgrade'
};

export { BASE_URL, BACKEND_API_ROUTES };