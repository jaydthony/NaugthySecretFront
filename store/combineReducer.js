import { combineReducers } from "@reduxjs/toolkit";
import allUser from "../store/slices/userSlice";
// import todoSlice from "../store/slices/todoSlice";

const combineReducer = combineReducers({
    user: allUser,
  //   todo: todoSlice,
});

export default combineReducer;
