import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { retrieveVideos, setVideo } from './videoSlice';
import store from '../../app/store';

export function VideoIndex() {
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  async function fetchData() {
    await store.dispatch(retrieveVideos());
    console.log('State videoState is:', videoState);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (item) => {
    await store.dispatch(setVideo(item));
    // console.log("You have click item: ",item);
    console.log('State videoState is:', videoState.video);
    navigate(`/videos/${item.id}`);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div>
          {videoState.videos.map((item) => (
            <div key={item.id} style={{ display: 'inline-block' }}>
              <img
                src={item.urlThumb}
                alt='null'
                width='200px'
                onClick={() => handleClick(item)}
              ></img>
              <div id={item.id} value={item}>
                <h4>{item.name}</h4>
                <span>{item.user}</span> <span>{item.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
