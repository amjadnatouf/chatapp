import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  rem
} from "@mantine/core";
import { Avatar } from "@mui/material";
import { IconLock } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../util/apiCall";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: "100vh",
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  iconLock: {
    background: "#0f4555 !important",
    margin: "0 auto 1rem",
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  link: {
    fontWeight: 700,
    color: "#0f4555",
  },
}));

export function Login() {
  const { classes } = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    const res = await axiosInstance("/api/users/login", "POST", values);
    if (res) {
      localStorage.setItem("token", res.data.token);
      window.location.replace("/");
      return;
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Novo!
        </Title>

        <Avatar className={classes.iconLock}>
          <IconLock size="1.5rem" />
        </Avatar>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...register("email", { required: "This is required" })}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...register("password", { required: "This is required" })}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" bg={"#0f4555"} type="submit">
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link to="/register" className={classes.link}>
            Register
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
