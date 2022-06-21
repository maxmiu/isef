import { User } from "./user";
import { Issue } from "./issue";

export type NewComment = Omit<Comment, "id">;

export type Comment = {
    id: number;
    content: string;
    author: User;
    issue: Issue;
}