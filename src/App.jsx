import React, { useEffect, useState, createContext,useContext  } from "react";
import "./index.css";
import styled, { keyframes } from "styled-components";

//components
import BurgerButton from "./components/BurgerButton";
import Tabla_Indice from "./components/TablaIndice";
import FileListTable from "./components/TableFiles/TablaFiles";


import { RequestMsj } from "./SendAndReceiveData";

import { MyContextProvider } from './contexts/MyContext';
import MyComponent from './components/MyComponentTest';
import TablaPrincipal from "./components/TablaPrincipal";
import TablaDatos from "./components/TablaDatos";


const MainDiv = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  //line-height: 1.5;
  //font-weight: 400;
  //font-synthesis: none;
  //text-rendering: optimizeLegibility;
  background-color: #d1d1d1;
  display: grid;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Sider = styled.div`
  width: 80px;
  background-color: #252A34 ; 
  color: #fff;
`;

const Header = styled.div`

  background-color: red;
  width: 100%;
   height: 5%;
  //height:5vh;
`;

const Content = styled.div`
  background-color: #f0f2f5;
`;

const fadeIn = keyframes`
  from {
    background-color: black;
    color: white;
  }
  to {
    background-color: white;
    color: black;
  }
`;

const MenuIcon = styled.div`
  padding: 5px 5px;
  margin: 2px;
  //border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  font-size: 12px;
  font-family: "Ubuntu", sans-serif;
  cursor: pointer;
  transition: 0.3s ease;
  background-color: black;
  color: white;

  &:hover {
    animation: ${fadeIn} 0.3s ease;
    animation-fill-mode: forwards;
  }
`;

const ContentHeader = styled.h1`
  font-size: 20px;
`;

const GridContainer = styled.div`
  /* Estilos para el contenedor con CSS Grid */
  display: flex;
  flex-direction: column;
  height: 100vh; /* 100% del viewport height */
  width: 100%;
`;

const TopContainer = styled.div`

  /* Estilos para el contenedor superior */
  //background-color: #f0f2f5;
  flex-grow: 0.1;
  background-color: #252A34 ; 
`;

const BottomContainer = styled.div`
 
  /* Estilos para el contenedor inferior */
  display: grid;
  grid-template-columns: 65% 35%; /* Dos columnas de igual tamaño */
  flex-grow: 1;
  overflow-y: auto; 
`;

const LeftBottomContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #252A34 ; 
`;

const RightBottomContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #252A34 ; 
`;




function App() {
 
  
  const [tablaIndice, setTablaIndice] = useState({ rows: [] });

  //const [fileList, setFileList] = useState(null);

  //-----------------------------------------------------
  //const [msj3, setMsj3] = useState([]);
  /*const fileList = [];
  for (const nombreArchivo in msj) {
    const elemento = msj[nombreArchivo].nombre;
    fileList.push(SubStringDateAndFilename(elemento));
  }

  const nombresUnicos = [...new Set(fileList.map((file) => file.name))];*/

  async function FileDataDb() {
    try {
      const consulta3 = { MSJREQUEST: "B" };
      await RequestMsj(consulta3);
      //setMsj3(newMsj3);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  //---------------------------------------- enviar y recibir

  useEffect(() => {
    const pregunta = { MSJREQUEST: "A", DATO1: "12345", DATO2: "6789" };
    RequestMsj(pregunta);
  }, []);

  const updateVariableEnB = (newValue) => {
    setVariableEnB(newValue);
  };



  return (
    <>
     <MyContextProvider>
    
 
        
        <MainDiv>
       
          <div style={{ display: "flex" }}>
            <Sider>
           
            <MyComponent />
              {/* Menú */}
              <MenuIcon>☰</MenuIcon>
              <MenuIcon onClick={() => FileDataDb()}>SaveToDB</MenuIcon>
              <MenuIcon>📂</MenuIcon>
              <BurgerButton />
            </Sider>
            <GridContainer>
             
              <TopContainer>
                {/* Contenedor superior */}
                              <TablaDatos/>
              </TopContainer>
              <BottomContainer>
                {/* Contenedor inferior */}
                <LeftBottomContainer>
                <TablaPrincipal/>
                  {/*<Tabla_Indice data={tablaIndice} />{" "}
                  problema por la falta de key aca*/}
                </LeftBottomContainer>
                <RightBottomContainer>
                  <FileListTable />
                </RightBottomContainer>
              </BottomContainer>
            </GridContainer>
          </div>
        </MainDiv>
        </MyContextProvider>
        </>
      
  );
}

export default App  ;
