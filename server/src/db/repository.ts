import { NewIssue } from "../../../shared/issue";
import { prismaClient } from "./client";

export const createIssue = async (newIssue: NewIssue) => {
    await prismaClient.issue.create({
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

export const getAllIssues = async () => await prismaClient.issue.findMany({
    include: {reporter: true, comments: true}
});

export const getIssueById = async (id: number) => await prismaClient.issue.findUnique({where: {id}});

export const clearIssues = async () => await prismaClient.issue.deleteMany({where: {}})