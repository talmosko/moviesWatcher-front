import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionObject } from "../types/subscriptionTypes";

interface SubscriptionState {
  subscriptions: SubscriptionObject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription(state, action) {
      state.subscriptions.push(action.payload as SubscriptionObject);
    },
    replaceAllSubscriptions(state, action) {
      state.subscriptions = action.payload as SubscriptionObject[];
    },
    replaceSubscription(state, action) {
      const subscription: SubscriptionObject = action.payload;
      const index = state.subscriptions.findIndex(
        (s) => s._id === subscription._id
      );
      state.subscriptions[index] = subscription;
    },
    deleteSubscription(state, action) {
      const subscriptionId: string = action.payload;
      const index = state.subscriptions.findIndex(
        (s) => s._id === subscriptionId
      );
      state.subscriptions.splice(index, 1);
    },
    deleteSubscriptionsForMember(state, action) {
      const memberId: string = action.payload;

      const index = state.subscriptions.findIndex(
        (s) => s.memberId._id === memberId
      );
      state.subscriptions.splice(index, 1);
    },
    replaceSubscriptions(state, action) {
      const subscriptions: SubscriptionObject[] = action.payload;
      for (let subscription of subscriptions) {
        const index = state.subscriptions.findIndex(
          (s) => s._id === subscription._id
        );
        state.subscriptions[index] = subscription;
      }
    },

    setSubscriptionsLoading(state, action) {
      state.loading = action.payload;
    },
    setSubscriptionsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const subscriptionActions = subscriptionSlice.actions;

export default subscriptionSlice;
