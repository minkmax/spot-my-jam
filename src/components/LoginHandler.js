import { useContext } from "react";
import TokenAuthContext from "../store/token-auth-context";

function LoginHandler(props) {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const ctx = useContext(TokenAuthContext);
  const loginLink = `${AUTH_ENDPOINT}
                      ?client_id=${CLIENT_ID}
                      &redirect_uri=${REDIRECT_URI}
                      &response_type=${RESPONSE_TYPE}
                      &scope=user-top-read`;

  return (
    <>
      {!ctx.token ? (
        <a href={loginLink}>Login to Spotify</a>
      ) : (
        <button onClick={ctx.logOutHandler}>Logout</button>
      )}
    </>
  );
}

export default LoginHandler;
