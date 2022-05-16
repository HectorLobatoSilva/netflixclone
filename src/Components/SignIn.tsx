import React, { useState, useCallback, FunctionComponent } from "react";
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { History } from "history";

import InputText from "./InputText";
import useStyle from "./../constants/styles";
import { SIGN_UP, BROWSE } from "./../constants/routes";

import firebaseApp, { UserStateInterface } from "../firebaseConfig";
import MyNavBar from "./NavBar";

const INITIAL_STATE = {
  useremail: "",
  password: "",
};

const SignIn: FunctionComponent<{ history: History }> = ({ history }) => {
  const classes = useStyle();
  const [userState, setUserState] = useState<UserStateInterface>(INITIAL_STATE);
  const [error, setError] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  };

  const handleSignIn = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { useremail, password } = userState;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(useremail, password);
        history.push(BROWSE);
      } catch {
        setError(error);
      }
    },
    [history, userState, error]
  );

  return (
    <div className={classes.principalSignIn}>
      <MyNavBar to={SIGN_UP} label="sign up" />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Container>
                <form onSubmit={handleSignIn}>
                  <Typography
                    variant="h6"
                    className={classes.formElement}
                    style={{ textAlign: "center" }}
                  >
                    {" "}
                    SIgn In{" "}
                  </Typography>
                  <InputText
                    type="email"
                    placeholder="User email"
                    name="useremail"
                    setOnChange={onChange}
                    value={userState.useremail}
                  />
                  <InputText
                    type="password"
                    placeholder="User password"
                    name="password"
                    setOnChange={onChange}
                    value={userState.password}
                  />
                  <Typography
                    variant="subtitle2"
                    style={{ color: "red", marginLeft: "1em" }}
                  >
                    {" "}
                    {error}{" "}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.formElement}
                  >
                    Sign In
                  </Button>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
