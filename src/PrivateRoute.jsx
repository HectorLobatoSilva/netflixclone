import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { AuthContext } from './Auth'

const PrivateRoute = ( { component: RouteComponent, ...rest } ) => {
    const { currentUser } = useContext(AuthContext)
    console.log(!!currentUser ? "user activated": "not user")
    return (
        <Route { ...rest } render = { routeProps => 
                currentUser ? <RouteComponent { ...routeProps } /> : null
            }
        />
    )
}

export default PrivateRoute