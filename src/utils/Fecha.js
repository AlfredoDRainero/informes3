
  // Función para obtener el año de una fecha
function obtenerYearFromDate(fecha) {
    const partes = fecha.split("-");
    return partes[0];
  }
  
  // Función para obtener el mes de una fecha
  function obtenerMonthFromDate(fecha) {
    const partes = fecha.split("-");
    return partes[1];
  }


  function obtenerFechaMedicion(text) {
    const rows = text.split("\n");
  
    if (rows.length >= 2) {
      const columns = rows[1].split("\t");
  
      if (columns.length >= 5) {
        //console.log("***fecha", columns[4]);
        return columns[4]; // Valor de la columna 4, fila 2
      }
    }
  
    return null; // Si no se encuentra el valor deseado
  }

  module.exports = {
    obtenerFechaMedicion,
    obtenerYearFromDate,
    obtenerMonthFromDate

    
  };