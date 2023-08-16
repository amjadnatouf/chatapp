interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Chat {
  _id: string;
  members: string[];
}

type Chats = Chat[];

interface ActiveChat {
  _id: string;
  members: string[];
}

interface ILoginRes {
  token: string;
}

interface OnlineProps {
  online: User | undefined;
}

interface NewChat {
  senderId: string;
  receiverId: string | undefined;
}

interface NewMessage {
  newMessage: string;
}

interface Message {
  sender: string | undefined;
  text: string;
  createdAt?: number | undefined;
  chatId?: string | undefined;
}

export type {
  User,
  Message,
  Chat,
  Chats,
  ActiveChat,
  ILoginRes,
  OnlineProps,
  NewChat,
  NewMessage,
};
