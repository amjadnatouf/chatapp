import { useStateMachine } from "little-state-machine";
import { setActiveChat } from "./state";
import { useProfile } from "../hooks/useProfile";
import { Avatar, Indicator } from "@mantine/core";

interface ChatProps {
  _id: string;
  members: string[];
}

interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string | null;
}

interface PersonProps {
  chat: ChatProps | undefined;
  currentUser?: UserProps | undefined;
}

const Person: React.FC<PersonProps> = ({ chat, currentUser }) => {
  const { actions } = useStateMachine({ setActiveChat });
  const handleClick = () => {
    actions.setActiveChat(chat);
  };

  const friendId = chat?.members.find((member) => member !== currentUser?._id);
  const { user, isLoading } = useProfile(friendId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user" onClick={handleClick}>
      <Indicator
        inline
        size={16}
        offset={7}
        position="bottom-end"
        color={true ? "green" : "#ccc"}
        withBorder
      >
        <Avatar size="md" radius="xl" src="/noAvatar.png" />
      </Indicator>
      <p>{`${user?.firstName} ${user?.lastName}`}</p>
    </div>
  );
};

export default Person;
