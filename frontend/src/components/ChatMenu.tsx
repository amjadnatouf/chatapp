import { useProfile } from "../hooks/useProfile";
import Person from "../util/Person";
import { useChat } from "../hooks/useChat";
import { Divider, Input } from "@mantine/core";

interface ChatMenuProps {
  show: boolean;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ show }) => {
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
      {chats?.map((chat) => (
        <div key={chat?._id}>
          <Person chat={chat} currentUser={user} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ChatMenu;
