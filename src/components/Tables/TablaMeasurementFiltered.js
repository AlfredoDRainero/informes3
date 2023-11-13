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
    //background-color: #252a34;
    //color: #eaeaea;
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
    //background-color: #393e46;
    //color: #eaeaea;
  }
  font-size: 14px;
  font-weight: normal;

  &:hover {
    //font-weight: bold;
    color: #08d9d6;
  }
`;

const TableCell = styled.td`
  padding: 5px;
  //border: 1px solid #252a34;
`;

const TableHeaderCell = styled.th`
  padding: 5px;
  border: 1px solid #222831;
  text-align: left;
`;

function TablaMeasurementFiltered() {
  //const { data, setData } = useMyContext();
  const { measurementFiltered, setMeasurementFiltered } = useMyContext();
  const { measurementSelected, setMeasurementSelected } = useMyContext();
  // Use data and setData in your component

  useEffect(() => {
     console.log("datafiles :", measurementFiltered);
  }, [measurementFiltered]);

  const columns  =
    measurementFiltered && measurementFiltered.length > 0
      ? Object.keys(measurementFiltered[0][0])
      : [];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (





<table>
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {measurementFiltered.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column, columnIndex) => (
          <td key={columnIndex}>{row[0][column]}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


    
  );
}

export default TablaMeasurementFiltered;
