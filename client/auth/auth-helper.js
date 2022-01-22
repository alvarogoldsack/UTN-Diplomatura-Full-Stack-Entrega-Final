import React from 'react'
import { signout } from './api-auth.js'
import { Navigate } from 'react-router-dom'


const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    // signout().then((data) => {
    //   document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    // });
  }
}

// The authenticate method takes the JWT credentials, jwt, and a callback
//     // function, cb, as arguments. It stores the credentials in sessionStorage after
//     // ensuring window is defined, in other words ensuring this code is running in a
//     // browser and hence has access to sessionStorage. Then, it executes the callback
//     // function that is passed in. This callback will allow the component – in our case, the
//     // component where sign-in is called – to define actions that should take place after
//     // successfully signing in and storing credentials. 

export default auth
