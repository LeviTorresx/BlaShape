import { configureStore } from "@reduxjs/toolkit";
import { materialSlice } from "./features/Material";
import { partsSlice } from "./features/PartsSlice";

export const store = configureStore({
  reducer: {
    parts: partsSlice.reducer,
    material: materialSlice.reducer,
  },
});
