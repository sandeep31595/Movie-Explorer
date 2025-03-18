import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import commentsReducer from "./commentsSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    comments: commentsReducer,
  },
});