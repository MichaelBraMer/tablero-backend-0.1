import { io } from '../server';
import { Game } from '../classes/game';

const games = new Game();

io.on('connect', (client) => {

    client.on('crearJuego', (nombre, callback) => {
        if (!nombre) {
            return callback({
                error: 'El nombre'
            });
        }

        let codigo = games.agregarJuego([{ id: client.id, nombre, posicion: 0 }]);
        client.join(codigo);
        callback({ juego: games.getGame(codigo), jugador: games.getJugador(client.id, codigo) });
    });

    client.on('unirseJuego', (data, callback) => {
        if (!data.nombre || !data.codigo) {
            return callback({
                error: 'El nombre/codigo es necesario'
            });
        }
        client.join(data.codigo);
        games.unirseAJuego(data.codigo, { id: client.id, nombre: data.nombre, posicion: 0 });
        client.broadcast.to(data.codigo).emit('listaJugadores', games.getGame(data.codigo));
        callback({ juego: games.getGame(data.codigo), jugador: games.getJugador(client.id, data.codigo) });
    });

    client.on('enviarMensaje', (data, callback) => {
        if (!data.mensaje || !data.nombre) {
            return callback({
                error: 'El nombre/mensaje es necesario'
            });
        }
        const date = new Date();
        games.enviarMensaje(data.codigo, { id: client.id, nombre: data.nombre, mensaje: data.mensaje, date });
        client.broadcast.to(data.codigo).emit('listaMensajes', games.getGame(data.codigo));
        
        callback(games.getGame(data.codigo));
    });

    client.on('siguienteJuego', (codigo, callback) => {
        if (!codigo) {
            return callback({
                error: 'El codigo es necesario'
            });
        }
        const cod= games.siguienteJuego(codigo);
        client.broadcast.to(codigo).emit('continuarJuego', games.getGame(codigo));
        callback(games.getGame(cod));
    });

    client.on('disconnect', () => {
        let codigo = games.borrarJugadorAJuego(client.id)
        client.broadcast.to(codigo).emit('listaJugadores', games.getGame(codigo));
    });
});