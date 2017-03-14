import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import 'flexboxgrid'

import './index.css'
import routes from './routes'

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
