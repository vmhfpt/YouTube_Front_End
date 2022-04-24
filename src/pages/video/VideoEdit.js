import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getVideosByUserId,
  deleteVideoByVideoId,
  setVideo,
  updateVideoName,
} from "./videoSlice";
import { NotificationManager } from "react-notifications";
import { Navbar } from "../../components/Navbar";
import store from "../../app/store";
export function VideoEdit() {
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);

  const [statusEdit, setStatusEditVideoNameValue] = useState(false);
  const [VideoIdEdit, setVideoIdEdit] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
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

  const onDelete = async (item) => {
    const video = {
      videoId: item.id,
      token: `Bearer ${authState.accessToken}`,
    };
    const result = await store.dispatch(deleteVideoByVideoId(video));
    if (result.payload.success) {
      NotificationManager.success(result.payload.message, "Delete video info");
      fetchData();
    }
  };

  const onEditVideoName = async (item) => {
    setStatusEditVideoNameValue(true);
    setVideoIdEdit(item.id);
    setValue("content_video_edit", item.name);
  };

  const onCancelEditVideoName = async () => {
    setStatusEditVideoNameValue(false);
  };

  const onConfirmEditVideoName = async (data) => {
    const videoEdit = {
      videoId: VideoIdEdit,
      videoName: data.content_video_edit,
      token: `Bearer ${authState.accessToken}`,
    };
    const result = await store.dispatch(updateVideoName(videoEdit));
    if (result.payload.success) {
      NotificationManager.success(
        result.payload.message,
        "Update video name info"
      );
      setStatusEditVideoNameValue(false);
      fetchData();
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div>
        <div style={{ position: "relative" }}>
          {" "}
          {statusEdit && (
            <div style={{ position: "absolute", right: "50%" }}>
              <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div class="mb-6">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="newVideoName"
                    >
                      Enter new video name
                    </label>
                    <input
                      class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="newVideoName"
                      type="text"
                      placeholder=""
                      {...register("content_video_edit", {
                        required: true,
                        maxLength: 200,
                      })}
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSubmit(onConfirmEditVideoName)}
                    >
                      Update
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
      <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-1">
        {videoState.videos?.map((item) => (
          <div
            key={item.id}
            style={{ display: "inline-block" }}
            className="px-3"
          >
            <img
              className="rounded-lg"
              src={item.urlThumb}
              alt="null"
              width="100%"
              height="auto"
              onClick={() => handleClick(item)}
            ></img>
            <div className="gap-1 sm:grid-cols-2">
              <div id={item.id} value={item}>
                <h4 class="font-bold">{item.name}</h4>
                <span>{item.user.name}</span>{" "}
                <span class="italic">{item.views} views</span>
              </div>
              <div class="inline-flex">
                <button
                  onClick={() => onEditVideoName(item)}
                  className="bg-green-500 hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="bg-red-500 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
