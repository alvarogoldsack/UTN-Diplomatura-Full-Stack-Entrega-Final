import auth from "../auth/auth-helper";
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {remove} from './api-user.js'
import {Navigate} from 'react-router-dom'


export default function DeleteUser(props) {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const clickButton = () => {
        setOpen(true)
    }

    const handleRequestClose = () => {
        setOpen(false)
    }

    const deleteAccount = () => {
        const jwt = auth.isAuthenticated()
        remove({
            userId: props.userId
          }, {t: jwt.token}).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              auth.clearJWT(() => console.log('deleted'))
              setRedirect(true)
            }
          })
      
    }

    if (redirect) {
        return <Navigate to='/'/>
    }

    return (<span>
        <IconButton aira-label='Delete' onClick={clickButton} color="secondary">
            <DeleteIcon/>
        </IconButton>

        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>
                {"Delete Account"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Confirma para eliminar la cuenta.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRequestClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    </span>)
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}