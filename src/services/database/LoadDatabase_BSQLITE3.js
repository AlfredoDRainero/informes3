const { generarIntervaloMeses } = require("../../utils/fecha");

const fs = require("fs");
const path = require("path");
//const Database = require("sqlite3");
const sqlite3 = require("sqlite3").verbose();

async function readFilesInFolder(dbFolderPath) {
  const files = fs.readdirSync(dbFolderPath);
  const result = {}; // Cambiado [] (arreglo) por {} (objeto)

  for (const file of files) {
    const filePath = path.join(dbFolderPath, file);
    if (fs.statSync(filePath).isFile()) {
      const db = new sqlite3.Database(filePath, { verbose: console.log });
      const stmt = db.prepare(
        "SELECT date, time, partcomment, partnb, orden FROM title"
      );
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

async function readFilesData(dbFolderPath, fileName) {
  //console.log("dbFolderPath+fileName:", dbFolderPath + fileName);
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(dbFolderPath, fileName);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(
          `El archivo '${fileName}' no existe o no es un archivo válido.`
        );
      }

      const db = new sqlite3.Database(
        filePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) {
            console.error("Error al abrir la base de datos:", err.message);
            reject(err);
          } else {
           // console.log("Conexión exitosa a la base de datos");

            const stmt = db.prepare(
              "SELECT date, time, partcomment, partnb, orden FROM title"
            );

            stmt.all((err, rows) => {
              if (err) {
                console.error("Error al ejecutar la consulta:", err.message);
                reject(err);
              } else {
              //  console.log("Consulta exitosa");
                const result = { data: rows };
                stmt.finalize(); // Finaliza la declaración después de su uso
                db.close((err) => {
                  if (err) {
                    console.error(
                      "Error al cerrar la base de datos:",
                      err.message
                    );
                    reject(err);
                  } else {
                    console.log("Base de datos cerrada");
                    resolve(result); // Resuelve la promesa con el resultado
                  }
                });
              }
            });
          }
        }
      );
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      reject(error);
    }
  });
}

