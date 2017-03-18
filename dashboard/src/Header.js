import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Ionicon from 'react-ionicons'
import { browserHistory } from 'react-router'

class Header extends React.Component {
  render() {
    const iconStyle = { marginTop: '5px' }
    const appBarStyle = { backgroundColor: 'rgb(255, 130, 110)' }
    return(
      <AppBar title="Nemesis"
        style={appBarStyle}
        iconElementLeft={
          <Ionicon icon="ion-happy-outline" style={iconStyle} color="white" fontSize="40px"/>
        }
        iconElementRight={
          <IconMenu
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            iconButtonElement={
              <IconButton>
                <Ionicon icon="ion-android-more-vertical" color="white"/>
              </IconButton>
          }>
            <MenuItem onTouchTap={this._redirectTo.bind(this, '/')} primaryText="Home" />
            <MenuItem onTouchTap={this._redirectTo.bind(this, '/seeker')} primaryText="Search reports" />
            <MenuItem onTouchTap={this._redirectTo.bind(this, '/login')} primaryText="Logout" />
          </IconMenu>
        }
        />
    )
  }

  _redirectTo(route) {
    browserHistory.push(route)
  }

}

export default Header
