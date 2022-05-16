import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { History } from "history";
import { withRouter } from "react-router";

import firebaseApp from "./../../firebaseConfig";
import MovieRow from "./MovieRow";
import {
  AppBar,
  Button,
  CardMedia,
  Toolbar,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  principal: {
    width: "100%",
    height: window.innerHeight * 0.7,
    position: "relative",
  },
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: window.innerWidth * 0.15,
    height: window.innerHeight * 0.15,
  },
  button: {
    backgroundColor: "#D50101",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#B51414",
    },
  },
  netflixText: {
    fontFamily: "oswald",
    color: "#CF0B0B",
    textShadow: "2px 2px #000000",
    fontSize: 50,
    letterSpacing: 5,
  },
  media: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  cardContent: {
    position: "absolute",
    color: "#FFFFFF",
    marginTop: window.innerHeight * 0.5,
  },
});

interface IPrincipalMovie {
  poster_path: string;
  original_title: string;
  overview: string;
}

const Browse: FunctionComponent<{ history: History }> = ({ history }) => {
  const classes = useStyles();
  const [principalMovie, setPrincipalMovie] = useState<IPrincipalMovie>({
    poster_path: "",
    original_title: "",
    overview: "",
  });
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const token = process.env.REACT_APP_THE_MOVIE_DB_TOKEN;
  const extra = "&language=en-US&page=1";

  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const handleClick = () => {
    firebaseApp.auth().signOut();
  };

  useEffect(() => {
    const getPrincipal = async () => {
      const fetchMovies = await (
        await fetch(`${baseUrl}latest?api_key=${token}${extra}`)
      ).json();
      setPrincipalMovie(fetchMovies);
    };
    getPrincipal();
  }, [token]);

  return (
    <div style={{ backgroundColor: "#303030" }}>
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          {/* <img src = {process.env.PUBLIC_URL + '/assets/logo.png'} className = { classes.logo } /> */}
          <Typography className={classes.netflixText}>MEMETFLIX</Typography>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleClick}
          >
            {" "}
            Log out{" "}
          </Button>
        </Toolbar>
      </AppBar>
      {/* <MovieRow url = { `${baseUrl}latest?api_key=${token}${extra}` } title = "Lasted" /> */}
      <Card className={classes.principal}>
        <CardMedia
          image={
            principalMovie.poster_path != null
              ? `${imageUrl}${principalMovie.poster_path}`
              : `${process.env.PUBLIC_URL}/assets/no-image.png`
          }
          className={classes.media}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h2" style={{ textShadow: "1px 2px #000000" }}>
            {principalMovie.original_title}
          </Typography>
          <Typography>{principalMovie.overview}</Typography>
        </CardContent>
      </Card>
      <MovieRow
        url={`${baseUrl}now_playing?api_key=${token}${extra}`}
        title="Now Playing"
      />
      <MovieRow
        url={`${baseUrl}popular?api_key=${token}${extra}`}
        title="Popular"
      />
      <MovieRow
        url={`${baseUrl}top_rated?api_key=${token}${extra}`}
        title="Top Rated"
      />
      <MovieRow
        url={`${baseUrl}upcoming?api_key=${token}${extra}`}
        title="Upcoming"
      />
    </div>
  );
};

export default withRouter(Browse);
