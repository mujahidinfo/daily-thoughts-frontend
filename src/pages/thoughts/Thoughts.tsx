import { useUser } from "@/hooks/useContext";
import React from "react";
const Thoughts = () => {
  const { user, loading } = useUser();
  return <div>this is thoughts page</div>;
};

export default Thoughts;
