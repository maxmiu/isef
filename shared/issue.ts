import { Course } from "./course";
import { State } from "./state";
import { Type } from "./type";
import { User } from "./user";
import { Comment } from "./comment";

export type NewIssue = Omit<Issue, "id">;

export type Issue = {
  id: number;
  course: Course;
  description: string;
  reporter: User;
  state: State;
  created: Date;
  title: string;
  type: Type;
  comments: Comment[];
}
