import React, { useEffect, useState } from "react";
import { useMyContext } from '../../contexts/MyContext';
import styled from 'styled-components';



const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
      font-size: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableHead = styled.thead`
  background-color: #222831;
  color: #08D9D6;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #252A34;
    color: #EAEAEA;
  }

  &:nth-child(even) {
    background-color: #393E46;
    color: #EAEAEA;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #252A34;
  white-space: pre-wrap; /* Permite saltos de línea en el texto */
  height: 2em; /* Ajusta la altura de la celda para acomodar dos renglones (ajusta según sea necesario) */
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  border: 1px solid #222831;  
  text-align: left;
  
`;

const TableSeparator = styled.div`
  width: 1px;
  background-color: #252A34;
  height: 100%;
  margin: 0 auto;
`;





function TablaDatos() {
  //const { data, setData } = useMyContext();
  const { dataFile, setDataFile } = useMyContext();
  // Use data and setData in your component
  


  useEffect(() => {
    console.log("datafiles :",dataFile)
  }, [dataFile]);

  const columnas = dataFile.length > 0 ? Object.keys(dataFile[0]) : [];

  return (
    <TableContainer>
    <Table>
      <TableHead>
        <tr>
          {columnas.slice(1).map((columna, index) => ( // Comenzamos desde el índice 1
            <TableHeaderCell key={index}>{columna}</TableHeaderCell>
          ))}
        </tr>
      </TableHead>
      <tbody>
        {dataFile.map((fila, index) => (
          <TableRow key={index}>
            {columnas.slice(1).map((columna, columnIndex) => ( // Comenzamos desde el índice 1
              <TableCell key={columnIndex}>{fila[columna]}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
  );

}

export default TablaDatos;








