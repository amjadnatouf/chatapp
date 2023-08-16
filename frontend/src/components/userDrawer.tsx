import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Group,
  ActionIcon,
  Avatar,
  useMantineTheme,
  Text,
  Menu,
} from "@mantine/core";
import {
  IconChevronRight,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { logOut } from "../util/auth";
import { useProfile } from "../hooks/useProfile";

export const UserDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { user } = useProfile();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Focus demo"
        position="right"
        zIndex={1000}
      >
        <Menu>
          <Menu.Item
            rightSection={<IconChevronRight size="0.9rem" stroke={1.5} />}
          >
            <Group>
              <Avatar
                radius="xl"
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              />

              <div>
                <Text weight={500}>
                  {user?.firstName + " " + user?.lastName}
                </Text>
                <Text size="xs" color="dimmed">
                  {user?.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            icon={
              <IconHeart
                size="0.9rem"
                stroke={1.5}
                color={theme.colors.red[6]}
              />
            }
          >
            Liked posts
          </Menu.Item>
          <Menu.Item
            icon={
              <IconStar
                size="0.9rem"
                stroke={1.5}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Saved posts
          </Menu.Item>
          <Menu.Item
            icon={
              <IconMessage
                size="0.9rem"
                stroke={1.5}
                color={theme.colors.blue[6]}
              />
            }
          >
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item
            icon={<IconLogout size="0.9rem" stroke={1.5} />}
            onClick={logOut}
          >
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
            Pause subscription
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconTrash size="0.9rem" stroke={1.5} />}
          >
            Delete account
          </Menu.Item>
          <p
            style={{
              margin: "6rem 0",
              textAlign: "center",
            }}
          >
            Chat App
            <br />
            copyright &copy; {new Date().getFullYear()} Amjad Natouf
          </p>
        </Menu>
      </Drawer>

      <Group position="center">
        {/*<Button onClick={open}>Open drawer</Button>*/}
        <ActionIcon className="profile" onClick={open}>
          <Avatar
            className="profileImg"
            src="/noAvatar.png"
            radius={100}
            size={20}
          />
        </ActionIcon>
      </Group>
    </>
  );
};
