// import React, { useContext, FunctionComponent } from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import { AuthContext } from './Auth'
// import { SIGN_IN } from './constants/routes'

// const PrivateRoute: FunctionComponent< { component: FunctionComponent, path: string, exact: boolean } > = ( { component, ...props } )  => {
//     const {currentUser} = useContext(AuthContext)
//     return (
//         <Route
//             {...props}
//             render = { 
//                 ( routeProps: any ) => !!currentUser ? 
//                     // ( <RouteComponent {...routeProps} /> ) :
//                     ( React.createElement( component, routeProps ) ):
//                     ( <Redirect to = {SIGN_IN} /> ) 
//             }
//         />
//     )
// }

// export default PrivateRoute

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import { SIGN_IN } from './constants/routes'

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