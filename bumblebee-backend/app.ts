import express, { Express, Request, Response , Application } from 'express';
const cors = require('cors');
const mongoose = require('mongoose');
import dotenv from 'dotenv';

//For env File
dotenv.config({path: 'application.env'});

const app: Application = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URL as string).then(() => { console.log('DB connected')});

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Bumblebee backend');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});