import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'
import auth from './auth-helper'

function PrivateRoute({ children }) {
    const Autho = auth.isAuthenticated();
    return Autho ? children : <Navigate to="/signin/" />
}

// Components to be rendered in this PrivateRoute will only load when the user is
// authenticated, which is determined by a call to the isAuthenticated method;
// otherwise, the user will be Navigateed to the Signin component. We load the
// components that should have restricted access, such as the user profile component, in
// a PrivateRoute. This will ensure that only authenticated users are able to view the
// user profile page.

export default PrivateRoute


