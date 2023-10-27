import React, { useEffect, useState } from "react";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";
import styled from "styled-components";

const Container = styled.div`
  color: white;
  //overflow-x: auto;
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
  //background-color: black;
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
  //background-color: #252a34;
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
  height: 10px;
  white-space: nowrap;
  //overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.isSelected ? "#0088FF" : "#252A34")};
`;

//----------- combo box

const SelectContainer = styled.div`
  position: relative;
  width: 100%; 
  background-color: #252a34;
  color: #252a34;
  cursor: pointer;
  display: grid;
  justify-content: center;
  margin-top: 20px;
  margin-top: 10px;

  

`;

const Dropdown = styled.select`
  width: 100%;
  height: 30px;
  padding: 5px;
  border: none;
  outline: none;
  background-color: #08d9d6; //#252a34;
  background-color: #252a34;
  //border: 1px solid #08d9d6;
  color: #252a34;
  color:#dddddd;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s;

 &:hover {
    background-color: #08d9d6; /* Cambia el color de fondo en hover */
    color: #252a34;
    //color:#08d9d6;
    //border: 1px solid #08d9d6;
  }
`;

const Option = styled.option`
  /* Personaliza los estilos de las opciones según tus necesidades */
`;

const DataTableShift = () => {
  const [msj, setMsj] = useState([]);
  const [files, setFiles] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  const [selectedShift, setSelectedShift] = useState({});

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
        DATO3: "11", //day
        DATO4: selectedShift //hour Start And End
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

  useEffect(() => {
    fetchData();
  }, [selectedShift]); 

  useEffect(() => {}, [msj]);

  async function readDBIndividualMeasurementfile(partnb, file) {
    try {
      const consulta = {
        MSJREQUEST: "G",
        DATO1: partnb,
        DATO2: file
      };
      const result = await RequestMsj(consulta);
      console.log("Esperando a que se resuelva la promesa...", result);
      setMeasurementFile(result.data);
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

  async function ReadDBIndividualDataFile(partnb, file) {
    try {
      const consulta = {
        MSJREQUEST: "H",
        DATO1: partnb,
        DATO2: file
      };
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

  useEffect(() => {
    console.log("selectedRow:",selectedRow)
  });

  return (
    <Container>
      <Table>
        <ComboBox
          setSelectedShift={setSelectedShift}
          selectedShift={selectedShift}
        />
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
                            ) &
                            ReadDBIndividualDataFile(
                              dataFile.partnb,
                              file
                            )
                          }
                        >
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)} >{dataFile.orden}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)} >{dataFile.date}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)} >{dataFile.time}</DataCell>
                          <DataCell isSelected={selectedRow === index} onClick={() => handleRowClick(index)} >{dataFile.partnb}</DataCell>
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

const ComboBox = ({ selectedShift, setSelectedShift }) => {
  // <ComboBox setSelectedValue={setSelectedValue} selectedValue={selectedValue}/>

  //const [selectedValue, setSelectedValue] = useState(""); // Estado para el valor seleccionado





  const handleSelectChange = (event) => {
    setSelectedShift(separarHoras(event.target.value));
  };

  function separarHoras(cadena) {
    const HRSTART = cadena.slice(0, 5);
    const HREND = cadena.slice(-5);
    const VALUE = event.target.value;

    return { HRSTART, HREND, VALUE };
  }

  return (
    <SelectContainer>
      <Dropdown value={selectedShift.VALUE} onChange={handleSelectChange}>
        <Option value="00:00-06:18">M1 00:00 - 06:18</Option>
        <Option value="06:00-12:18">M2 06:00 - 12:18</Option>
        <Option value="12:00-18:18">M3 12:00 - 18:18</Option>
        <Option value="18:00-00:18">M4 18:00 - 00:18</Option>
        <Option value="add">Add new..</Option>
      </Dropdown>
    </SelectContainer>
  );
};

export default DataTableShift;
