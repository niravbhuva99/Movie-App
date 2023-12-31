import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  url: "",
  genres: "",
  imgUrl: "",
  videoData: "",
  tvGenreList: [],
  showSearchbar: false,
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
      state.genres = action.payload;
    },
    getData(state, action) {
      state.videoData = action.payload;
    },
    getTvGenreList(state, action) {
      state.tvGenreList = action.payload;
    },
    setSearchbar(state, action) {
      state.showSearchbar = action.payload;
    },
  },
});
export default HomeSlice.reducer;
export const {
  getImageConfig,
  getUrl,
  getGenreList,
  getData,
  getTvGenreList,
  setSearchbar,
} = HomeSlice.actions;
