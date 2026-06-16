import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const auth = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  profile: () => api.get('/auth/profile/'),
}
export const exams = {
  list: (params) => api.get('/exams/', { params }),
}
export const scholarships = {
  list: (params) => api.get('/scholarships/', { params }),
}
export const colleges = {
  list: (params) => api.get('/colleges/', { params }),
  compare: (ids) => api.post('/colleges/compare/', { ids }),
}
export const checklist = {
  get: () => api.get('/checklist/'),
  update: (id, data) => api.patch(`/checklist/${id}/`, data),
}
export const mentorship = {
  mentors: (params) => api.get('/mentorship/mentors/', { params }),
  becomeMentor: (data) => api.post('/mentorship/become-mentor/', data),
  getChat: (mentorId) => api.get(`/mentorship/chat/${mentorId}/`),
  sendMessage: (mentorId, message) => api.post(`/mentorship/chat/${mentorId}/`, { message }),
}

export default api