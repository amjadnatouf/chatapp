import { Avatar, Indicator } from "@mantine/core";
import { axiosInstance } from "./apiCall";
import { useStateMachine } from "little-state-machine";
import { setActiveChat, setChats } from "./state";
import { checkAuth } from "./auth";
import { Chat, NewChat, OnlineProps } from "../types/types";

const OnlineUsers: React.FC<OnlineProps> = ({ online }) => {
  const { state, actions } = useStateMachine({ setActiveChat, setChats });
  const { id } = checkAuth();

  // const handleClick = async () => {
  //   const newChatMembers: newChat = {
  //     senderId: id,
  //     receiverId: online?._id,
  //   };

  //   const res = await axiosInstance<newChat, NChatRes>(
  //     "/api/chat/",
  //     "POST",
  //     newChatMembers
  //   );

  //   if (res.status === 201) {
  //     actions.setActiveChat(res.data.chat);
  //   }

  //   if (res.status === 200) {
  //     const updatedChats = [...state.chats, res.data];
  //     actions.setChats(updatedChats);
  //     actions.setActiveChat(res.data);
  //   }
  // };

  const handleClick = async () => {
    const newChatMembers: NewChat = {
      senderId: id,
      receiverId: online?._id,
    };

    try {
      const res = await axiosInstance<NewChat, Chat>(
        "/api/chat/",
        "POST",
        newChatMembers
      );

      if (res.status === 201) {
        actions.setActiveChat(res.data);
      }

      if (res.status === 200) {
        const updatedChats = [...state.chats, res.data];
        actions.setChats(updatedChats);
        actions.setActiveChat(res.data);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <div className="user" onClick={handleClick}>
      <Indicator
        inline
        size={16}
        offset={7}
        position="bottom-end"
        // color={true ? "green" : "#ccc"}
        withBorder
      >
        <Avatar size="md" radius="xl" src="/noAvatar.png" />
      </Indicator>
      <p>{`${online?.firstName} ${online?.lastName}`}</p>
    </div>
  );
};

export default OnlineUsers;
