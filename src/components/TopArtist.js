import classes from "../css/TopTrack.module.css";

const TopArtist = (props) => {

  return (
    <div className={classes.track}>
      <div className={classes['list-img']}>
        <img src={props.image} alt="artist" />
      </div>
      <div className={classes.text}>
        <div className={classes['list-name']}>{props.name}</div>
      </div>
    </div>
  );
};
export default TopArtist;
