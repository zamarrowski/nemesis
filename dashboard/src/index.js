import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'flexboxgrid'

import './index.css'
import './axios.config'
import routes from './routes'
import colors from './common/colors'
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: colors.main
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
