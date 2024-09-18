import axios from 'axios';
import { BASE_URL, BACKEND_API_ROUTES } from './apiRoutes';

const base = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const api = {
  getSuperAdmin: () => base.get(BACKEND_API_ROUTES.GET_SUPERADMIN),
  getSuperAdminById: (id) => base.get(BACKEND_API_ROUTES.GET_SUPERADMIN_BY_ID.replace(':id', id)),
  createSuperAdmin: (data) => base.post(BACKEND_API_ROUTES.CREATE_SUPERADMIN, data),
  getMember: () => base.get(BACKEND_API_ROUTES.GET_MEMBER),
  getMemberById: (id) => base.get(BACKEND_API_ROUTES.GET_MEMBER_BY_ID.replace(':id', id)),
  createMember: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEMBER, data),
  getMeeting: () => base.get(BACKEND_API_ROUTES.GET_MEETING),
  getMeetingById: (id) => base.get(BACKEND_API_ROUTES.GET_MEETING_BY_ID.replace(':id', id)),
  createMeeting: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEETING, data),
  joinMeeting: (data) => base.post(BACKEND_API_ROUTES.JOIN_MEETING, data),
  getMeetingQuestion: () => base.get(BACKEND_API_ROUTES.GET_MEETINGQUESTION),
  createMeetingQuestion: (data) => base.post(BACKEND_API_ROUTES.CREATE_MEETINGQUESTION, data),
  answerMeetingQuestion: (data) => base.post(BACKEND_API_ROUTES.ANSWER_MEETINGQUESTION, data),
  getInterview: () => base.get(BACKEND_API_ROUTES.GET_INTERVIEW),
  createInterview: (data) => base.post(BACKEND_API_ROUTES.CREATE_INTERVIEW, data),
  getInterviewQuestion: () => base.get(BACKEND_API_ROUTES.GET_INTERVIEWQUESTION),
  createInterviewQuestion: (data) => base.post(BACKEND_API_ROUTES.CREATE_INTERVIEWQUESTION, data),
  getCandidat: () => base.get(BACKEND_API_ROUTES.GET_CANDIDAT),
  createCandidat: (data) => base.post(BACKEND_API_ROUTES.CREATE_CANDIDAT, data),
  upgradeCandidat: (data) => base.post(BACKEND_API_ROUTES.UPGRADE_CANDIDAT, data),
};