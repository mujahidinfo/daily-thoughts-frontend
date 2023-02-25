// get user from token and store in state
import { getUser } from "@/api";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UseWrapper = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user from token
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUser();
        if (res?.status === 200) {
          setUser(res?.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err?.response?.status === 401) {
          setUser(null);
        }
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
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UseWrapper");
  }
  return context;
};
