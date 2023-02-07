import { useUser } from "../../hooks/useContext";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const ProtectedComponents = ({ children }: any) => {
  const { user, loading } = useUser();
  const Router = useRouter();
  console.log("user", user);
  if (loading) return <div>Loading...</div>;
  if (!user?.data) {
    Router.push("/login");
  }

  return user?.data ? <>{children}</> : null;
};

export default ProtectedComponents;
