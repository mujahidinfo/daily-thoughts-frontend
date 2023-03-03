import { useUser } from "@/hooks/useContext";
import { Center } from "@mantine/core";
import React from "react";
import Login from "./Login";
import Router from "next/router";

const Index = () => {
  const { user, loading } = useUser();
  if (loading) {
    return <Center>Loading...</Center>;
  }
  if (user) {
    Router.push("/profile");
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default Index;
