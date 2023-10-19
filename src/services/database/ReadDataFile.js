const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs').promises;

async function readFilesData2(dbFolderPath, fileName, dayQuery) {
  try {
    const filePath = path.join(dbFolderPath, fileName);

    if (!(await fileExists(filePath))) {
      throw new Error(`El archivo '${fileName}' no existe o no es un archivo válido.`);
    }

    const db = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE);

    const query = dayQuery
      ? 'SELECT date, time, partcomment, partnb, orden FROM title WHERE date = ?'
      : 'SELECT date, time, partcomment, partnb, orden FROM title';

    const data = await executeQuery(db, query, dayQuery);

    return { data };
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    throw error;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

function executeQuery(db, query, dayQuery) {
  return new Promise((resolve, reject) => {
    db.all(query, dayQuery, (err, rows) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err.message);
        reject(err);
      } else {
        console.log("Consulta exitosa");
        db.close((err) => {
          if (err) {
            console.error("Error al cerrar la base de datos:", err.message);
            reject(err);
          } else {
            console.log("Base de datos cerrada");
            resolve(rows);
          }
        });
      }
    });
  });
}


module.exports = {
    readFilesData2
  };
  
/*// Ejemplo de uso:
readFilesData('ruta/a/la/carpeta', 'archivo.db', '2023-10-19')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
*/