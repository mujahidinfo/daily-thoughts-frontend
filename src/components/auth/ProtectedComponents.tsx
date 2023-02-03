import { useUser } from "../../hooks/useContext";
import React from "react";
import { toast } from "react-hot-toast";

const ProtectedComponents = ({ children }: any) => {
  const { user, loading } = useUser();
  console.log("user", user);
  if (loading) return <div>Loading...</div>;
  if (!user) {
    toast.error("You have to login first");
  }

  return <> {user && children} </>;
};

export default ProtectedComponents;
