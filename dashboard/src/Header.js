import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Ionicon from 'react-ionicons'
import { browserHistory } from 'react-router'

import colors from './common/colors'
import logo from './common/logo_name.png'

const appBarStyle = { backgroundColor: colors.main }
const logoStyle = { height: '50px' }

class Header extends React.Component {
  render() {
    return(
      <AppBar
        style={appBarStyle}
        iconElementLeft={
          <img style={logoStyle} src={logo} alt="Nemesis"/>
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
