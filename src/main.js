const { app, BrowserWindow } = require("electron");

const { ipcMain } = require("electron");

const { SaveFilesToDB } = require("./services/database/FilesToDb");

const {
  readFilesInFolder,
  readFileData,
  readFileMeasurement
} = require("../src/services/database/LoadDatabase_BSQLITE3");

const path = require("path");

const { buscarArchivosEnCarpeta } = require("./services/files/files");



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
    F: () => {try { return recoverDataFilesfromDBFile(request.DATO1);} catch (error) { console.error("Error:", error); throw error;}},   
    G: () => {try { return recoverMeasurementsfromDBFileAndPartnb(request.DATO2, request.DATO1);} catch (error) { console.error("Error:", error); throw error;}}  
  };

  const REQUEST_DEFAULT = "-NULL-";

  // llamado a funcion con ternario
  const requestResult = REQUEST_FROM_FRONT[request.MSJREQUEST]
    ? await REQUEST_FROM_FRONT[request.MSJREQUEST]()
    : REQUEST_DEFAULT;

  // Envía la respuesta de vuelta al canal único
  event.reply(responseChannel, requestResult);
});


async function recoverDataFilesfromDBFile(dbFile) {
  try {    
    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');    
    const fileData = await readFileData(dbFolder, dbFile);
    return fileData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function recoverMeasurementsfromDBFileAndPartnb(dbFile,partnb) {
  try {    

    const userData = app.getAppPath();
    const dbFolder = path.join(userData, './data/');    
    const fileData = await readFileMeasurement(dbFolder, dbFile, partnb);
    console.log("fileData",fileData)
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


