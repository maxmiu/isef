import * as dotenv from "dotenv";

dotenv.config();

import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { forceHttps, spaRedirect } from "./infrastructure/middleware";
import { isProd } from "./infrastructure/environment";
import {
    addIssue,
    clearIssues,
    seedIssues,
    getAllIssues,
    updateIssue, getIssueDetails
} from "./api/issues";
import { httpLogger } from "./infrastructure/http-logger";
import { log } from "./infrastructure/logger";
import { prismaClient } from "./db/client";
import { addComment } from "./api/comments";

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

    app.get(issuesApi, getAllIssues);
    app.get(`${issuesApi}/:id`, getIssueDetails);
    app.post(issuesApi, addIssue);
    app.put(`${issuesApi}/:id`, updateIssue);
    app.post(`${issuesApi}/:issueId/comments`, addComment);

    app.post(`${issuesApi}/seed`, seedIssues);
    app.post(`${issuesApi}/clear`, clearIssues);

    app.get('/api/health', (_: Request, res: Response) => {
        res.send('Application works!');
    });

    app.get('*', spaRedirect);

    app.listen(port, () => {
        log.i(`Application started on port ${port}`);
    });
}

main()
  .catch(console.error)
  .finally(async () => {
      await prismaClient.$disconnect();
  });

