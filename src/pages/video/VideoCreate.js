import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
export function VideoCreate() {
  // let navigate = useNavigate();
  const [fileVideo, setVideoFile] = useState(undefined);
 
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
      //check is file mp4
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
    var videoname = document.getElementById("idnamevideo").value;
    var category = document.getElementById("myCategory").value;

    if (videoname !== "") {
      var data = new FormData();
      data.append("fileVideo", file);
      data.append("fileImage", canvasData);
      data.append("name", videoname);
      data.append("category", category);

      // var request = new XMLHttpRequest();
      // request.onreadystatechange = function () {
      //   if (this.readyState == 4 && this.status == 200) {
      //     console.log(this.responseText);
      //   }
      // };
      // request.open('POST', `${BASE_URL}/videos/upload-to-cloudinary`);
      // request.send(data);

      async function sendRequest() {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/videos/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        console.log("Log ~ response.json()", response.json());
      }
      sendRequest();
    } else {
      alert("please enter videoname to upload ");
      console.log("please enter videoname");
    }
  };

  useEffect(() => {
    initThumb();
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div>
        <input type="file" id="file-input" onChange={selectFile}  />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4' onClick={() => capture()} id="butoncapture">
          set avatar video
        </button>
        Category
        <select id="myCategory">
          <option value="music">music</option>
          <option value="young music">young music</option>
          <option value="gold music">gold music</option>
          <option value="game music">game music</option>
          <option value="learn english">learn english</option>
          <option value="english music">english music</option>
          <option value="animation">animation</option>
          <option value="movie">movie</option>
          <option value="comedy">comedy</option>
          <option value="news">news</option>
          <option value="war content">war content</option>
          <option value="others">others</option>
        </select>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4' id="confirm" onClick={() => uploadVideo()}>
          upload to server
        </button>
        Name of video view on website <input type="text" id="idnamevideo" />
        <canvas id="canvas" width="640" height="360"></canvas>
        <video id="video-element" width="854" height="480" controls>
          <source type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
