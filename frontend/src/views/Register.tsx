import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  createStyles,
  Avatar,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosInstance } from "../util/apiCall";

export function Register() {
  const { classes } = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await axiosInstance("/api/users/register", "POST", values);
      if (res.status === 201) {
        localStorage.setItem("token", res.data?.token);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
          fontSize: 25,
        })}
      >
        Welcome to Novo
      </Title>

      <Avatar src="/noAvatar.png" className={classes.iconUser} size={100} />

      <Paper component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          withAsterisk={false}
          label="First Name"
          placeholder="John"
          required
          {...register("firstName", {
            required: "This is required",
          })}
        />
        <TextInput
          withAsterisk={false}
          label="Last Name"
          placeholder="Doe"
          mt="md"
          required
          {...register("lastName", {
            required: "This is required",
          })}
        />
        <TextInput
          label="Email"
          placeholder="example@email.com"
          mt="md"
          required
          {...register("email", {
            required: "This is required",
          })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...register("password", { required: "This is required" })}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="I agree to the terms and conditions" />
        </Group>
        <Button fullWidth mt="xl" bg={"#0f4555"} type="submit">
          Sign up
        </Button>

        <Text ta="end" mt="md">
          Already have an account?{" "}
          <Link to="/login" className={classes.link}>
            Sign in
          </Link>
        </Text>
      </Paper>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  iconUser: {
    margin: ".5rem auto 0",
    border: "1px solid #0f4555",
    borderRadius: "100%",
  },
  link: {
    fontWeight: 700,
    color: "#0f4555",
  },
}));
