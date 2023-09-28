const { app, BrowserWindow } = require("electron");

const { ipcMain } = require("electron");

const { SaveFilesToDB } = require("./services/database/FilesToDb");

const {
  readFilesInFolder,
  readFileInFolder
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

// carga de archivos en base de datos con llamada activada pedida desde react
/*ipcMain.on("direccion", (event, ubicacion) => {
  console.log("hasta aca llego..", ubicacion);
  // SaveFilesToDB(ubicacion);
  //console.log("ubicacion:", ubicacion);
});
*/



function SaveFile() {
  const userData = app.getAppPath();
  const dbFolder = path.join(userData, `./InformesSinProcesar/`);
  SaveFilesToDB(dbFolder);
}





//---------------- one Msj recib one msj send---------------------------------------------------------------

ipcMain.on("msjToMainName", (event, request) => {
  console.log("request completo: ", request.MSJREQUEST);

  const REQUEST_FROM_FRONT = {
    A: () => {console.log("valor", request.DATO1);return request.DATO1;},
    B: () => {console.log("file:", request.DATO1);SaveFile() /* console.log("file content:", recoverDatafromDB(request.DATO1)) */    },
    C: () => {},
    D: () => {},
    E: () => {return buscarArchivosEnCarpeta();}
  };

  const REQUEST_DEFAULT = "-NULL-";

  // llamado a funcion con ternario

  const requestResult = REQUEST_FROM_FRONT[request.MSJREQUEST]
    ? REQUEST_FROM_FRONT[request.MSJREQUEST]()
    : REQUEST_DEFAULT;

  //mainWindow.webContents.send("msjToRenderName", requestResult);
  event.reply("msjToRenderName", requestResult);
});

function recoverDatafromDB(dbFile) {
  return new Promise(async (resolve) => {
    const userData = app.getAppPath(); // Obtén la ubicación de la aplicación
    //console.log("userData:", userData);
    const dbFolder = path.join(userData, `./data/`);
    //console.log("---------------------------------------dbFolder:", dbFolder);
    //const dbFolder = "../../../../data/"; // Cambia esto a la ruta correcta
    const fileData = await readFileInFolder(dbFolder, dbFile);
    console.log("probando:", dbFolder, dbFile, fileName);
    //resolve(fileData);
  });
}

//---------------------------------------------------------------------------------

/*ipcMain.on("obtener-mensaje2", async (event) => {
  await obtenerRegistrosEncontrados()
    .then((registrosEncontrados) => {
      // Aquí podemos acceder a los datos en la variable registrosEncontrados
      event.sender.send(
        "dateTimePartnbPathFromFile_Main_to_App",
        registrosEncontrados
      );
    })
    .catch((error) => {
      console.error("Error al obtener registros:", error);
    });
});
*/

//---------------------- mensaje 1 start-----------------------------------
// Función asincrónica que retorna una promesa con un mensaje

//-----------------------mensaje 1 end ------------------------------------

// Función asincrónica que retorna una promesa con un mensaje

/*function doSomethingAsync2() {
  return new Promise(async (resolve) => {
    const userData = app.getAppPath(); // Obtén la ubicación de la aplicación
    console.log("userData:", userData);
    const dbFolder = path.join(userData, `./data/`);
    console.log("---------------------------------------dbFolder:", dbFolder);
    //const dbFolder = "../../../../data/"; // Cambia esto a la ruta correcta
    const fileData = await readFilesInFolder(dbFolder);
    resolve(fileData);
  });
}*/

//-----------------------MSJ_filesDB_on_Carpet_Data---------------------Start
/*
ipcMain.on("LISTENER_SEARCH_FILE_DATA_CARPET", async (event) => {
  try {
    const msj = await buscarArchivosEnCarpeta();
    console.log("msj------------->", msj);
    event.sender.send("SEND_RESULT__SEARCH_FILE_DATA_CARPET", msj);
  } catch (error) {
    enviarMensajeDeError(event, "Error al obtener el mensaje");
  }
});*/
//-----------------------MSJ_filesDBonData------------------END
