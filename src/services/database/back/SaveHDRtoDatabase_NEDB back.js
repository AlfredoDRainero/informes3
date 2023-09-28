


//const Datastore = require("nedb");
const Datastore = require('@seald-io/nedb')

async function saveTituloDataToDB(data, dbPath) {
  const db = new Datastore({ filename: dbPath, autoload: true });

  try {
    /*const newDoc = await new Promise((resolve, reject) => {
      
      db.insertAsync(data, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
          //console.log("termino de grabar db1 adentro")
        }
      });

    });*/

   await db.insertAsync(data)
    //console.log("Documento insertado:", newDoc);
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  }
}

module.exports = {
  saveTituloDataToDB
};



/*const Datastore = require("nedb");

//----------------------------------------------------------------
//---------  Titulo hdr ------------------------------------------
//----------------------------------------------------------------


async function saveTituloDataToDB(data, dbPath) {
  return new Promise((resolve, reject) => {
    const db = new Datastore({ filename: dbPath, autoload: true }); // Crea una instancia de la base de datos NeDB con la ruta proporcionada
    const promises = []; // Array para almacenar las promesas de inserción
 
   // data.partnb = partnb; // Agrega la propiedad partnb al objeto document con el valor de partnb proporcionado*/
/*      const promise = new Promise((resolve, reject) => {
        db.insert(data, (err, newDoc) => {
          if (err) {
            reject(err); // Si ocurre un error al insertar en la base de datos, rechaza la promesa con el error
          } else {
            resolve(newDoc); // Si la inserción es exitosa, resuelve la promesa con el nuevo documento insertado
          }
        });
      });

      promises.push(promise); // Agrega la promesa de inserción al array de promesas
    

    Promise.all(promises)
      .then((results) => {
          resolve(); // Resuelve la promesa externa una vez que todas las promesas de inserción se han resuelto
      })
      .catch((error) => {
        console.error("Error al insertar en la base de datos:", error); // Imprime en la consola el error si alguna de las promesas de inserción es rechazada
        reject(error); // Rechaza la promesa externa con el error
      });
  });
}


module.exports = {
  saveTituloDataToDB
};*/
