import { useState, useEffect } from "react";
import TopTrack from "./TopTrack";

const TopTracksList = (props) => {
  console.log(props.tracks.items);

  return (
    <ul>
      {props.tracks.items.map((track) => (
        <TopTrack
          name={track.name}
          artists={track.artists}
          album={track.album}
          key={track.id}
        />
      ))}
    </ul>
  );
};

export default TopTracksList;
