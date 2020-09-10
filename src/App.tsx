import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import * as ROUTES from './constants/routes'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute'
import Browse from './Components/Browse'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Route exact path = {ROUTES.HOME} />
                    <Route exact path = {ROUTES.SIGN_IN} />
                    <Route exact path = {ROUTES.SIGN_UP} />
                    <PrivateRoute exact path = {ROUTES.BROWSE} component = { Browse } />
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App