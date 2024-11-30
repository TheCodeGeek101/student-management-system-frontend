import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types/user";

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
}

// Default values for the context
const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {}
};

// Create the context
export const UserContext = createContext<UserContextType>(defaultContextValue);

// Create the context provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
