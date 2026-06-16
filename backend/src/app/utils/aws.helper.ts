import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { env } from "../../validate.env.js";
import { sesClient, sqsClient } from "../connections/aws.connection.js";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export const sendToSQS = async (messageBody: any) => {
  try {
    const command = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(messageBody)
    });

    await sqsClient.send(command);
    
  } catch(err) {
    throw err;
  }
}

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
  try {
    const command = new SendEmailCommand({
        Source: env.SES_SENDER_EMAIL,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Html: {
                    Data: html,
                },
            },
        },
    });

    await sesClient.send(command);
  } catch(err) {
        console.log("error in dses..........................")

    throw err;
  }
};
 