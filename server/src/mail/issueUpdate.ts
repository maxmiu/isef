import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { mailClient } from "./mailClient";
import { Issue } from "../../../shared/issue";
import { issueTrackerSender } from "./defaultSender";
import * as ejs from "ejs";

export async function sendIssueUpdate(issue: Issue) {
    const template = await ejs.renderFile(__dirname + '/templates/IssueUpdate.ejs', {
        ...{link: `https://issue-tracker.app/issues/${issue.id}`},
        issue: issue
    });
    const msg: MailDataRequired = {
        to: getEmailRecipients(issue),
        from: issueTrackerSender,
        subject: `[Issue Tracker] Updates for #${issue.id}`,
        text: 'There is one update for your Issue',
        html: template
    }
    await mailClient.send(msg);
}

const getEmailRecipients = (issue: Issue) => {
    if (!issue.assignee || issue.assignee.email === issue.reporter.email) {
        return issue.reporter.email;
    }
    return [issue.assignee.email, issue.reporter.email];
}
