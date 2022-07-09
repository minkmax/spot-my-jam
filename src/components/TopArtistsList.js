import TopArtist from "./TopArtist";
import button from "../css/Button.module.css";
import classes from "../css/TopTracksList.module.css";

// TODO: Merge this into one top component?
const TopArtistsList = (props) => {
  const topArtistsArray = props.artists.items;
  return (
    <>
      {topArtistsArray && (
        <>
          <button
            className={`${button["button"]}`}
            onClick={props.onClearTopArtists}
          >
            Clear Top Artists
          </button>
          <div className={classes.heading}>
            Top artists from the {props.shownTimeRange.toLowerCase()}
          </div>
        </>
      )}
      <ul>
        {topArtistsArray ? (
          topArtistsArray.map((artist) => (
            <TopArtist
              name={artist.name}
              image={artist.images[0].url}
              key={artist.id}
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

export default TopArtistsList;
