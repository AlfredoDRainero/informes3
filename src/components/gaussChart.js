import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useMyContext } from "../contexts/MyContext";

const GaussChart = ({ data }) => {
  const chartRef = useRef(null);
  const { measurementFiltered } = useMyContext();

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Función para calcular los puntos de la campana de Gauss
    const gaussian = (x, mean, sigma) => {
      return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
    };

    // Parámetros para la campana de Gauss
    const mean = 0; // Media
    const sigma = 1; // Desviación estándar

    // Generar puntos de la campana de Gauss
    const numPoints = 100;
    const step = 6 / (numPoints - 1); // Ajusta este valor según el rango que desees mostrar
    const xAxisData = [];
    const seriesData = [];
    for (let i = -3; i <= 3; i += step) {
      xAxisData.push(i);
      seriesData.push(gaussian(i, mean, sigma));
    }

    const option = {
      title: {
        text: 'Distribución Normal (Campana de Gauss)'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'line',
        },
      ],
    };

    chart.setOption(option);

    // Limpieza al desmontar el componente
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '300px' }}></div>
  );
};

export default GaussChart;
