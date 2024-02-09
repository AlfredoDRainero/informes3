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
overflow-y: auto;
  overflow-x: hidden;
    background-color: ${(props) => (props.isSelected ? "#dddddd" : "#252a34")};
    border-color: ${(props) => (props.isSelected ? "#dddddd" : "#252A34")};
    color: ${(props) => (props.isSelected ? "#252a34" : "#eaeaea")};
  }

  &:nth-child(even) {
    background-color: ${(props) => (props.isSelected ? "#dddddd" : "#393e46")};
    border-color: ${(props) => (props.isSelected ? "#dddddd" : "#393e46")};
    color: ${(props) => (props.isSelected ? "#252a34" : "#eaeaea")};
  }
  font-size: 14px;
  font-weight: normal;

  &:hover {

    color: #08d9d6;
  }
`;

const TableCell = styled.td`
  padding: 5px;
 
`;

const TableHeaderCell = styled.th`
  padding: 5px;
  border: 1px solid #222831;
  text-align: left;
`;

function TablaMeasurement() {

  const { measurementFile, setMeasurementFile } = useMyContext();
  const { measurementSelected, setMeasurementSelected } = useMyContext();


  useEffect(() => {

  }, [measurementFile]);

  const columnas =
    measurementFile.length > 0 ? Object.keys(measurementFile[0]) : [];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            {columnas.map((columna, index) => {
             
             if (index === 0 || index > 1) {
              return <TableHeaderCell key={index}>{columna.toUpperCase()}</TableHeaderCell>;
            }
            return null;
            })}
          </tr>
        </TableHead>
        <tbody>
          {measurementFile.map((fila, index) => (
            <TableRow
              key={index}
              isSelected={selectedRow === index}
              
            >
              {columnas.map((columna, columnIndex) => {
                if (columnIndex === 0) {
                  return (
                    <TableCell key={columnIndex}
                    style={{width: "10px" }}
                    >{fila[columna]}</TableCell>
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
                    <TableCell
                      key={columnIndex}
                      style={{ color: cellColor,width: "10px" }}
                      onClick={() => handleRowClick(index) & setMeasurementSelected(cellContent)}
                    >
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

export default TablaMeasurement;
