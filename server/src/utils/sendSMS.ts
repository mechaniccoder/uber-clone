import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = (to: string, body: string) => {
  client.messages.create({
    body,
    from: process.env.TWILIO_NUMBER,
    to,
  });
};

export const sendVerificationSMS = async (to: string, key: string) =>
  sendSMS(to, `Your verification is ${key}`);
