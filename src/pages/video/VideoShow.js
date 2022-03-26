import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
export function VideoShow() {
  let params = useParams();
  const [video, setVideo] = useState({});

  useEffect(() => {
    async function fetchVideo() {
      const response = await fetch(
        `https://nik-shop.herokuapp.com/api/product/${params.videoId}`
      );
      const json = await response.json();
      console.log("Response info is: ", json);
      setVideo(json);
    }
    fetchVideo();
  }, [params.videoId]);

  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>VideoId is: {params.videoId}</h2>
          {JSON.stringify(video)}
        </div>
      </div>
    </div>
  );
}
