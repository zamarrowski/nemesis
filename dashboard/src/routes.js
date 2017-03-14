 import React from 'react'
 import { Route } from 'react-router'

 import App from './App'
 import LoginPage from './login/LoginPage'

 export default (
   <div>
     <Route path="/" component={App}>
     </Route>
     <Route path="/login" component={LoginPage}></Route>
   </div>
)
