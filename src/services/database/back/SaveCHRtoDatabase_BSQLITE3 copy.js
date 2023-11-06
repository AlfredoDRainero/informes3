const sqlite3 = require("sqlite3");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveContenidoDataToDB(data, partnb, dbPath) {
  const db = new sqlite3.Database(dbPath);

  try {
    const columnNames = data[0].map((columnName) => columnName);

    /* const createTableStmt = `
      CREATE TABLE IF NOT EXISTS measurement (
        id INTEGER PRIMARY KEY,
        partnb TEXT,
        ${columnNames.map((column) => `${column} TEXT`).join(', ')}
      )
    `;

    db.run(createTableStmt);*/

    await sleep(4000);

    db.run(createTableStmt, (err) => {
      if (err) {
        console.error("Error al crear la tabla 'title':", err);
        throw err;
      }

    db.serialize(() => {
     
      console.log("dbPath:",dbPath)
      //console.log("data:",data)
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
            .map((value) => (value !== undefined ? value : null))
        ];
        //console.log("insertValues",insertValues)
        if (index === 0) {
          // Opcional: Puedes realizar alguna acción especial en la primera fila si es necesario
        } else if (insertValues.length === columnNames.length + 1) {
          insertStmt.run(insertValues);
        } else {
          //console.error("Error: Insufficient insert values provided");
        }
      }
    
      insertStmt.finalize(); // Finaliza la declaración preparada
    });});
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    
    throw error;
  } finally {
    db.close();
  }
}

function BucleRow(row, partnb) {
  const document = [partnb];

  //const properties = row.slice(0);
  for (let index = 0; index < row.length; index++) {
    document.push(row[index]);
  }

  return document;
}

module.exports = {
  saveContenidoDataToDB
};
