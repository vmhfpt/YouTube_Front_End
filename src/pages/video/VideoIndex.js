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
    <div className='container mx-auto'>
      <div className='grid md:grid-cols-3 gap-4 sm:grid-cols-1'>
        {videoState.videos.map((item) => (
          <div key={item.id} style={{ display: 'inline-block' }} className='px-3'>
            <img
              className='rounded-lg'
              src={item.urlThumb}
              alt='null'
              width='100%'
              height='auto'
              onClick={() => handleClick(item)}
            ></img>
            <div id={item.id} value={item}>
              <h4 class='font-bold'>{item.name}</h4>
              <span>{item.user}</span>{' '}
              <span class='italic'>{item.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
