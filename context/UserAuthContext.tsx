"use client";
import { User } from "firebase/auth";
import { createContext, useState } from "react";

interface UserAuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserAuthContext = createContext<UserAuthContextType>({
  user: null,
  setUser: () => {},
});

const UserAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
