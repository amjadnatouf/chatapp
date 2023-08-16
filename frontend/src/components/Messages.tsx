/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Group, Text } from "@mantine/core";
import { Box } from "@mui/material";
import React from "react";
import { format } from "timeago.js";
import { Message } from "../types/types";

interface MessageProps {
  message: Message;
  own: boolean;
}

const Messages: React.FC<MessageProps> = ({ message, own }) => {
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
        <Group>
          <Text className={`messageContent ${messageClass}`}>
            {message.text}
            <Text fz="10px" c="dimmed" align="end">
              {/* @ts-ignore */}
              {format(message.createdAt)}
            </Text>
          </Text>
        </Group>
      </div>
    </Box>
  );
};

export default Messages;
