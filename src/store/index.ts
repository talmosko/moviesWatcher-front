import { configureStore } from "@reduxjs/toolkit";

import membersSlice from "./members-slice";
import moviesSlice from "./movies-slice";
import subscriptionSlice from "./subscriptions-slice";
import usersSlice from "./users-slice";

const store = configureStore({
  reducer: {
    members: membersSlice.reducer,
    movies: moviesSlice.reducer,
    subscriptions: subscriptionSlice.reducer,
    users: usersSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
