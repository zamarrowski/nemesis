import axios from 'axios'
import config from './../config'

export default {
  getUsers: () => {
    return axios.get(`${config.baseService}/users/`)
  }
}
