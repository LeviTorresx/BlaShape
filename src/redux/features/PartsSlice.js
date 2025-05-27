import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const partsSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    addPart: (state, action) => {
      state.push({ ...action.payload, key: Date.now().toString() });
    },
    editPart: (state, action) => {
      const { key, updatedPart } = action.payload;
      const index = state.findIndex((part) => part.key === key);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedPart };
      }
    },
    rotatePart: (state, action) => {
      const { key, sizes } = action.payload;
      return state.map((part) =>
        part.key === key
          ? { ...part, width: sizes.width, height: sizes.height }
          : part
      );
    },
    deletePart: (state, action) => {
      return state.filter((part) => part.key !== action.payload);
    },
  },
});

export const { addPart, editPart, deletePart, rotatePart } = partsSlice.actions;
export default partsSlice.reducer;
