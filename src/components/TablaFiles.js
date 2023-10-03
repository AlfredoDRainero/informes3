import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { RequestMsj } from "../SendAndReceiveData";

const TableContainer = styled.div`
  width: 100%; // Ajusta el ancho de la tabla según tus necesidades
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  text-align: left;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
  max-width: 20vw; /* Establece el ancho máximo */
  white-space: nowrap; /* Evita el salto de línea */
  overflow: hidden; /* Oculta el exceso de texto */
  text-overflow: ellipsis; /* Muestra los tres puntos */
`;


function SubStringDateAndFilename(texto) {
  const indicePunto = texto.lastIndexOf(".");
  const indiceGuionBajo = texto.lastIndexOf("_", indicePunto) - 5;
  if (indiceGuionBajo !== -1 && indicePunto !== -1) {
    const subcadenaDate = texto.slice(indiceGuionBajo + 1, indicePunto); // Extraemos la subcadena entre el primer "." y el segundo "_"
    const subcadenaName = texto.slice(0, indiceGuionBajo); // Extraemos la subcadena desde el inicio hasta el indiceGuionBajo
    return {
      date: subcadenaDate,
      name: subcadenaName
    };
  } else {
    return "No se encontraron las marcas requeridas.";
  }
}




function FileListTable() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedSubRow, setExpandedSubRow] = useState(null);


//----------------------------------------------------CARGA LISTA FILES------------------------------------------
  const [msj, setMsj] = useState([]);
  const fileList = [];
  for (const nombreArchivo in msj) {
    const elemento = msj[nombreArchivo].nombre;
    fileList.push(SubStringDateAndFilename(elemento));
  }

  // Utilizamos un conjunto (Set) para almacenar los nombres únicos
  /* El Set es una estructura de datos en JavaScript que solo puede contener valores únicos. 
  Cuando convertimos el arreglo de nombres en un conjunto usando new Set(), 
  automáticamente elimina cualquier duplicado.*/

  const nombresUnicos = [...new Set(fileList.map((file) => file.name))];

  //const pregunta =  { MSJREQUEST:"A" ,DATO1: "1234", DATO2: "6789" } ;

  async function fetchData() {
    try {
      const consulta = { MSJREQUEST: "E", DATO1: "1234" };
      const newMsj = await RequestMsj(consulta);
      setMsj(newMsj);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Este useEffect se ejecuta solo cuando el componente se monta

  useEffect(() => {
    // Este useEffect se ejecuta cuando msj2 cambia
    //console.log("msj:", msj);
  }, [msj]);

//---------------------------------------------------CARGA LISTA FILES END ---------------------------------------------------




//-------------------------------------------------- CARGA LISTA DB ARCHIVO ---------------------------------------



//--------------------------------------------------------------------------------------------------------


  const handleRowClick = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Si la fila ya está expandida, ciérrala
    } else {
      setExpandedRow(index); // De lo contrario, expande la fila haciendo clic en ella
    }
  };

  /*const  = (archivo) => {
    console.log("file", archivo);
  };*/

  async function readDBfile(archivo) {
    console.log("file", archivo);
    try {
      const consulta = { MSJREQUEST: "F", DATO1: archivo };
      const newMsj = await RequestMsj(consulta);
      
      console.log("Esperando a que se resuelva la promesa...",newMsj);       
      console.log("newMsj resuelto:", newMsj);
      // setMsj(newMsj);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Nombre de Archivo</Th>
          </tr>
        </thead>
        <tbody>
          {/*-----------------------------------------------------------------------------------------file name----------------------------*/}
          {nombresUnicos.map((nombre, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => setExpandedRow(index)}>
                <Td>
                  {nombre}
                  <div style={{ margin: "5px" }}>
                    {/*---------------------------------------------file date----------------------------*/}
                    <Table>
                      <tbody>
                        {expandedRow === index &&
                          fileList
                            .filter((file) => file.name === nombre)
                            .map((file, subIndex) => (
                              <tr
                                key={subIndex}
                                onClick={
                                  () =>
                                    setExpandedSubRow(subIndex) &
                                    readDBfile(file.name + "_" + file.date + ".db") 
                                  //console.log("click en", file.date)
                                }
                              >
                                <td>
                                  {file.date}
                                  {expandedSubRow === subIndex && (
                                    <div
                                      style={{
                                        margin: "5px",
                                        fontSize: "12px"
                                      }}
                                    >
                                      {/*--------------------Reports----------------------------*/}
                                      <Table>
                                        <tbody>
                                          <tr>
                                            <td>5 lib m2 ra 3971</td>
                                            <td>7:51</td>
                                            <td>dia 1</td>
                                          </tr>
                                          <tr>
                                            <td>5 lib m2 ra 3971</td>
                                            <td>7:51</td>
                                            <td>dia 1</td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                  {/*----------------------------------------------------------------------------------------------------*/}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </Table>
                  </div>
                  {/*------------------------------------------------------------------------------------------------------*/}
                </Td>
              </tr>
            </React.Fragment>
          ))}
          {/*---------------------------------------------------------------------------------------------------------------------------*/}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default FileListTable;
