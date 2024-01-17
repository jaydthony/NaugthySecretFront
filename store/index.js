import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "./combineReducer";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combineReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
