
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import store from "../app/store";
import { retrieveCategories } from "../pages/video/videoSlice";

function UploadVideo({setTabUpload}){
    let navigate = useNavigate();
  const [fileVideo, setVideoFile] = useState(undefined);
  const authState = useSelector((state) => state.auth);
  const videoState = useSelector((state) => state.videos);

  async function fetchData() {
    await store.dispatch(retrieveCategories());
  }
  const selectFile = (event) => {
    setVideoFile(event.target.files);
    onFileChange();
  };

  const initThumb = async () => {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var imgPath = `${process.env.REACT_APP_BACKEND_URL}/public/setavata.jpeg`;
    var imgObj = new Image();
    imgObj.src = imgPath;
    imgObj.onload = function () {
      context.drawImage(imgObj, 0, 0, 640, 360);
    };
  };
  const onPlayVideo = async () => {
    var video = document.querySelector("#video-element");
    document
      .querySelector("#video-element source")
      .setAttribute(
        "src",
        URL.createObjectURL(document.querySelector("#file-input").files[0])
      );
    video.load();
    video.style.display = "inline";
    video.play();
    setTimeout(function () {
      document.getElementById("butoncapture").click();
    }, 500);
  };

  const capture = async () => {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video-element");
    canvas.width = 640;
    canvas.height = 360;
    canvas.getContext("2d").drawImage(video, 0, 0, 640, 360);
  };

  const onFileChange = () => {
    if (
      ["video/mp4"].indexOf(
        document.querySelector("#file-input").files[0].type
      ) === -1
    ) {
      alert("Error : Only MP4 format allowed");
      return;
    } else {
      initThumb();
      onPlayVideo();
    }
  };

  const uploadVideo = () => {
    if (document.querySelector("#file-input").files.length === 0) {
      alert("please choose a file to upload ");
      console.log("no fie was choice");
      return;
    }
    if (
      ["video/mp4"].indexOf(
        document.querySelector("#file-input").files[0].type
      ) === -1
    ) {
      alert("Error : Only MP4 format allowed");
      return;
    }
    var file = document.querySelector("#file-input").files[0];
    var canvasData = document.getElementById("canvas").toDataURL("image/jpeg");
    var video_name = document.getElementById("idnamevideo").value;
    var video_description = document.getElementById("description").value;
    var categoryId = document.getElementById("myCategory").value;

    if (video_name !== "" && video_description !== "") {
      var data = new FormData();
  /* //   data.append("fileVideo", file);
   //   data.append("fileImage", canvasData);
      data.append("name", video_name);
      data.append("categoryId", categoryId);
      data.append("description", video_description);
     
      for (const [key, value] of data) {
         console.log(key, value)
      }*/









  
     var data = new FormData();
      data.append("fileVideo", file);
      data.append("fileImage", canvasData);
      data.append("name", video_name);
      data.append("categoryId", categoryId);
      data.append("description", video_description);

   

      async function sendRequest() {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/videos/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authState.accessToken}`,
            },
            body: data,
          }
        );
        const result = await response.json();
        console.log("~ result", result);
        if (result.success === true) {
          alert(result.message);
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          alert(result.message);
        }
      }
      sendRequest(); 
    } else {
      alert("Please enter video name to upload");
      console.log("Please enter video name");
    }
  };

  useEffect(() => {
    initThumb();
    fetchData();
  }, []);
  return (<div className="upload-video-popup" >
  <div className="upload-video-popup__content">
        <div className="app-container-fluid">
           <div className="upload-video-popup__content-first">
               <div className="row">
                  <div className="col col-ms-6 col-s-6 col-mb-6">
                      <div className="upload-video-popup__content-first-name">
                          <span>Tên video</span>
                      </div>
                  </div>
                  <div className="col col-ms-6 col-s-6 col-mb-6">
                      <div className="upload-video-popup__content-first-title">
                           <span>Đã lưu ở chế độ riêng tư</span>
                           <i onClick={() => setTabUpload(false)} className="fa fa-times" aria-hidden="true"></i>
                      </div>
                  </div>
               </div>
                  
           </div>
           <div className="upload-video-popup__content-second">
              <div className="row">
                  <div className="col col-ms-7 col-s-7">
                      <div className="upload-video-popup__content-set">
                         <div className="row">
                             <div className="col col-ms-6 col-mb-6 col-6">
                                  <span className="upload-video-popup__content-second-span-title" >Chi tiết</span>
                             </div>
                             <div className="col col-ms-6 col-mb-6 col-6">
                              <span className="upload-video-popup__content-second-span-alert" >DÙNG LẠI THÔNG TIN</span>
                          </div>
                         </div>
                      </div>
                  </div>
                  <div className="col col-ms-7 col-s-7">
                      <div className="upload-video-popup__content-set">
                          <div className="upload-video-popup__content-set-over-flow">
                              <div className="form-group">
                                  <div className="form-text">
                                      <label>Tiêu đề (bắt buộc)</label>
                                      <input id="idnamevideo" type="text" placeholder="Thêm tiêu đề để mô tả video của bạn (nhập ký tự @ để đề cập tên một kênh)" />
                                  </div>
                              </div>

                              <div className="form-group">
                                  <div className="form-text">
                                   
                                      <label>Mô tả (bắt buộc)</label>
                                      <input  id="description" type="text" placeholder="Giới thiệu về video của bạn cho người xem (nhập ký tự @ để đề cập tên một kênh)" />
                                  </div>
                              </div>
                              <div className="form-image">
                                  <div className="form-image-title">
                                      <div className="form-image-title-span">
                                          <span>Chọn File Video đăng tải</span>
                                      </div> 
                                      <p>Chọn hoặc thả tệp video của bạn muốn đăng tải vào đây (File tối đa 40Mb) <a href="">Tìm hiểu thêm</a></p>
                                  </div>
                                  <div className="form-image-content">
                                       <div className="row">
                                          
                                          <div className="col col-ms-6 col-s-7">
                                              <div className="form-image-content__set-image">
                                                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                                              
                                                  
                                                  <label  class="custom-file-upload">
    Chọn Tệp
</label>
<input  id="file-input" onChange={selectFile} type="file"/>

                                              </div>
                                          </div>
                                         
                                       </div>
                                  </div>

                                  
                              </div>
                              <div className="form-image">
                                  <div className="form-image-title">
                                      <div className="form-image-title-span">
                                          <span>Hình thu nhỏ</span>
                                      </div> 
                                      <p>Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và thu hút người xem. <a href="">Tìm hiểu thêm</a></p>
                                  </div>
                                  <div className="form-image-content">
                                       <div className="row">
                                          
                                          <div  onClick={() => capture()} id="butoncapture" className="col col-ms-4 col-s-6">
                                              <div className="form-image-content__set-image">
                                                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                                                  <span>Click để đặt ảnh đại diện</span>
                                              </div>
                                          </div>
                                          <div className="col col-ms-4 col-s-6">
                                              <div className="form-image-content__list">
                                              <canvas id="canvas" ></canvas>
                                              </div>
                                          </div>
                                       </div>
                                  </div>

                                  
                              </div>
                              <div className="form-image">
                                  <div className="form-image-title">
                                      <div className="form-image-title-span">
                                          <span>Danh mục</span>
                                      </div> 
                                      <p>Thêm video của bạn vào một danh mục để người xem dễ dàng tìm thấy hơn. <a href="">Tìm hiểu thêm</a></p>
                                  </div>
                                  <div className="form-image-content">
                                      <div className="form-select">
                                      <select id="myCategory">
          {videoState.categories?.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
                                      </div>
                                  </div>
                                  <span> Coming soon </span>
                                 

        
                              </div>
                          </div>
                        
                         
                      </div>
                  </div>
                  <div className="col col-ms-5 col-s-5">
                     <div className="upload-video-popup__content-set-video"> 
                         <div className="upload-video-popup__content-set-video-suggest">
                          <video id="video-element" width="100%" height="140" controls>
                              <source src="./video//Siêu Phẩm 4in1 - Tà Lăng Tá Lăng Tà Lăng - Hoàn Remix ll Nhạc Nền Tiktok 2022 ..mp4" type="video/mp4" />
                              
                              Your browser does not support the video tag.
                            </video>
                         </div>
                         <div className="upload-video-popup__content-set-video-detail">
                            <div className="row">
                               <div className="col col-ms-11 col-s-11 col-mb-11">
                                   <div className="upload-video-popup__content-set-video-detail-link">
                                      <span>Đường liên kết của video</span>
                                      <a href=""> https://youtu.be/on6bpA9-ymg</a>
                                   </div>
                              
                               </div>
                               <div className="col col-ms-1 col-s-1 col-mb-1">
                                  <div className="upload-video-popup__content-set-video-detail-copy">
                                      <i className="fa fa-clone" aria-hidden="true"></i>
                                   </div>
                                
                              </div>
                              <div className="col col-ms-12 ">
                                  <div className="upload-video-popup__content-set-video-detail-name-file">
                                      <span>Tên tệp</span>
                                      <p>Tên video ở đây</p>
                                  </div>
                                
                              </div>
                            </div>
                         </div>
                     </div>
                  </div>
               
              </div>
           </div>
           <div>

           </div>

        </div>
        <div className="upload-video-popup__content-first">
               <div className="row">
                  <div className="col col-ms-6 col-s-6 col-mb-6">
                     
                  </div>
                  <div className="col col-ms-6 col-s-6 col-mb-6">
                      <div className="upload-video-popup__content-first-title">
                      <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4"
          id="confirm"
          onClick={() => uploadVideo()}
        >
          Đăng
        </button>
                      </div>
                  </div>
               </div>
                  
           </div>
  </div>

</div>);
}
export default UploadVideo;