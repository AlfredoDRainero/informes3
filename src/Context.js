import React, { createContext, useState } from 'react';

const MyContext = createContext();

const Context = ({ children }) => {
  const [variableEnB, setVariableEnB] = useState('X');

  const updateVariableEnB = (newValue) => {
    setVariableEnB(newValue);
  };

  return (
    <MyContext.Provider value={{ variableEnB , updateVariableEnB }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;