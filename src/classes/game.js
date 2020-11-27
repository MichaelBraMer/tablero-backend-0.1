class Game {

    constructor() {
        this.games = [];
    }

    agregarJuego(jugadores) {
        var codigo = '';
        while (this.getGame(codigo) !== undefined || codigo === '') {
            codigo = this.generarCodigo();
        }

        let game = { codigo, jugadores, mensajes: [], ronda: 0, turno: 0, juego: 0 };

        this.games.push(game);

        return game.codigo;
    }

    unirseAJuego(codigo, jugador) {
        let game = this.games.filter(game => game.codigo === codigo);
        if (game.length === 0) {
            return undefined;
        }
        let players = game[0].jugadores;
        players.push(jugador);
        this.games = this.games.map(game => {
            if (game.codigo === codigo) {
                return { ...game, jugadores: players }
            } else {
                return game;
            }
        })
        return game.codigo;
    }

    getGame(codigo) {
        let game = this.games.filter(game => game.codigo === codigo);
        if (game.length === 0) {
            return undefined;
        }
        return game[0];
    }

    getGames() {
        return this.games;
    }

    getJugador(id, codigo) {
        let game = this.games.filter(game => game.codigo === codigo);
        if (game.length === 0) {
            return undefined;
        }
        let jugador = game[0].jugadores.filter(jugador => jugador.id === id);
        if (jugador.length === 0) {
            return undefined;
        }
        return jugador[0];
    }

    getJugadores(codigo) {
        let game = this.games.filter(game => game.codigo === codigo);
        if (game.length === 0) {
            return undefined;
        }
        let jugadores = game[0].jugadores
        return jugadores;
    }

    borrarGame(codigo) {

        let gameBorrado = this.getGame(codigo);

        this.games = this.games.filter(game => game.codigo != codigo);

        return gameBorrado;

    }

    borrarJugadorAJuego(id) {
        let current;
        let currentGame;
        this.games.forEach(game => {
            game.jugadores.forEach(jugador => {
                if (jugador.id === id) {
                    current = game.jugadores;
                    currentGame = game;
                }
            });
        });
        if (current) {
            current = this.removeItemFromArr(current, id);

            this.games.map(game => {
                game.jugadores.forEach(jugador => {
                    if (jugador.id === id) {
                        game.jugadores = current;
                    }
                });
            })
        }
        if (current && currentGame) {
            return currentGame.codigo;
        } else {
            return undefined;
        }
    }

    enviarMensaje(codigo, msj) {
        this.game = this.games.map(game => {
            if (game.codigo === codigo) {
                return {
                    ...game,
                    mensajes: game.mensajes.push(msj),
                }
            } else {
                return game;
            }
        })
        return codigo;
    }

    siguienteJuego(codigo) {
        this.games = this.games.map(game => {
            if (game.codigo === codigo) {
                if (game.turno < game.jugadores.length) {
                    console.log('if', {
                        ...game,
                        turno: game.turno++,
                        juego: game.juego++
                    })
                    return {
                        ...game,
                        turno: game.turno++,
                        juego: Math.round(Math.random() * (121 - 0) + 0)
                    }
                }
                console.log('else', {
                    ...game,
                    ronda: game.ronda++,
                    turno: 1,
                    juego: game.juego++
                })
                let juego = {
                    ...game,
                    ronda: game.ronda++,
                    turno: 1,
                    juego: Math.round(Math.random() * (121 - 0) + 0)
                }
                return juego;

            } else {
                return game;
            }
        })
        return codigo;
    }

    generarCodigo() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    removeItemFromArr(arr, item) {
        var i = arr.map(index => index.id).indexOf(item);

        if (i !== -1) {
            arr.splice(i, 1);
        }
        return arr;
    }
}

module.exports = {
    Game
}