async function readFilesDataWithDay(
  dbFolderPath,
  fileName,
  dayQuery,
  shiftQuery
) {
  //const partnb = '30986'
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(dbFolderPath, fileName);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(
          `El archivo '${fileName}' no existe o no es un archivo válido.`
        );
      }

      const db = new sqlite3.Database(
        filePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) {
            console.error("Error al abrir la base de datos:", err.message);
            reject(err);
          } else {
            //console.log("Conexión exitosa a la base de datos");

            //const stmt = db.prepare('SELECT date, time, orden, partnb FROM title WHERE date = ? ');
            const stmt = db.prepare(
              "SELECT date, time, orden, partnb FROM title WHERE date = ? AND time >= ? AND time <= ?"
            );

            const variableA = shiftQuery.HRSTART;
            const variableB = shiftQuery.HREND;

            stmt.all(dayQuery, variableA, variableB, (err, rows) => {
              if (err) {
                console.error("Error al ejecutar la consulta:", err.message);
                reject(err);
              } else {
              //  console.log("Consulta exitosa");
                rows.forEach((row) => {
                  row.file = fileName;
                });
                const result = { data: rows };

                stmt.finalize(); // Finaliza la declaración después de su uso
                db.close((err) => {
                  if (err) {
                    console.error(
                      "Error al cerrar la base de datos:",
                      err.message
                    );
                    reject(err);
                  } else {
                    console.log("Base de datos cerrada");
                    resolve(result); // Resuelve la promesa con el resultado
                  }
                });
              }
            });
          }
        }
      );
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
        throw new Error(
          `El archivo '${fileName}' no existe o no es un archivo válido.`
        );
      }

      //console.log("filePath:", filePath);

      const db = new sqlite3.Database(
        filePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) {
            console.error("Error al abrir la base de datos:", err.message);
            reject(err);
          } else {
          //  console.log("Conexión exitosa a la base de datos");

            const stmt = db.prepare(
              "SELECT * FROM measurement WHERE partnb = ?"
            );

            stmt.all(partnb, (err, rows) => {
              if (err) {
                console.error("Error al ejecutar la consulta:", err.message);
                reject(err);
              } else {
            //    console.log("Consulta exitosa");

                rows.forEach((row) => {
                  //-------------------------------------------------
                  //--- CALCULO DE LA DESVIACION O DIFERENCIA -------
                  //-------------------------------------------------
                  // Acceso a la columna por índice
                  const actual = row[Object.keys(row)[4]];
                  const nominal = row[Object.keys(row)[5]];
                  // Agregar el campo "dif" a cada fila
                  actual > nominal
                    ? (row.dif = Math.abs(
                        Math.abs(actual) - Math.abs(nominal)
                      ).toFixed(3))
                    : (row.dif =
                        Math.abs(Math.abs(actual) - Math.abs(nominal)).toFixed(
                          3
                        ) * -1);

                  //-------------------------------------------------
                  //--- CALCULO DE LA SIGNOS Y SOBRE TOLERANCIA -----
                  //-------------------------------------------------
                  const tolSup = parseFloat(row[Object.keys(row)[6]]);
                  const tolInf = parseFloat(row[Object.keys(row)[7]]);
                  let signoIntervalo = "";
                  let colorIntervalo = "";

                  if (row.dif > 0 && row.dif < tolSup / 4) {
                    signoIntervalo = "+";
                    colorIntervalo = "G";
                  } else if (
                    row.dif >= tolSup / 4 &&
                    row.dif < (2 * tolSup) / 4
                  ) {
                    signoIntervalo = "++";
                    colorIntervalo = "G";
                  } else if (
                    row.dif >= (2 * tolSup) / 4 &&
                    row.dif < (3 * tolSup) / 4
                  ) {
                    signoIntervalo = "+++";
                    colorIntervalo = "G";
                  } else if (row.dif >= (3 * tolSup) / 4 && row.dif <= tolSup) {
                    signoIntervalo = "++++";
                    colorIntervalo = "A";
                  } else if (row.dif < 0 && row.dif > tolInf / 4) {
                    signoIntervalo = "-";
                    colorIntervalo = "G";
                  } else if (
                    row.dif <= tolInf / 4 &&
                    row.dif > (2 * tolInf) / 4
                  ) {
                    signoIntervalo = "--";
                    colorIntervalo = "G";
                  } else if (
                    row.dif <= (2 * tolInf) / 4 &&
                    row.dif > (3 * tolInf) / 4
                  ) {
                    signoIntervalo = "---";
                    colorIntervalo = "G";
                  } else if (row.dif <= (3 * tolInf) / 4 && row.dif >= tolInf) {
                    signoIntervalo = "----";
                    colorIntervalo = "A";
                  } else if (row.dif <= tolInf) {
                    signoIntervalo = (Math.abs(tolInf) + row.dif).toFixed(3);
                    colorIntervalo = "R";
                  } else if (row.dif >= tolSup) {
                    signoIntervalo = (row.dif - Math.abs(tolSup)).toFixed(3);
                    colorIntervalo = "R";
                  }

                  row.exc = signoIntervalo;
                  row.c = colorIntervalo;
                });

                const result = { data: rows };
                stmt.finalize(); // Finaliza la declaración después de su uso
                db.close((err) => {
                  if (err) {
                    console.error(
                      "Error al cerrar la base de datos:",
                      err.message
                    );
                    reject(err);
                  } else {
                    console.log("Base de datos cerrada");
                    resolve(result); // Resuelve la promesa con el resultado
                  }
                });
              }
            });
          }
        }
      );
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      reject(error);
    }
  });
}

async function readFileData(dbFolderPath, fileName, partnb) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(dbFolderPath, fileName);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new Error(
          `El archivo '${fileName}' no existe o no es un archivo válido.`
        );
      }

      const db = new sqlite3.Database(
        filePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) {
            console.error("Error al abrir la base de datos:", err.message);
            reject(err);
          } else {
            console.log("tosa a la base de datos");

            const stmt = db.prepare("SELECT * FROM title WHERE partnb = ?");

            stmt.all(partnb, (err, rows) => {
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
                    console.error(
                      "Error al cerrar la base de datos:",
                      err.message
                    );
                    reject(err);
                  } else {
                    console.log("Base de datos cerrada");
                    resolve(result); // Resuelve la promesa con el resultado
                  }
                });
              }
            });
          }
        }
      );
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      reject(error);
    }
  });
}




