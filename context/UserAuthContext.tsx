"use client";
import { createContext, useState } from "react";

export const UserAuthContext = createContext<any | null>(null);

const UserAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any | null>(null);

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
