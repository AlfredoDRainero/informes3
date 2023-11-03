import React, { useEffect, useState, createContext, useContext } from "react";
import "./index.css";
import styled, { keyframes } from "styled-components";

//components
import BurgerButton from "./components/BurgerButton";

import { RequestMsj } from "./SendAndReceiveData";
import { MyContextProvider } from "./contexts/MyContext";

import MyComponent from "./components/MyComponentTest";
import TablaMeasurement from "./components/Tables/TablaMeasurement";
import TablaDatos from "./components/Tables/TablaDatos";


import FileListTable from "./components/Tables/TablaFilesAll";
import DataTableDay from "./components/Tables/TablaFilesDay";
import DataTableShift from "./components/Tables/TablaFilesShift";
import DataTableTools from "./components/Tables/TablaFilesTools";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Estilo del contenedor de la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 10px; /* Ancho de la barra de desplazamiento */
    
  }

  /* Estilo del pulgar de la barra de desplazamiento */
  ::-webkit-scrollbar-thumb {
    background-color: gray; /* Cambia el color de la barra de desplazamiento */
   // border-radius: 2px; /* Bordes redondeados del pulgar */
  }

  /* Estilo de la barra de desplazamiento en hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color:  #08d9d6; /* Cambia el color en hover */
    border: 1px solid #08d9d6;
   
  }
`;

const MainDiv = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: #d1d1d1;
  display: grid;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  cursor: default;
`;

const Sider = styled.div`
  width: 40px;
  background-color: #252a34;
  background-color: black;
  color: #fff;
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
  padding-top: 10px;
  margin: 1px;
  font-size: 10px;
  font-family: "Ubuntu", sans-serif;
  cursor: pointer;
  transition: 0.3s ease;
  background-color: black;
  color: white;
  height: 20px;
 


  
  &:hover {
    animation: ${fadeIn} 0.3s ease;
    animation-fill-mode: forwards;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const TopContainer = styled.div`
  flex-grow: 0.1;
  background-color: #252a34;
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: end;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
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

const BottomRightTopContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  background-color: #252a34;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  //overflow-y: hidden;
`;

const BottomRightBottomContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  background-color: #252a34;
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  flex: 1;
  border-width: 1px;
  border-style: solid;
  //border:none;
  //border-top: #dddddd;
  border-top-color: #dddddd;
  border-top-width: 1px;
  border-top-style: solid;
  border-left: none;
  border-right: none;
  border-bottom: none;
  color: #dddddd;
`;

const RightBottomContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 70% 30%;
  flex-grow: 1;
  overflow-y: auto;
`;

const FileListTopMenu = styled.div`
  width: 100%;
  background-color: #7a7d85;
  display: flex;
  flex-direction: row;
  height: 30px;
  min-height: 30px;
  text-align: center;
  overflow-y: hidden;
  justify-content: flex-end;
`;

const FileListBottom = styled.div`
  flex: 1;
  box-sizing: border-box;
`;

const FileListMenuButton1 = styled.div`
  width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  background-color: #08d9d6;

  &:hover {
    background-color: #08d9d6; /* Cambia el color de fondo en hover */
    color: #252a34;
  }
  border-left: none;
  border-bottom: ${(props) => (props.isActive ? "none" : "1px solid #222831")};
  background-color: ${(props) => (props.isActive ? "#08d9d6" : "#7a7d85")};
`;

const FileListMenuButton2 = styled.div`
  width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  transition: background-color 0.3s;

  &:hover {
    background-color: #08d9d6; /* Cambia el color de fondo en hover */
    color: #252a34;
  }
  border-left: none;
  border-bottom: ${(props) => (props.isActive ? "none" : "1px solid #222831")};
  background-color: ${(props) => (props.isActive ? "#08d9d6" : "#7a7d85")};
`;

const FileListMenuButton3 = styled.div`
  width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  transition: background-color 0.3s;

  &:hover {
    background-color: #08d9d6; /* Cambia el color de fondo en hover */
    color: #252a34;
  }
  border-left: none;
  border-bottom: ${(props) => (props.isActive ? "none" : "1px solid #222831")};
  background-color: ${(props) => (props.isActive ? "#08d9d6" : "#7a7d85")};
