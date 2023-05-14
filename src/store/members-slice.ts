import { createSlice } from "@reduxjs/toolkit";
import { MemberObject } from "../types/memberTypes";

interface MembersState {
  members: MemberObject[];
  loading: boolean;
  error: string | null;
}

const initialState: MembersState = {
  members: [],
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    replaceAllMembers(state, action) {
      state.members = action.payload as MemberObject[];
    },
    replaceMember(state, action) {
      const member: MemberObject = action.payload;
      const index = state.members.findIndex((m) => m._id === member._id);
      state.members[index] = member;
    },
    addMember(state, action) {
      state.members.push(action.payload as MemberObject);
    },
    deleteMember(state, action) {
      const memberId: string = action.payload;
      const index = state.members.findIndex((m) => m._id === memberId);
      state.members.splice(index, 1);
    },
    replaceMembers(state, action) {
      const members: MemberObject[] = action.payload;
      for (let member of members) {
        const index = state.members.findIndex((m) => m._id === member._id);
        state.members[index] = member;
      }
    },
    setMembersLoading(state, action) {
      state.loading = action.payload;
    },
    setMembersError(state, action) {
      state.error = action.payload;
    },
  },
});

export const memberActions = membersSlice.actions;

export default membersSlice;
   