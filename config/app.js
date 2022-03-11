import express from 'express';
import dotenv from 'dotenv';
import { Routes } from '../routes/routes.js';
import { Database } from '../config/database.js';

// initialize configuration
dotenv.config();

class App {

    app = express.application;
    routes = new Routes();
    db = new Database();

    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.app = express();
        this.config();
        await this.database()
        this.routes.routes(this.app);
    }

    config() {
        this.app.use(
            express.urlencoded({
            extended: true
        }));
        this.app.use(express.json())
    }

    async database() {
        let connection = await this.db.connection();
        console.log(connection.message)
    }
}

export default new App();
