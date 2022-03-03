import express from 'express';
import cors from  'cors';
import http from 'http';
import dotenv from 'dotenv';
import { Routes } from '../routes/routes.js';
import { Database } from '../config/database.js';
import { SocketIo } from '../socket/socket.io.js'
import { Server  } from 'socket.io';

// initialize configuration
dotenv.config();

class App {

    app = express.application;
    routes = new Routes();
    db = new Database();
    socket = new SocketIo();
    http = null;
    io = null;

    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.app = express();
        this.config();
        this.http = http.createServer(this.app);
        await this.database();
        this.routes.routes(this.app);
        // this.io = new Server(this.http, { cors: {
        //     origin: '*', methods: ["GET", "POST"]
        // }});
        this.socket.startSocket(this.http)
    }

    config() {
        this.app.use(
            express.urlencoded({
            extended: true
        }));

        this.app.use(express.json());

        this.app.use(cors({ origin: '*' }));

    }

    async database() {
        let connection = await this.db.connection();
        console.log(connection.message)
    }
}

export default new App();
