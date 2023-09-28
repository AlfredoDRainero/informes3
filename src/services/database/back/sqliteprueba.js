const Database = require('better-sqlite3');

function agregarNombreEnDB(dbpath, nombre) {
  const db = new Database(dbpath);

  // Crear una tabla llamada 'nombres' si no existe
  db.exec(`
    CREATE TABLE IF NOT EXISTS nombres (
      id INTEGER PRIMARY KEY,
      nombre TEXT
    )
  `);

  // Insertar el nombre proporcionado en la tabla 'nombres'
  const insert = db.prepare('INSERT INTO nombres (nombre) VALUES (?)');
  const result = insert.run(nombre);
  //console.log(`Se insertó correctamente el nombre "${nombre}" con el ID ${result.lastInsertRowid}`);

  // Cerrar la conexión a la base de datos cuando hayas terminado
  db.close();
}


/*function agregarNombreEnDB(dbpath, nombre) {
  const db = new Database(dbpath);

  // Crear una tabla llamada 'nombres' si no existe
  db.exec(`
    CREATE TABLE IF NOT EXISTS nombres (
      id INTEGER PRIMARY KEY,
      nombre TEXT
    )
  `);

  // Insertar el nombre proporcionado en la tabla 'nombres'
  const insert = db.prepare('INSERT INTO nombres (nombre) VALUES (?)');
  const result = insert.run(nombre);
  console.log(`Se insertó correctamente el nombre "${nombre}" con el ID ${result.lastInsertRowid}`);

  // Cerrar la conexión a la base de datos cuando hayas terminado
  db.close();
}*/
