import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/api";

export const UserContext = createContext<any>(null);

interface IUserContextProviderProps {
    children: React.ReactNode;
}

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    // loading state
    const [loading, setLoading] = useState(false);
    // Auth Persistence
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getUser();
                setCurrentUser(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const value = { currentUser, setCurrentUser, loading, setLoading };
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );

};

export function useUser () {
    return useContext(UserContext);
}
