import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Header } from "../../components/header";
import {Link} from "react-router-dom";
import {
  getVideosByUserId,
  deleteVideoByVideoId,
  setVideo,
  updateVideoName,
  updateVideoNameReducer,
} from "./videoSlice";
import { NotificationManager } from "react-notifications";
import { Navbar } from "../../components/Navbar";
import store from "../../app/store";
export function DashBoard() {
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);



  const {
    
    formState: { errors },
  } = useForm();

  async function fetchData() {
    const token = `Bearer ${authState.accessToken}`;
    await store.dispatch(getVideosByUserId(token));
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (item) => {
    
  
    await store.dispatch(setVideo(item));
    navigate(`/videos/${item.id}`);
  };
  /*categoryId
: 
"626035fa9260c4b8d5ace9c2"
createdAt
: 
"2022-03-26T02:57:52.659Z"
id
: 
"623e8130bc0e7e7f28fb768e"
name
: 
"Russian hard bass"
publicIdCloudinary
: 
"xykywa0p79i8spgy6nb0"
publicIdCloudinaryThumb
: 
"w1h6z5zgfrtykyypioo4"
url
: 
"https://res.cloudinary.com/niklab/video/upload/v1648263470/xykywa0p79i8spgy6nb0.mp4"
urlThumb
: 
"https://res.cloudinary.com/niklab/image/upload/v1648263472/w1h6z5zgfrtykyypioo4.jpg"
user
: 
{id: '6230ba348d6bcdaf6682071e', name: 'shuy'}
userId
: 
"6230ba348d6bcdaf6682071e"
views
: 
93 */

 

 



  
  /*<div classNameName="container mx-auto">
      <Navbar></Navbar>
      <div>
        <div style={{ position: "relative" }}>
          {" "}
          {statusEdit && (
            <div style={{ position: "absolute", right: "50%" }}>
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="newVideoName"
                    >
                      Enter new video name
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="newVideoName"
                      type="text"
                      placeholder=""
                      {...register("content_video_edit", {
                        required: true,
                        maxLength: 200,
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSubmit(onConfirmEditVideoName)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => onCancelEditVideoName()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div classNameName="grid md:grid-cols-3 gap-4 sm:grid-cols-1">
        {videoState.videos?.map((item) => (
          <div
            key={item.id}
            style={{ display: "inline-block" }}
            classNameName="px-3"
          >
            <img
              classNameName="rounded-lg"
              src={item.urlThumb}
              alt="null"
              width="100%"
              height="auto"
              onClick={() => handleClick(item)}
            ></img>
            <div classNameName="gap-1 sm:grid-cols-2">
              <div id={item.id} value={item}>
                <h4 className="font-bold">{item.name}</h4>
                <span>{item.user.name}</span>{" "}
                <span className="italic">{item.views} views</span>
              </div>
              <div className="inline-flex">
                <button
                  onClick={() => onEditVideoName(item)}
                  classNameName="bg-green-500 hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item)}
                  classNameName="bg-red-500 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );*/
  return (<>
    <Header></Header>
    <main className="app-content-youtube container-fluid ">
        <div className="app-container-fluid ">
         <Navbar></Navbar>
           
          
            <div className=" col col-ls-9 col-s-12 col-11 app-youtube-result app-youtube-dashboard-content">
                
                 <div className="app-youtube-result-content app-youtube-dashboard-container">
                    <div className="app-dashboard-banner">
                        <img src="https://www.teahub.io/photos/full/102-1029280_different-youtube-banner-sizes-for-different-mediums-youtube.png" alt="" />
                    </div>
                    <div className="app-youtube-dashboard-channel">
                        <div className="app-youtube-dashboard-channel-item">
                            <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
                        </div>
                        <div className="app-youtube-dashboard-channel-item">
                           <div className="app-youtube-dashboard-channel-item-center">
                            <span>{authState.user.name}</span>
                            <span>92 Tỷ Người đăng ký</span>
                           </div>
                        </div>
                        <div className="app-youtube-dashboard-channel-item">
                            <button> Tùy chỉnh kênh</button>
                            
                            <Link to="/video-manage"><button> Quản lý video</button> </Link>
                        </div>
                    </div>
                    <div className="app-youtube-dashboard-navbar__content">
                        <div className="app-youtube-dashboard-navbar">
                            <ul>
                                <li className="app-youtube-dashboard-navbar-active">Trang chủ</li>
                                <li>Video</li>
                                <li>Danh sách phát</li>
                                <li>Kênh</li>
                                <li>Giới thiệu</li>
                                <li>  <i className="fa fa-search" aria-hidden="true"></i></li>
                            </ul>
                        </div>
                    </div>
                    
                    
                    <div className="app-youtube-dashboard-navbar__second">
                        <div className="app-youtube-dashboard-navbar__second-title">
                            <span>Video tải lên</span>
                            <span><i className="fa fa-play"></i> Phát tất cả</span>
                        </div>
                        <div className="app-youtube-dashboard-gird">
                   
                           

                            

{videoState.videos?.map((item) => (
          <div  key={item.id} className="app-youtube-dashboard-gird__item">
                               
          <div className="app-youtube-dashboard-gird__item-image">
              <img src={item.urlThumb} alt="" 
               onClick={() => handleClick(item)}
              />
              <span> {item.duration}</span>
          </div>
          <div className="app-youtube-dashboard-gird__item-content">
              
              <div className="app-youtube-dashboard-gird__item-detail">
                   <span className="app-youtube-dashboard-gird__item-detail-title">{item.name}</span>
                 
                  <ul className="app-youtube-dashboard-gird__item-detail-date">
                      <span>{item.views} lượt xem • 5 thg 10, 2022 </span>
                  </ul>
              </div>
              
          </div>
      
  </div>
        ))}
                         
                        </div>
                    </div>
                    
                 </div>
                 <div className="clear-both"></div>
            </div>
        </div>
    </main>
  </>);
}
