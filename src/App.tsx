import React, { useContext } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { HOME, SIGN_IN, SIGN_UP, BROWSE } from "./constants/routes";
import { AuthProvider, AuthContext } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Browse from "./Components/Browse/Index";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import MyNavBar from "./Components/NavBar";

import useStyle from "./constants/styles";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <div>
          <Route exact path={HOME} component={Home} />
          <Route exact path={SIGN_IN} component={SignIn} />
          <Route exact path={SIGN_UP} component={SignUp} />
          <PrivateRoute exact path={BROWSE} component={Browse} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const classes = useStyle();
  return (
    <div className={classes.principal}>
      <MyNavBar
        to={currentUser ? BROWSE : SIGN_IN}
        label={currentUser ? "Browse" : "Sign in"}
      />
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "Center",
          height: "92vh",
        }}
      >
        <Typography
          variant="h3"
          style={{
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px black",
          }}
        >
          A netflix clone using the movie db api and react with MUI as a CSS
          Framework
        </Typography>
        {currentUser ? (
          <Typography
            variant="h3"
            style={{
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px black",
            }}
          >
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            you're loged in, go to <Link to={"/browse"}>Browse</Link>
          </Typography>
        ) : null}
      </Container>
    </div>
  );
};

export default App;
