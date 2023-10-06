import { MyContext } from './MyContext';
import React, { useEffect, useState, createContext,useContext  } from "react";

export const MyContextProvider = ({ children }) => {
  const [han, setHan] = useState('asdsad');

  const updateHan = (newHanValue) => {
    setHan(newHanValue);
  };

  const value = {
    han,
    updateHan, 
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};