`;

const FileListMenuButton4 = styled.div`
  width: 100%;
  background-color: #7a7d85;
  border: 1px solid #222831;
  display: flex; /* Utiliza flexbox */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  transition: background-color 0.3s;

  &:hover {
    background-color: #08d9d6; /* Cambia el color de fondo en hover */
    color: #252a34;
  }
  border-left: none;
  border-bottom: ${(props) => (props.isActive ? "none" : "1px solid #222831")};
  background-color: ${(props) => (props.isActive ? "#08d9d6" : "#7a7d85")};
`;

function App() {
  const [tableDay, setTableDay] = useState(false);
  const [tableShift, setTableShift] = useState(false);
  const [tableFull, setTableFull] = useState(true);
  const [tools, setTools] = useState(false);
  

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

  const [isActiveButton1, setIsActiveButton1] = useState(false);
  const [isActiveButton2, setIsActiveButton2] = useState(false);
  const [isActiveButton3, setIsActiveButton3] = useState(false);
  const [isActiveButton4, setIsActiveButton4] = useState(false);

  const handleButton1Click = () => {
    setIsActiveButton1(true);
    setIsActiveButton2(false);
    setIsActiveButton3(false);
    setIsActiveButton4(false);
  };
  const handleButton2Click = () => {
    setIsActiveButton1(false);
    setIsActiveButton2(true);
    setIsActiveButton3(false);
    setIsActiveButton4(false);
  };
  const handleButton3Click = () => {
    setIsActiveButton1(false);
    setIsActiveButton2(false);
    setIsActiveButton3(true);
    setIsActiveButton4(false);
  };
  const handleButton4Click = () => {
    setIsActiveButton1(false);
    setIsActiveButton2(false);
    setIsActiveButton3(false);
    setIsActiveButton4(true);
  };

  return (
    <>
      <GlobalStyle />
      <MyContextProvider>
        <MainDiv>
          <div style={{ display: "flex" }}>
            <Sider>
              <BurgerButton onClick={() => FileDataDb()}/>
                  
             
              <MenuIcon onClick={() => FileDataDb()}>Save</MenuIcon>
             {/* <MenuIcon>📂</MenuIcon>
              <MenuIcon>Imp</MenuIcon>*/}
            </Sider>
            <GridContainer>
              <TopContainer>
                <TablaDatos />
                <FileListTopMenu>
                  <FileListMenuButton1
                    isActive={isActiveButton1}
                    onClick={() =>
                      setTableShift(true) &
                      setTableDay(false) &
                      setTableFull(false) &
                      setTools(false) &
                      handleButton1Click()
                    }
                  >
                    <a>Shift</a>
                  </FileListMenuButton1>
                  <FileListMenuButton2
                    isActive={isActiveButton2}
                    onClick={() =>
                      setTableShift(false) &
                      setTableDay(true) &
                      setTableFull(false) &
                      setTools(false) &
                      Prueba() &
                      handleButton2Click()
                    }
                  >
                    <a>Day</a>
                  </FileListMenuButton2>
                  <FileListMenuButton3
                    isActive={isActiveButton3}
                    onClick={() =>
                      setTableShift(false) &
                      setTableDay(false) &
                      setTableFull(true) &
                      setTools(false) &
                      handleButton3Click()
                    }
                  >
                    <a>Full DataBase</a>
                  </FileListMenuButton3>
                  <FileListMenuButton4
                    isActive={isActiveButton4}
                    onClick={() =>
                      setTableShift(false) &
                      setTableDay(false) &
                      setTableFull(false) &
                      setTools(true) &
                      handleButton4Click()
                    }
                  >
                    <a>Tools</a>
                  </FileListMenuButton4>
                </FileListTopMenu>
              </TopContainer>

              <BottomContainer>
                <LeftBottomContainer>
                  <TablaMeasurement />
                </LeftBottomContainer>
                <RightBottomContainer>
                  <BottomRightTopContainer>
                    {tableFull && <FileListTable />}
                    {tableDay && <DataTableDay />}
                    {tableShift && <DataTableShift />}
                    {tools && <DataTableTools />}
                  </BottomRightTopContainer>
                  <BottomRightBottomContainer>
                    Graficos
                  </BottomRightBottomContainer>
                </RightBottomContainer>
              </BottomContainer>
            </GridContainer>
          </div>
        </MainDiv>
      </MyContextProvider>
    </>
  );
}

export default App;
