export async function RequestMsj(MSJ) {
  return new Promise(async (resolve, reject) => {
    try {
      await window.electron.sendToMain("msjToMainName", MSJ);
      window.electron.receiveFromMain("msjToRenderName", (data) => {
        //console.log("respuesta", data);
        resolve(data); // Resuelve la promesa con los datos recibidos
      });
    } catch (error) {
      console.error("Error al enviar o recibir el mensaje:", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}

export default { RequestMsj };
