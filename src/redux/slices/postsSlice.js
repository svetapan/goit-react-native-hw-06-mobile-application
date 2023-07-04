import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { writePostToFirestore } from "../services/postsService";

const postSlice = createSlice({
  name: "post",
  initialState: initialState.post,
  reducers: {
    addPost: (state, action) => {
      state.post = action.payload;
      console.log("addPost", state.post);
      writePostToFirestore(
        state.post.previewImage,
        state.post.title,
        state.post.locationText,
        state.post.location
      );
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
