import axios from 'axios'

import config from './../config'

export default {
  login: (code) => {
    return axios.get(`${config.baseService}/auth-token/?code=${code}`)
  }
}
