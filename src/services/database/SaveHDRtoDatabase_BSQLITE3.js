
const sqlite3 = require('sqlite3').verbose();

// Define an asynchronous function to save 'tituloToDB' data to the database
async function saveTituloDataToDB(tituloToDB, dbPath) {
  const db = new sqlite3.Database(dbPath);

  try {
    // Extract the column names from 'tituloToDB', excluding the 'filename' key
    const columnNames = Object.keys(tituloToDB).filter(
      (key) => key !== "filename"
    );

    // Create a comma-separated string of insert columns for the SQL statement
    const insertColumns = columnNames.join(", ");

    // Create an array of values to be inserted into the database
    const insertValues = columnNames.map((key) => tituloToDB[key]);

    // Prepare an SQL statement to create the 'title' table if it doesn't exist
    const createTableStmt = `
      CREATE TABLE IF NOT EXISTS title (
        id INTEGER PRIMARY KEY,
        ${columnNames.map((aux, index) => `${aux} TEXT`).join(", ")}
      )
    `;

    // Use a transaction to execute the create table statement
    db.run(createTableStmt, (err) => {
      if (err) {
        console.error("Error al crear la tabla 'title':", err);
        throw err;
      }

      // After creating the table, insert the data
      const insertStmt = `
        INSERT INTO title (${insertColumns}) VALUES (${Array.from(
          { length: columnNames.length },
          () => "?"
        ).join(", ")})
      `;

      // Use a transaction to execute the insert statement with the values
      db.run(insertStmt, insertValues, (err) => {
        if (err) {
          console.error("Error al insertar en la base de datos:", err);
          throw err;
        }
      });
    });
  } catch (error) {
    console.error("Error al trabajar con la base de datos:", error);
    throw error;
  } finally {
    db.close();
  }
}

module.exports = {
  saveTituloDataToDB
};
