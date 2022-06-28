import classes from "../css/LogButton.module.css";

const LoginHandler = (props) => {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = window.location.origin + window.location.pathname;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  console.log("candy e")

  const loginLink = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`;

  console.log(loginLink);
  return (
    <a href={loginLink} className={classes["log-button"]}>
      Log In to Spotify
    </a>
  );
}

export default LoginHandler;