import { Avatar, Indicator } from "@mantine/core";
import { axiosInstance } from "./apiCall";
import { useStateMachine } from "little-state-machine";
import { setActiveChat, setChats } from "./state";
import { checkAuth } from "./auth";

const OnlineUsers = ({ online }) => {
  const { state, actions } = useStateMachine({ setActiveChat, setChats });
  //   const handleClick = () => {
  //     actions.setActiveChat(chat);
  //   };

  // const { user, isLoading } = useProfile(online.userId);
  // const { id } = checkAuth();

  // const handleClick = async () => {
  //   const newChatMembers = {
  //     senderId: id,
  //     receiverId: online.userId,
  //   };

  //   const res = await axiosInstance("/api/users/globalusers", "GET", {});

  //   if (res.status === 201) {
  //     console.log(res.data.message);
  //     actions.setActiveChat(res.data.chat);
  //   }

  //   if (res.status === 200) {
  //     const updatedChats = [...state.chats, res.data];
  //     actions.setChats(updatedChats);
  //     actions.setActiveChat(res.data);
  //   }
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const { id } = checkAuth();

  const handleClick = async () => {
    const newChatMembers = {
      senderId: id,
      receiverId: online._id,
    };

    const res = await axiosInstance("/api/chat/", "POST", newChatMembers);

    if (res.status === 201) {
      console.log(res.data.message);
      actions.setActiveChat(res.data.chat);
    }

    if (res.status === 200) {
      const updatedChats = [...state.chats, res.data];
      actions.setChats(updatedChats);
      actions.setActiveChat(res.data);
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
