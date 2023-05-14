import { createSlice } from "@reduxjs/toolkit";
import { UserObject } from "../types/userTypes";

interface UsersState {
  users: UserObject[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    replaceAllUsers(state, action) {
      state.users = action.payload as UserObject[];
    },
    replaceUser(state, action) {
      const user: UserObject = action.payload;
      const index = state.users.findIndex((u) => u._id === user._id);
      state.users[index] = user;
    },
    addUser(state, action) {
      state.users.push(action.payload as UserObject);
    },
    deleteUser(state, action) {
      const userId: string = action.payload;
      const index = state.users.findIndex((m) => m._id === userId);
      state.users.splice(index, 1);
    },
    replaceUsers(state, action) {
      const users: UserObject[] = action.payload;
      for (let user of users) {
        const index = state.users.findIndex((m) => m._id === user._id);
        state.users[index] = user;
      }
    },
    setUsersLoading(state, action) {
      state.loading = action.payload;
    },
    setUsersError(state, action) {
      state.error = action.payload;
    },
  },
});

export const userActions = usersSlice.actions;

export default usersSlice;
   