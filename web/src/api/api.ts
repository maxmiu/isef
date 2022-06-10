import axios from "axios";
import { NewIssue, Issue } from "../../../shared/issue";

const url = import.meta.env.VITE_API_URL;

export const api = {
    addIssue: async (issue: NewIssue) => await post(`${url}/issues`, issue),
    getIssue: async () => await get<Issue[]>(`${url}/issues`),
    getIssueDetails: async (id?: string) => await get<Issue>(`${url}/issues/${id}`),
    seedIssues: async () => await post(`${url}/issues/seed`, null),
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