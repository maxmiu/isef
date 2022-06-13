import { Request, Response } from "express";
import { seedIssues as seedTicketsAction } from "../../../shared/seeder/issue-seeder";
import { NewIssue, Issue } from "../../../shared/issue";

let issues: Issue[] = [];

export const seedIssues = (_, res: Response) => {
    issues = seedTicketsAction();
    res.sendStatus(200);
}

export const getIssue = (_, res: Response) => {
    res.json(issues);
}

export const getIssueDetails = (req: Request, res: Response) => {
    const ticketId = parseInt(req.params["id"]);
    if (!ticketId) {
        res.sendStatus(400);
        return;
    }

    const ticket = issues.filter(t => t.id === ticketId)[0];
    if (!ticket) {
        res.sendStatus(404);
        return;
    }
    res.json(ticket);
}

export const addIssue = (req: Request<NewIssue>, res: Response) => {
    const newTicket = req.body;
    newTicket.id = issues.length + 1;
    issues.push(newTicket)
    res.sendStatus(200);
}