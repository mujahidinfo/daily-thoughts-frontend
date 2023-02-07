import { useUser } from "@/hooks/useContext";
import { Paper, Text, Button } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React from "react";

const Profile = () => {
  const { user, loading, setUser } = useUser();
  const logout = () => {
    localStorage.removeItem("dt-token");
    setUser(null);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Paper shadow="md" p={20}>
        <Text fz="xl" fw="bold" className="flex gap-1 my-2">
          <IconUser />
          Profile
        </Text>
        <h2>User: {user?.data?.name}</h2>
        <h2 className="text-gray-500">Email: {user?.data?.email}</h2>
        <Button onClick={logout} className="bg-gray-800" fullWidth mt={10}>
          Logout
        </Button>
      </Paper>
    </div>
  );
};

export default Profile;
