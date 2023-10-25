import React, { useEffect, useState } from "react";
import { useMyContext } from "../../contexts/MyContext";
import styled from "styled-components";

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
      font-size: 14px;
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
  font-size: 14 px;
  font-weight: normal;

`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #252a34;
`;

const TableHeaderCell = styled.th`
  padding: 5px;
  border: 1px solid #222831;
  text-align: left;
`;


function TablaPrincipal() {
  //const { data, setData } = useMyContext();
  const { measurementFile, setMeasurementFile } = useMyContext();
  // Use data and setData in your component

  useEffect(() => {
    console.log("datafiles :", measurementFile);
  }, [measurementFile]);

  const columnas =
    measurementFile.length > 0 ? Object.keys(measurementFile[0]) : [];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
          {columnas.map((columna, index) => {
          if (index === 0) {
            return <TableHeaderCell key={index}>{columna}</TableHeaderCell>;
          } else if (index > 1) {
            return <TableHeaderCell key={index}>{columna}</TableHeaderCell>;
          }
          return null;
        })}
          </tr>
        </TableHead>
        <tbody>
  {measurementFile.map((fila, index) => (
    <TableRow key={index}>
      {columnas.map((columna, columnIndex) => {
        if (columnIndex === 0) {
          return (
            <TableCell key={columnIndex}>{fila[columna]}</TableCell>
          );
        } else if (columnIndex > 1) {
          let cellContent = fila[columna];
          let cellColor;

          if (columna === "c") {
            if (cellContent === "G") {
              cellColor = "#08d976";
              cellContent = "■";
            } else if (cellContent === "A") {
              cellColor = "#d9d508";
              cellContent = "■";
            } else if (cellContent === "R") {
              cellColor = "#FF2E63";
              cellContent = "■";
            } else if (cellContent === "") {
              cellColor = "#08d976";
              cellContent = "■";
            } else {
              cellColor = "black"; // Color predeterminado
              cellContent = "";
            }
          }

          return (
            <TableCell key={columnIndex} style={{ color: cellColor }}>
              {cellContent}
            </TableCell>
          );
        }
        return null;
      })}
    </TableRow>
  ))}
</tbody>
      </Table>
    </TableContainer>
  );
}

export default TablaPrincipal;
