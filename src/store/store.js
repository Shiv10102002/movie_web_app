import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSliec";
export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
