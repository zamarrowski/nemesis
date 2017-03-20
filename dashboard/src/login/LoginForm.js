import React from 'react'
import getURLParameters from './getURLParameters'
import loginServices from './loginServices'

class LoginForm extends React.Component {

  constructor() {
    super()
    let params = getURLParameters()
    console.log(params)
    if (params.code) {
      loginServices.login(params.code).then(response => {
        console.log(response)
      })
    }
  }

  render() {
    return(
        <div>
          <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=155087779333.156380766404">
            <img alt="slack_button" src="https://api.slack.com/img/sign_in_with_slack.png" />
          </a>
        </div>
    )
  }
}

export default LoginForm
