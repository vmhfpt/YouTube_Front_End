import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { uploadComment, getCommentsByVideoId } from "./videoSlice";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

import { Navbar } from "../../components/Navbar";

import store from "../../app/store";

export function VideoShow() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);
  let params = useParams();

  const socket = io();

  // socket.on("chat message", function (msg) {
  //   var item = document.createElement("li");
  //   item.textContent = msg;
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  const onComment = async (data) => {
    const comment = {
      videoId: params.videoId,
      content: data.content_comment,
      token: `Bearer ${authState.accessToken}`,
    };
    await store.dispatch(uploadComment(comment));
  };

  async function fetchComments() {
    await store.dispatch(getCommentsByVideoId(params.videoId));
  }

  async function playVideo() {
    let videoElem = document.getElementById("video");
    try {
      await videoElem.play();
    } catch (err) {}
  }
  useEffect(() => {
    fetchComments();
    playVideo();
  }, []);
  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div className="grid md:grid-cols-1">
        <div>
          <h2>VideoId is: {params.videoId}</h2>
          {/* {JSON.stringify(videoState.video)} */}
          <video width="750" height="500" id="video" controls>
            <source src={videoState.video.url} type="video/mp4" />
          </video>
          <h4>{videoState.video.name}</h4>
          <span>{videoState.video.user}</span>{" "}
          <span>{videoState.video.views} views</span>
        </div>
      </div>
      <form className="w-full">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Type your comment here"
            aria-label="Full name"
            {...register("content_comment", {
              required: true,
              maxLength: 200,
            })}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={handleSubmit(onComment)}
          >
            Comment
          </button>
        </div>
        {errors.content_comment && (
          <p className="text-red-600/100">{errors.content_comment.message}</p>
        )}
      </form>
      {videoState.comments?.map((item) => (
        <div key={item.id} className="px-2">
          <div id={item.id} value={item}>
            <h4 class="font-bold">{item.user.name}</h4>
            <span>{item.createdAt}</span>{" "}
            <span class="italic">{item.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
