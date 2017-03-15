import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import LoginPage from './login/LoginPage'
import HomePage from './home/HomePage'

 export default (
   <div>
     <Route path="/" component={App}>
       <IndexRoute component={HomePage}></IndexRoute>
     </Route>
     <Route path="/login" component={LoginPage}></Route>
   </div>
)
