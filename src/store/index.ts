import { configureStore } from "@reduxjs/toolkit";
import errorsSlice from "./errors-slice";

import membersSlice from "./members-slice";
import moviesSlice from "./movies-slice";

const store = configureStore({
  reducer: {
    members: membersSlice.reducer,
    movies: moviesSlice.reducer,
    errors: errorsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
