import "reflect-metadata";
import * as express from "express";
import * as cors from 'cors'
import * as session from 'express-session'
import * as fs from 'fs';
import * as https from 'https';
import { appDataSource } from "./dataSource";

import authentificationRouter from './route/authentificationRouter'
import userRouter from './route/userRouter'
import adminRouter from './route/adminRouter'
import vaccinesRouter from './route/vaccinesRotuer'
import criminalProceeding from './route/criminalProceeding'
import idCardsRouter from './route/idCardsRouter';
import { User } from "./entity/User";


appDataSource.initialize().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }))
    app.use(session({
        secret: 'adsfdghsgearfsgrdthftehetrt',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: true
        }
    }))
    app.use('/auth', authentificationRouter)

    app.use((request, response, next) => {
        const user = (request.session as any).user as User | undefined;
        if (!user || user.blocked) {
            response.status(401).json({ error: 'Unauthorized' })
            return;
        }
        next();
    });

    app.use('/vaccines', vaccinesRouter);
    app.use('/admin', adminRouter);
    app.use('/user', userRouter);
    app.use('/criminalProceeding', criminalProceeding);
    app.use('/id-card', idCardsRouter)
    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)

    server.listen(8000, () => {
        console.log('Server is listening');
    })

}).catch(error => console.log(error));
