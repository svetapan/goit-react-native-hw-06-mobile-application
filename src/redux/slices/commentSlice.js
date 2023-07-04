import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { writeCommentToFirestore } from "../services/commentService";

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState.comment,
  reducers: {
    addComment: (state, action) => {
      state.comment = action.payload;
      console.log("addComment", state.comment);
      writeCommentToFirestore(state.comment.postId, {
        comment: state.comment.comment,
        date: state.comment.formattedDate,
      });
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
