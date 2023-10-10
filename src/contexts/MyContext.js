// MyContext.js
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {
  const [data, setData] = useState("Datos iniciales");
  const [measurementFile, setMeasurementFile] = useState([]);

  return (
    <MyContext.Provider value={{ data, setData, measurementFile, setMeasurementFile }}>
      {children}
    </MyContext.Provider>
  );
}
