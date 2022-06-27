import { useContext } from "react";
import LoginHandler from "./components/LoginHandler";
import TokenAuthContext from "./store/token-auth-context";
import classes from "./css/App.module.css";
import LogoutHandler from "./components/LogoutHandler";
import TopTracks from "./components/TopTracks";

const App = () => {
  const ctx = useContext(TokenAuthContext);

  return (
    <>
      <div className={classes.introduction}>
        <h1>Spot My Jam</h1>
        <p>A simple app to check your most-listened-to artists and tracks!</p>
      </div>
      {!ctx.token && <LoginHandler />}
      {ctx.token && <TopTracks />}
      {ctx.token && <LogoutHandler />}
    </>
  );
}

export default App;