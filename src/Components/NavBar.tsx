import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    appbar: {
        backgroundColor: "transparent"
    },
    login: {
        backgroundColor: "#D50101",
        color: "#FFFFFF",
        "&:hover":{
            backgroundColor: "#B51414"
        }
    }
})

const MyNavBar = () => {
    const classes = useStyles()
    return (
        <AppBar className = { classes.appbar } >
            <Toolbar>
                <Button className = { classes.login } > Login </Button>
            </Toolbar>
        </AppBar>
    )
}

export default MyNavBar