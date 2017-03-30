import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import LoginPage from './login/LoginPage'
import HomePage from './home/HomePage'
import UserReportsPage from './reports/UserReportsPage'
import SeekerPage from './seeker/SeekerPage'

function hasToken(nextState, transition, cb) {
  if (localStorage.token && localStorage.token !== 'undefined' && localStorage.token !== 'null') {
    cb()
  } else {
    browserHistory.push('/login')
  }
}

 export default (
   <div>
     <Route path="/" component={App}>
       <IndexRoute onEnter={hasToken} component={HomePage}></IndexRoute>
       <Route onEnter={hasToken} path="/user/:id/reports" component={UserReportsPage}/>
       <Route onEnter={hasToken} path="/seeker" component={SeekerPage}/>
     </Route>
     <Route path="/login" component={LoginPage}/>
   </div>
)
