import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { axiosInstance } from "../util/apiCall";
import { useProfile } from "./useProfile";

export const useMessage = () => {
  const {
    state: { activeChat },
  } = useStateMachine();
  const { user } = useProfile();

  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const { handleSubmit, register, reset } = useForm();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.on("getMessage", (data) => {
      const tempMessage = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, tempMessage]);
    });

    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter(f => users.some(u => u.userId === f))
      // );
    });

    const getMessages = async () => {
      if (activeChat) {
        try {
          const res = await axiosInstance(
            `/api/message/${activeChat?._id}`,
            "GET",
            {}
          );
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [activeChat, user]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const values = {
        ["newMessage"]: event.target.value,
      };
      handleSend(values, event);
    }
  };

  const handleSend = async (values, event) => {
    event.preventDefault();
    const message = {
      sender: user?._id,
      text: values["newMessage"],
      chatId: activeChat._id,
    };

    const receiverId = activeChat.members.find(
      (member) => member !== user?._id
    );

    const newMessage = {
      senderId: user?._id,
      receiverId,
      text: values["newMessage"],
    };

    socket.current.emit("sendMessage", newMessage);

    try {
      const res = await axiosInstance("/api/message/", "POST", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    messages,
    handleSubmit,
    register,
    reset,
    handleSend,
    handleKeyDown,
    scrollRef,
  };
};
