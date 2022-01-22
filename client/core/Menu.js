import auth from './../auth/auth-helper'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import {Link, useLocation, useNavigate} from 'react-router-dom'


const Menu = () => {

const history = useLocation();

const navigate = useNavigate();

    
const isActive = (history, path) => {
    if (history.pathname == path)
    return {color: "#ff4081"}
    else
    return {color: "#ffffff"}
}
   return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                GILBERTO'S WEBSITE
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon/>
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>
                    Usuarios
                </Button>
            </Link>
            {
                !auth.isAuthenticated() && (<span>
                    <Link to="/signup">
                        <Button style={isActive(history, "/signup")}> Registrarse</Button>
                    </Link>
                    <Link to="/signin">
                        <Button style={isActive(history, "/signin")}> Iniciar sesión</Button>
                    </Link>
                </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to= {"/user/" + auth.isAuthenticated().user._id}>
                        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                            Mi perfil
                        </Button>
                    </Link>
                    <Button color="inherit" onClick={() => {
              auth.clearJWT(() => navigate('/'))
              window.location.reload()
            }}>Cerrar sesión</Button>
                </span>)
            }
        </Toolbar>
    </AppBar>)
}

export default Menu