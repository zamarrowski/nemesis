import React from 'react'
import Ionicon from 'react-ionicons'

import LoginForm from './LoginForm'
import { LoginPageContainer, LoginBox } from './styles'


class LoginPage extends React.Component {
  render() {
    return(
      <LoginPageContainer>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <LoginBox>
                <Ionicon icon="ion-happy-outline" color="white" fontSize="150px"/>
                <LoginForm/>
            </LoginBox>
          </div>
        </div>
      </LoginPageContainer>
    )
  }
}

export default LoginPage
