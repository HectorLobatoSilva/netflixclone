import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        display: "flex",
        justifyContent: "space-between"
    },
    stars:{
        display: "flex",
        alignItems: "center"
    },
    text: {
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        overflow: "hidden"
    }
})

interface ICard {
    movie: {
        backdrop_path: string
        title: string
        overview: string
        release_date: string
        vote_average: number
    }
}

const MovieCard: FunctionComponent<ICard> = ( { movie } ) => {
    const classes = useStyles()
    const imageUrl = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path

    const parseDate = ( date: string ) => {
        const parsedDate = date.split("-")
        return `${parsedDate[2]}-${parsedDate[1]}-${parsedDate[0]}`
    }

    return (
        <Card className = { classes.root } >
            <CardMedia className = { classes.media } image = { imageUrl } />
            <CardContent >
                <div className = { classes.title } >
                    <Typography variant = "body1" component = "p" style = { { fontWeight: "bold", WebkitLineClamp: 1 } } className = { classes.text }  > { movie.title }</Typography>
                    <Typography variant = "body1" component = "p" style = { { WebkitLineClamp: 1 } } className = { classes.text } > { parseDate(movie.release_date) }</Typography>
                </div>
                <Typography variant = "body2" component = "p" align = "justify" className = { classes.text } > { movie.overview } </Typography>
                <div className = { classes.stars } >
                    <Typography> <StarBorderIcon /> </Typography>
                    <Typography>{ movie.vote_average } </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default MovieCard