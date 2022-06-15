import { Request, Response } from "express";
import { seedIssues as seedIssuesAction } from "../../../shared/seeder/issue-seeder";
import { NewIssue, Issue } from "../../../shared/issue";

let issues: Issue[] = [];

export const seedIssues = (_, res: Response) => {
    issues = seedIssuesAction();
    res.sendStatus(200);
}

export const getIssue = (_, res: Response) => {
    res.json(issues);
}

export const getIssueDetails = (req: Request, res: Response) => {
    const issueId = parseInt(req.params["id"]);
    if (!issueId) {
        res.sendStatus(400);
        return;
    }

    const issue = issues.filter(t => t.id === issueId)[0];
    if (!issue) {
        res.sendStatus(404);
        return;
    }
    res.json(issue);
}

export const addIssue = (req: Request<NewIssue>, res: Response) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    issues.push(newIssue)
    res.sendStatus(200);
}