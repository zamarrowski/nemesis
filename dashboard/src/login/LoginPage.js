import React from 'react'

import LoginForm from './LoginForm'
import { LoginPageContainer, LoginBox } from './styles'
import logo from './../common/logo_name.png'

const logoStyle = {
  width: '100%',
  marginBottom: '20px'
}

class LoginPage extends React.Component {
  render() {
    return(
      <LoginPageContainer>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <LoginBox>
                <img style={logoStyle} src={logo} alt="Nemesis"/>
                <LoginForm/>
            </LoginBox>
          </div>
        </div>
      </LoginPageContainer>
    )
  }
}

export default LoginPage
