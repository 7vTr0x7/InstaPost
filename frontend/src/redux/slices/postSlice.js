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
    editPost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      state.posts[index] = {
        ...state.posts[index],
        title: action.payload.title,
        description: action.payload.description,
      };
    },
  },
});

export const { addPost, removePost, editPost } = postSlice.actions;

export default postSlice.reducer;
