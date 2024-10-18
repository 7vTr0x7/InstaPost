import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userId: "6711f339d1e51912c68a9e3e",
    },
  },
  reducers: {},
});

export default userSlice.reducer;
