import { useState, useEffect } from 'react';

const TopTracksList = (props) => {
  // const [tracks, setTracks] = useState([]);
  // useEffect(() => {
  //   const 
  // }, [props.tracks])
  console.log(props.tracks.items);
  return (
    <ul>
      {props.tracks.items.map((track) => {
        return <div>{track.name}</div>;
      })}
    </ul>
  )
};

export default TopTracksList;