import axios from 'axios';
import { BASE_URL, BACKEND_API_ROUTES } from './apiRoutes';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

// Create an Axios instance
const base = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Interceptor to add access token to headers
base.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  login: (data)=>base.post(BACKEND_API_ROUTES.LOGIN,data),
  getTokenValidity: (data) => base.post(BACKEND_API_ROUTES.GET_TOKEN_VALIDITY,data),
  getSuperAdmin: () => base.get(BACKEND_API_ROUTES.GET_SUPERADMIN),
  getSuperAdminById: (id) => base.get(BACKEND_API_ROUTES.GET_SUPERADMIN_BY_ID.replace(':id', id)),
  createSuperAdmin: (data) => base.post(BACKEND_API_ROUTES.CREATE_SUPERADMIN, data),
  getMember: () => base.get(BACKEND_API_ROUTES.GET_MEMBER),
  getTotalMember: ()=>base.get(BACKEND_API_ROUTES.GET_TOTAL_MEMBER),
  getNumberOfMembersByDepartment : (data)=>base.post(BACKEND_API_ROUTES.GET_TOTAL_MEMBER_BY_DEPARTMENT,data),
  getMemberById: (id) => base.get(BACKEND_API_ROUTES.GET_MEMBER_BY_ID.replace(':id', id)),
  createMember: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEMBER, data),
  getMeeting: () => base.get(BACKEND_API_ROUTES.GET_MEETING),
  getTotalMeeting: () => base.get(BACKEND_API_ROUTES.GET_TOTAL_MEETING),
  getTotalTeamBuilding: () => base.get(BACKEND_API_ROUTES.GET_TOTAL_TEAM_BUILDING),
  getTotalEvent: () => base.get(BACKEND_API_ROUTES.GET_TOTAL_EVENT),
  getTotalDepartmentMeeting: () => base.get(BACKEND_API_ROUTES.GET_TOTAL_DEPARTMENT_MEETING),
  getTotalGeneralAssembly: () => base.get(BACKEND_API_ROUTES.GET_TOTAL_GENERAL_ASSEMBLY),
  getMeetingPresentList :(type,id)=>base.get(BACKEND_API_ROUTES.GET_MEETING_PRESENT_LIST.replace(':type',type).replace(":id",id)),
  getGeneralAssembly:() => base.get(BACKEND_API_ROUTES.GET_GENERAL_ASSEMBLY),
  getEvent:() => base.get(BACKEND_API_ROUTES.GET_EVENT),
  getTeamBuilding:() => base.get(BACKEND_API_ROUTES.GET_TEAM_BUILDING),
  getDepartmentMeeting:() => base.get(BACKEND_API_ROUTES.GET_DEPARTMENT_MEETING),
  getMeetingById: (id) => base.get(BACKEND_API_ROUTES.GET_MEETING_BY_ID.replace(':id', id)),
  createMeeting: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEETING, data),
  updateEvent: (id,data) => base.put(BACKEND_API_ROUTES.UPDATE_MEETING+id+'/event',data),
  updateTeamBuilding: (id,data) => base.put(BACKEND_API_ROUTES.UPDATE_MEETING+id+'/teamBuilding',data),
  updateGeneralAssembly: (id,data) => base.put(BACKEND_API_ROUTES.UPDATE_MEETING+id+'/generalAssembly',data),
  updateDepartmentMeeting: (id,data) => base.put(BACKEND_API_ROUTES.UPDATE_MEETING+id+'/departmentMeeting',data),
  joinMeeting: (data) => base.post(BACKEND_API_ROUTES.JOIN_MEETING, data),
  getMeetingQuestion: () => base.get(BACKEND_API_ROUTES.GET_MEETINGQUESTION),
  getMeetingQuestionByID: (id)=>base.get(BACKEND_API_ROUTES.GET_MEETINGQUESTION_BY_ID.replace(':id',id)),
  createMeetingQuestion: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEETINGQUESTION, data),
  answerMeetingQuestion: (data) => base.post(BACKEND_API_ROUTES.ANSWER_MEETINGQUESTION, data),
  getInterview: () => base.get(BACKEND_API_ROUTES.GET_INTERVIEW),
  getInterviewById: (id) => base.get(BACKEND_API_ROUTES.GET_INTERVIEW_BY_ID.replace(':id', id)),
  getRecentInterview: () => base.get(BACKEND_API_ROUTES.GET_RECENT_INTERVIEW),
  getFinishedInterview: ()=> base.get(BACKEND_API_ROUTES.GET_FINISHED_INTERVIEW),
  createInterview: (data) => base.post(BACKEND_API_ROUTES.CREATE_INTERVIEW, data),
  updateInterview: (id,data) => base.post(BACKEND_API_ROUTES.UPDATE_INTERVIEW+id,data),
  getCandidat: () => base.get(BACKEND_API_ROUTES.GET_CANDIDAT),
  createCandidat: (data) => base.post(BACKEND_API_ROUTES.CREATE_CANDIDAT, data),
  upgradeCandidat: (data) => base.post(BACKEND_API_ROUTES.UPGRADE_CANDIDAT, data),
  updateCandidat: (id,data) => base.put(BACKEND_API_ROUTES.UPDATE_CANDIDAT+id,data),
  createSection: (data) => base.post(BACKEND_API_ROUTES.CREATE_SECTION, data),
  updateSection: (id,data) => base.put(BACKEND_API_ROUTES.MODIFY_SECTION.replace(':id', id),data),
  deleteSection: (id) => base.delete(BACKEND_API_ROUTES.DELETE_SECTION.replace(':id', id)),
  createInterviewQuestion: (data) => base.post(BACKEND_API_ROUTES.CREATE_INTERVIEWQUESTION, data),  
  updateInterviewQuestion: (id,data) => base.put(BACKEND_API_ROUTES.MODIFY_INTERVIEWQUESTION.replace(':id', id),data),
  deleteInterviewQuestion: (id) => base.delete(BACKEND_API_ROUTES.DELETE_INTERVIEWQUESTION.replace(':id', id)),
  getInterviewSections: (id) => base.get(BACKEND_API_ROUTES.GET_INTERVIEW_Sections.replace(':id', id)),
};
