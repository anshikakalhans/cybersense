import { configureStore, createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    darkMode: true,
    searchQuery: "",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setSerachQuery: (state, action) => {
      state.serachQuery = action.payload;
    },
  },
});

export const { toggleDarkMode, setserachQuery } = appSlice.actions;

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
