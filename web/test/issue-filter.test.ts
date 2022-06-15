import { createIssue } from "../../shared/seeder/issue-seeder";
import { filterIssuesBySearchValue } from "../src/filters/issue-filter";
import { Issue } from "../../shared/issue";

describe('Filter issues', () => {
    const issue: Issue = {
        id: 1,
        ...createIssue(),
    };

    it('should allow to filter case insensitive', () => {
        issue.description = 'test';
        const filterResult = filterIssuesBySearchValue(issue, 'tEsT');
        expect(filterResult).toBeTruthy();
    });

    it('should allow to filter for multiple properties', () => {
        issue.description = 'myDescription';
        issue.title = 'myTitle';
        const filterResult = filterIssuesBySearchValue(issue, 'description title');
        expect(filterResult).toBeTruthy();
    });

    it('should not find non existing issue', () => {
        const filterResult = filterIssuesBySearchValue(issue, 'very unknown issue');
        expect(filterResult).toBeFalsy();
    });
})