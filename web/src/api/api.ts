import axios from "axios";
import { NewIssue, Issue } from "../../../shared/issue";
import { NewComment } from "../../../shared/comment";
import { User } from "../../../shared/user";

const url = import.meta.env.VITE_API_URL;

export const api = {
    addIssue: async (issue: NewIssue): Promise<{id: number}> => await post(`${url}/issues`, issue),
    getIssue: async () => await get<Issue[]>(`${url}/issues`),
    updateIssue: async (update: Issue) => await put(`${url}/issues/${update.id}`, update),
    getIssueDetails: async (id?: string) => await get<Issue>(`${url}/issues/${id}`),
    getOwnIssues: async (me: User) => await post<Issue[]>(`${url}/issues/own`, me),

    addComment: async (issueId: number, comment: NewComment) => await post(`${url}/issues/${issueId}/comments`, comment),

    seedIssues: async () => await post(`${url}/issues/seed`, null),
    clearIssues: async () => await post(`${url}/issues/clear`, null),
}

async function put<T>(url: string, body: any): Promise<T> {
    const response = await axios.put(url, body);
    return response.data as T;
}

async function post<T>(url: string, body: any): Promise<T> {
    const response = await axios.post(url, body);
    return response.data as T;
}

async function del<T>(url: string, body: any): Promise<T> {
    const response = await axios.delete(url, body);
    return response.data as T;
}

async function get<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    return response.data as T;
}