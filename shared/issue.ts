import { Course } from "./course";
import { State } from "./state";
import { Type } from "./type";
import { User } from "./user";
import { Comment } from "./comment";

export type NewIssue = Omit<Issue, "id"|"createdAt"|"updatedAt">;

export type Issue = {
  id: number;
  assignee: User | null | undefined;
  comments: Comment[];
  course: Course | string;
  createdAt: Date;
  description: string;
  reporter: User;
  state: State;
  title: string;
  type: Type;
  updatedAt: Date;
}
