import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Ionicon from 'react-ionicons'

class App extends Component {
  render() {
    let iconStyle = { marginTop: '5px' }
    let appBarStyle = { backgroundColor: 'rgb(255, 130, 110)' }
    return (
      <div>
        <AppBar title="Nemesis"
          style={appBarStyle}
          iconElementLeft={
            <Ionicon icon="ion-happy-outline" style={iconStyle} color="white" fontSize="40px"/>
          }/>
        <div className="row">
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default App
