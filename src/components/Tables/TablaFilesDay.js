import React, { useEffect, useState } from "react";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";
import styled from "styled-components";

const Container = styled.div`
  color: white;
  overflow-x: auto;
  //overflow-y: auto;
  //height:calc(100% - 4  0px);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #252a34;
`;

const HeaderCell = styled.th`
  font-size: 12px;
  //background-color: rgb(51,61,74,0.5);
  width: 100%;
`;
const FileNameCell = styled.p`
  grid-template-columns: 20px 1fr;
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-justify: center;
  background-color: rgb(51,61,74,0.5);
  font-size: 12px;
  height: 20px;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(210,210,210,1);

`;
const DataRow = styled.tr`
  background-color: #252a34;
  font-size: 12px;
  transition: background-color 0.3s;

&:hover { 
   color: #08d9d6;
 }
`;

const Th = styled.th`
  background-color: #08d9d6;
  color: #252a34;
  padding: 5px;
`;

const DataRowMain = styled.tr`
  background-color: #252a34;
  //overflow: hidden;
`;

const DataCell = styled.td`
  padding-left: 10px;
  padding-right: 10px;
  // border: 1px solid white;
  width: 30%;
  //height: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.isSelected ? "#0088FF" : "#252A34")};
`;

const DataTableDay = () => {
  const [msj, setMsj] = useState([]);
  const [files, setFiles] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  const { setMeasurementFile } = useMyContext();
  const { setDataFile } = useMyContext();

  const [selectedShift, setSelectedShift] = useState({HRSTART:'00:00:00',HREND:'23:59:59'});



  async function fetchData() {
    try {
      const fechaActual = new Date(); // Obtiene la fecha y hora actual

      const year = fechaActual.getFullYear(); // Obtiene el año actual
      const month = fechaActual.getMonth() + 1; // El mes es 0-indexado, por lo que le sumamos 1
      const day = fechaActual.getDate(); // Obtiene el día del mes

      const consulta = {
        MSJREQUEST: "I",
        DATO1: "2023", //year,
        DATO2: "9", //month,
        DATO3: "11", //day
        DATO4: selectedShift
      };
      const newMsj = await RequestMsj(consulta);
      setMsj(newMsj);

      const dataFilesArray = [];
      for (const key in newMsj) {
        if (newMsj.hasOwnProperty(key)) {
          const data = newMsj[key].data;
          data.forEach((element) => {
            dataFilesArray.push(element);
          });
        }
      }
      setDataFiles(dataFilesArray);

      const dbFileStrings = [];
      for (const key in newMsj) {
        if (newMsj.hasOwnProperty(key)) {
          const dbFileString = newMsj[key].file;
          dbFileStrings.push(dbFileString);
        }
      }
      setFiles(dbFileStrings);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Este useEffect se ejecuta solo cuando el componente se monta
  useEffect(() => {}, [msj]);


  async function readDBIndividualMeasurementfile(partnb, file) {
    try {
      const consulta = { MSJREQUEST: "G", DATO1: partnb, DATO2: file };
      const result = await RequestMsj(consulta);
      console.log("Esperando a que se resuelva la promesa...", result);
      setMeasurementFile(result.data);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  async function ReadDBIndividualDataFile(partnb, file) {
    try {
      const consulta = { MSJREQUEST: "H", DATO1: partnb, DATO2: file };
      const result = await RequestMsj(consulta);
      console.log("Esperando a que se resuelva la promesa...", result);
      setDataFile(result.data);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      
    } else {
      setSelectedRow(index);
      
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Day's Reports</Th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <DataRowMain key={index}>
              <DataCell>
                <FileNameCell>
                  <p style={{color:"#08d9d6"}}>■</p><p>{file}</p>
                </FileNameCell>
                <tr>
                  <HeaderCell>Orden</HeaderCell>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Time</HeaderCell>
                  <HeaderCell>Partnb</HeaderCell>
                </tr>
                {dataFiles.map((dataFile, index) => {
                  if (dataFile.file === file) {
                    return (
                      <>
                        <DataRow
                          key={index}
                          onClick={() =>
                            readDBIndividualMeasurementfile(
                              dataFile.partnb,
                              file
                            ) & ReadDBIndividualDataFile(dataFile.partnb, file)
                          }
                        >
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)}>{dataFile.orden}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)}>{dataFile.date}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)}>{dataFile.time}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)}>{dataFile.partnb}</DataCell>
                        </DataRow>
                      </>
                    );
                  }
                  return null;
                })}
              </DataCell>
            </DataRowMain>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTableDay;
