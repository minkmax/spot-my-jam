import { useContext, useState } from "react";
import TokenAuthContext from "../store/token-auth-context";

const TopTracks = () => {
  const ctx = useContext(TokenAuthContext);

  const [timeRange, setTimeRange] = useState("medium_term");

  async function getTracks() {
    const data = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
    });
    const yeet = await data.json();
    console.log(yeet);
  }

  return (
    <>
    <form onSubmit={getTracks}>
      <label htmlFor="time-range-select">
        Time Range
      </label>
      <select name="time-range" id="time-range-select" defaultValue={"medium_term"}>
        <option value="short_term">Last 4 Weeks</option>
        <option value="medium_term">Last 6 Months</option>
        <option value="long_term">Past Several Years</option>
      </select>

    </form>
      <button onClick={getTracks}>Get Top Artists</button>
    </>
  );
};

export default TopTracks;