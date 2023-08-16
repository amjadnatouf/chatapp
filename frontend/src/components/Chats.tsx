import { useProfile } from "../hooks/useProfile";
import Messages from "./Messages";
import { useMessage } from "../hooks/useMessages";
import { useStateMachine } from "little-state-machine";
import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Header,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowLeft, IconPhoneCall, IconSend } from "@tabler/icons-react";
import { setActiveChat } from "../util/state";

const Chats: React.FC = () => {
  const { user } = useProfile();
  const {
    messages,
    handleSubmit,
    register,
    handleSend,
    handleKeyDown,
    scrollRef,
  } = useMessage();

  const {
    state: { activeChat },
    actions,
  } = useStateMachine({ setActiveChat });
  const fId = activeChat?.members?.find((m) => m !== user?._id);
  const { friend } = useProfile(fId);

  if (!activeChat?._id) {
    return <div className="empty-chat">Select a friend to start chatting.</div>;
  }

  return (
    <div className="chats" style={{ position: "relative" }}>
      <Header
        zIndex={33}
        w={"100%"}
        height={"auto"}
        style={{ position: "absolute" }}
      >
        <Flex align={"center"} justify={"space-between"} p={10}>
          <ActionIcon onClick={() => actions.setActiveChat()}>
            <IconArrowLeft color="#0f4555" />
          </ActionIcon>

          <Group>
            <Avatar src="/assets/post/6.jpeg" radius={100} />
            <Text>{friend?.email}</Text>
          </Group>
          <IconPhoneCall size={20} color="#0f4555" />
        </Flex>
      </Header>
      <div className="chatBox">
        {messages?.map((m, index) => (
          <div ref={scrollRef} key={index}>
            <Messages message={m} own={m.sender === user?._id} />
          </div>
        ))}
      </div>
      <form className="formMessage" onKeyDown={handleKeyDown}>
        <TextInput
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              bg="#0f4555"
              variant="filled"
              onClick={handleSubmit(handleSend)}
            >
              <IconSend size="1.1rem" stroke={1.5} color="#fff" />
            </ActionIcon>
          }
          placeholder="write a message..."
          rightSectionWidth={42}
          id="newMessage"
          className="chatMessageInput"
          {...register("newMessage")}
        />
      </form>
    </div>
  );
};

export default Chats;
