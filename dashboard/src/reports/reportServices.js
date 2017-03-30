import axios from 'axios'

import config from './../config'

export default {
  getLastReports: () => {
    return axios.get(`${config.baseService}/last-reports/`)
  },
  getUserReports: (userId) => {
    return axios.get(`${config.baseService}/last-reports/${userId}/`)
  },
  searchReports: (parseInfo) => {
    return axios.get(`${config.baseService}/users-reports/?start_date=${parseInfo.start_date}&end_date=${parseInfo.end_date}&users=${parseInfo.users}`)
  }
}
