import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
export function VideoShow() {
  const videoState = useSelector((state) => state.videos);
  let params = useParams();

  useEffect(() => {
    let videoElem = document.getElementById("video");
    playVideo();

    async function playVideo() {
      try {
        await videoElem.play();
      } catch (err) {}
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>VideoId is: {params.videoId}</h2>
          {/* {JSON.stringify(videoState.video)} */}
          <video width="750" height="500" id="video" controls>
            <source src={videoState.video.url} type="video/mp4" />
          </video>
          <h4>{videoState.video.name}</h4>
          <span>{videoState.video.user}</span>{" "}
          <span>{videoState.video.views} views</span>
        </div>
      </div>
    </div>
  );
}
