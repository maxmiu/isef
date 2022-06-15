import { Request, Response } from "express";
import { seedIssues as seedTicketsAction } from "../../../shared/seeder/issue-seeder";
import { NewIssue } from "../../../shared/issue";
import { getAllIssues, getIssueById, createIssue } from "../db/repository";

export const seedIssues = async (_, res: Response) => {
    const newIssues = seedTicketsAction();
    for (const issue of newIssues){
        await createIssue(issue);
    }
    res.sendStatus(200);
}

export const getIssue = async (_, res: Response) => {
    const allIssues = await getAllIssues();
    res.json(allIssues);
}

export const getIssueDetails = async (req: Request, res: Response) => {
    const ticketId = parseInt(req.params["id"]);
    if (!ticketId) {
        res.sendStatus(400);
        return;
    }

    const issue = await getIssueById(ticketId);
    if (!issue) {
        res.sendStatus(404);
        return;
    }
    res.json(issue);
}

export const addIssue = async (req: Request<NewIssue>, res: Response) => {
    const newIssue = req.body;
    await createIssue(newIssue);
    res.sendStatus(200);
}