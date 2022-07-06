import TopTracksList from "./TopTracksList";
import classes from "../css/TopTrack.module.css";

const TopTrack = (props) => {
  const albumArtURL = props.album.images[0].url;

  return (
    <div className={classes.track}>
      <div className={classes['album-img']}>
        <img src={albumArtURL} alt="track album art" />
      </div>
      <div className={classes.text}>
        <div className={classes['track-name']}>{props.name}</div>
        <div>by {props.artists[0].name}</div>
        <div className={classes['album-name']}>{props.album.name}</div>
      </div>
    </div>
  );
};
export default TopTrack;
