import React from 'react'
import styled from 'styled-components'

import LoginForm from './LoginForm'
import icon from './../icon.png'

const Logo = styled.img`
  height: 250px;
  width: auto;
`

const LoginPageContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  background: #FF5F6D;
  background: -webkit-linear-gradient(to top, #FF5F6D , #FFC371);
  background: linear-gradient(to top, #FF5F6D , #FFC371);
`

const LoginBox = styled.div`
  margin-top: 100px;
  width: 100%;
`

class LoginPage extends React.Component {
  render() {
    return(
      <LoginPageContainer>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <LoginBox>
                <Logo src={icon}/>
                <LoginForm></LoginForm>
            </LoginBox>
          </div>
        </div>
      </LoginPageContainer>
    )
  }
}

export default LoginPage
