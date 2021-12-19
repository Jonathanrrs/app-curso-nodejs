const { comprobarJWT } = require("../helpers");

const socketController = async(socket) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])

    if(!usuario) {
        return socket.disconnect();
    }

    console.log('se conectó', usuario.nombre);
}

module.exports = {
    socketController
}