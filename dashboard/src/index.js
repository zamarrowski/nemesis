import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'flexboxgrid'

import './index.css'
import './axios.config'
import routes from './routes'
injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
