// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {

  const initialMeasurements = [
    { id: 1, value: 10 },
    { id: 2, value: 15 },
    { id: 3, value: 20 },
    // ... otros datos de mediciones
  ];


  const [data, setData] = useState("Datos iniciales");
  const [measurementFile, setMeasurementFile] = useState([]);
  const [measurementFiltered, setMeasurementFiltered] = useState([initialMeasurements]);
  const [dataFile, setDataFile] = useState([]);
  const [measurementSelected, setMeasurementSelected] = useState([]);

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        measurementFile,
        setMeasurementFile,
        dataFile,
        setDataFile,
        measurementSelected,
        setMeasurementSelected,
        measurementFiltered,
        setMeasurementFiltered
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
