import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { env } from "../../validate.env.js";
import { s3Client, sesClient, sqsClient } from "../connections/aws.connection.js";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import multer from "multer";
import multerS3 from "multer-s3";

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
    throw err;
  }
};
 
export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  }),
  fileFilter: function (req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024*1024*5
  }
});