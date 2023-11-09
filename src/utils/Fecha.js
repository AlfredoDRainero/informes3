
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


  function generarIntervaloMeses(mesInicial, anioInicial, mesFinal, anioFinal, file_Name) {
    const meses = [];
  
    while (anioInicial !== anioFinal || mesInicial !== mesFinal) {
      const year = anioInicial;
      const month = mesInicial;
      const fileName_year_month = `${file_Name}_${year}_${month}.db`;
      
      meses.push(fileName_year_month);
  
      // Incrementa el mes y el año
      mesInicial++;
      if (mesInicial > 12) {
        mesInicial = 1;
        anioInicial++;
      }
    }
  
    const fileName_year_month = `${file_Name}_${anioFinal}_${mesFinal}.db`;
    meses.push(fileName_year_month);
    return meses;
  }

  module.exports = {
    obtenerFechaMedicion,
    obtenerYearFromDate,
    obtenerMonthFromDate,
    generarIntervaloMeses

    
  };