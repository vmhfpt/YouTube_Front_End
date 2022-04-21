import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VideoService from "../../services/VideoService";

export const videoState = {
  video: {},
  comments: [],
  videos: [],
  categories: [],
};
///////////////////ACTIONS OF REDUX///////////////////////
export const retrieveVideos = createAsyncThunk("videos/retrieve", async () => {
  const response = await VideoService.getAll();
  return response;
});

export const retrieveCategories = createAsyncThunk("categories/retrieve", async () => {
  const response = await VideoService.getAllCategories();
  return response;
});

export const getCommentsByVideoId = createAsyncThunk(
  "videos/get_comments",
  async (videoId) => {
    const response = await VideoService.getCommentsByVideoId(videoId);
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
    },
    addAnComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeAnItem: (state, action) => {
      let tmp_comment = state.comments;
      state.comments = tmp_comment.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(retrieveCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getCommentsByVideoId.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const { setVideo, addAnComment, removeAnItem } = videoSlice.actions;
// export const selectVideos = (state) => state.video.videos;
export default videoSlice.reducer;
