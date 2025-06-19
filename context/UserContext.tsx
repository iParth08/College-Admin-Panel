"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserData {
  id: string;
  email: string;
  name: string;
  username: string;
  profilePic: string;
  bio: string;
  isAdmin?: boolean;
}

interface UserContextType {
  user: UserData | null;
  setUserData: (user: UserData | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const setUserData = (user: UserData | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  const logout = () => {
    setUserData(null);
  };

  const value = {
    user,
    setUserData,
    isLoggedIn: !!user,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
