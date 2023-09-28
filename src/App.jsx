import React, { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";

//components
import BurgerButton from "./components/BurgerButton";
import Tabla_Indice from "./components/TablaIndice";

//functions
import MSJ_FROMFRONT_sendAdressUnformatedReports from "./SendAndReceiveData";

//import MSJ_FROMBACK_IndiceDB from "./SendAndReceiveData";
//import MSJ_FROMBACK_filesDB_Data_Carpet from "./SendAndReceiveData";

import FileListTable from "./components/TablaFiles";

import { RequestMsj } from "./SendAndReceiveData";




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
  background-color: #001529;
  color: #fff;
`;

const Header = styled.div`
  background-color: #fff;
  width: 100%;
`;

const Content = styled.div`
  background-color: #f0f2f5;
`;

const MenuIcon = styled.div`
  font-size: 24px;
`;

const ContentHeader = styled.h1`
  font-size: 20px;
`;

const GridContainer = styled.div`
  /* Estilos para el contenedor con CSS Grid */
  display: grid;
  grid-template-rows: auto 1fr; /* Una fila automática arriba, y una fila fr (proporcional) abajo */
  height: 100%; /* Establece la altura del contenedor al 100% del viewport */
  width: 100%;

`;

const TopContainer = styled.div`
  /* Estilos para el contenedor superior */
  background-color: #f0f2f5;
 
`;

const BottomContainer = styled.div`
  /* Estilos para el contenedor inferior */
  display: grid;
  grid-template-columns: 3fr auto; /* Dos columnas de igual tamaño */
  height: calc(75vh);
`;

const LeftBottomContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;

const RightBottomContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

function App() {
  const [tablaIndice, setTablaIndice] = useState({ rows: [] });
  //const [fileList, setFileList] = useState(null);

 

/*  
  useEffect(() => {
    async function obtenerMensaje() {
      try {
        const mensaje = await window.electronAPI.recibirMensaje();
        console.log("Mensaje 1recibido en app.jsx:", mensaje);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }

    async function obtenerMensajeIndiceDB() {
      try {
        const msj = await window.electronAPI.recibirMensajeIndiceDB(); //desde preload.js
        setTablaIndice(msj);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    }
    obtenerMensajeIndiceDB();
  }, []);

  useEffect(() => {

  }, [tablaIndice]);
*/


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

/*useEffect(() => {
  
  console.log("msj3:", msj3);
}, [msj3]);*/

//----------------------------------


   //---------------------------------------- enviar y recibir
 
 
   useEffect(() => {
    
     const pregunta =  { MSJREQUEST:"A" ,DATO1: "12345", DATO2: "6789" } ;
     RequestMsj(pregunta)
   }, []);

    
   //------------------------------------------------------------------------------

  return (
    <>
      <MainDiv>
        <div style={{ display: "flex" }}>
          <Sider>
            {/* Menú */}
            <MenuIcon>☰</MenuIcon>
            <MenuIcon onClick={() => FileDataDb() }>◉</MenuIcon>
            <MenuIcon>📂</MenuIcon>
          </Sider>
          <GridContainer>
            <Header>
              {/* Barra superior */}
              <BurgerButton />
              <ContentHeader>Barra superior</ContentHeader>
            </Header>
            <TopContainer>
              {/* Contenedor superior */}
              <div>Contenido de la página</div>
            </TopContainer>
            <BottomContainer>
              {/* Contenedor inferior */}
              <LeftBottomContainer>
                <Tabla_Indice data={tablaIndice} />{" "}
                {/*problema por la falta de key aca*/}
              </LeftBottomContainer>
              <RightBottomContainer>
                <FileListTable />
              </RightBottomContainer>
            </BottomContainer>
          </GridContainer>
        </div>
      </MainDiv>
    </>
  );
}

export default App;

/*<h1>Data from SQLite Database</h1>
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
          <Table data={convertLastFiveColumns(splitText(fileContent))} />*/
