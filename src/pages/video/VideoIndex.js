import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export function VideoIndex() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await fetch(
        "https://tranquil-escarpment-45721.herokuapp.com/videos/all"
      );
      const json = await response.json();
      console.log("Response info is: ", json);
      setVideos(json);
    }
    fetchVideos();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("You have click item: ", e.currentTarget.id);
    const id = e.currentTarget.id;
    let filtered = await videos.filter(function (item) {
      return item.id !== parseInt(id);
    });
    console.log(filtered);
    setVideos(filtered);
  };

  return (
    <div className="container">
      <div className="row">
        <div>
          {videos.map((item) => (
            <div key={item.id} style={{ display: "inline-block" }}>
              <Link to={`/videos/${item.id}`} key={item.id}>
                <img src={item.urlThumb} alt="null" width="200px"></img>
              </Link>
              <div id={item.id} value={item} onClick={handleClick}>
                <div>{item.name}</div>
                <div>{item.cost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
