import React, { useContext } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { HOME, SIGN_IN, SIGN_UP, BROWSE } from './constants/routes'
import { AuthProvider, AuthContext } from './Auth'
import PrivateRoute from './PrivateRoute'
import Browse from './Components/Browse/Index'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import { CssBaseline } from '@material-ui/core'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <CssBaseline/>
                <div>
                    <Route exact path = {HOME} component = { Home } />
                    <Route exact path = {SIGN_IN} component = { SignIn } />
                    <Route exact path = {SIGN_UP} component = { SignUp } />
                    <PrivateRoute exact path = {BROWSE} component = { Browse } />
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

const Home = () => {
    const currentUser = useContext( AuthContext )
    console.log("home", currentUser)
    if( currentUser != undefined ) {
        return <Redirect to = { BROWSE } />
    }
    return <Redirect to = { BROWSE } />
}

export default App