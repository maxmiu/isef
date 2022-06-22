import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { mailClient } from "./mailClient";
import { Issue } from "../../../shared/issue";
import { issueTrackerSender } from "./defaultSender";
import * as fs from "fs";

export async function sendIssueUpdate(issue: Issue){
    const htmlContent = fs.readFileSync(__dirname + "/issueUpdate.html", "utf8")
        .replace("LINK", `https://issue-tracker.app/issues${issue.id}`);
    const msg: MailDataRequired = {
        to: issue.reporter.email,
        from: issueTrackerSender,
        subject: `[Issue Tracker] Updates for #${issue.id}`,
        text: 'There is one update for your ',
        html: htmlContent
    }
    await mailClient.send(msg);
}
