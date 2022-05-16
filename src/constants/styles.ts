import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
  principal: {
    width: "100%",
    height: window.innerHeight,
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/collage.jpeg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // backgroundColor: "blue"
  },
  principalSignUp: {
    width: "100%",
    height: window.innerHeight,
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/wallpaper.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // backgroundColor: "blue"
  },
  principalSignIn: {
    width: "100%",
    height: window.innerHeight,
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/signin.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  button: {
    backgroundColor: "#D50101",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#B51414",
    },
  },
  logo: {
    width: window.innerWidth * 0.15,
    height: window.innerHeight * 0.15,
  },
  barContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  formElement: {
    margin: "1em",
  },
  paper: {
    backgroundColor: "rgba(33,32,32,0.9)",
    color: "#FFFFFF",
  },
  netflixText: {
    fontFamily: "oswald",
    color: "#CF0B0B",
    textShadow: "2px 2px #000000",
    fontSize: 50,
    letterSpacing: 5,
  },
});

export default useStyle;
