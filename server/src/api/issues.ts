import { Request, Response } from "express";
import { seedIssues as seedTicketsAction } from "../../../shared/seeder/issue-seeder";
import { Issue, NewIssue } from "../../../shared/issue";
import { issuesRepository } from "../db/repository";
import { sendIssueUpdate } from "../mail/issueUpdate";
import { User } from "../../../shared/user";
import { log } from "../infrastructure/logger";

export const seedIssues = async (_, res: Response) => {
    const newIssues = seedTicketsAction();
    for (const issue of newIssues) {
        const createdIssue = await issuesRepository.createIssue(issue);

        for (const comment of issue.comments) {
            await issuesRepository.createComment(createdIssue.id, comment);

        }
    }
    res.sendStatus(200);
}

export const clearIssues = async (_, res: Response) => {
    await issuesRepository.deleteAllComments();
    await issuesRepository.deleteAllIssues();
    res.sendStatus(200);
}

export const updateIssue = async (req: Request<Issue>, res: Response) => {
    try {
        const update = req.body as Issue;
        const updatedIssue = await issuesRepository.updateIssue(update);
        await sendIssueUpdate(updatedIssue);
        res.json(updatedIssue);
    } catch(e) {
        log.e(e)
        res.sendStatus(404);
    }
}

export const getOwnIssues = async (req: Request<User>, res: Response) => {
    const currentUser = req.body;
    const allIssues = await issuesRepository.getAllIssues();
    const ownIssues = allIssues.filter((i) => i.reporter.email === currentUser.email || i.assignee?.email === currentUser.email);
    res.json(ownIssues);
}

export const getAllIssues = async (_, res: Response) => {
    const allIssues = await issuesRepository.getAllIssues();
    res.json(allIssues);
}

export const getIssueDetails = async (req: Request, res: Response) => {
    const ticketId = parseInt(req.params["id"]);
    if (!ticketId) {
        res.sendStatus(400);
        return;
    }

    const issue = await issuesRepository.getIssueById(ticketId);
    if (!issue) {
        res.sendStatus(404);
        return;
    }
    res.json(issue);
}

export const addIssue = async (req: Request<NewIssue>, res: Response) => {
    const newIssue = req.body;
    const createdIssue = await issuesRepository.createIssue(newIssue);
    res.json({id: createdIssue.id})
}