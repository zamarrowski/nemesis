import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import LoginPage from './login/LoginPage'
import HomePage from './home/HomePage'
import UserReportsPage from './reports/UserReportsPage'

 export default (
   <div>
     <Route path="/" component={App}>
       <IndexRoute component={HomePage}></IndexRoute>
       <Route path="/user/:id/reports" component={UserReportsPage}></Route>
     </Route>
     <Route path="/login" component={LoginPage}></Route>
   </div>
)
