import React, { useEffect, useState } from "react";
import { useMyContext } from "../../contexts/MyContext";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  height: auto;
  //background-color: red;
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
  color: #08d9d6;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #252a34;
    color: #eaeaea;
  }

  &:nth-child(even) {
    background-color: #393e46;
    color: #eaeaea;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #252a34;
  white-space: pre-wrap; /* Permite saltos de línea en el texto */
  //height: 2em; /* Ajusta la altura de la celda para acomodar dos renglones (ajusta según sea necesario) */
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  border: 1px solid #222831;
  text-align: left;
  
`;

const TableSeparator = styled.div`
  width: 1px;
  background-color: #252a34;
  height: 100%;
  margin: 0 auto;
`;

function TablaDatos() {
  //const { data, setData } = useMyContext();
  const { dataFile, setDataFile } = useMyContext();
  // Use data and setData in your component

  useEffect(() => {
    //console.log("datafiles :",dataFile)
  }, [dataFile]);

  const columnas = dataFile.length > 0 ? Object.keys(dataFile[0]) : [];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <>
            {columnas.slice(1).map(
              (
                columna,
                index // Comenzamos desde el índice 1
              ) => (
                <tr>
                  <TableHeaderCell 

                  style={{ 
                    padding: "8px",
                    border:" 1px solid #222831",
                    textAlign: "left",
                    //backgroundColor: "red",
                    height: index === 4 ? "80px" : "auto"
                  }}
                  key={index}>{columna}</TableHeaderCell>
                </tr>
              )
            )}
          </>
        </TableHead>
      </Table>

      <Table>
        <tbody>
          {dataFile.map((fila, index) => (
            <>
              {columnas.slice(1).map(
                (
                  columna,
                  columnIndex // Comenzamos desde el índice 1
                ) => (
                  <TableRow key={index}>
                    <TableCell 
                    
                    style={{ 
                      padding: "8px",
                      border:" 1px solid #222831",
                      textAlign: "left",
                      //backgroundColor: "red",
                      height: columnIndex === 4 ? "80px" : "auto"
                    }}
                    key={columnIndex}>{fila[columna]}</TableCell>
                  </TableRow>
                )
              )}
            </>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default TablaDatos;
