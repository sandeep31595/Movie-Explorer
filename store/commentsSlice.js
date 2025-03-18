import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {
    addComment: (state, action) => {
      const { movieId, comment } = action.payload;
      if (!state[movieId]) {
        state[movieId] = [];
      }
      state[movieId].push(comment);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;