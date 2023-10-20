import React, { useEffect, useState, createContext, useContext } from "react";
import "./index.css";
import styled, { keyframes } from "styled-components";

//components
import BurgerButton from "./components/BurgerButton";

import { RequestMsj } from "./SendAndReceiveData";
import { MyContextProvider } from "./contexts/MyContext";

import MyComponent from "./components/MyComponentTest";
import TablaPrincipal from "./components/Tables/TablaMeasurement";
import TablaDatos from "./components/Tables/TablaDatos";

import FileListTable from "./components/Tables/TablaFiles";
import DataTableDay from "./components/Tables/TablaFilesDay";


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
  background-color: #252a34;
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
  background-color: #252a34;
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
  background-color: #252a34;
`;

const RightBottomContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  background-color: #252a34;
 
  display: flex;
  flex-direction: column;
  flex: 1;

`;

const FileListTopMenu = styled.div`
  width: 100%;
  background-color: #7a7d85;
  display: flex;
  flex-direction: row;
  height: 30px; /* Altura de B */
  min-height: 30px;
  text-align: center;  
`;

const FileListHijo = styled.div`
  width: 100%;
  border: 1px solid #000;
  text-align: center;
  box-sizing: border-box;
`;

const FileListBottom = styled.div`
   flex: 1; /* C ocupa el espacio restante */
  //border: 1px solid #000;
  //text-align: center;
  box-sizing: border-box;
`;

const FileListMenuButton1 = styled.div`
width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
`;

const FileListMenuButton2 = styled.div`
 width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
`;

const FileListMenuButton3 = styled.div`
  width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */

  
`;

function App() {
  const [tableDay, setTableDay] = useState(false);
  const [tableShift, setTableShift] = useState(false);
  const [tableFull, setTableFull] = useState(true);

  async function FileDataDb() {
    try {
      const consulta3 = { MSJREQUEST: "B" };
      await RequestMsj(consulta3);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  async function Prueba() {
    try {
      const consulta4 = { MSJREQUEST: "I" };
      await RequestMsj(consulta4);
      
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {
    const pregunta = { MSJREQUEST: "A", DATO1: "test1", DATO2: "test2" };
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
            <GridContainer>
              <TopContainer>
                {/* Contenedor superior */}
                <TablaDatos />
              </TopContainer>
              <BottomContainer>
                {/* Contenedor inferior */}
                <LeftBottomContainer>
                  <TablaPrincipal />
                </LeftBottomContainer>
                <RightBottomContainer>
                  
                  <FileListTopMenu>
                    <FileListMenuButton1 onClick={() => setTableShift(true) & setTableDay(false) & setTableFull(false)}>
                      <a>Shift</a>
                    </FileListMenuButton1>
                    <FileListMenuButton2 onClick={() => setTableShift(false) & setTableDay(true) & setTableFull(false) & Prueba()}>
                      <a>Day</a>
                    </FileListMenuButton2>
                    <FileListMenuButton3 onClick={() => setTableShift(false) & setTableDay(false) & setTableFull(true)}>
                      <a>Full DataBase</a>
                    </FileListMenuButton3>
                  </FileListTopMenu>
                  <FileListBottom>
                    
                    {tableFull && (<FileListTable />)}
                    {tableDay && (<DataTableDay />)}
                  </FileListBottom>
                 
                </RightBottomContainer>
              </BottomContainer>
            </GridContainer>
            <Sider>
              <MyComponent />
              {/* Menú */}
              <MenuIcon>☰</MenuIcon>
              <MenuIcon onClick={() => FileDataDb()}>SaveToDB</MenuIcon>
              <MenuIcon>📂</MenuIcon>
              <BurgerButton />
            </Sider>
          </div>
        </MainDiv>
      </MyContextProvider>
    </>
  );
}

export default App;
