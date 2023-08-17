import LeftSideBar from "../components/LeftSideBar";
import Chats from "../components/Chats";
import { useMediaQuery } from "@mantine/hooks";
import { useStateMachine } from "little-state-machine";

const Home: React.FC = () => {
  const matches = useMediaQuery("(max-width: 425px)");
  const {
    state: { activeChat },
  } = useStateMachine();

  if (matches && activeChat?._id) {
    return (
      <div>
        <Chats />
      </div>
    );
  }

  return (
    <div className="homeContainer">
      <LeftSideBar />
      <Chats />
      {/* <RightSideBar /> */}
    </div>
  );
};
export default Home;
