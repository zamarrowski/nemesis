import axios from 'axios'

axios.interceptors.request.use(request => {
  request.headers['Authorization'] = localStorage.token
  return request
})
