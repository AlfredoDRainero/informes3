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

import FileListTable from "./components/Tables/TablaFilesAll";
import DataTableDay from "./components/Tables/TablaFilesDay";
import DataTableShift from "./components/Tables/TablaFilesShift";

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
  width: 80px;
  background-color: #252a34;
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
  grid-template-columns: 65% 35%;
  align-items: end;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  //overflow-y: hidden;
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
  border-bottom: ${(props) => (props.isActive ? "none" : "1px solid #222831")};
  background-color: ${(props) => (props.isActive ? "#08d9d6" : "#7a7d85")};
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

  const [isActiveButton1, setIsActiveButton1] = useState(false);
  const [isActiveButton2, setIsActiveButton2] = useState(false);
  const [isActiveButton3, setIsActiveButton3] = useState(false);

  const handleButton1Click = () => {
    setIsActiveButton1(true);
    setIsActiveButton2(false);
    setIsActiveButton3(false);
  };
  const handleButton2Click = () => {
    setIsActiveButton1(false);
    setIsActiveButton2(true);
    setIsActiveButton3(false);
  };
  const handleButton3Click = () => {
    setIsActiveButton1(false);
    setIsActiveButton2(false);
    setIsActiveButton3(true);
  };

  return (
    <>
      <MyContextProvider>
        <MainDiv>
          <div style={{ display: "flex" }}>
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
                      handleButton3Click()
                    }
                  >
                    <a>Full DataBase</a>
                  </FileListMenuButton3>
                </FileListTopMenu>
              </TopContainer>

              <BottomContainer>
                <LeftBottomContainer>
                  <TablaPrincipal />
                </LeftBottomContainer>
                <RightBottomContainer>
                  <FileListBottom>
                    {tableFull && <FileListTable />}
                    {tableDay && <DataTableDay />}
                    {tableShift && <DataTableShift />}
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
