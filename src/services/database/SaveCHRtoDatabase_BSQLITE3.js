const sqlite3 = require('sqlite3');

async function saveContenidoDataToDB(data, partnb, dbPath) {
  const db = new sqlite3.Database(dbPath);

  try {
    const columnNames = data[0].slice(2).map((columnName) => columnName);

    const createTableStmt = `
      CREATE TABLE IF NOT EXISTS mediciones (
        id INTEGER PRIMARY KEY,
        partnb TEXT,
        ${columnNames.map((column) => `${column} TEXT`).join(', ')}
      )
    `;

    db.run(createTableStmt);

    
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  } finally {
    db.close();
  }
}


module.exports = {
  saveContenidoDataToDB
};