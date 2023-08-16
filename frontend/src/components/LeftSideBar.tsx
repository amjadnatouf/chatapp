import { Flex, Navbar, ScrollArea } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import ChatMenu from "./ChatMenu";
import { useState } from "react";
import { UserDrawer } from "./userDrawer";
import { NewChatDrawer } from "./NewChatDrawer";

function LeftSideBar() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Navbar className="sidebar">
      <Navbar.Section className="sidebarHeader">
        <h2> CHAT</h2>
        <Flex justify="center" align="center" gap={5}>
          <IconSearch
            size={25}
            color="#999"
            cursor={"pointer"}
            onClick={() => setShow(true)}
          />
          <UserDrawer />
        </Flex>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} className="sidebarBody">
        <ChatMenu show={show} />
      </Navbar.Section>

      <NewChatDrawer />
    </Navbar>
  );
}

export default LeftSideBar;
