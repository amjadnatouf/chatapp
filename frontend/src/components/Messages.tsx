import { Group, Text } from "@mantine/core";
import { Box } from "@mui/material";
import { format } from "timeago.js";

const Messages = ({ message, own }) => {
  const messageClass = own ? "right-message" : "left-message";

  return (
    <Box
      sx={{ flexDirection: own ? "row-reverse" : "row" }}
      className="message"
    >
      <div className="avatarContainer">
        <img src="/noAvatar.png" className="avatar" />
      </div>
      <div>
        {/* <p>{message.text + format(message.createdAt)}</p> */}
        <Group>
          <Text className={`messageContent ${messageClass}`}>
            {message.text}
            <Text fz="10px" c="dimmed" align="end">
              {format(message.createdAt)}
            </Text>
          </Text>
        </Group>
      </div>
    </Box>
  );
};

export default Messages;
