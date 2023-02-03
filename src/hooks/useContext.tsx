// get user from token and store in state
import { getUser } from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import { JsxElement } from "typescript";

interface User {
  id: string;
  username: string;
  email: string;
}

export const UserContext = createContext<any>({});

export const UseWrapper = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user from token
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("dt-token");
        if (token) {
          const res = await getUser();
          setUser(res?.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // shared state
  const sharedState = {
    user,
    loading,
    setUser,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
