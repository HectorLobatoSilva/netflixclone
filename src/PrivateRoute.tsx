import React, { useContext, SFC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import { SIGN_IN } from './constants/routes'

const PrivateRoute: SFC< { component: SFC, path: string, exact: boolean } > = ( { component, ...props } )  => {
    const {currentUser} = useContext(AuthContext)
    return (
        <Route
            {...props}
            render = { 
                ( routeProps: any ) => !!currentUser ? 
                    // ( <RouteComponent {...routeProps} /> ) :
                    ( React.createElement( component, routeProps ) ):
                    ( <Redirect to = {SIGN_IN} /> ) 
            }
        />
    )
}

export default PrivateRoute