import { useContext } from 'react';
import classes from "../css/Button.module.css";
import TokenAuthContext from '../store/token-auth-context';

const LogoutHandler = () => {
  const ctx = useContext(TokenAuthContext);

  return (
    <button onClick={ctx.logOutHandler} className={classes["button"]}>Logout</button> 
  )
}

export default LogoutHandler;

