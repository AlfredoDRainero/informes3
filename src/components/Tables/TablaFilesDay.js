import React, { useEffect, useState } from "react";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";
import styled from 'styled-components';


const Container = styled.div`
  color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const HeaderRow = styled.tr`
  background-color: #333;
`;

const HeaderCell = styled.th`
  padding: 10px;
`;

const DataRow = styled.tr`
  background-color: #444;
`;

const DataCell = styled.td`
  padding: 10px;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-left: 20px;
`;

const DataTableDay = (  ) => {
 
  const [msj, setMsj] = useState([]);
  const [files, setFiles] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);
    
  async function fetchData() {
    try {
      const consulta = { MSJREQUEST: "I"};
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

  useEffect(() => { fetchData();}, []); // Este useEffect se ejecuta solo cuando el componente se monta
  useEffect(() => {
    
  }, [msj]);  

  for (let i = 0; i < dataFiles.length; i++) {
    console.log(dataFiles[i].file)
  }

  return (
<Container>
  <h2>Tabla de archivos</h2>
  <Table>
    <thead>
      <HeaderRow>
        <HeaderCell>Archivo</HeaderCell>
        <HeaderCell>Valores relacionados</HeaderCell>
        <HeaderCell>Orden</HeaderCell>
        <HeaderCell>Date</HeaderCell>
        <HeaderCell>Time</HeaderCell>
        <HeaderCell>Partnb</HeaderCell>
      </HeaderRow>
    </thead>
    <tbody>
      {files.map((file, index) => (
        <DataRow key={index}>
          <DataCell>{file}</DataCell>
          <DataCell>
            {dataFiles.map((dataFile, i) => {
              if (dataFile.file === file) {
                return (
                  <div key={i}>
                    <DataCell>{dataFile.orden}</DataCell>
                    <DataCell>{dataFile.date}</DataCell>
                    <DataCell>{dataFile.time}</DataCell>
                    <DataCell>{dataFile.partnb}</DataCell>
                  </div>
                );
              }
              return null;
            })}
          </DataCell>
        </DataRow>
      ))}
    </tbody>
  </Table>
</Container>
 

  );
};

export default DataTableDay;
