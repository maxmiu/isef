import * as dotenv from "dotenv";

dotenv.config();

import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { forceHttps, spaRedirect } from "./infrastructure/middleware";
import { isProd } from "./infrastructure/environment";

const port = process.env.PORT || 4200;
const app = express();

if (isProd) {
    app.enable('trust proxy')
    app.use(forceHttps)
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.get('/api/health', (_: Request, res: Response) => {
    res.send('Application works!');
});

app.get('*', spaRedirect);

app.listen(port, () => {
    console.log(`Application started on port ${port}`)
});