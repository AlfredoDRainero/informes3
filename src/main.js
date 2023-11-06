const { app, BrowserWindow } = require("electron");

const { ipcMain } = require("electron");

const { SaveFilesToDB } = require("./services/database/FilesToDb");

const {
  readFilesInFolder,
  readFilesDataWithDay,
  readFilesData,
  readFileData,
  readFileMeasurement
} = require("../src/services/database/LoadDatabase_BSQLITE3");

const path = require("path");

const { 
  buscarArchivosEnCarpeta,
  SearchFilesFolderByYearMonth
 } = require("./services/files/files");



// Handle creating/removing shortcuts on Windows when installing/uninstalling.

// Create the browser window.

let mainWindow;



const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, './preload.js'),
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.






//---------------- one Msj recib one msj send---------------------------------------------------------------

ipcMain.on("msjToMainName", async (event, request) => {
  console.log("request completo: ", request.MSJREQUEST);

  const responseChannel = request.responseChannel;

  const REQUEST_FROM_FRONT = {
    A: () => {console.log("valor", request.DATO1);return request.DATO1;},//ejemplo
    B: () => {SaveFile()},// carga de archivos en base de datos con llamada activada pedida desde react
    C: () => {},
    D: () => {},
    E: () => {return buscarArchivosEnCarpeta();},
    F: () => {try { return recoverDataFilesfromDBFile(request.DATO1);} catch (error) { console.error("Error:", error); throw error;}}, //datos de filas  
    G: () => {try { return recoverMeasurementsFromDBFileAndPartnb(
      request.DATO2, 
      request.DATO1, 
      request.DATO3);} catch (error) { console.error("Error:", error); throw error;}},//medidas de un archivo
      
    H: () => {try { return recoverDataFromDBFileAndPartnb(
      request.DATO2, 
      request.DATO1, 
      request.DATO3);} catch (error) { console.error("Error:", error); throw error;}}, //datos de un archivo

    I: () => {try { return recoverDataFilesfromDBFiles(SearchFilesFolderByYearMonth(
      request.DATO1,
      request.DATO2),
      request.DATO1+"-"+request.DATO2+"-"+request.DATO3,
      request.DATO4);// year/month/day

    } catch (error) { 
      console.error("Error:", error); throw error;}}, //datos de filas 
    };

  const REQUEST_DEFAULT = "-NULL-";

  // llamado a funcion con ternario
  const requestResult = REQUEST_FROM_FRONT[request.MSJREQUEST]
    ? await REQUEST_FROM_FRONT[request.MSJREQUEST]()
    : REQUEST_DEFAULT;

  // Envía la respuesta de vuelta al canal único
  event.reply(responseChannel, requestResult);
});




async function recoverDataFilesfromDBFiles(dbFiles,dayQuery,shiftQuery) {
  try {
    //console.log("dbFiles:",dbFiles)
    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');
    const resultObj = {};
    for (const key in dbFiles) {
      if (dbFiles.hasOwnProperty(key)) {
        const dbFile = dbFiles[key];
        //console.log("--dbFile:",dbFile)
        const dbFileString = dbFile.nombre;
        const fileData = await readFilesDataWithDay(dbFolder, dbFileString,dayQuery,shiftQuery);
        //console.log("-------------------fileData:",fileData)
        resultObj[key] = fileData;
        resultObj[key].file = dbFileString;
      }
      
    }

    //-----------esto solo es para imprimir en consola para chequear que se cargo.. despues borrar----
    /*for (const key in resultObj) {
      if (resultObj.hasOwnProperty(key)) {
        const data = resultObj[key].data;
    
        console.log(`Contenido de resultObj['${key}']:`);
        data.forEach((element, index) => {
          console.log(`  Elemento ${index}:`, element);
        });
        
      }
    }
    
    for (const key in resultObj) {
      if (resultObj.hasOwnProperty(key)) {
        const dbFileString = resultObj[key].file;
        //console.log(dbFileString);
      }
    }*/

    
    //-----------------------------------------------------------------------

    return resultObj;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}



async function recoverDataFilesfromDBFile(dbFile) {
  try {    
    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');    
    const fileData = await readFilesData(dbFolder, dbFile);
    //console.log("-------------------fileData:",fileData)
    return fileData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


async function recoverMeasurementsFromDBFileAndPartnb(dbFile,partnb) {
  try {    
    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');    
    const fileData = await readFileMeasurement(dbFolder, dbFile, partnb);
    //console.log("fileData",fileData)
    return fileData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function recoverDataFromDBFileAndPartnb(dbFile,partnb) {
  try {  
    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');    
    const fileData = await readFileData(dbFolder, dbFile, partnb);
    //console.log("fileData",fileData)
    return fileData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


function SaveFile() {
  const userData = app.getAppPath();
  const dbFolder = path.join(userData, `./InformesSinProcesar/`);
  SaveFilesToDB(dbFolder);
}


