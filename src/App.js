import { useEffect, useState} from "react";

function App() {
  const CLIENT_ID = "f298e66445ac409abad93f3b2d61dc0c";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect( () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
    setToken(token);

  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  async function searchArtists(e) {
    e.preventDefault();
    console.log(searchKey);
    const data = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${searchKey}`, {
      method: "GET",
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
    const yeet = await data.json();
    console.log(yeet);
  }
  // console.log(token)

  async function getArtists(e) {
    const data = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
      method: "GET",
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
    const yeet = await data.json();
    console.log(yeet);
  }

  return (
    <div className="App">
      <h1>Spotify React</h1>
      {!token ? 
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Login to Spotify</a>
      : <button onClick={logout}>Logout</button>}

      {token ? 
        <form onSubmit={searchArtists}>
          <input type="text" onChange={e => setSearchKey(e.target.value)}></input>
          <button type="submit">Search</button>
        </form>
        : <h2>Please login</h2>
      }
      {token ? 
          <button onClick={getArtists}>Get Top Artists</button>
        : <h2>Please login</h2>
      }

    </div>
  );
}

export default App;
