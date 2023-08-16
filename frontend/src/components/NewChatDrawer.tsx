import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Group,
  ActionIcon,
  Menu,
  TextInput,
  Title,
  createStyles,
  Divider,
} from "@mantine/core";
import { IconArrowRight, IconEdit } from "@tabler/icons-react";
import { useChat } from "../hooks/useChat";
import { useProfile } from "../hooks/useProfile";
import Person from "../util/Person";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { setChats, setActiveChat } from "../util/state";
import { axiosInstance } from "../util/apiCall";

export const NewChatDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { chats } = useChat();
  const { user } = useProfile();
  const { classes } = useStyles();
  const { register, handleSubmit, resetField } = useForm();
  const { state, actions } = useStateMachine({ setChats, setActiveChat });

  const onSubmit = async (values) => {
    const newChatMembers = {
      senderId: user?._id,
      receiverEmail: values.newChatEmail,
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
    resetField("newChatEmail");
    close();
  };

  return (
    <div>
      <Drawer opened={opened} onClose={close} position="left" zIndex={1000}>
        <Menu>
          <Title component="h3" align="center">
            New Chat
          </Title>
          <Menu.Item>
            <TextInput
              size="md"
              data-autofocus
              rightSection={
                <ActionIcon onClick={handleSubmit(onSubmit)}>
                  <IconArrowRight size="1.1rem" stroke={1.5} color="#0f4555" />
                </ActionIcon>
              }
              variant="unstyled"
              className={classes.chatDrawerInput}
              placeholder="Enter email..."
              {...register("newChatEmail")}
            />
          </Menu.Item>
          {chats?.map((chat) => {
            return (
              <Menu.Item key={chat._id} onClick={close}>
                <div key={chat._id}>
                  <Person key={chat._id} chat={chat} currentUser={user} />
                  <Divider />
                </div>
              </Menu.Item>
            );
          })}
        </Menu>
      </Drawer>

      <Group position="right">
        <ActionIcon
          size={40}
          radius="xl"
          bg="#0f4555"
          variant="filled"
          onClick={open}
        >
          <IconEdit size="1.5rem" stroke={1.5} color="#fff" />
        </ActionIcon>
      </Group>
    </div>
  );
};

const useStyles = createStyles({
  chatDrawerInput: {
    borderBottom: "1px solid #0f4555",
    padding: "0 0 0 1rem",
  },
});
