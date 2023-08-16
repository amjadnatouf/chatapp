import { Navbar, ScrollArea, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import OnlineUsers from "../util/OnlineUsers";
import { axiosInstance } from "../util/apiCall";
import { User } from "../types/types";

const RightSideBar = () => {
  const [onlines, setOnlines] = useState<User[] | undefined>([]);

  const getGlobalUsers = async () => {
    try {
      const res = await axiosInstance<object, { result: User[] }>(
        "/api/globalusers",
        "GET",
        {}
      );
      const globalUsersData = res.data.result;
      return globalUsersData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const pollInterval = 5000;

  useEffect(() => {
    let isMounted = true;

    const pollData = async () => {
      if (isMounted) {
        const newData = await getGlobalUsers();
        if (!arraysEqual(newData, onlines)) {
          setOnlines(newData);
        }
        setTimeout(pollData, pollInterval);
      }
    };

    pollData();

    return () => {
      isMounted = false;
    };
  }, [onlines]);

  return (
    // Your component JSX
    <Navbar className="sidebar">
      <Title fz={"lg"}> Online People</Title>
      <Navbar.Section grow component={ScrollArea} className="sidebarBody">
        {onlines?.map((o) => (
          <div key={o._id}>
            <OnlineUsers online={o} />
          </div>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};

// Utility function to compare arrays

const arraysEqual = (a: User[], b: User[] | undefined) => {
  if (a.length !== b?.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export default RightSideBar;
