import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { History } from 'history'
import { withRouter } from 'react-router'

import firebaseApp from './../../firebaseConfig'
import MovieRow from './MovieRow'

const useStyles = makeStyles({
    principal: {
        width: "100%",
        height: window.innerHeight * 0.33
    }
})

const Browse: FunctionComponent< { history: History } > = ( { history } ) => {
    const classes = useStyles()
    const baseUrl = "https://api.themoviedb.org/3/movie/"
    const token = ""
    const extra = "&language=en-US&page=1"

    const handleClick = () => {
        firebaseApp.auth().signOut()
    }
    return (
        <React.Fragment >
            {/* <MovieRow url = { `${baseUrl}latest?api_key=${token}${extra}` } title = "Lasted" /> */}
            <MovieRow url = { `${baseUrl}now_playing?api_key=${token}${extra}` } title = "Now Playing" />
            <MovieRow url = { `${baseUrl}popular?api_key=${token}${extra}` } title = "Popular" />
            <MovieRow url = { `${baseUrl}top_rated?api_key=${token}${extra}` } title = "Top Rated" />
            <MovieRow url = { `${baseUrl}upcoming?api_key=${token}${extra}` } title = "Upcoming" />
            <button onClick = {handleClick} >Sign out</button>
        </React.Fragment>
    )
}

export default withRouter(Browse)
