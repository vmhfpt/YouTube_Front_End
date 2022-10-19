import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../services/CategoryService";

export const categoryState = {
  categories: [],
};
///////////////////ACTIONS OF REDUX///////////////////////


export const getAllCategory = createAsyncThunk(
  "getCategory",
  async () => {
   
    const response = await CategoryService.getAll(
      
    );
    return response;
  }
);

///////////////////////////////////////////////////////////
export const categorySlice = createSlice({
  name: "videos",
  initialState: categoryState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
       
      })

      
    
  },
  
});

export const { setVideo, addAnComment, removeAnItem, updateVideoNameReducer } =
  categorySlice.actions;
export default categorySlice.reducer;
