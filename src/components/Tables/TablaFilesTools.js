import React, { useEffect, useState } from "react";
import { RequestMsj } from "../../SendAndReceiveData";
import { useMyContext } from "../../contexts/MyContext";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BottomRightTopContainer = styled.div`
   width: 100%;
  background-color: #252a34;
  height: 20px;
  display: grid;
  grid-template-columns: 0.5fr 1fr; /* Dos columnas del 50% cada una */
  align-items: center;
  color: #dddddd;
  font-size: 12px;
  
`;

const Container = styled.div`
  color: white;
  padding: 15px;
  font-size: 12px;;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #252a34;
  font-size: 12px;;
`;

const Th = styled.th`
  background-color: #08d9d6;
  color: #252a34;
  font-size: 15px;;
  height:30px;
`;

const DatePickerContainer = styled.div`
  width: 200px; /* Ajusta el ancho del DatePicker como desees */
  font-size: 12px;;
`;

const InputContainer = styled.div`
  width: 200px; /* Ajusta el ancho del DatePicker como desees */
  font-size: 12px;;
`;


const DatePickerStyled = styled(DatePicker)`
  background-color: #252a34;
  color: #dddddd;
  border: 1px solid #08d9d6;
  text-align: center;
  font-size: 12px;;
  width: 100px;;
`;

const Input =  styled.input`
  background-color: #252a34;
  color: #dddddd;
  border: 1px solid #08d9d6;
  text-align: center;
  font-size: 12px;;
  width: 100px;;
`;



const DataTableTools = () => {
  const [msj, setMsj] = useState([]);

  const [selectedShift, setSelectedShift] = useState({});

  const { setMeasurementFile } = useMyContext();

  const { dataFile, setDataFile } = useMyContext();
  const { measurementSelected } = useMyContext();

  useEffect(() => {
    //fetchData();
    console.log("measurementSelected", measurementSelected);
  }, [measurementSelected]); // Este useEffect se ejecuta solo cuando el componente se monta

  useEffect(() => {
    //fetchData();
  }, []); // Este useEffect se ejecuta solo cuando el componente se monta

  useEffect(() => {
    //fetchData();
  }, [selectedShift]);

  useEffect(() => {}, [msj]);

  useEffect(() => {
    console.log("----------------->", dataFile.file);
  });

  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [orderText, setOrderText] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showOrderText, setShowOrderText] = useState(false);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
    setShowDatePicker(false);
  };

  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
    setShowDatePicker(false);
  };

  const handleTextInputChange = (text) => {
    setOrderText(text);
    setShowOrderText(false);
  };

  const options = {
    year: "numeric",
    month: "2-digit", // 2 dígitos para el mes (MM)
    day: "2-digit" // 2 dígitos para el día (DD)
  };

  

 
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Shift's Reports</Th>
          </tr>
        </thead>
      </Table>

      <Container>



        <BottomRightTopContainer>
          
          <p>
            {/*selectedDateFrom
              ? `From Date: ${selectedDateFrom.toLocaleDateString(
                  "en-US",
                  options
                )}`
              :*/ "From Date:"}
          </p>
          <DatePickerContainer>
            <DatePickerStyled
              selected={selectedDateFrom}
              onChange={handleDateChangeFrom}
            />
          </DatePickerContainer>
        </BottomRightTopContainer>

        <br />

        <BottomRightTopContainer>       
          <p>
            {/*selectedDateTo
              ? `To Date: ${selectedDateTo.toLocaleDateString(
                  "en-US",
                  options
                )}`
              : */"To Date :"}
          </p>
          <DatePickerContainer>
            <DatePickerStyled
              selected={selectedDateTo}
              onChange={handleDateChangeTo}
            />
          </DatePickerContainer>
        </BottomRightTopContainer>

        <br />

        <BottomRightTopContainer>
        <p>
            {/*orderText
              ? `filter in order field: ${orderText}`
              : */"filter in order field:"}
        </p>
        <InputContainer>
            <Input
              type="text"
              value={orderText}
              onChange={(e) => handleTextInputChange(e.target.value)}
              placeholder=""
            />
         </InputContainer>

         <Value>
          Selected File :
        </Value>

        {dataFile && (
          <DataContent
            style={{
              display: "flex",
              
              backgroundColor: ""
            }}
          >
            {dataFile.file.substring(0, dataFile.file.lastIndexOf('_', dataFile.file.lastIndexOf('_') - 1))}
          </DataContent>
        )}

        <Value>
          Search :
        </Value>

        {measurementSelected && (
          <DataContent>{measurementSelected}</DataContent>
        )}
        </BottomRightTopContainer>

        
      </Container>
    </>
  );
};
const fieldsToShow = ["partcomment", "orden", "partnb", "date", "time"];

const DataContent = styled.div`
  height: auto;
  //background-color: red;
`;

const Value = styled.p`
  font-size: 12px;
  height: auto;
  //margin-top: 5px;
  //background-color: blue;
`;

export default DataTableTools;
