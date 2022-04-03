import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VideoService from '../../services/VideoService';

export const videoState = {
  video: {},
  videos: [],
};
///////////////////ACTIONS OF REDUX///////////////////////
export const retrieveVideos = createAsyncThunk('videos/retrieve', async () => {
  const response = await VideoService.getAll();
  return response;
});

export const updateVideo = createAsyncThunk('videos/update', async () => {
  const response = await VideoService.updateView();
  return response;
});
///////////////////////////////////////////////////////////
export const videoSlice = createSlice({
  name: 'videos',
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
      .addCase(updateVideo.fulfilled, (action) => {
      });
  },
});

export const { setVideo } = videoSlice.actions;
// export const selectVideos = (state) => state.video.videos;
export default videoSlice.reducer;