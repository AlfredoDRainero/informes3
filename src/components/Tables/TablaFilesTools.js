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
  font-size: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #252a34;
  font-size: 12px;
`;

const Th = styled.th`
  background-color: #08d9d6;
  color: #252a34;
  font-size: 15px;
  height: 30px;
`;

const DatePickerContainer = styled.div`
  width: 200px; /* Ajusta el ancho del DatePicker como desees */
  font-size: 12px;
`;

const InputContainer = styled.div`
  width: 200px; /* Ajusta el ancho del DatePicker como desees */
  font-size: 12px;
`;

const DatePickerStyled = styled(DatePicker)`
  background-color: #252a34;
  color: #dddddd;
  border: 1px solid #08d9d6;
  text-align: center;
  font-size: 12px;
  width: 100px;
`;

const Input = styled.input`
  background-color: #252a34;
  color: #dddddd;
  border: 1px solid #08d9d6;
  text-align: center;
  font-size: 12px;
  width: 100px;
`;

const Button1 = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const DataTableTools = () => {
  const [msj, setMsj] = useState([]);

  const { setMeasurementFile } = useMyContext();
  const { setMeasurementFiltered } = useMyContext();
  const { dataFile } = useMyContext();
  const { measurementSelected } = useMyContext();

  useEffect(() => {
    //fetchData();
    // console.log("measurementSelected", measurementSelected);
  }, [measurementSelected]); // Este useEffect se ejecuta solo cuando el componente se monta

  useEffect(() => {}, [msj]);

  const fechaaux1 = new Date("9/11/2023");
  const fechaaux2 = new Date("9/11/2023"); 


  const [selectedDateFrom, setSelectedDateFrom] = useState(fechaaux1);
  const [selectedDateTo, setSelectedDateTo] = useState(fechaaux2);
  const [orderText, setOrderText] = useState("F LIB M3 ZJ 4192");
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
  
  async function ReadDBIntervalDateSearchWord(
    fechaStart,
    fechaEnd,
    filename,
    orderFilter,
    searchWord
  ) {

    function separateDate(fechaString) {
      const options = {
        year: "numeric",
        month: "2-digit", // 2 dígitos para el mes (MM)
        day: "2-digit" // 2 dígitos para el día (DD)
      };
      
      const fechaString2 =  fechaString.toLocaleDateString("en-US",options)
      const partes = fechaString2.split("/");
      console.log("partes:",partes)
      const date = {
        year: parseInt(partes[2]),
        month: parseInt(partes[0])
      };
      return date;
    }

   
    if (fechaStart > fechaEnd) {
      [fechaStart, fechaEnd] = [fechaEnd, fechaStart];    //intercambia las fechas de lugar si una es menor que la otra.
    }

    try {
      const consulta = {
        MSJREQUEST: "J",
        DATO1: separateDate(fechaStart).month,
        DATO2: separateDate(fechaStart).year,
        DATO3: separateDate(fechaEnd).month,
        DATO4: separateDate(fechaEnd).year,
        DATO5: filename,
        DATO6: orderFilter,
        DATO7: searchWord
      };
      const result = await RequestMsj(consulta);
      console.log("Esperando a que se resuelva la promesa...");
      console.log("resultado:",result);
      setMeasurementFiltered(result);
    
    } catch (error) {
      console.error("Error al obtener el mensaje:", error);
    }
  }

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
            {
              /*selectedDateFrom
              ? `From Date: ${selectedDateFrom.toLocaleDateString(
                  "en-US",
                  options
                )}`
              :*/ "From Date:"
            }
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
            {
              /*selectedDateTo
              ? `To Date: ${selectedDateTo.toLocaleDateString(
                  "en-US",
                  options
                )}`
              : */ "To Date :"
            }
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
            {
              /*orderText
              ? `filter in order field: ${orderText}`
              : */ "filter in order field:"
            }
          </p>
          <InputContainer>
            <Input
              type="text"
              value={orderText}
              onChange={(e) => handleTextInputChange(e.target.value)}
              placeholder=""
            />
          </InputContainer>

          <Value>Selected File :</Value>

          {dataFile && (
            <DataContent
              style={{
                display: "flex",
                backgroundColor: ""
              }}
            >
              {dataFile.file
                ? dataFile.file.substring(
                    0,
                    dataFile.file.lastIndexOf(
                      "_",
                      dataFile.file.lastIndexOf("_") - 1
                    )
                  )
                : ""}
            </DataContent>
          )}

          <Value>Search :</Value>

          {measurementSelected && (
            <DataContent>{measurementSelected}</DataContent>
          )}
          <Button1
            onClick={() =>
              ReadDBIntervalDateSearchWord(
                selectedDateFrom,
                selectedDateTo,
                dataFile.file.substring(0,dataFile.file.lastIndexOf("_",dataFile.file.lastIndexOf("_") - 1)),
                orderText,
                measurementSelected,
              )
            }
          >
            Search
          </Button1>
        </BottomRightTopContainer>
      </Container>
    </>
  );
};
const fieldsToShow = ["partcomment", "orden", "partnb", "date", "time"];

const DataContent = styled.div`
  height: auto;
`;

const Value = styled.p`
  font-size: 12px;
  height: auto;
`;

export default DataTableTools;
