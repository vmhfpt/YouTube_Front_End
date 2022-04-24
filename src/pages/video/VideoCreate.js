import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useSelector } from "react-redux";
import store from "../../app/store";
import { retrieveCategories } from "./videoSlice";
export function VideoCreate() {
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
    var categoryId = document.getElementById("myCategory").value;

    if (video_name !== "") {
      var data = new FormData();
      data.append("fileVideo", file);
      data.append("fileImage", canvasData);
      data.append("name", video_name);
      data.append("categoryId", categoryId);

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

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div>
        <input type="file" id="file-input" onChange={selectFile} />
        <span>LIMIT 30MB</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={() => capture()}
          id="butoncapture"
        >
          set avatar video
        </button>
        Category
        <select id="myCategory">
          {videoState.categories?.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4"
          id="confirm"
          onClick={() => uploadVideo()}
        >
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
