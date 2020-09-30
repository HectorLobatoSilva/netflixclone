import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { History } from 'history'
import { withRouter } from 'react-router'

import firebaseApp from './../../firebaseConfig'
import { Card, CardMedia } from '@material-ui/core'
import MovieRow from './MovieRow'

const useStyles = makeStyles({
    principal: {
        width: "100%",
        height: window.innerHeight * 0.33
    }
})

const Browse: FunctionComponent< { history: History } > = ( { history } ) => {
    const classes = useStyles()
    const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=14d10c79b49581abba3239b6122dc1ca&language=en-US&page=1"

    console.log(process.env)

    const handleClick = () => {
        firebaseApp.auth().signOut()
    }
    return (
        <React.Fragment >
            {/* <Card className = { classes.principal }>
                <CardMedia component = "img" height = "100%" image = "" />
            </Card> */}
            <MovieRow url = "" title = "Most popular" />
            <button onClick = {handleClick} >Sign out</button>
        </React.Fragment>
    )
}

export default withRouter(Browse)