async function QueryWithOrderFilter(dbFolderPath, request) {
  const firstMonth = request.DATO1;
  const firstYear = request.DATO2;

  const secondMonth = request.DATO3;
  const secondYear = request.DATO4;

  const fileName = request.DATO5;
  const filterOrder = request.DATO6;
  const searchWord = request.DATO7;

  const intervalo = generarIntervaloMeses(
    firstMonth,
    firstYear,
    secondMonth,
    secondYear,
    fileName
  );

  for (const file of intervalo) {
    console.log("intervalo:", file);

    return new Promise((resolve, reject) => {
      try {
        const filePath = path.join(dbFolderPath, file);
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          throw new Error(
            `El archivo '${file}' no existe o no es un archivo válido.`
          );
        }else{

        const db = new sqlite3.Database(
          filePath,
          sqlite3.OPEN_READWRITE,
          (err) => {
            if (err) {
              console.error("Error al abrir la base de datos:", err.message);
              reject(err);
            } else {
             // console.log("Conexión exitosa a la base de datos");

              const stmt = db.prepare(
                "SELECT partnb, date, time FROM title WHERE orden LIKE ?"
              );

              console.log("-------------------")
              console.log("stmt:",stmt)

              const filter = `%${filterOrder}%`;


              stmt.all(filter, (err, rows) => {
                if (err) {
                  console.error("Error al ejecutar la consulta:", err.message);
                  reject(err);
                } else {
               //   console.log("Consulta exitosa");
                  const result = rows;
                  console.log("result", result);
                  stmt.finalize(); // Finaliza la declaración después de su uso
                  db.close((err) => {
                    if (err) {
                      console.error(
                        "Error al cerrar la base de datos:",
                        err.message
                      );
                      reject(err);
                    } else {
                      console.log("Base de datos cerrada");
                      resolve(result); // Resuelve la promesa con el resultado
                    }
                  });
                }
              });
            }
          }
        );
      }} catch (error) {
        console.error("Error al leer el archivo:", error);
        reject(error);
      }
    });
  }
}

async function QueryWithWordFilter(dbFolderPath, request, partnbs) {
  const firstMonth = request.DATO1;
  const firstYear = request.DATO2;

  const secondMonth = request.DATO3;
  const secondYear = request.DATO4;

  const fileName = request.DATO5;
  const searchWord = request.DATO7;

  const intervalo = generarIntervaloMeses(
    firstMonth,
    firstYear,
    secondMonth,
    secondYear,
    fileName
  );

  const results = [];

  for (const file of intervalo) {
    console.log("intervalo:", file);

    const fileResults = await Promise.all(
      partnbs.map(async (partnbNumberQuery) => {
        const idmeasurement = searchWord;
        const partnb = partnbNumberQuery.partnb;

        try {
          const filePath = path.join(dbFolderPath, file);
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            throw new Error(
              `El archivo '${file}' no existe o no es un archivo válido.`
            );
          }
          const db = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE);
          const stmt = db.prepare(
            "SELECT * FROM measurement WHERE partnb = ? AND idmeasurement = ?"
          );
          const rows = await new Promise((resolveStmt, rejectStmt) => {
            stmt.all(partnb, idmeasurement, (errStmt, rowsStmt) => {
              if (errStmt) {
                console.error(
                  "Error al ejecutar la consulta:",
                  errStmt.message
                );
                rejectStmt(errStmt);
              } else {
                resolveStmt(rowsStmt);
              }
            });
          });
          // add date and time to row
          const result2 = rows.map((row) => {
            return {
              ...row,
              date: partnbNumberQuery.date,
              time: partnbNumberQuery.time
            };
          });

          stmt.finalize();
          db.close();

          return result2;
        } catch (error) {
          console.error("Error al leer el archivo:", error);
          throw error;
        }
      })
    );

    results.push(...fileResults);
  }

  return results;
}

module.exports = {
  readFilesInFolder,
  readFilesData,
  readFilesDataWithDay,
  readFileData,
  readFileMeasurement,
  QueryWithOrderFilter,
  QueryWithWordFilter
};

function printObjectAsTable(obj) {
  for (const file in obj) {
    console.log(`Table for ${file}:`);
    console.log(obj[file].data);
    console.log(); // Agregar línea en blanco para separar las tablas
  }
}
