import ProtectedComponents from "@/components/auth/ProtectedComponents";
import React from "react";
import Profile from "./Profile";

const index = () => {
  return (
    <div>
      <ProtectedComponents>
        <Profile />
      </ProtectedComponents>
    </div>
  );
};

export default index;
