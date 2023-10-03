export async function RequestMsj(MSJ) {
  return new Promise(async (resolve, reject) => {
    try {
      const responseChannel = `response-${Math.random().toString(36).substr(2, 9)}`; // genera un chanel unico para enviar y recibir un mensaje
      console.log("responseChannel",responseChannel)
      // Escucha la respuesta en el canal único
      await window.electron.receiveFromMain(responseChannel, (data) => {
        console.log("data:",data)
        resolve(data); // Resuelve la promesa con los datos recibidos
      });

      // Envía la solicitud al proceso principal con el canal y datos
      await window.electron.sendToMain("msjToMainName", { ...MSJ, responseChannel });
    } catch (error) {
      console.error("Error al enviar o recibir el mensaje:", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}

export default { RequestMsj };
