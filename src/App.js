import { useState, useContext } from "react";
import LoginHandler from "./components/LoginHandler";
import TokenAuthContext from "./store/token-auth-context";

function App() {
  const ctx = useContext(TokenAuthContext);
  const [searchKey, setSearchKey] = useState("");

  async function searchArtists(e) {
    e.preventDefault();
    console.log(searchKey);
    const data = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
      }
    );
    const yeet = await data.json();
    console.log(yeet);
  }

  async function getArtists(e) {
    const data = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
    });
    const yeet = await data.json();
    console.log(yeet);
  }

  return (
    <div className="App">
      <div className="Yeet">
        <h1>Spotify React</h1>
        <LoginHandler></LoginHandler>

        {ctx.token ? (
          <form onSubmit={searchArtists}>
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
            ></input>
            <button type="submit">Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}
        {ctx.token ? (
          <button onClick={getArtists}>Get Top Artists</button>
        ) : (
          <h2>Please login</h2>
        )}
      </div>
    </div>
  );
}

export default App;
