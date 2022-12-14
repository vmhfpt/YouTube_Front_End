
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
                          <span>T??n video</span>
                      </div>
                  </div>
                  <div className="col col-ms-6 col-s-6 col-mb-6">
                      <div className="upload-video-popup__content-first-title">
                           <span>???? l??u ??? ch??? ????? ri??ng t??</span>
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
                                  <span className="upload-video-popup__content-second-span-title" >Chi ti???t</span>
                             </div>
                             <div className="col col-ms-6 col-mb-6 col-6">
                              <span className="upload-video-popup__content-second-span-alert" >D??NG L???I TH??NG TIN</span>
                          </div>
                         </div>
                      </div>
                  </div>
                  <div className="col col-ms-7 col-s-7">
                      <div className="upload-video-popup__content-set">
                          <div className="upload-video-popup__content-set-over-flow">
                              <div className="form-group">
                                  <div className="form-text">
                                      <label>Ti??u ????? (b???t bu???c)</label>
                                      <input id="idnamevideo" type="text" placeholder="Th??m ti??u ????? ????? m?? t??? video c???a b???n (nh???p k?? t??? @ ????? ????? c???p t??n m???t k??nh)" />
                                  </div>
                              </div>

                              <div className="form-group">
                                  <div className="form-text">
                                   
                                      <label>M?? t??? (b???t bu???c)</label>
                                      <input  id="description" type="text" placeholder="Gi???i thi???u v??? video c???a b???n cho ng?????i xem (nh???p k?? t??? @ ????? ????? c???p t??n m???t k??nh)" />
                                  </div>
                              </div>
                              <div className="form-image">
                                  <div className="form-image-title">
                                      <div className="form-image-title-span">
                                          <span>Ch???n File Video ????ng t???i</span>
                                      </div> 
                                      <p>Ch???n ho???c th??? t???p video c???a b???n mu???n ????ng t???i v??o ????y (File t???i ??a 40Mb) <a href="">T??m hi???u th??m</a></p>
                                  </div>
                                  <div className="form-image-content">
                                       <div className="row">
                                          
                                          <div className="col col-ms-6 col-s-7">
                                              <div className="form-image-content__set-image">
                                                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                                              
                                                  
                                                  <label  class="custom-file-upload">
    Ch???n T???p
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
                                          <span>H??nh thu nh???</span>
                                      </div> 
                                      <p>Ch???n ho???c t???i m???t h??nh ???nh l??n ????? th??? hi???n n???i dung trong video c???a b???n. H??nh thu nh??? h???p d???n s??? l??m n???i b???t video c???a b???n v?? thu h??t ng?????i xem. <a href="">T??m hi???u th??m</a></p>
                                  </div>
                                  <div className="form-image-content">
                                       <div className="row">
                                          
                                          <div  onClick={() => capture()} id="butoncapture" className="col col-ms-4 col-s-6">
                                              <div className="form-image-content__set-image">
                                                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                                                  <span>Click ????? ?????t ???nh ?????i di???n</span>
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
                                          <span>Danh m???c</span>
                                      </div> 
                                      <p>Th??m video c???a b???n v??o m???t danh m???c ????? ng?????i xem d??? d??ng t??m th???y h??n. <a href="">T??m hi???u th??m</a></p>
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
                              <source src="./video//Si??u Ph???m 4in1 - T?? L??ng T?? L??ng T?? L??ng - Ho??n Remix ll Nh???c N???n Tiktok 2022 ..mp4" type="video/mp4" />
                              
                              Your browser does not support the video tag.
                            </video>
                         </div>
                         <div className="upload-video-popup__content-set-video-detail">
                            <div className="row">
                               <div className="col col-ms-11 col-s-11 col-mb-11">
                                   <div className="upload-video-popup__content-set-video-detail-link">
                                      <span>???????ng li??n k???t c???a video</span>
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
                                      <span>T??n t???p</span>
                                      <p>T??n video ??? ????y</p>
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
          ????ng
        </button>
                      </div>
                  </div>
               </div>
                  
           </div>
  </div>

</div>);
}
export default UploadVideo;