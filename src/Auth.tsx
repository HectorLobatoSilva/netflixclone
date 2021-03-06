import React, { FunctionComponent, useEffect, useState } from 'react'
import app from './firebaseConfig'

export const AuthContext = React.createContext<any|null>(null)

export const AuthProvider: FunctionComponent< { children: React.ReactNode } > = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState<any>()
    useEffect( () => {
        app.auth().onAuthStateChanged(setCurrentUser)
    }, [] )
    return (
        <AuthContext.Provider value = { { currentUser } } >
            {children}
        </AuthContext.Provider>
    )
}