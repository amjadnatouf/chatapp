import { GlobalState } from "little-state-machine";
import { Chat, Chats } from "../types/types";

export const setActiveChat = (state: GlobalState, payload: Chat) => {
  return {
    ...state,
    activeChat: {
      ...payload,
    },
  };
};

export const setChats = (state: GlobalState, payload: Chats) => {
  return {
    ...state,
    chats: payload,
  };
};

declare module "little-state-machine" {
  interface GlobalState {
    activeChat?: Chat | undefined;
    chats: Chats;
  }
}
