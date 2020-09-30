import React, { useState, useCallback, FunctionComponent, useContext } from 'react'
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { History } from 'history'

import InputText from './InputText'
import useStyle from './../constants/styles'
import {SIGN_UP, BROWSE} from './../constants/routes'
import { AuthContext } from './../Auth'

import firebaseApp, { UserStateInterface } from '../firebaseConfig'

const INITIAL_STATE = {
    useremail: "",
    password: ""
}

const SignIn: FunctionComponent< { history: History } > = ( { history } ) => {

    const classes = useStyle()
    const [ userState, setUserState ] = useState<UserStateInterface>(INITIAL_STATE)
    const [ error, setError ] = useState<string>("")

    const { currentUser } = useContext( AuthContext )
    
    const onChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>  {
        setUserState({...userState, [event.target.name]: event.target.value})
    }

    const handleSignIn = useCallback ( async ( event : React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        const { useremail, password } = userState
        try{
            await firebaseApp.auth().signInWithEmailAndPassword( useremail, password )
            history.push( BROWSE )
        } catch ( errorCatched ) {
            setError( errorCatched )
        }
    }, [ history, userState ] )

    // if ( currentUser ) {
    //     return <Redirect to = {BROWSE} />
    // }

    return (
        <div className = { classes.principalSignIn } >
            <div className = { classes.barContainer } >
                {/* <img src = {process.env.PUBLIC_URL + '/assets/logo.png'} className = { classes.logo } /> */}
                <Typography className = { classes.netflixText } >MEMETFLIX</Typography>
                <Link to = {SIGN_UP} > <Button className = { classes.button } variant = "contained" > Sign Up </Button> </Link>
            </div>
            <Container>
                <Grid container spacing = {2} >
                    <Grid item xs={12}>
                        <Paper className = { classes.paper } >
                            <Container >
                                <form onSubmit = { handleSignIn } >
                                    <Typography variant = "h6" className = { classes.formElement } style = { { textAlign: "center" } } > SIgn In </Typography>
                                    <InputText type = "email" placeholder = "User email" name = "useremail" setOnChange = {onChange} value = { userState.useremail } />
                                    <InputText type = "password" placeholder = "User password" name = "password" setOnChange = {onChange} value = { userState.password } />
                                    <Typography variant = "subtitle2" style = { { color: "red", marginLeft: "1em" } } > {error} </Typography>
                                    <Button type = "submit" variant = "contained" color = "primary" fullWidth className = { classes.formElement } >Sign In</Button>
                                </form>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(SignIn)