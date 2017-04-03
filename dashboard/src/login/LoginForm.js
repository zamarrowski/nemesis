import React from 'react'
import { browserHistory } from 'react-router'
import Ionicon from 'react-ionicons'

import getURLParameters from './getURLParameters'
import loginServices from './loginServices'
import config from './../config'

class LoginForm extends React.Component {

  constructor() {
    super()
    this.state = { loading: false }
  }

  componentDidMount() {
    let params = getURLParameters()
    localStorage.token = null
    if (params.code) {
      this.setState({ loading: true })
      loginServices.login(params.code).then(response => {
        localStorage.token = response.data.access_token
        this.setState({ loading: false })
        browserHistory.push('/')
      })
    }
  }

  render() {
    return(
        <div>
          {this.state.loading ? this._getLoadingIcon() : this._getLoginButton()}
        </div>
    )
  }

  _getLoginButton() {
    return (
      <a href={`https://slack.com/oauth/authorize?scope=identity.basic&client_id=${config.clientId}`}>
        <img alt="slack_button" src="https://api.slack.com/img/sign_in_with_slack.png" />
      </a>
    )
  }

  _getLoadingIcon() {
    return(
      <div>
        <h3 style={{ color: 'white' }}>Loading...</h3>
        <Ionicon fontSize="50px" style={{margin: '0 auto'}} rotate={true} color="white" icon="ion-load-c"/>
      </div>
    )
  }

}

export default LoginForm
