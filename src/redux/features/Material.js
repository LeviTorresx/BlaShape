import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    material: "Melamina",
    colors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Nogal", hex: "#8B5A2B" },
      { name: "Gris", hex: "#808080" },
    ],
    thickness: [9, 15, 18], // Espesores en mm
    sizes: [
      { width: 243, height: 183, price: 180000 },
      { width: 122, height: 244, price: 140000 },
    ],
  },
  {
    material: "RH MDF",
    colors: [
      { name: "Verde", hex: "#008000" },
      { name: "Natural", hex: "#D2B48C" },
    ],
    thickness: [9, 12, 18, 25], // Espesores en mm
    sizes: [
      { width: 244, height: 124, price: 220000 },
      { width: 122, height: 244, price: 160000 },
    ],
  },
  {
    material: "Triplay",
    colors: [
      { name: "Natural", hex: "#D2B48C" },
      { name: "Caoba", hex: "#8B0000" },
    ],
    thickness: [12, 15, 18], // Espesores en mm
    sizes: [
      { width: 122, height: 244, price: 200000 },
      { width: 153, height: 244, price: 250000 },
    ],
  },
];

export const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      state.push(action.payload);
    },
    removeMaterial: (state, action) => {
      return state.filter((material) => material.key !== action.payload);
    },
    updateMaterial: (state, action) => {
      const material = state.find(
        (material) => material.key === action.payload.key
      );
      if (material) {
        Object.assign(material, action.payload);
      }
    },
  },
});

export const { addMaterial, removeMaterial, updateMaterial } =
  materialSlice.actions;
export default materialSlice.reducer;
