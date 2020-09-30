import React, { useState, useCallback, FunctionComponent, useContext } from 'react'
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { History } from 'history'

import InputText from './InputText'
import useStyle from './../constants/styles'
import {SIGN_IN, BROWSE} from './../constants/routes'

import firebaseApp, { UserStateInterface } from '../firebaseConfig'

import { AuthContext } from './../Auth'

const INITIAL_STATE = {
    useremail: "",
    password: "",
    passwordRepeated: ""
}

const SignUP: FunctionComponent< { history: History } > = ( { history } ) => {

    const classes = useStyle()
    const [ userState, setUserState ] = useState<UserStateInterface>(INITIAL_STATE)
    const [ error, setError ] = useState<string>("")

    const { currentUser } = useContext( AuthContext )
    
    const onChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>  {
        setUserState({...userState, [event.target.name]: event.target.value})
    }

    const handleSignUp = useCallback ( async ( event : React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        const { useremail, password, passwordRepeated } = userState
        try{
            if( password === passwordRepeated ){
                await firebaseApp.auth().createUserWithEmailAndPassword( useremail, password )
                history.push(BROWSE)
            }else{
                setError("Password does have to be equals")
            }
        } catch (errorCatched) {
            setError(errorCatched)
        }
    }, [ history, userState ] )

    if ( currentUser ) {
        return <Redirect to = {BROWSE} />
    }

    return (
        <div className = { classes.principal } >
            <div className = { classes.barContainer } >
                {/* <img src = {process.env.PUBLIC_URL + '/assets/logo.png'} className = { classes.logo } /> */}
                <Typography className = { classes.netflixText } >MEMETFLIX</Typography>
                <Link to = {SIGN_IN} > <Button className = { classes.button } variant = "contained" > Sign In </Button> </Link>
            </div>
            <Container>
                <Grid container spacing = {2} >
                    <Grid item xs={12}>
                        <Paper className = { classes.paper } >
                            <Container >
                                <form onSubmit = {handleSignUp} >
                                    <Typography variant = "h6" className = { classes.formElement } style = { { textAlign: "center" } } > SIgn Up </Typography>
                                    <InputText type = "email" placeholder = "User email" name = "useremail" setOnChange = {onChange} value = { userState.useremail } />
                                    <InputText type = "password" placeholder = "User password" name = "password" setOnChange = {onChange} value = { userState.password } />
                                    <InputText type = "password" placeholder = "Repeat user password" name = "passwordRepeated" setOnChange = {onChange} value = { userState.passwordRepeated! } />
                                    <Typography variant = "subtitle2" style = { { color: "red", marginLeft: "1em" } } > {error} </Typography>
                                    <Button type = "submit" variant = "contained" color = "primary" fullWidth className = { classes.formElement } >Sign up</Button>
                                </form>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(SignUP)