import { Course } from "./course";
import { State } from "./state";
import { Type } from "./type";
import { User } from "./user";
import { Comment } from "./comment";

export type NewIssue = Omit<Issue, "id">;

export type Issue = {
  id: number;
  course: Course;
  createdAt: Date;
  description: string;
  reporter: User;
  state: State;
  title: string;
  type: Type;
  updatedAt: Date;
  comments: Comment[];
}
