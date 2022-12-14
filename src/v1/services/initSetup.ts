import { app } from "../server";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import { config } from "../config/setup";
import owner from "../routes/owner";
import project from "../routes/project";
import request from "../routes/request";
import email from "../routes/email";

export function serverSetup() {

    // * Middlewares setup before routes setup
    middlewareSetup();

    // * Routes setup
    routesSetup();

    // * Database and start server
    databaseSetup();

}

export function databaseSetup() {

    const { URI } = config;

    mongoose.connect(URI);

    mongoose.connection.on('error', (err) => {
        console.log(`Error connecting to database: ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log("Successfully connected to the database");
        serverInit();
    });

}

function serverInit() {

    const { PORT } = config;

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    }).on('error', (err: string) => {
        console.error(`Error starting server: ${err}`);
    });

}

export function middlewareSetup() {

    // * Body Parser
    app.use(bodyParser.json());

    // * Cors
    app.use(cors());

    // * Morgan
    app.use(morgan('dev'));

}

function routesSetup() {

    // * Owner routes
    app.use('/owner', owner);

    // * Project routes
    app.use('/project', project);

    // * Request routes
    app.use('/request', request);

    // * Email routes
    app.use('/email', email);

}