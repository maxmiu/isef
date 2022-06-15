import * as dotenv from "dotenv";

dotenv.config();

import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { forceHttps, spaRedirect } from "./infrastructure/middleware";
import { isProd } from "./infrastructure/environment";
import { addIssue, getIssue, seedIssues } from "./api/issues";
import { httpLogger } from "./infrastructure/http-logger";
import { log } from "./infrastructure/logger";
import { prismaClient } from "./db/client";

async function main() {
    const port = process.env.PORT || 4200;
    const app = express();

    if (isProd) {
        app.enable('trust proxy');
        app.use(forceHttps);
    }

    app.use(cors());
    app.use(express.json());
    app.use(httpLogger);

    app.use(express.static('public'));

    const issuesApi = "/api/issues";

    app.post(`${issuesApi}/seed`, seedIssues);
    app.post(issuesApi, addIssue);
    app.get(issuesApi, getIssue);

    app.get('/api/health', (_: Request, res: Response) => {
        res.send('Application works!');
    });

    app.get('*', spaRedirect);

    app.listen(port, () => {
        log.i(`Application started on port ${port}`);
    });
}

main()
  .catch(log.e)
  .finally(async () => {
      await prismaClient.$disconnect();
  });

