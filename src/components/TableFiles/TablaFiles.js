import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";




const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #252A34 ;
`;

const Th = styled.th`
  background-color: #08D9D6;
  color: #252A34;
  padding: 8px;
 // border: 1px solid #252A34;
`;

const Td = styled.td`
  padding: 8px;
  //border: 1px solid #252A34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #EAEAEA;
  background-color: #252A34 ;
`;

const NestedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const NestedTd = styled.td`
  padding: 8px;
  //border: 1px solid #252A34;
  color: #EAEAEA;
`;

const NestedSubTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SubTableRow = styled.tr`
  color: #EAEAEA;
  cursor: pointer;
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

  const { measurementFile, setMeasurementFile } = useMyContext();

  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedSubRow, setExpandedSubRow] = useState(null);

  const [dataFiles, setDataFiles] = useState(["Dato 1", "Dato 2", "Dato 3"]);
  const [showDF, setShowDF] = useState(false);


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

  
  async function fetchData() {
    try {
      const consulta = { MSJREQUEST: "E"};
      const newMsj = await RequestMsj(consulta);
      setMsj(newMsj);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }
  useEffect(() => { fetchData();}, []); // Este useEffect se ejecuta solo cuando el componente se monta
  useEffect(() => {
    
  }, [msj]);


  useEffect(() => {
    
    //console.log("dataFiles.length:", dataFiles);

  }, [dataFiles]);



  const handleRowClick = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Si la fila ya está expandida, ciérrala
    } else {
      setExpandedRow(index); // De lo contrario, expande la fila haciendo clic en ella
    }
  };

  

 

  async function readDBfiles(archivo) {
   // console.log("file", archivo);
    try {
      const consulta = { MSJREQUEST: "F", DATO1: archivo };
      const result = await RequestMsj(consulta);

      //console.log("Esperando a que se resuelva la promesa...", result);
      //console.log("newMsj resuelto:", result);
      setDataFiles(result.data);
      setShowDF(true);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {
    //console.log("datafiles.lenght:",dataFiles)
  }, [dataFiles]);


  /*const contenidoDeEstado = dataFiles.map((elemento, index) => (
    <p key={index}>{elemento}</p>
  ));



*/


async function readDBIndividualfile(elemento , file) {
  const fileName = file.name + "_" + file.date + ".db";
  console.log("elemento.partnb",elemento.partnb , fileName)
  
  try {
    const consulta = { MSJREQUEST: "G", DATO1: elemento.partnb, DATO2: fileName};
    const result = await RequestMsj(consulta);

    console.log("Esperando a que se resuelva la promesa...", result);
    //console.log("newMsj resuelto:", result);
    setMeasurementFile(result.data)


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
        {nombresUnicos.map((nombre, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => setExpandedRow(index) & setShowDF(false)}>
              <Td>
                {nombre}
                <div style={{ margin: "5px" }}>
                  <NestedTable>
                    <tbody>
                      {expandedRow === index &&
                        fileList
                          .filter((file) => file.name === nombre)
                          .map((file, subIndex) => (
                            <SubTableRow
                              key={subIndex}
                              onClick={() =>
                                setExpandedSubRow(subIndex) &
                                readDBfiles(
                                  file.name + "_" + file.date + ".db"
                                )
                              }
                            >
                              <NestedTd>
                                {file.date}
                                {expandedSubRow === subIndex && (
                                  <div
                                    style={{
                                      margin: "5px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    <NestedSubTable>
                                      <tbody>
                                        {showDF &&
                                          dataFiles.map((elemento, index) => (
                                            <tr
                                              key={index}
                                              onClick={() =>
                                                readDBIndividualfile(
                                                  elemento,
                                                  file
                                                )
                                              }
                                            >
                                              <NestedTd>{elemento.date}</NestedTd>
                                              <NestedTd>{elemento.time}</NestedTd>
                                              <NestedTd>{elemento.partnb}</NestedTd>
                                              <NestedTd>{elemento.orden}</NestedTd>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </NestedSubTable>
                                  </div>
                                )}
                              </NestedTd>
                            </SubTableRow>
                          ))}
                    </tbody>
                  </NestedTable>
                </div>
              </Td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  </TableContainer>
  );
}

export default FileListTable;
