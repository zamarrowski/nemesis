import axios from 'axios'

import config from './../config'

export default {
  getLastReports: () => {
    return axios.get(`${config.baseService}/last-reports/`)
  },
  getUserReports: (userId) => {
    return axios.get(`${config.baseService}/last-reports/${userId}/`)
  }
}
