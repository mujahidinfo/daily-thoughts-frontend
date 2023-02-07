// get user from token and store in state
import { getUser } from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import { JsxElement } from "typescript";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export const UserContext = createContext<any>({});

export const UseWrapper = ({ children }: any) => {
  const [user, setUser] = useState<{ data: User | null }>({ data: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user from token
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("dt-token");
        if (token) {
          const res = await getUser();
          setUser({data: res?.data});
        } else {
          setUser({ data: null });
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
