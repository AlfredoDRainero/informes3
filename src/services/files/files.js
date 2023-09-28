const fs = require("fs");
const path = require("path");
const { app } = require('electron');

// Función para buscar y devolver los nombres de todos los archivos en la carpeta './data'


function buscarArchivosEnCarpeta() {
  const userData = app.getAppPath();
  const carpetaData = path.join(userData, 'data');
  const archivosObjeto = {};
  let indexAux=0;
  try {
    const archivos = fs.readdirSync(carpetaData);
    archivos.forEach((nombreArchivo) => {
      //const rutaCompleta = path.join(carpetaData, nombreArchivo);
      //const stats = fs.statSync(rutaCompleta);
      
      // Agrega información sobre el archivo que sea serializable en JSON
      archivosObjeto[indexAux] = {
        nombre: nombreArchivo,
        //size: stats.size,
        //fechaModificacion: stats.mtime.toISOString(),
        // Puedes agregar más propiedades aquí según sea necesario
      };
      indexAux++;
    });

    return archivosObjeto;
  } catch (error) {
    console.error("Error al leer la carpeta:", error);
    return {}; // Devuelve un objeto vacío en caso de error
  }
}




function checkFolderExists(folderPath) {
  try {
    const stats = fs.statSync(folderPath);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false; // El directorio no existe
    }
    throw error; // Manejar otros errores
  }
}

module.exports = {
  buscarArchivosEnCarpeta
};
