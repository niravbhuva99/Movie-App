import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  url: "",
  genre: "",
  imgUrl: "",
};
const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getImageConfig(state, action) {
      state.imgUrl = action.payload;
    },
    getUrl(state, action) {
      state.url = action.payload;
    },
    getGenreList(state, action) {
      state.genre = action.payload;
    },
  },
});
export default HomeSlice.reducer;
export const { getImageConfig, getUrl, getGenreList } = HomeSlice.actions;
