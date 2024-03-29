import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";

const TableContainer = styled.div`
 
  overflow-x: auto;
  padding: 15px;
  
`;

const Table = styled.table`
  //width: 100%;
  border-collapse: collapse;
  background-color: #252a34;
  overflow-y: auto;
  font-size: 12px;
width:auto;
  background-color: red;
`;

const Th = styled.th`
  background-color: #08d9d6;
  color: #252a34;
  //padding: 5px;
  font-size: 15px;
  height:30px;
`;

const Td = styled.td`
  //padding: 5px;
  padding-bottom: 5px;
  //border: 1px solid #252A34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #eaeaea;
  background-color: #252a34;
  transition: background-color 0.3s;

  &:hover {
    color: #08d9d6;
  }
`;

const NestedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const NestedTd = styled.td`
  
  padding-left: 20px;
  //border: 1px solid #252A34;
  color: #eaeaea;
  background-color: ${(props) => (props.isSelected ? "#0088FF" : "#252A34")};
  transition: background-color 0.3s;
  //width:20%;
  &:hover {
    color: #08d9d6;
  }
`;

const NestedSubTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SubTableRow = styled.tr`
  color: #eaeaea;
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
  const { setMeasurementFile } = useMyContext();
  const { setDataFile } = useMyContext();

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
      const consulta = { MSJREQUEST: "E" };
      const newMsj = await RequestMsj(consulta);
      setMsj(newMsj);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Este useEffect se ejecuta solo cuando el componente se monta
  useEffect(() => {}, [msj]);

  async function readDBfiles(archivo) {
    try {
      const consulta = { MSJREQUEST: "F", DATO1: archivo };
      const result = await RequestMsj(consulta);
      setDataFiles(result.data);
      setShowDF(true);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  async function readDBIndividualMeasurementfile(partnb, file) {
    const fileName = file.name + "_" + file.date + ".db";
    //console.log("elemento.partnb",elemento.partnb , fileName)
    try {
      const consulta = { MSJREQUEST: "G", DATO1: partnb, DATO2: fileName };
      const result = await RequestMsj(consulta);
      result.data.file =  file.name + "_" + file.date + ".db";
      //console.log("--------------------->",)
      console.log("Esperando a que se resuelva la promesa...", result);
      setMeasurementFile(result.data);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  async function ReadDBIndividualDataFile(partnb, file) {
    const fileName = file.name + "_" + file.date + ".db";
    //console.log("elemento.partnb",elemento.partnb , fileName)
    try {
      const consulta = { MSJREQUEST: "H", DATO1: partnb, DATO2: fileName };
      const result = await RequestMsj(consulta);
      result.data.file =  file.name + "_" + file.date + ".db";
      console.log("Esperando a que se resuelva la promesa...", result);
      setDataFile(result.data);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {}, [dataFiles]);

  //useEffect(() => {}, [dataFiles]);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Files</Th>
          </tr>
        </thead>
      </Table>
      <TableContainer>
        <Table>
          <tbody>
            {nombresUnicos.map((nombre, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => setExpandedRow(index) & setShowDF(false)}>
                  <Td>
                    {nombre}
                    <div style={{ margin: "1px" }}>
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
                                          //margin: "5px",
                                          fontSize: "12px"
                                        }}
                                      >
                                        <NestedSubTable>
                                          <tbody>
                                            {showDF &&
                                              dataFiles.map(
                                                (elemento, index) => (
                                                  <tr
                                                    key={index}
                                                    onClick={() =>
                                                      //console.log("elementos:",elemento,"file:",file) &
                                                      readDBIndividualMeasurementfile(
                                                        elemento.partnb,
                                                        file
                                                      ) &
                                                      ReadDBIndividualDataFile(
                                                        elemento.partnb,
                                                        file
                                                      )
                                                    }
                                                  >
                                                    <NestedTd
                                                      isSelected={
                                                        selectedRow === index
                                                      }
                                                      onClick={() =>
                                                        handleRowClick(index)
                                                      }
                                                    >
                                                      {elemento.date}
                                                    </NestedTd>
                                                    <NestedTd
                                                      isSelected={
                                                        selectedRow === index
                                                      }
                                                      onClick={() =>
                                                        handleRowClick(index)
                                                      }
                                                    >
                                                      {elemento.time}
                                                    </NestedTd>
                                                    <NestedTd
                                                      isSelected={
                                                        selectedRow === index
                                                      }
                                                      onClick={() =>
                                                        handleRowClick(index)
                                                      }
                                                    >
                                                      {elemento.partnb}
                                                    </NestedTd>
                                                    <NestedTd
                                                      isSelected={
                                                        selectedRow === index
                                                      }
                                                      onClick={() =>
                                                        handleRowClick(index)
                                                      }
                                                    >
                                                      {elemento.orden}
                                                    </NestedTd>
                                                  </tr>
                                                )
                                              )}
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
    </>
  );
}

export default FileListTable;
