const fs = require("fs");
const path = require("path");
const Database = require("sqlite3"); 
const sqlite3 = require("sqlite3").verbose();



async function readFilesInFolder(dbFolderPath) {
  const files = fs.readdirSync(dbFolderPath);
  const result = {}; // Cambiado [] (arreglo) por {} (objeto)

  for (const file of files) {
    const filePath = path.join(dbFolderPath, file);
    if (fs.statSync(filePath).isFile()) {
      const db = new Database(filePath, { verbose: console.log });
      const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');
      const rows = stmt.all();
      
      // Agregar datos al objeto result
      result[file] = { data: rows };
      
      db.close();
    }
  }
 

  //imprime objeto en consola.
  //printObjectAsTable(result);

  return result;
}

/*async function readFileInFolder(dbFolderPath, fileName) {
  console.log("dbFolderPath:",dbFolderPath,"-fileName:",fileName,"-")
  //const files = fs.readdirSync(dbFolderPath);
  const result = {}; // Cambiado [] (arreglo) por {} (objeto)

  //for (const file of files) {
    const filePath = path.join(dbFolderPath, fileName);
    if (fs.statSync(filePath).isFile()) {
      const db = new Database(filePath, { verbose: console.log });
      const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');
      const rows = stmt.all();
      
      // Agregar datos al objeto result
      result[file] = { data: rows };
      
      db.close();
    //}
  }
 

  //imprime objeto en consola.
  //printObjectAsTable(result);

  return result;
}*/


/*async function readFileInFolder(dbFolderPath, fileName) {
  console.log("direccion:",dbFolderPath+fileName)
  const filePath = path.join(dbFolderPath, fileName);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error('El archivo no existe o no es un archivo válido.');
  }

  const db = new Database(filePath, { verbose: console.log });
  const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');
  const rows = stmt.all();

  db.close();

  return { [fileName]: { data: rows } };
}*/



async function readFileData(dbFolderPath, fileName) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(dbFolderPath, fileName);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(`El archivo '${fileName}' no existe o no es un archivo válido.`);
      }

      console.log("filePath:", filePath);

      const db = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error("Error al abrir la base de datos:", err.message);
          reject(err);
        } else {
          console.log("Conexión exitosa a la base de datos");

          const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');

          stmt.all((err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta:", err.message);
              reject(err);
            } else {
              console.log("Consulta exitosa");
              const result = { data: rows };
              //console.log("rows", rows);
              stmt.finalize(); // Finaliza la declaración después de su uso
              db.close((err) => {
                if (err) {
                  console.error("Error al cerrar la base de datos:", err.message);
                  reject(err);
                } else {
                  console.log("Base de datos cerrada");
                  resolve(result); // Resuelve la promesa con el resultado
                }
              });
            }
          });
        }
      });

    } catch (error) {
      console.error("Error al leer el archivo:", error);
      reject(error);
    }
  });
}

async function readFileMeasurement(dbFolderPath, fileName, partnb) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(dbFolderPath, fileName);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(`El archivo '${fileName}' no existe o no es un archivo válido.`);
      }

      console.log("filePath:", filePath);

      const db = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error("Error al abrir la base de datos:", err.message);
          reject(err);
        } else {
          console.log("Conexión exitosa a la base de datos");

          const stmt = db.prepare('SELECT * FROM mediciones WHERE partnb = ?');

          stmt.all(partnb,(err, rows) => {
            if (err) {
              console.error("Error al ejecutar la consulta:", err.message);
              reject(err);
            } else {
              console.log("Consulta exitosa");
              const result = { data: rows };
              //console.log("rows", rows);
              stmt.finalize(); // Finaliza la declaración después de su uso
              db.close((err) => {
                if (err) {
                  console.error("Error al cerrar la base de datos:", err.message);
                  reject(err);
                } else {
                  console.log("Base de datos cerrada");
                  resolve(result); // Resuelve la promesa con el resultado
                }
              });
            }
          });
        }
      });

    } catch (error) {
      console.error("Error al leer el archivo:", error);
      reject(error);
    }
  });
}



module.exports = {
  readFilesInFolder,
  readFileData,
  readFileMeasurement
};


function printObjectAsTable(obj) {
  for (const file in obj) {
    console.log(`Table for ${file}:`);
    console.log(obj[file].data);
    console.log(); // Agregar línea en blanco para separar las tablas
  }
}


