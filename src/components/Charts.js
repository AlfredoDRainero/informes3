import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useMyContext } from "../contexts/MyContext";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const { measurementFiltered } = useMyContext();


  useEffect(() => {

   

    console.log("datafiles3 :", measurementFiltered);
    const chart = echarts.init(chartRef.current);

    const yAxisMeassure = measurementFiltered.map((item) => item[0].actual);

    const xAxisDate = measurementFiltered.map((item) => item[0].date);
    
    console.log("yAxisMeassure",yAxisMeassure)
    const option = {
      title: {
        text: 'Temperature Change in the Coming Week'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisDate,
      },
      yAxis: {
        type: 'value',
        data: yAxisMeassure,
      },
      series: [
        {
          data: yAxisMeassure,
          type: 'line',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
        },
        
      ],
    };

    
    chart.setOption(option);

    // Limpieza al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, [ measurementFiltered]);

  /*if (!measurementFiltered || measurementFiltered.length === 0) {
    return null; // O cualquier otro componente/mensaje que desees mostrar en caso de que no haya datos
  }
*/

  return (
    <>
    <div ref={chartRef} style={{ width: '100%', height: '300px' }}   ></div>

  {/*  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Part Number</th>
        <th>Date</th>
        <th>Actual</th>
     
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item[0].id}</td>
          <td>{item[0].partnb}</td>
          <td>{item[0].date}</td>
          <td>{item[0].actual}</td>
          
        </tr>
      ))}
    </tbody>
  </table>*/}
  </>
  );
};

export default LineChart;
