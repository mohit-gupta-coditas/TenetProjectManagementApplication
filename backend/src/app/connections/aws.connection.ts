import { SESClient } from "@aws-sdk/client-ses";
import { env } from "../../validate.env.js";
import { SQSClient } from "@aws-sdk/client-sqs";

export const sqsClient = new SQSClient({
  region: env.AWS_REGION,
  credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const sesClient = new SESClient({region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
});
