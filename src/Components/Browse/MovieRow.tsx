import React, { useState,useEffect, FunctionComponent } from 'react'
import MovieCard from './MovieCard'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, IconButton, Typography } from '@material-ui/core'
import { uuid } from 'uuidv4'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: "relative",
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflow: "hidden",
        scrollBehavior: "smooth"
    },
    iconButtonBack: {
        borderRadius: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#FFFFFF",
        position: "absolute",
        height: "100%",
        zIndex: 9,
        top: 0,
        left: 0,
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
        }
    },
    iconButtonNext: {
        borderRadius: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#FFFFFF",
        position: "absolute",
        height: "100%",
        zIndex: 9,
        top: 0,
        right: 0,
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
        }
    }
})

interface IMovieCard {
    url: string;
    title: string;
}

const MovieRow: FunctionComponent<IMovieCard> = ( { url, title } ) => {
    const classes = useStyles()
    const id: string = uuid()
    const [ movies, setMovies ] = useState<Array<any>>([
        {
            "adult": false,
            "backdrop_path": "/pq0JSpwyT2URytdFG0euztQPAyR.jpg",
            "genre_ids": [28],
            "id": 694919,
            "original_language": "en",
            "original_title": "Money Plane",
            "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
            "popularity": 3012.066,
            "poster_path": "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
            "release_date": "2020-09-29",
            "title": "Money Plane",
            "video": false,
            "vote_average": 5.3,
            "vote_count": 26
        },
    ])

    useEffect( () => {
        const getPopularMovies = async () => {
            const fetchMovies = await ( await fetch( url ) ).json()
            setMovies(fetchMovies.results);
            // console.log("movies",fetchMovies.results)
        }
        getPopularMovies()
    }, [] )

    const handleNextMovies = () => {
        const element = document.getElementById(id)
        element?.scrollTo(element?.scrollLeft + window.innerWidth,0);
    }

    const handlePrevMovies = () => {
        const element = document.getElementById(id)
        element?.scrollTo(element?.scrollLeft - window.innerWidth,0);
    }

    return (
        <div style = { { marginTop: "3em" } } >
            <Typography style = { { color: "#FFFFFF", fontWeight: "bold" } } > { title } </Typography>
            <div className = { classes.root } >
                <IconButton className = { classes.iconButtonBack } onClick = { handlePrevMovies } > <ArrowBackIosIcon /> </IconButton>
                <GridList className = { classes.gridList } cols = {5} id = { id } >
                    {
                        movies.map( ( movie, key: number ) => <GridListTile key = { key } style = { { height: "100%" } }>
                            <MovieCard movie = { movie } />
                        </GridListTile> )
                    }
                </GridList>
                <IconButton className = { classes.iconButtonNext } onClick = { handleNextMovies } > <ArrowForwardIosIcon /> </IconButton>
            </div>
        </div>
    )
}

export default MovieRow;