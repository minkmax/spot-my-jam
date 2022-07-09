import TopTrack from "./TopTrack";
import button from "../css/Button.module.css";
import classes from "../css/TopTracksList.module.css";

const TopTracksList = (props) => {
  const topTracksArray = props.tracks.items;

  return (
    <>
      {topTracksArray && (
        <>
          <button
            className={`${button["button"]}`}
            onClick={props.onClearTopTracks}
          >
            Clear Top Tracks
          </button>
          <div className={classes.heading}>
            Top tracks from the {props.shownTimeRange.toLowerCase()}
          </div>
        </>
      )}
      <ul>
        {topTracksArray ? (
          topTracksArray.map((track) => (
            <TopTrack
              name={track.name}
              artists={track.artists}
              album={track.album}
              key={track.id}
            />
          ))
        ) : (
          <div className={classes.heading}>
            Authentication Token has expired. Please re-log in and try again.
          </div>
        )}
      </ul>
    </>
  );
};

export default TopTracksList;
