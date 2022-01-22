const signin = async (user) => {
    try {
      let response = await fetch('/auth/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

// The response from the server will be returned to the component in a promise, which
// may provide the JWT if sign-in was successful.

const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' }) 
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}

// This method will also return a promise to inform the component about whether the
// API request was successful.

export { signin, signout }