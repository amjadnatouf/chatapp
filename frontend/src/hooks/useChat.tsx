import { useEffect } from "react";
import { axiosInstance } from "../util/apiCall";
import { checkAuth } from "../util/auth";
import { useStateMachine } from "little-state-machine";
import { setChats } from "../util/state";
import { Chats } from "../types/types";

export const useChat = (): { chats: Chats | undefined } => {
  const {
    state: { chats },
    actions,
  } = useStateMachine({ setChats });
  const { id } = checkAuth();

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axiosInstance<object, Chats>(
          `/api/chat/${id}`,
          "GET",
          {}
        );
        actions.setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [actions, id]);

  return { chats: chats };
};
