import { FormEvent, FormEventHandler, useState } from "react";
import { toast } from "react-hot-toast";
import { login } from "../../api";
import { NextPage } from "next";
import Router from "next/router";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Text,
  Title,
  Anchor,
  Container,
  Paper,
} from "@mantine/core";
import Link from "next/link";
import { AxiosError } from "axios";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (values.email && !values.email.includes("@")) {
        errors.email = "Email is not valid";
      }
      if (values.password && values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
  });

  // form submit handler
  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await login(values);
      localStorage.removeItem("dt-token");
      localStorage.setItem("dt-token", res?.data?.token);
      if (res?.status === 200) {
        toast.success("Login successful");
        Router.push("/profile");
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err?.message);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor component={Link} href="/signup" color="primary100.0">
          Create account
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt={5}
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Group position="right" mt={15}>
            <Button
              type="submit"
              fullWidth
              className="bg-gray-900 hover:bg-slate-800"
            >
              login
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
