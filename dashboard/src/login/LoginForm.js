import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class LoginForm extends React.Component {
  render() {

    const styles = {
      underlineStyle: {
        borderColor: 'white',
      },
      floatingLabelStyle: {
        color: 'white',
      },
      style: {
        color: 'white',
      },
      size: {
        width: '100%'
      }
    }

    return(
        <div>
          <TextField
            floatingLabelText="Username"
            inputStyle={styles.style}
            style={styles.size}
            underlineFocusStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}>
          </TextField>

          <TextField
            floatingLabelText="Password"
            type="password"
            inputStyle={styles.style}
            style={styles.size}
            underlineFocusStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}>
          </TextField>

          <RaisedButton label="Login" fullWidth={true}></RaisedButton>
        </div>
    )
  }
}

export default LoginForm
