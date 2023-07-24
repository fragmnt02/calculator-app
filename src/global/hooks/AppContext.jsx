import React, { createContext, useState, useContext } from "react";

// Create a context instance
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Create a provider component to wrap the entire application
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === true.toString()
  );

  const updateIsLoggedIn = (value) => {
    localStorage.setItem("isLoggedIn", value.toString());
    setIsLoggedIn(value);
  };

  // Define the values that will be available to all the components wrapped by the AppProvider
  const values = {
    updateIsLoggedIn,
    isLoggedIn,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
