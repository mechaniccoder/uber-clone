import mailgun from "mailgun-js";

const DOMAIN = process.env.MAILGUN_DOAMIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const MailgunClient = mailgun({ apiKey: API_KEY || "", domain: DOMAIN || "" });

const sendEmail = async (subject: string, text: string) => {
  const emailData = {
    from: "yuseunghwan94@gmail.com",
    to: "yuseunghwan94@gmail.com",
    subject,
    text,
  };

  return MailgunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailText = `The verification key is ${key}`;

  return sendEmail(emailSubject, emailText);
};
