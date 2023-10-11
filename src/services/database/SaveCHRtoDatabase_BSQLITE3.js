const sqlite3 = require('sqlite3');

async function saveContenidoDataToDB(data, partnb, dbPath) {
  const db = new sqlite3.Database(dbPath);

  try {
    const columnNames = data[0].map((columnName) => columnName);

    // Crear la tabla
    await new Promise((resolve, reject) => {
      const createTableStmt = `
        CREATE TABLE IF NOT EXISTS measurement (
          id INTEGER PRIMARY KEY,
          partnb TEXT,
          ${columnNames.map((column) => `${column} TEXT`).join(', ')}
        )
      `;

      db.run(createTableStmt, [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Iniciar una transacción
    await new Promise((resolve, reject) => {
      db.run('BEGIN TRANSACTION', [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const insertStmt = db.prepare(`
      INSERT INTO measurement (partnb, ${columnNames.join(", ")})
      VALUES (?, ${Array(columnNames.length).fill("?").join(", ")})
    `);

    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      const documentExt = BucleRow(row, partnb);
      const insertValues = [
        partnb,
        ...documentExt
          .slice(1)
          .map((value) => (value !== undefined ? value : null)),
      ];

      await new Promise((resolve, reject) => {
        insertStmt.run(insertValues, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      /*if (index === 0) {
        // Opcional: Puedes realizar alguna acción especial en la primera fila si es necesario
      } else if (insertValues.length === columnNames.length + 1) {
        // Insertar datos en la tabla
      
      } else {
        console.error("Error: Insufficient insert values provided");
      }*/
    }

    // Finalizar la transacción
    await new Promise((resolve, reject) => {
      db.run('COMMIT', [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    insertStmt.finalize(); // Finaliza la declaración preparada
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    // Revertir la transacción en caso de error
    await new Promise((resolve, reject) => {
      db.run('ROLLBACK', [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    throw error;
  } finally {
    db.close();
  }
}

function BucleRow(row, partnb) {
  const document = [partnb];

  //const properties = row.slice(2);
  for (let index = 0; index < row.length; index++) {
    document.push(row[index]);
  }

  return document;
}

module.exports = {
  saveContenidoDataToDB,
};
