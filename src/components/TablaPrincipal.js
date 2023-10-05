import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import MyContext from '../Context';

function TablaPrincipal() {
 // const [tablaIndice, setTablaIndice] = useState([]);

  const { variableEnB } = useContext(MyContext);

  //useEffect(() => {}, []);

  return (
    <>
      <p>Valor en C: {variableEnB}</p>
    </>
  );
}

export default TablaPrincipal;
