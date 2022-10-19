import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { retrieveVideos, setVideo, getVideoByCategory } from './videoSlice';
import { Navbar } from '../../components/Navbar';
import { Header } from '../../components/header';
import store from '../../app/store';
import IPService from '../../services/IPService';
import { getAllCategory } from '../category/CategorySlice';

export function VideoIndex() {
 const [categoryId, setCategoryId] = useState(false);
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  const categories = useSelector((state) => state.category.categories);
  const handleGetVideoByCategory = async (id) => {
    setCategoryId(id);
      await store.dispatch(getVideoByCategory(id));
   
  }
  async function fetchData() {
    await store.dispatch(retrieveVideos());
    await store.dispatch( getAllCategory());
  }
  useEffect(() => {
    fetchData();
    IPService.saveUserInfo();
  }, []);

  const handleClick = async (item) => {
    await store.dispatch(setVideo(item));
    navigate(`/videos/${item.id}`);
  };
 
 
  /*return (
    <div classNameName='container mx-auto'>
      <Navbar></Navbar>
      <div classNameName='grid md:grid-cols-3 gap-4 sm:grid-cols-1'>
        {videoState.videos?.map((item) => (
          <div
            key={item.id}
            style={{ display: 'inline-block' }}
            classNameName='px-3'
          >
            <img
              classNameName='rounded-lg'
              src={item.urlThumb}
              alt='null'
              width='100%'
              height='auto'
              onClick={() => handleClick(item)}
            ></img>
            <div id={item.id} value={item}>
              <h4 className='font-bold'>{item.name}</h4>
              <span>{item.user.name}</span>{' '}
              <span className='italic'>{item.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); */




   return (
  <>
  <Header></Header>
   <main className="app-content-youtube container-fluid">
  <div className="app-container-fluid">
       



  <Navbar></Navbar>

      <div className="col col-ls-10 col-s-12 col-11">
          <div className="app-content-youtube__detail">


              <div className="app-content-youtube__detail-category app-container-fluid ">
                  <div className="app-content-youtube__detail-category-center ">
                      <div className="app-content-youtube__detail-category-center-over-flow">
                          <button className="btn-active"> Tất cả</button>
                          {categories?.map((item, key) => (
                            <button  className={categoryId === item.id ? "btn-active" : ""}  onClick={() => handleGetVideoByCategory(item.id)}  key={key}>{item.name} </button>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="app-content-youtube__detail-list app-container-fluid">
                  <div className="app-content-youtube__gird-list ">
{videoState.videos?.map((item) => (
         <div  key={item.id} className="app-content-youtube__gird-item">
         <div className="app-content-youtube__gird-item-image">
             <img onClick={() => handleClick(item)} src={item.urlThumb} alt="" />
         </div>
         <div className="app-content-youtube__gird-item-content">
             <div className="app-content-youtube__gird-item-content-item">
                 <div className="app-content-youtube__gird-item-content-author col-s-2">
                     <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo"
                         alt="" />
                 </div>
             </div>
             <div id={item.id} value={item} className="app-content-youtube__gird-item-content-item">
                  <span className="app-content-youtube__gird-item-content-detail-title">{item.name}</span>
                 <span className="app-content-youtube__gird-item-content-name-channel">
                 {item.user.name}
                 </span>
                 <ul className="app-content-youtube__gird-item-content-date">
                     <li>
                     {item.views} triệu lượt xem
                     </li>
                     <li>
                         2 năm trước
                     </li>
                 </ul>
             </div>
             
         </div>
     </div>
        ))}
                      

                  </div>
              </div>



          </div>
      </div>
  </div>
</main>
  
  </>
 ); 
 
}
