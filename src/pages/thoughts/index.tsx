import ProtectedComponents from "@/components/auth/ProtectedComponents";
import React from "react";
import Thoughts from "./Thoughts";

const index = () => {
  return (
    <div>
      <ProtectedComponents>
        <Thoughts />
      </ProtectedComponents>
    </div>
  );
};

export default index;
