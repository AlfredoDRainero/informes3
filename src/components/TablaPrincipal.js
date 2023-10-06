import {MyContext} from "../contexts/MyContext"
import React, { useEffect, useState, createContext,useContext  } from "react";  

function Tablaprincipal() {
  const { han, updateHan  } = useContext(MyContext);

  const handleChange = (event) => {
    updateHan(event.target.value);
  };

  const handleClick = () => {
    updateHan("Han");
    //alert(`Valor cargado en la caja de texto: ${han}`);
  };

  return (
    <div>
      <input type="text" value={han} onChange={handleChange} />
      <button onClick={handleClick}>Update Han</button>
    </div>
  );
}

export default Tablaprincipal;