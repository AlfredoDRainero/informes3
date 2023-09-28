const Datastore = require('nedb');

function leerNumeroPartnb(callback) {
  // Crear o cargar la base de datos 'partnb.db'
  const db2 = new Datastore({ filename: "./src/services/database/partnb.db", autoload: true });

  // Leer el número de la base de datos
  db2.findOne({}, (err, doc) => {
    if (err) {
      console.error("Error al leer el número:", err);
      return;
    }
    let numero = 0;

    // Si se encontró un documento, obtener el número
    if (doc) {
      numero = doc.numero;
    }

    // Llamar al callback con el valor de numero si se proporciona un callback
    if (typeof callback === 'function') {
      callback(numero);
    }
  });
}


  function actualizarNumeroPartnb(numero) {
    // Incrementar el número en uno
    const numeroActualizado = numero;
  
    // Crear o cargar la base de datos 'partnb.db'
    const db2 = new Datastore({ filename: "./src/services/database/partnb.db", autoload: true });
  
    // Actualizar el número en la base de datos
    db2.update({}, { numero: numeroActualizado }, { upsert: true }, (err, numReplaced) => {
      if (err) {
        console.error("Error al actualizar el número:", err);
        return;
      }
      //console.log("Número actualizado:", numeroActualizado);
    });
  }
  

module.exports = {
    leerNumeroPartnb,
    actualizarNumeroPartnb
};