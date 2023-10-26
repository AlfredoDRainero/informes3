
const { convertTo24HourFormat } = require("../utils/Hour24")

function splitText(text) {
  const rows = text.split("\n"); // Divide el texto en filas utilizando el carácter de nueva línea ('\n')
  const result = []; // Matriz vacía para almacenar el resultado

  for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split("\t"); // Divide cada fila en columnas utilizando el carácter de tabulación ('\t')
    const slicedColumns = columns.slice(2, 4).concat(columns.slice(5, 9)); // Obtiene un subconjunto de columnas según los índices especificados
    result.push(slicedColumns); // Agrega las columnas al resultado
  }

  return result; // Devuelve la matriz resultante
}

function splitTextTitulo(text, partnb) {
  //funcion que toma un string lo separa en filas y columnas, busca palabras claves y devuelve
  //en un objeto el valor de esas palabras que es tomado sobre la misma columna un renglon adelante

  //const rows = text.split("\n");
  let rows = text.split("\n");

  // Cambia "order" por "orden"
  rows = rows.map((row) => row.replace("order", "orden"));

  const datosTituloInformeObj = {};

  //console.log()
  const palabrasClave = [
    "filename",
    "operid",
    "date",
    "time",
    "dmesn",
    "partcomment",
    "orden",
    "temperatureworkpiece"
  ];

  for (let i = 0; i < rows.length - 1; i++) {
    const columns = rows[i].split("\t");
    const nextRowColumns = rows[i + 1].split("\t");

    for (let j = 0; j < columns.length; j++) {
      const palabra = columns[j];

      if (palabrasClave.includes(palabra)) {
        const valor = nextRowColumns[j];
        datosTituloInformeObj[palabra] = valor;
      }
    }
  }

  //agrega numero que usamos como indice partnb
  datosTituloInformeObj["partnb"] = partnb;
  datosTituloInformeObj["time"] = convertTo24HourFormat(datosTituloInformeObj["time"])
  //console.log("**********************datosTituloInformeObj[time]",convertTo24HourFormat(datosTituloInformeObj["time"]) )
  //console.log("Valores en el objeto datosTituloInformeObj:");
  //console.log(datosTituloInformeObj);
  //console.log(datosTituloInformeObj);
  return datosTituloInformeObj;
}

function obtenerDatosColumnasTexto(text, columna) {
  const rows = text.split("\n");

  if (rows.length >= 2) {
    const columns = rows[1].split("\t");

    if (columns.length >= 5) {
      //console.log("***fecha", columns[4]);
      return columns[columna]; // Valor de la columna 4, fila 2
    }
  }

  return null; // Si no se encuentra el valor deseado
}

function convertLastFiveColumns(data) {
  const newData = [];
  


  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const newRow = row.slice();

    for (let j = newRow.length - 6; j < newRow.length; j++) {
      const value = newRow[j];

      if (!isNaN(Number(value))) {
        const parsedValue = Number(value).toFixed(3);
        newRow[j] = parsedValue.toString();
      }


      // CAMBIA POR SER PALABRA RESERVADA PARA LITESQL
      if (newRow[j] === 'id') {
        newRow[j] = 'idmeasurement'; // Cambiar "idmeasurement" a "id"
       
      }

    }

    
  
    newData.push(newRow);
  }
   //console.log("*",newData)
  return newData;
}

// esta funcion devuelve todo el texto hasta que aparece el primer "_" es para depurar el nombre de los archivos leidos

function SubcadenaAGuionBajo(texto) {
  const indiceGuionBajo = texto.indexOf("_");
  if (indiceGuionBajo !== -1) {
    return texto.slice(0, indiceGuionBajo);
  } else {
    return texto;
  }
}

module.exports = {
  SubcadenaAGuionBajo,
  splitText,
  convertLastFiveColumns,
  splitTextTitulo,
  obtenerDatosColumnasTexto
};
