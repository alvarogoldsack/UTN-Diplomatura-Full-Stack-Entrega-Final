import React from 'react'
import {Route, Routes, Router} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => {
 return ( <div>
    <Menu />
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Signin />}/>
    <Route path="/users" element={<Users />}/>
    <Route path="/user/edit/:userId" element={<PrivateRoute> <EditProfile /> </PrivateRoute>}>
    </Route>
    <Route path="/user/:userId" element={<PrivateRoute><Profile /></PrivateRoute>}/>
    </Routes>
 </div>
 )
}
export default MainRouter