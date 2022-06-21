import { User } from "./user";

export type NewComment = Omit<Comment, "id"|"createdAt">;

export type Comment = {
    id: number;
    content: string;
    author: User;
    createdAt: Date;
}