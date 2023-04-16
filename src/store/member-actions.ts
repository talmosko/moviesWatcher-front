import axios from "axios";
import { MemberObject } from "../types/memberTypes";
import { memberActions } from "./members-slice";
import { errorsActions } from "./errors-slice";

export const getAllMembers = () => {
  return async function (dispatch: any) {
    try {
      const res = await axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API);
      if (res.status === 200) {
        if (res.data.members) {
          let members: MemberObject[] = res.data.members;
          dispatch(memberActions.replaceAllMembers(members as MemberObject[]));
          dispatch(errorsActions.clearMemberError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMemberError("Failed to get members"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const addMember = (data: MemberObject) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.post(
        import.meta.env.VITE_CINEMA_MEMBERS_API,
        data
      );
      if (res.status === 200) {
        if (res.data.member) {
          dispatch(memberActions.addMember(res.data.member as MemberObject));
          dispatch(errorsActions.clearMemberError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMemberError("Failed to add member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const updateMember = (data: MemberObject, memberId: string) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.put(
        import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId,
        data
      );
      if (res.status === 200) {
        if (res.data.member) {
          dispatch(
            memberActions.replaceMember(res.data.member as MemberObject)
          );
          dispatch(errorsActions.clearMemberError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMemberError("Failed to update member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const deleteMember = (memberId: string) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId
      );
      if (res.status === 200) {
        dispatch(memberActions.deleteMember(memberId));
        dispatch(errorsActions.clearMemberError);
      }
    } catch (error) {
      dispatch(errorsActions.setMemberError("Failed to delete member"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const getMemberResolver = (memberId: string | undefined) => {
  return axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API + "/" + memberId);
};
