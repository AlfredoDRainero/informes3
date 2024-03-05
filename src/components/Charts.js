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
    const tolSup = measurementFiltered.map((item) => item[0].uppertol);
    const tolInf = measurementFiltered.map((item) => item[0].lowertol);
    const nominal = measurementFiltered.map((item) => item[0].nominal);
    
    console.log("yAxisMeassure",yAxisMeassure)
    const option = {
      title: {
        text: 'Histogramic chart'
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


      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 0.02,
            color: '#93CE07'
          },
          {
            gt: 0.020,
            lte: 0.040,
            color: '#FBDB0F'
          },
          {
            gt: 0.040,
            lte: 150,
            color: '#FC7D02'
          },
          {
            gt: 0,
            lte: -0.02,
            color: '#FD0100'
          },
          {
            gt: -0.02,
            lte: -0.04,
            color: '#AA069F'
          },
          {
            gt: -0.04,
            lte: -150,
            color: '#AC3B2A'
          }
        ],
        outOfRange: {
          color: '#999'
        }
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


          /*markLine: {
            silent: true,
            lineStyle: {
              color: '#FFF'
            },
            data: [
              {
                yAxis: 0.01
              },
              {
                yAxis: 0.02
              },
              {
                yAxis: 0.03
              },
              {
                yAxis: 0.04
              },
              {
                yAxis: 0.05
              }
            ]
          }*/
        },
        {
          data: tolSup,
          type: 'line',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },

        },
        {
          data: tolInf,
          type: 'line',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },

        },
        {
          data: nominal,
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
