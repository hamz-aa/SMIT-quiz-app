import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load user info from localStorage if available
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (storedIsLoggedIn) {
      setUser(storedUser);
      setIsLoggedIn(storedIsLoggedIn);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
