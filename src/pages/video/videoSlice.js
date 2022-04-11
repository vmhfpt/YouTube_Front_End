import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VideoService from "../../services/VideoService";

export const videoState = {
  video: {},
  comments: [],
  videos: [],
};
///////////////////ACTIONS OF REDUX///////////////////////
export const retrieveVideos = createAsyncThunk("videos/retrieve", async () => {
  const response = await VideoService.getAll();
  return response;
});


export const getCommentsByVideoId = createAsyncThunk(
  "videos/get_comments",
  async (videoId) => {
    const response = await VideoService.getCommentsByVideoId(videoId);
    return response;
  }
);

export const uploadComment = createAsyncThunk(
  "videos/upload_comment",
  async (comment) => {
    const response = await VideoService.uploadComment(comment);
    return response;
  }
);

///////////////////////////////////////////////////////////
export const videoSlice = createSlice({
  name: "videos",
  initialState: videoState,
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
      // console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(getCommentsByVideoId.fulfilled, (state, action) => {
        state.comments = action.payload;
        console.log("file: videoSlice.js ~ line 53 ~ .addCase ~ state.comments", state.comments);
      })
  },
});

export const { setVideo } = videoSlice.actions;
// export const selectVideos = (state) => state.video.videos;
export default videoSlice.reducer;
