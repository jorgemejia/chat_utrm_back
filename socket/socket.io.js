import express from 'express';
import { Server  } from 'socket.io';
import http from 'http';



export class SocketIo {

    startSocket(app = express.application) {
        const server = http.createServer(app);
        const io = new Server(server);

        io.on('connection', (socket) => {
           console.log('user connected', socket);
        });

    }
}
