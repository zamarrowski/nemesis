import React from 'react'
import getURLParameters from './getURLParameters'
import loginServices from './loginServices'
import { browserHistory } from 'react-router'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'

const LoadingMessage = styled.h3`
  color: white;
`

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
      <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=155087779333.156380766404">
        <img alt="slack_button" src="https://api.slack.com/img/sign_in_with_slack.png" />
      </a>
    )
  }

  _getLoadingIcon() {
    return(
      <div>
        <LoadingMessage>Loading...</LoadingMessage>
        <Ionicon fontSize="50px" style={{margin: '0 auto'}} rotate={true} color="white" icon="ion-load-c"/>
      </div>
    )
  }

}

export default LoginForm
