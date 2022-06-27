import React, { useEffect, useState } from "react";

const TokenAuthContext = React.createContext({
  token: "",
  logOutHandler: () => {},
});

export const TokenAuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let access_token = window.localStorage.getItem("token");
    if (!access_token && hash) {
      access_token = hash
        .substring(1)
        .split("&")
        .find((urlString) => urlString.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", access_token);
    }
    setToken(access_token);
  }, []);

  const logOutHandler = () => {
    setToken("");
    window.open("https://accounts.spotify.com/logout", '_blank');
    window.localStorage.removeItem("token");
  };

  return (
    <TokenAuthContext.Provider value={{ token: token, logOutHandler: logOutHandler }}>
      {props.children}
    </TokenAuthContext.Provider>
  );
};

export default TokenAuthContext;
