import axios from "axios";
import { UserObject } from "../types/userTypes";
import { userActions } from "./users-slice";
import { AppDispatch } from ".";

export const getAllUsers = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(userActions.setUsersLoading(true));
      const res = await axios.get(import.meta.env.VITE_CINEMA_USERS_API, {
        withCredentials: true,
      });
      if (res.status === 200) {
        if (res.data.users) {
          let users: UserObject[] = res.data.users;
          dispatch(userActions.replaceAllUsers(users as UserObject[]));
          dispatch(userActions.setUsersError(null));
        }
      }
      dispatch(userActions.setUsersLoading(false));
    } catch (error) {
      dispatch(userActions.setUsersLoading(false));

      dispatch(userActions.setUsersError("Failed to get users"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const addUser = (data: UserObject) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(userActions.setUsersLoading(true));
      const res = await axios.post(
        import.meta.env.VITE_CINEMA_USERS_API,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.user) {
          dispatch(userActions.addUser(res.data.user as UserObject));
          dispatch(userActions.setUsersError(null));
        }
      }
      dispatch(userActions.setUsersLoading(false));
    } catch (error) {
      dispatch(userActions.setUsersLoading(false));
      dispatch(userActions.setUsersError("Failed to add user"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const updateUser = (data: UserObject, userId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(userActions.setUsersLoading(true));
      const res = await axios.put(
        import.meta.env.VITE_CINEMA_USERS_API + "/" + userId,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.user) {
          dispatch(userActions.replaceUser(res.data.user as UserObject));
          dispatch(userActions.setUsersError(null));
        }
      }
      dispatch(userActions.setUsersLoading(false));
    } catch (error) {
      dispatch(userActions.setUsersLoading(false));
      dispatch(userActions.setUsersError("Failed to update user"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const deleteUser = (userId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(userActions.setUsersLoading(true));
      const res = await axios.delete(
        import.meta.env.VITE_CINEMA_USERS_API + "/" + userId,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data as {
          userId: UserObject["_id"];
        };
        dispatch(userActions.deleteUser(data.userId));
        dispatch(userActions.setUsersError(null));
      }
      dispatch(userActions.setUsersLoading(false));
    } catch (error) {
      dispatch(userActions.setUsersLoading(false));
      dispatch(userActions.setUsersError("Failed to delete user"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const getUserResolver = (userId: string | undefined) => {
  return axios.get(import.meta.env.VITE_CINEMA_USERS_API + "/" + userId, {
    withCredentials: true,
  });
};
