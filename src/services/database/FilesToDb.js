const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const {
  splitText,
  convertLastFiveColumns,
  splitTextTitulo,
  SubcadenaAGuionBajo
} = require("../../utils/TextFormater");

const {
  obtenerFechaMedicion,
  obtenerYearFromDate,
  obtenerMonthFromDate
} = require("../../utils/fecha");

const { readFilesInFolder } = require("./LoadDatabase_BSQLITE3");

const {
  leerNumeroPartnb,
  actualizarNumeroPartnb
} = require("./PartnBToDB_NEDB");

const { saveContenidoDataToDB } = require("./SaveCHRtoDatabase_BSQLITE3");

const { saveTituloDataToDB } = require("./SaveHDRtoDatabase_BSQLITE3");

const { buscarArchivosEnCarpeta } = require("../files/files");

//busca ultimo numero de indice partnb
let partNumber = 0;
leerNumeroPartnb((numero) => {
  partNumber = numero;
});

function checkForTildeFiles(ubicacion) {
  return fs.readdirSync(ubicacion).some((file) => file.includes("~"));
}

async function waitUntilFilesRemoved(ubicacion) { 
  while (!checkForTildeFiles(ubicacion)) {   
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Esperar 1 segundo
  }
}

//levanta archivos segun direccion enviada desde react a main y los formatea y graba en base de datos nedb

const userData = app.getAppPath(); // Obtén la ubicación de la aplicación

async function SaveFilesToDB(ubicacion) {

  let auxContador = 0;
  //console.log("ubicacion:", ubicacion, "userData", userData);
  const archivos = fs
    .readdirSync(ubicacion)
    .filter((file) => path.extname(file) === ".txt" && file.includes("_chr"));

  for (const archivo of archivos) {
    //await waitUntilFilesRemoved("C:\\Users\\vwari8y.VW\\Documents\\informesCZ\\prueba4\\Electron-React-NeDB\\data\\");
    let archivoTitulo = archivo.replace("_chr", "_hdr");

    // graba titulo + nombre de archivo
    let Titulo = fs.readFileSync(path.join(ubicacion, archivoTitulo), "utf8");
    const date = obtenerFechaMedicion(Titulo);
    const year = obtenerYearFromDate(date);
    const month = obtenerMonthFromDate(date);

    const dbPath = path.join(
      userData,
      `./data/${SubcadenaAGuionBajo(archivoTitulo)}_${year}_${month}.db`
    );

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, ""); // Crear archivo vacío
    }

    //console.log(quitarAcentos("Hóla Cáma ígual"))
    //---------------graba contenido
    let contenido = fs.readFileSync(path.join(ubicacion, archivo), "utf8");
    let tituloToDB = splitTextTitulo(Titulo, partNumber);
     
    //funcionando
    try {
      await saveTituloDataToDB(tituloToDB, dbPath);
    } catch (error) {
      console.error("Error 91:", error);
    }

    try {
      await saveContenidoDataToDB(
        convertLastFiveColumns(splitText(contenido)),
        partNumber,
        dbPath
      );
    } catch (error) {
      console.log("-- Error --");
    }

    //console.log("contando:", auxContador);
    auxContador++;
    partNumber++;
  }

  actualizarNumeroPartnb(partNumber);
  console.log("- termino -");

  //console.log("buscarArchivosEnCarpeta:",buscarArchivosEnCarpeta())
}

module.exports = {
  SaveFilesToDB
};

/*-------------------------- async y await -------------------
 Cuando se declara una función como async, automáticamente devuelve una promesa. 
 Esto significa que se puede utilizar await dentro de la función 
 para esperar a que se resuelva una promesa y obtener su resultado de forma sincrónica.
 
 Al utilizar la palabra clave await antes de una expresión de promesa, 
 la función se detiene en ese punto hasta que la promesa se resuelva o se rechace

Al llamar a una función async, se obtiene una promesa que representa la ejecución de la función. Esto permite utilizar métodos 
como .then() y .catch() para manejar la resolución o el rechazo de la promesa devuelta por la función async.
 */


