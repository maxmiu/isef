import { Request, Response } from "express";
import { issuesRepository } from "../db/repository";
import { NewComment } from "../../../shared/comment";

export const addComment = async (req: Request<NewComment>, res: Response) => {
    try{
        const issueId = parseInt(req.params["issueId"]);
        const newComment = req.body;
        await issuesRepository.createComment(issueId, newComment);
        res.sendStatus(204);
    } catch (e){
        console.log(e)
        res.sendStatus(404);
    }
}
