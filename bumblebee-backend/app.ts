import express, {Express, Request, Response, Application, ErrorRequestHandler, NextFunction} from 'express';
const cors = require('cors');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
import dotenv from 'dotenv';
const userRouter = require('./routes/userRoutes');

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}
//For env File
dotenv.config({path: 'application.env'});

const app: Application = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URL as string).then(() => { console.log('DB connected')});

const store = new MongoDBStore({ uri: process.env.DATABASE_URL as string,
    database: 'bumblebee', collections: 'sessions'});

app.use(express.json());
app.use(cors({credentials: true, origin: ['http://localhost:3000']}));
app.use(cookieParser());
app.use(session({

    // It holds the secret key for session
    secret: process.env.SESSION_SECRET,

    // Forces the session to be saved
    // back to the session store
    resave: false,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: false,
    store: store,
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Bumblebee backend');
});



app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

app.use('/user', userRouter);
app.use(errorHandler);
export default app;

declare module 'express-session' {
    interface SessionData {
        userEmail: string,
        test: string;
    }
}