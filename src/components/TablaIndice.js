import React from "react";
import styled from "styled-components";



const TableWrapper = styled.div`
  width: 100%;
  align-self: start;
  justify-self: start;
  font-size: 10px;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-height: 300px; /* Agrega aquí la altura máxima deseada */
  overflow-x: auto;
  border: 1px solid white;
`;

const TableHeader = styled.h2`
  font-size: 12px;
  margin-bottom: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

const TableData = styled.td`
  border: 1px solid #ccc;
  text-align: center;
`;

const NoDataCell = styled.td`
  text-align: center;
  font-style: italic;
`;

const Tabla_Indice = ({ data }) => {
  const tableComponents = Object.entries(data).map(
    ([header, { data: rowData }], index) => (
      <TableWrapper key={index}>
        <TableHeader  style={{ fontSize: 10, width: "25vw" }}>{header}</TableHeader>

        {Array.isArray(rowData) ? (
          rowData.map(({ partcomment }, rowIndex) => (           
            rowIndex === 0 && (
              <TableHeader style={{ fontSize: 10, width: "10vw" }}>
                {partcomment}
              </TableHeader>
            )
          ))
        ) : (
          <TableHeader colSpan="4">No data available.</TableHeader>
        )}

        <StyledTable>
          <thead>
            <tr>
              <TableData>Date</TableData>
              <TableData>Time</TableData>             
              <TableData>Orden</TableData>
              <TableData>Partnb</TableData>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rowData) ? (
              rowData.map(
                ({ date, time, partcomment, orden, partnb }, rowIndex) => (
                  <tr key={rowIndex}>
                    <TableData>{date}</TableData>
                    <TableData>{time}</TableData>

                    <TableData>{orden}</TableData>
                    <TableData>{partnb}</TableData>
                  </tr>
                )
              )
            ) : (
              <tr>
                <NoDataCell colSpan="4">No data available.</NoDataCell>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    )
  );

  return <div>{tableComponents}</div>;
};

export default Tabla_Indice;
