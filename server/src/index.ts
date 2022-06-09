import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import {Request, Response} from 'express';
import cors from 'cors';

const port = process.env.PORT || 4200;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

app.listen(port, () => {
    console.log(`Application started on port ${port}`)
});