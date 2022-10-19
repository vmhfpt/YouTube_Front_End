import { useParams, useNavigate, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect , useState} from "react";
import { useForm } from "react-hook-form";
import { getAllCategory } from "../category/CategorySlice";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/header";
import store from "../../app/store";
import { getVideoSuggestByCategory } from "./videoSlice";
import {
  initiateSocketConnection,
  disconnectSocket,
  sendMessage,
  deleteMessage,
} from "../../services/socketio.service";
import { getCommentsAndSuggestionVideoBy, setVideo } from "./videoSlice";

export function VideoShow() {
  const [categoryId, setCategoryId] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categories = useSelector((state) => state.category.categories);
  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);
  let params = useParams();
  let navigate = useNavigate();
  async function fetchData() {
    
    await store.dispatch( getAllCategory());
  }
  async function fetchComments() {
    await store.dispatch(
      getCommentsAndSuggestionVideoBy({
        videoId: videoState.video.id,
        categoryId: videoState.video.categoryId,
      })
    );
  }

  async function playVideo() {
    let videoElem = document.getElementById("video");
    try {
      await videoElem.play();
    } catch (err) {}
  }
  const handleGetVideoSuggestByCategory = async (id) => {
    setCategoryId(id);
      await store.dispatch(getVideoSuggestByCategory(id));
   
  }

  useEffect(() => {
    initiateSocketConnection(authState, videoState.video.id);
    fetchComments();
    playVideo();
    fetchData();
    return () => {
      disconnectSocket();
    };
  }, []);

  const onComment = async (data) => {
    const comment = {
      videoId: params.videoId,
      content: data.content_comment,
      // token: `Bearer ${authState.accessToken}`,
    };
    sendMessage(comment);
  };

  const onClickSuggestion = async (item) => {
    await store.dispatch(setVideo(item));
    navigate(`/videos/${item.id}`);
    window.location.reload();
  };
  const getFinishVideo = () => {
    setTimeout(setTimeOutLoadVideo, 5000);
    function setTimeOutLoadVideo() {
      const videoIdCurrent = (videoState.video.id);
      const arrayVideoSuggest = videoState.suggestionVideos;
      var check = false;
      for(var i = 0; i < arrayVideoSuggest.length ; i++){
         if(videoIdCurrent === arrayVideoSuggest[i].id ){
            check = true;
            if(i+1 < arrayVideoSuggest.length){
              onClickSuggestion(arrayVideoSuggest[i+1]);
              
               break;
            }else {
              onClickSuggestion(arrayVideoSuggest[0]);
              break;
            }

         } 
      }
      if(check === false)  onClickSuggestion(arrayVideoSuggest[0]);
    }
  }
  /*return (
    <div classNameNameName="container mx-auto">
      <Navbar></Navbar>
      <div classNameNameName="grid md:grid-cols-3 gap-4">
        <div classNameNameName="col-span-2">
          <video width="100%" height="auto" id="video" controls>
            <source src={videoState.video.url} type="video/mp4" />
          </video>
          <h4 classNameName="font-bold">{videoState.video.name}</h4>
          <span>{videoState.video.user.name}</span>{" "}
          <span>{videoState.video.views} views</span>
          <div>
            <form classNameNameName="w-full">
              <div classNameNameName="flex items-center border-b border-teal-500 py-2">
                <input
                  classNameNameName="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Type your comment here"
                  aria-label="Full name"
                  {...register("content_comment", {
                    required: true,
                    maxLength: 200,
                  })}
                />
                <button
                  classNameNameName="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  onClick={handleSubmit(onComment)}
                >
                  Comment
                </button>
              </div>
              {errors.content_comment && (
                <p classNameNameName="text-red-600/100">
                  {errors.content_comment.message}
                </p>
              )}
            </form>
            {videoState.comments?.map((item) => (
              <div key={item.id} classNameNameName="px-2">
                <div id={item.id} value={item} style={{ position: "relative" }}>
                  {authState.user.id === item.user.id && (
                    <div style={{ position: "absolute", right: "5px" }}>
                      <span
                        classNameNameName="mr-2"
                        style={{ color: "blue" }}
                        onClick={() => {}}
                      >
                        Edit
                      </span>
                      <span
                        style={{ color: "red" }}
                        onClick={() => deleteMessage(item)}
                      >
                        Delete
                      </span>
                    </div>
                  )}
                  <h4 classNameName="font-bold">{item.user.name}</h4>
                  <span>{item.createdAt}</span>{" "}
                  <span classNameName="italic">{item.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {videoState.suggestionVideos?.map((item) => (
            <div key={item.id} classNameNameName="grid md:grid-cols-2 mt-4 gap-4">
              <img
                classNameNameName="rounded-lg"
                src={item.urlThumb}
                alt="null"
                width="100%"
                height="auto"
                onClick={() => onClickSuggestion(item)}
              ></img>
              <div id={item.id} value={item}>
                <h4 classNameName="font-bold mt-4">{item.name}</h4>
                <div classNameName="mt-4">{item.user.name}</div>{" "}
                <div classNameName="italic mt-4">{item.views} views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ); */
  return (
   <>
   <Header></Header>
   
    <main className="app-detail-video container-fluid">
  
  
   
   
    <div className="container">
   
        <div className="row">
          
            <div className="col col-ls-8 col-ms-7 col-s-12 ">
                <div className="app-detail-video__content">
                    <div className="app-detail-video__content-play">
                    <video onEnded={() => getFinishVideo()} width="100%" height="240" id="video" controls >
            <source src={videoState.video.url} type="video/mp4" />
          </video>
                    </div>
                </div>
                <div className="app-detail-video__title">
                    <span> {videoState.video.name}</span>
                </div>
                <div className="app-detail-video__socialite">
                    <div className="app-container-fluid">
                        <div className="row">
                            <div className="col col-ls-3 col-ms-2 col-s-3 col-mb-3 disable-mobile">
                                <div className="app-detail-video__socialite-view">
                                   <span>{videoState.video.views} lượt xem • 5 thg 10, 2022 </span>
                                </div>
                            </div>
                            <div className="col col-ls-9 col-ms-10 col-s-9 col-mb-12">
                                <div className="app-detail-video__socialite-share">
                                    <ul>
                                        <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 2,5N</li>
                                        <li><i className="fa fa-thumbs-o-down" aria-hidden="true"></i> KHÔNG THÍCH</li>
                                        <li><i className="fa fa-share" aria-hidden="true"></i> CHIA SẺ</li>
                                        <li> <i className="fa fa-save"></i> LƯU</li>
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app-detail-video__channel app-container-fluid">
                     <div className="row">
                        <div className="col col-s-9 ">
                            <div className="app-detail-video__channel-detail">
                                <div className="app-detail-video__channel-detail-item">
                                    <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
                                </div>
                                <div className="app-detail-video__channel-detail-item">
                                    <div className="app-detail-video__channel-detail-author">
                                        <b>{videoState.video.user.name}</b>
                                        <span>1,4 N Người đăng ký</span>
                                    </div>
                                    <div className="app-detail-video__channel-detail-thumbnail">
                                        <span>{videoState.video.name} </span>
                                    </div>
                                    <div className="app-detail-video__channel-detail-show">
                                        <span> HIỆN THÊM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-s-3">
                            <div className="app-detail-video__channel-subscribe">
                                <button> ĐĂNG KÝ</button>
                            </div>
                        </div>
                        <div className="col col-s-12">
                             <div className="app-detail-video__channel-comment">
                                <div className="app-detail-video__channel-comment-total">
                                    <div className="row">
                                        <div className="col col-comment-fixed col-mb-4">
                                            <span> {videoState.comments.length} bình Luận</span>
                                        </div>
                                        <div className="col col-comment-fixed col-mb-5">
                                            <i className="fa fa-sort-amount-desc"></i> SẮP XẾP THEO
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="show-comment-mobile">
                                  
                              
                                <div className="app-detail-video__channel-comment-post">
                                    <div className="row ">
                                        <div className="col col-s-1 col-mb-2">
                                            <div className="app-detail-video__channel-comment-post-user">
                                                <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
                                            </div>
                                        </div>
                                        <div className="col col-s-11 col-mb-10">
                                            <div className="app-detail-video__channel-comment-post-input">  
                                               <form>
                                               <div className="app-detail-video__channel-comment-post-input-typing">
                                                    <input  
                                                    {...register("content_comment", {
                                                       required: true,
                                                       maxLength: 200,
                                                         })} type="text" placeholder="Viết bình luận" />
                                                </div>
                                                <div className="app-detail-video__channel-comment-post-button">
                                                      <button>HỦY</button>
                                                      <button type="button" onClick={handleSubmit(onComment)}>BÌNH LUẬN</button>
                                                </div>
                                               </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="app-detail-video__channel-comment-list">

                          

{videoState.comments?.map((item) => (
              <div key={item.id} className="app-detail-video__channel-comment-list-item">
              <div id={item.id} value={item} className="row ">
              
                  <div className="col col-s-1 col-mb-2">
                      <div className="app-detail-video__channel-comment-post-user">
                          <img src="https://yt3.ggpht.com/5fyf2qhCF8r2Us5btZDzgeGkSnzg0ouni49oUJqVgUU3hWRHgQ86zNpH3UfDF-5SGBtVPGnCew=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
                      </div>
                  </div>
                  <div className="col col-s-11 col-mb-10">
                      <div className="app-detail-video__channel-comment-post-input">  
                          <div className="app-detail-video__channel-show-comment-title">
                               <b>{item.user.name}</b> <span>{item.createdAt}</span>
                          </div>
                          <div className="app-detail-video__channel-show-comment-content">
                              <span>{item.content}</span>
                          </div>
                          <div className="app-detail-video__channel-show-comment-tool">
                              <ul>
                                  <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 4</li>
                                  <li><i className="fa fa-thumbs-o-down" aria-hidden="true"></i> 15</li>
                                  <li>PHẢN HỒI</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            ))}
                                   
                                </div>
                            </div>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
            
                <div className="col col-fixed col-s-12">
                    <div className="app-detail-video__suggest">
                        <div className="app-content-youtube__detail-categories app-container-fluid ">
                            <div className="app-content-youtube__detail-category-center ">
                                <div className="app-content-youtube__detail-category-center-over-flow">
                                    <button className="btn-active"> Đề xuất</button>
                                    {categories?.map((item, key) => (
                            <button onClick={() => handleGetVideoSuggestByCategory(item.id)} className={categoryId === item.id ? "btn-active" : ""}    key={key}>{item.name} </button>
                          ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="app-detail-video__suggest-list-video">
                   
          {videoState.suggestionVideos?.map((item) => (
             <div key={item.id} className="app-detail-video__suggest-list-video-item">
             <div className="row">
                <div className="col col-ms-6 ">
                    <div className="app-detail-video__suggest-list-video-item-image">
                        <img src={item.urlThumb} alt=""  onClick={() => onClickSuggestion(item)}/>
                        <div className="app-detail-video__suggest-list-video-item-time">
                            <span >{item.duration}</span>
                        </div>
                    </div>
                </div>
                <div className="col col-ms-6 col-s-8 col-9 ">
                    <div className="app-detail-video__suggest-list-video-item-content">
                        <div className="app-detail-video__suggest-list-video-item-content-title">
                            <a href=""> {item.name}</a>
                        </div>
                        <div className="app-detail-video__suggest-list-video-item-content-date">
                            <span> {item.user.name}</span>
                            <span>{item.views} lượt xem • 5 thg 10, 2022 </span>
                           
                        </div>
                        <div className="app-detail-video__suggest-list-video-item-content-tag">
                             Mới
                        </div>
                    </div>
                </div>
             </div>
         </div>
          ))}
                        
        
                    </div>
                </div>
              
               
            
            
           
        </div>
    </div>
</main>
</>
  );
}
