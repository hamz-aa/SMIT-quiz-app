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
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (storedIsLoggedIn) {
      setUser(JSON.parse(storedUser)); // Parse stored user JSON string
      setIsLoggedIn(storedIsLoggedIn);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  const updateUserContext = (userData, isAdminFlag) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(isAdminFlag);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdminFlag.toString());
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        updateUserContext, // Provide the updateUserContext function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
