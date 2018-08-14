import React, { Component } from "react";
import {
  PlayButton,
  Progress,
  Icons,
  Timer
} from "react-soundplayer/components";
import * as moment from "moment";
import { withCustomAudio } from "react-soundplayer/addons";

const PodcastPlayer = withCustomAudio(props => {
  function timeToDecimal(t) {
    t = t.split(":");
    return parseInt(t[0], 10) * 1 + parseInt(t[1], 10) / 60;
  }
  console.log(timeToDecimal(props.itunes_duration));
  var valueDuration = timeToDecimal(props.itunes_duration);
  // console.log(props);
  console.log(props.itunes_duration);

  return (
    <div>
      <div className="card-episode-upvote">
        <PlayButton
          className={"sb-soundplayer-icon button-outline"}
          {...props}
        />
      </div>
      <div className="card-episode-body">
        <p className="duration-text">{props.itunes_duration}</p>
        <h3>{props.trackTitle}</h3>
        <p className="created-at">
          {moment(props.created).format("MMMM Do YYYY")}
        </p>
        <div className=" episode-controls hidden-sm hidden-xs">
          <i onClick={props.onClickIcon} className="fas fa-info-circle" />
        </div>
      </div>
      <div>
        <Progress
          {...props}
          // value={valueDuration} // in range 0-100
        />
      </div>
    </div>
  );
});

export default PodcastPlayer;
