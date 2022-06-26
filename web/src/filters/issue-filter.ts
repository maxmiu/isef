import { Issue } from "../../../shared/issue";

type IssueProperty = keyof Issue;

const issuesFilterProperties: IssueProperty[] = ['state', 'type', 'title', 'course', 'description'];

export function filterIssuesBySearchValue(issue: Issue, searchValue: string): boolean {
    if (!searchValue) {
        return true;
    }

    const multipleSearchValueParts = searchValue.split(' ');

    if (multipleSearchValueParts.length > 1) {
        return filterRecursive(issue, multipleSearchValueParts);
    }

    const lowerCaseSearchValue = searchValue.toLowerCase();
    if (issue.reporter.name?.toLowerCase().includes(lowerCaseSearchValue)) {
        return true;
    }

    for (const property of issuesFilterProperties) {
        if (issue[property]?.toString().toLowerCase().includes(lowerCaseSearchValue)) {
            return true;
        }
    }
    return false;
}

function filterRecursive(issue: Issue, searchValues: string[]) {
    for (const searchValuePart of searchValues) {
        const partResult = filterIssuesBySearchValue(issue, searchValuePart);
        if (!partResult) {
            return false;
        }
    }
    return true;
}
