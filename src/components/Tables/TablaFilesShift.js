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
  background-color: black;
  width: 100%;
`;
const FileNameCell = styled.p`
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-justify: center;
  background-color: Black;
  font-size: 12px;
  height: 40px;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DataRow = styled.tr`
  background-color: #252a34;
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
  height: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


//----------- combo box

const SelectContainer = styled.div`
  position: relative;
  //display: inline-block;
  width: 100%; /* Personaliza el ancho según tus necesidades */
  border: 1px solid #252a34;
  
  background-color: #252a34;
  background-color: #08d9d6;//#252a34;
  border: 1px solid #08d9d6;
  color: #252a34;
  cursor: pointer;
`;

const Dropdown = styled.select`
  width: 50%;
  height: 100%;
  padding: 5px;

  
  border: none;
  outline: none;
 // background-color: transparent;
  background-color: #08d9d6;//#252a34;
  border: 1px solid #08d9d6;
  color:#252a34;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;

const Option = styled.option`
  /* Personaliza los estilos de las opciones según tus necesidades */
`;


const DataTableShift = () => {
  const [msj, setMsj] = useState([]);
  const [files, setFiles] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  const { setMeasurementFile } = useMyContext();
  const { setDataFile } = useMyContext();

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
        DATO3: "11" //day
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

  return (
    <Container>
      <Table>
      <ComboBox/>
        <thead>
          <tr>
            <Th>Shift's Reports</Th>
          </tr>
        </thead>
        
        <tbody>
          {files.map((file, index) => (
            <DataRowMain key={index}>
              <DataCell>
                <FileNameCell>
                  <p>{file}</p>
                </FileNameCell>
                <DataRow>
                  <HeaderCell>Orden</HeaderCell>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Time</HeaderCell>
                  <HeaderCell>Partnb</HeaderCell>
                </DataRow>
                {dataFiles.map((dataFile, i) => {
                  if (dataFile.file === file) {
                    return (
                      <>
                        <DataRow
                          key={i}
                          onClick={() =>
                            readDBIndividualMeasurementfile(
                              dataFile.partnb,
                              file
                            ) & ReadDBIndividualDataFile(dataFile.partnb, file)
                          }
                        >
                          <DataCell>{dataFile.orden}</DataCell>
                          <DataCell>{dataFile.date}</DataCell>
                          <DataCell>{dataFile.time}</DataCell>
                          <DataCell>{dataFile.partnb}</DataCell>
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


const ComboBox = () => {
  const [selectedValue, setSelectedValue] = useState(''); // Estado para el valor seleccionado

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <SelectContainer>
      <Dropdown value={selectedValue} onChange={handleSelectChange}>
        <Option value="M1">M1 00:00 - 06:18</Option>
        <Option value="M2">M2 06:00 - 12:18</Option>
        <Option value="M3">M3 12:00 - 18:18</Option>
        <Option value="M4">M4 18:00 - 00:18</Option>
        <Option value="add">Add new..</Option>
      </Dropdown>
    </SelectContainer>
  );
};




export default DataTableShift;


