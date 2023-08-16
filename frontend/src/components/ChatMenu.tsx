import { useProfile } from "../hooks/useProfile";
import Person from "../util/Person";
import { useChat } from "../hooks/useChat";
import { Divider, Input } from "@mantine/core";

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

const ChatMenu = ({ show }) => {
  const { user, isLoading } = useProfile();
  const { chats } = useChat();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chatMenu">
      <Input
        display={show ? "block" : "none"}
        placeholder="Search for friends"
        className="chatMenuInput"
      />
      {chats?.map((chat: ChatProps) => (
        <div key={chat._id}>
          <Person key={chat._id} chat={chat} currentUser={user as UserProps} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ChatMenu;
