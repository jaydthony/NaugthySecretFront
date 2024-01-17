import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.baseUrl;
const initialState = {
  user: null,
  status: "idle",
  err: null,
};

export const fetchTodos = createAsyncThunk("get/fetchTodos", async () => {
  const res = await axios.get(`${baseUrl}/todos`);
  return [...res.data];
});

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    allUsers: (state, action) => {
      state.user = action.payload;
    },
    getAllUser: (state, action) => {
      state.newUser = action.payload;
    },
  },
});

export const { allUsers, getAllUser } = userSlice.actions;

export default userSlice.reducer;
