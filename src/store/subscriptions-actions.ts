import axios from "axios";
import { AppDispatch } from ".";
import {
  SubscriptionInputObject,
  SubscriptionObject,
} from "../types/subscriptionTypes";
import { subscriptionActions } from "./subscriptions-slice";

export const getAllSubscriptions = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(subscriptionActions.setSubscriptionsLoading(true));
    try {
      const response = await axios.get(
        import.meta.env.VITE_CINEMA_SUBSCRIPTIONS_API,
        {
          withCredentials: true,
        }
      );

      const { subscriptions }: { subscriptions: SubscriptionObject[] } =
        response.data;

      dispatch(subscriptionActions.replaceAllSubscriptions(subscriptions));
      dispatch(subscriptionActions.setSubscriptionsError(null));
      dispatch(subscriptionActions.setSubscriptionsLoading(false));
    } catch (error) {
      dispatch(subscriptionActions.setSubscriptionsLoading(false));
      dispatch(
        subscriptionActions.setSubscriptionsError("Failed to get subscriptions")
      );
    }
  };
};

export const postSubscription = (data: SubscriptionInputObject) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(subscriptionActions.setSubscriptionsLoading(true));
      const response = await axios.post(
        import.meta.env.VITE_CINEMA_SUBSCRIPTIONS_API,
        data,
        {
          withCredentials: true,
        }
      );
      const subscription = response.data;
      dispatch(subscriptionActions.addSubscription(subscription));
      dispatch(subscriptionActions.setSubscriptionsError(null));
      dispatch(subscriptionActions.setSubscriptionsLoading(false));
    } catch (error) {
      dispatch(subscriptionActions.setSubscriptionsLoading(false));
      dispatch(
        subscriptionActions.setSubscriptionsError("Failed to add subscription")
      );
    }
  };
};
