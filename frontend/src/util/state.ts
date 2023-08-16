import { GlobalState } from "little-state-machine";

export const setActiveChat = (state: GlobalState, payload: GlobalState) => {
  return {
    ...state,
    activeChat: {
      ...payload,
    },
  };
};

export const setChats = (state: GlobalState, payload: GlobalState) => {
  return {
    ...state,
    chats: payload,
  };
};

export const setActiveUser = (state: GlobalState, payload: GlobalState) => {
  return {
    ...state,
    isloggedIn: payload,
  };
};
