import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getVideosByUserId,
  deleteVideoByVideoId,
  setVideo,
} from "./videoSlice";
import { NotificationManager } from "react-notifications";
import { Navbar } from "../../components/Navbar";
import store from "../../app/store";
export function VideoEdit() {
  let navigate = useNavigate();
  const videoState = useSelector((state) => state.videos);
  const authState = useSelector((state) => state.auth);
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

  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <span>Video edit page</span>
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
                  onClick={() => {}}
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
