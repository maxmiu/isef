import { Issue, NewIssue } from "../../../shared/issue";
import { prismaClient } from "./client";
import { Comment } from "../../../shared/comment";
import { User as UserEntity } from "@prisma/client"
import { User } from "../../../shared/user";

export const issuesRepository = {
    createIssue,
    deleteAllIssues,
    deleteAllComments,
    getAllIssues,
    getIssueById,
    updateIssue,
    createComment,
    touchIssue
}

async function createIssue(newIssue: NewIssue) {
    const assignee = newIssue.assignee ? {
        assignee: {
            create: {
                email: newIssue.assignee.email,
                name: newIssue.assignee.name,
            }
        }
    } : {};
    return await prismaClient.issue.create({
        data: {
            course: newIssue.course,
            description: newIssue.description,
            medium: newIssue.medium,
            state: newIssue.state,
            title: newIssue.title,
            type: newIssue.type,
            reporter: {
                create: {
                    email: newIssue.reporter.email,
                    name: newIssue.reporter.name
                }
            },
            ...assignee
        }
    });
}

async function getAllIssues(): Promise<Issue[]> {
    return await prismaClient.issue.findMany({
        include: {
            reporter: true,
            assignee: true,
            comments: {
                include: {
                    author: true
                }
            }
        }
    });
}

async function updateIssue(update: Issue): Promise<Issue> {
    const issueEntity = await getIssueById(update.id);
    if (!issueEntity) {
        throw new Error(`Issue ${update.id} not found!`);
    }
    return await prismaClient.issue.update({
        where: {
            id: update.id
        },
        include: {
            reporter: true,
            assignee: true,
            comments: {
                include: {
                    author: true
                }
            }
        },
        data: {
            assignee: update.assignee ? {
                create: {
                    name: update.assignee.name,
                    email: update.assignee.email
                }
            } : {delete: true},
            course: update.course,
            description: update.description,
            medium: update.medium,
            state: update.state,
            title: update.title,
            type: update.type,
        }
    });
}

async function getIssueById(id: number): Promise<Issue | null> {
    return await prismaClient.issue.findUnique({
          where: {id},
          include: {
              reporter: true,
              assignee: true,
              comments: {
                  include: {
                      author: true
                  }
              }
          }
      }
    );
}

async function deleteAllIssues() {
    return await prismaClient.issue.deleteMany({where: {}})
}

async function deleteAllComments() {
    await prismaClient.comment.deleteMany({where: {}})
}

async function touchIssue(issueId: number) {
    await prismaClient.issue.update({where: {id: issueId}, data: {updatedAt: new Date()}});
}

async function createComment(issueId: number, comment: Comment) {
    const author = await getOrCreateUser(comment.author);
    await prismaClient.comment.create({
        data: {
            content: comment.content,
            authorId: author.id,
            issueId,
        }
    })
}

async function getOrCreateUser(user: User): Promise<UserEntity> {
    const existingUser = await prismaClient.user.findFirst({where: {email: user.email}});
    if (existingUser) {
        return existingUser;
    }
    return await prismaClient.user.create({data: user});
}
