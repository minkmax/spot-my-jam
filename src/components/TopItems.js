import { useContext, useState } from "react";
import TokenAuthContext from "../store/token-auth-context";
import classes from "../css/TopItems.module.css";
import button from "../css/Button.module.css";
import TopTracksList from "./TopTracksList";
import TopArtistsList from "./TopArtistsList";

const TopItems = () => {
  const ctx = useContext(TokenAuthContext);

  const [timeRange, setTimeRange] = useState("medium_term");
  // timeRangeText is stored separately so that the text doesn't update even without
  // updating the track list.
  const [timeRangeText, setTimeRangeText] = useState("Past 6 Months");
  const [shownTimeRange, setShownTimeRange] = useState("Past 6 Months");
  const [topTracks, setTopTracks] = useState({});
  const [topArtists, setTopArtists] = useState({});

  const topTracksNotEmpty = Object.entries(topTracks).length > 0;
  const topArtistsNotEmpty = Object.entries(topArtists).length > 0;

  // TODO: Can probably merge the get functions
  async function getTracks() {
    clearTopArtists();
    const data = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?" +
        new URLSearchParams({
          time_range: timeRange,
        }),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
        time_range: timeRange,
      }
    );

    const topTracksResponse = await data.json();
    setTopTracks(topTracksResponse);
    setShownTimeRange(timeRangeText);
  }

  async function getArtists() {
    clearTopTracks();
    const data = await fetch(
      "https://api.spotify.com/v1/me/top/artists?" +
        new URLSearchParams({
          time_range: timeRange,
        }),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
        time_range: timeRange,
      }
    );

    const topArtistsResponse = await data.json();
    setTopArtists(topArtistsResponse);
    setShownTimeRange(timeRangeText);
  }

  const timeRangeChangeHandler = (event) => {
    setTimeRange(event.target.value);
    setTimeRangeText(event.target.options[event.target.selectedIndex].text);
  };

  const clearTopTracks = () => {
    setTopTracks({});
  };

  const clearTopArtists = () => {
    setTopArtists({});
  };

  return (
    <>
      {!topTracksNotEmpty && !topArtistsNotEmpty && (
        <>
          <form
            className={classes["top-item-form"]}
            onChange={timeRangeChangeHandler}
          >
            <label htmlFor="time-range-select">Time Range:</label>
            <select
              name="time-range"
              id="time-range-select"
              defaultValue={"medium_term"}
            >
              <option value="short_term">Past 4 Weeks</option>
              <option value="medium_term">Past 6 Months</option>
              <option value="long_term">Past Several Years</option>
            </select>
          </form>

          <div className={classes["buttons"]}>
            <button
              className={`${button["button"]} ${button["submit-button"]}`}
              onClick={getTracks}
            >
              Get Top Tracks
            </button>
            <button
              className={`${button["button"]} ${button["submit-button"]}`}
              onClick={getArtists}
            >
              Get Top Artists
            </button>
          </div>
        </>
      )}

      {topTracksNotEmpty && (
        <TopTracksList
          onClearTopTracks={clearTopTracks}
          tracks={topTracks}
          shownTimeRange={shownTimeRange}
        ></TopTracksList>
      )}
      {topArtistsNotEmpty && (
        <TopArtistsList
          onClearTopArtists={clearTopArtists}
          artists={topArtists}
          shownTimeRange={shownTimeRange}
        ></TopArtistsList>
      )}
    </>
  );
};

export default TopItems;
