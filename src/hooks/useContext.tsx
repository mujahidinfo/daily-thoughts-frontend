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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dt-token")}`,
          },
        });
        const data = await res.json();

        if (res?.status === 200) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
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
