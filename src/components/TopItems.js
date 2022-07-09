import { useContext, useState } from "react";
import TokenAuthContext from "../store/token-auth-context";
import classes from '../css/TopItems.module.css';
import button from '../css/Button.module.css';
import TopTracksList from "./TopTracksList";

const TopItems = () => {
  const ctx = useContext(TokenAuthContext);

  const [timeRange, setTimeRange] = useState("medium_term");
  const [shownTimeRange, setShownTimeRange] = useState("Past 6 Months");
  const [topTracks, setTopTracks] = useState({});
  const [topArtists, setTopArtists] = useState({});

  // TODO: Can probably merge the get functions
  async function getTracks() {
    clearTopArtists();
    const data = await fetch('https://api.spotify.com/v1/me/top/tracks?' + new URLSearchParams({
      time_range: timeRange
    }), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
      time_range: timeRange
    });

    const topTracksResponse = await data.json();
    setTopTracks(topTracksResponse);
  }

  async function getArtists() {
    clearTopTracks();
    const data = await fetch('https://api.spotify.com/v1/me/top/artists?' + new URLSearchParams({
      time_range: timeRange
    }), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
      time_range: timeRange
    });

    const topArtistsResponse = await data.json();
    setTopArtists(topArtistsResponse);
  }

  const timeRangeChangeHandler = (event) => {
    setTimeRange(event.target.value);
    setShownTimeRange(event.target.options[event.target.selectedIndex].text);
  }

  const clearTopTracks = () => {
    setTopTracks({});
  }

  const clearTopArtists = () => {
    setTopArtists({});
  }

  return (
    <>
      <form className={classes["top-item-form"]} onChange={timeRangeChangeHandler}>
        <label htmlFor="time-range-select">
          Time Range:
        </label>
        <select name="time-range" id="time-range-select" defaultValue={"medium_term"}>
          <option value="short_term">Past 4 Weeks</option>
          <option value="medium_term">Past 6 Months</option>
          <option value="long_term">Past Several Years</option>
        </select>
      </form>
      <div className={classes["buttons"]}>
        <button className={`${button["button"]} ${button["submit-button"]}`} onClick={getTracks}>Get Top Tracks</button>
        <button className={`${button["button"]} ${button["submit-button"]}`} onClick={getArtists}>Get Top Artists</button>
      </div>
      {Object.entries(topTracks).length > 0 && <TopTracksList onClearTopTracks={clearTopTracks} tracks={topTracks} shownTimeRange={shownTimeRange}></TopTracksList>}
    </>
  );
};

export default TopItems;
