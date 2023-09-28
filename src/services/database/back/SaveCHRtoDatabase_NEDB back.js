//const Datastore = require("nedb");
const Datastore = require('@seald-io/nedb')

async function saveContenidoDataToDB(data, partnb, dbPath) {
  
  const db = new Datastore({ filename: dbPath, autoload: true });

  try {
  //const insertPromises = await 
  data.map(async (row) => {

    const documentExt = await BucleRow(row, partnb);

    await db.insertAsync(documentExt)


    /*let save = await new Promise((resolve, reject) => {
      
      db.insert(documentExt, (err, save) => {
          if (err) reject(err);
          resolve(save);
      });
  });*/


    //return save
  });

  
    //const results = await Promise.all(insertPromises);
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  }
}

async function BucleRow(row, partnb) {
  const document = {
    partnb
  };

  const properties = row.slice(2);
  for (let index = 0; index < properties.length; index++) {
    document[index + 1] = properties[index];
    //console.log("document:", document);
  }

  return document;
}

module.exports = {
  saveContenidoDataToDB
};

/*const document = {
      partnb,
      ...row.slice(2).reduce((acc, value, index) => {
        acc[index + 1] = value;
        return acc;
      }, {})
    };
    */

/*const document = {
      partnb
    };

    

    const properties = row.slice(2);
    for (let index = 0; index < properties.length; index++) {
      document[index + 1] = properties[index];
      console.log("document:", document);
    }*/

/*const Datastore = require("nedb");

///const { obtenerDatosColumnasTexto } = require("../../utils/TextFormater");

//----------------------------------------------------------------
//---------  Contenido chr ---------------------------------------
//----------------------------------------------------------------

async function saveContenidoDataToDB(data, partnb, dbPath) {
  return new Promise((resolve, reject) => {
    const db = new Datastore({ filename: dbPath, autoload: true }); // Crea una instancia de la base de datos NeDB con la ruta proporcionada
    const promises = []; // Array para almacenar las promesas de inserción

    data.forEach((row) => {
      const document = {}; // Objeto para almacenar los datos de cada fila

      for (let i = 2; i < row.length; i++) {
        document[i - 1] = row[i]; // Asigna los valores de la fila al objeto document, comenzando desde la posición 2
      }
      document.partnb = partnb; // Agrega la propiedad partnb al objeto document con el valor de partnb proporcionado

      const promise = new Promise((resolve, reject) => {
        db.insert(document, (err, newDoc) => {
          if (err) {
            reject(err); // Si ocurre un error al insertar en la base de datos, rechaza la promesa con el error
          } else {
            resolve(newDoc); // Si la inserción es exitosa, resuelve la promesa con el nuevo documento insertado
          }
        });
      });

      promises.push(promise); // Agrega la promesa de inserción al array de promesas
    });

    Promise.all(promises)
      .then((results) => {
        console.log("--- resuelto",partnb)
        // console.log('Documentos insertados:', results); // Imprime en la consola los documentos insertados correctamente
        resolve(); // Resuelve la promesa externa una vez que todas las promesas de inserción se han resuelto
      })
      .catch((error) => {
        console.error("Error al insertar en la base de datos:", error); // Imprime en la consola el error si alguna de las promesas de inserción es rechazada
        reject(error); // Rechaza la promesa externa con el error
      });
  });
}

module.exports = {
  saveContenidoDataToDB
};*/
