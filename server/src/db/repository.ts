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
    return await prismaClient.issue.create({
        data: {
            title: newIssue.title,
            description: newIssue.description,
            course: newIssue.course,
            state: newIssue.state,
            type: newIssue.type,
            reporter: {
                create: {
                    email: newIssue.reporter.email,
                    name: newIssue.reporter.name
                }
            }
        }
    });
}

async function getAllIssues() {
    return await prismaClient.issue.findMany({
        include: {reporter: true, comments: true}
    });
}

async function updateIssue(update: Issue) {
    const issueEntity = await getIssueById(update.id);
    if (!issueEntity) {
        throw new Error(`Issue ${update.id} not found!`);
    }
    return await prismaClient.issue.update({
        where: {
            id: update.id
        },
        data: {
            course: update.course,
            description: update.description,
            state: update.state,
            title: update.title,
            type: update.type,
        }
    });
}

async function getIssueById(id: number) {
    return await prismaClient.issue.findUnique({
          where: {id},
          include: {
              reporter: true,
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
