import express from 'express';
import dotenv from 'dotenv'
import { Routes } from '../routes/routes.js'

const app = express();
// initialize configuration
dotenv.config();

class App {

    app = express.application;
    routes = new Routes();

    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }

    config() {
        this.app.use(
            express.urlencoded({
            extended: true
        }));
        this.app.use(express.json())
    }
}

export default new App();
