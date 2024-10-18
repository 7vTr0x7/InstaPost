import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    removePost: (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    },
  },
});

export const { addPost, removePost } = postSlice.actions;

export default postSlice.reducer;
