const { comprobarJWT } = require("../helpers");
const {ChatMensajes} = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async(socket, io) => {
    const usuario = await comprobarJWT(socket.handshake.headers['x-token'])

    if(!usuario) {
        return socket.disconnect();
    }

    /* no hace falta el broadcast por la referencia a io y en el controlador */
    /* Agregar el usuario conectado */
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);

    /* limpiar cuando alguien se desconecta */
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });
}

module.exports = {
    socketController
}