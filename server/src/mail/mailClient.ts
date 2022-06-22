import sgMail from "@sendgrid/mail";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
    throw new Error("SENDGRID API Key not found in .env");
}

sgMail.setApiKey(apiKey);

export const mailClient = {
    send: (msg: MailDataRequired) => sgMail.send(msg)
}