import { Request, Response } from "express";
import { issuesRepository } from "../db/repository";
import { NewComment } from "../../../shared/comment";
import { sendIssueUpdate } from "../mail/issueUpdate";

export const addComment = async (req: Request<NewComment>, res: Response) => {
    try {
        const issueId = parseInt(req.params["issueId"]);
        const issue = await issuesRepository.getIssueById(issueId);
        if (!issue) {
            res.sendStatus(404);
            return;
        }
        const newComment = req.body;
        await issuesRepository.createComment(issueId, newComment);
        await issuesRepository.touchIssue(issueId);
        await sendIssueUpdate(issue);
        res.sendStatus(204);
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
}
