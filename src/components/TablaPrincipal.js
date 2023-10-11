import React, { useEffect, useState } from "react";
import { useMyContext } from '../contexts/MyContext';
import styled from 'styled-components';



const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
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





function TablaPrincipal() {
  //const { data, setData } = useMyContext();
  const { measurementFile, setMeasurementFile } = useMyContext();
  // Use data and setData in your component
  


  useEffect(() => {
    console.log("datafiles :",measurementFile)
  }, [measurementFile]);

  const columnas = measurementFile.length > 0 ? Object.keys(measurementFile[0]) : [];

  return (
    <TableContainer>
    <Table>
      <TableHead>
        <tr>
        {columnas.slice(1).map((columna, index) => (
            <TableHeaderCell key={index}>{columna}</TableHeaderCell>
          ))}
        </tr>
      </TableHead>
      <tbody>
        {measurementFile.map((fila, index) => (
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

export default TablaPrincipal;








