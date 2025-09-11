import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Index from './Pages'
import { RouteSignin, RouteSignup, RouteIndex } from './helper/RouteName'
import Signin from './Pages/SignIn'
import Signup from './Pages/SignUp'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route>
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
