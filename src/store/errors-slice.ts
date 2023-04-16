import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    movieError: null as string | null,
    memberError: null as string | null,
  },
  reducers: {
    setMovieError(state, action) {
      state.movieError = action.payload as string;
    },
    clearMovieError(state) {
      state.movieError = null;
    },
    setMemberError(state, action) {
      state.memberError = action.payload as string;
    },
    clearMemberError(state) {
      state.memberError = null;
    },
  },
});

export const errorsActions = errorsSlice.actions;

export default errorsSlice;
