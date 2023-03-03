import { useUser } from "../../hooks/useContext";
import React from "react";
import { useRouter } from "next/router";

const ProtectedComponents = ({ children }: any) => {
  const { user, loading } = useUser();
  const Router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    Router.push("/login");
  }

  return user ? <>{children}</> : null;
};

export default ProtectedComponents;
