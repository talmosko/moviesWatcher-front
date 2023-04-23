import axios from "axios";
import { MemberObject } from "../types/memberTypes";
import { memberActions } from "./members-slice";
import { subscriptionActions } from "./subscriptions-slice";
import { AppDispatch } from ".";

export const getAllMembers = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(memberActions.setMembersLoading(true));
      const res = await axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API, {
        withCredentials: true,
      });
      if (res.status === 200) {
        if (res.data.members) {
          let members: MemberObject[] = res.data.members;
          dispatch(memberActions.replaceAllMembers(members as MemberObject[]));
          dispatch(memberActions.setMembersError(null));
        }
      }
      dispatch(memberActions.setMembersLoading(false));
    } catch (error) {
      dispatch(memberActions.setMembersLoading(false));

      dispatch(memberActions.setMembersError("Failed to get members"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const addMember = (data: MemberObject) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(memberActions.setMembersLoading(true));
      const res = await axios.post(
        import.meta.env.VITE_CINEMA_MEMBERS_API,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.member) {
          dispatch(memberActions.addMember(res.data.member as MemberObject));
          dispatch(memberActions.setMembersError(null));
        }
      }
      dispatch(memberActions.setMembersLoading(false));
    } catch (error) {
      dispatch(memberActions.setMembersLoading(false));
      dispatch(memberActions.setMembersError("Failed to add member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const updateMember = (data: MemberObject, memberId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(memberActions.setMembersLoading(true));
      const res = await axios.put(
        import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.member) {
          dispatch(
            memberActions.replaceMember(res.data.member as MemberObject)
          );
          dispatch(memberActions.setMembersError(null));
        }
      }
      dispatch(memberActions.setMembersLoading(false));
    } catch (error) {
      dispatch(memberActions.setMembersLoading(false));
      dispatch(memberActions.setMembersError("Failed to update member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const deleteMember = (memberId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(memberActions.setMembersLoading(true));
      const res = await axios.delete(
        import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data as {
          memberId: MemberObject["_id"];
        };
        dispatch(memberActions.deleteMember(data.memberId));
        dispatch(subscriptionActions.deleteSubscriptionsForMember(memberId));
        dispatch(memberActions.setMembersError(null));
      }
      dispatch(memberActions.setMembersLoading(false));
    } catch (error) {
      dispatch(memberActions.setMembersLoading(false));
      dispatch(memberActions.setMembersError("Failed to delete member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const getMemberResolver = (memberId: string | undefined) => {
  return axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId, {
    withCredentials: true,
  });
};
