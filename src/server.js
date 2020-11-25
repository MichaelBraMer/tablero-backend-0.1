import './helpers/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import MethodOverride from 'method-override';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import http from 'http';
const index = require("./index");

const app = express();
app.use(index);
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(MethodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);

module.exports.io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

require('./sockets/socket');

server.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})
