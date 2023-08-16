import { Navbar, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import OnlineUsers from "../util/OnlineUsers";
import { axiosInstance } from "../util/apiCall";

// const RightSideBar = () => {
//   const [onlines, setOnlines] = useState([]);

// useEffect(() => {
//   const getGlobalUsers = async () => {
//     try {
//       const res = await axiosInstance("/api/globalusers", "GET", {});
//       console.log(res.data);
//       const globalUsersData = res.data.result;
//       setOnlines(globalUsersData);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getGlobalUsers();
// }, []);

const RightSideBar = () => {
  const [onlines, setOnlines] = useState([]);

  const getGlobalUsers = async () => {
    try {
      const res = await axiosInstance("/api/globalusers", "GET", {});
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
    <Navbar className="rightSideBar">
      <h2> Online People</h2>
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
const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export default RightSideBar;
