import express from 'express';
import { Socket, Server  } from 'socket.io'



export class SocketIo {

    startSocket(app = express.application) {
        const io = new Server(app);

    }
}
